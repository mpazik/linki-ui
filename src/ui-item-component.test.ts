import type { ArrayChange, Callback } from "linki";
import { newProbe } from "linki";

import type { JsonHtml, JsonHtmlNode } from "./jsonhtml";
import { div, span } from "./jsonhtml";
import { createComponentRenderer } from "./ui-component";
import type {
  UiItemComponent,
  ItemComponentMountOptions,
} from "./ui-item-component";
import { mountItemComponent } from "./ui-item-component";

type Item = [number, string];
type Id = number;
const getId = (item: Item): Id => item[0];

const setupProbeComponent =
  (
    connected: Callback,
    disconnected: Callback,
    children?: JsonHtml
  ): UiItemComponent<Item, { test: string }> =>
  ({ render, test }) => {
    return {
      start: () => connected(),
      stop: disconnected,
      updateItem: (item) => {
        test("from child: " + item[1]);
        render(children ?? "item: " + item[1]);
      },
    };
  };

const newPropComponent = (
  children?: JsonHtml,
  options?: ItemComponentMountOptions<Id>
): {
  component: JsonHtmlNode;
  updateItems: Callback<Item[]>;
  changeItems: Callback<ArrayChange<Item, Id>>;
  getConnected: () => void[];
  getDisconnected: () => void[];
  getReceived: () => [number, string][];
} => {
  const [connected, getConnected] = newProbe();
  const [disconnected, getDisconnected] = newProbe();
  const [received, getReceived] = newProbe<[number, string]>();
  const [component, { updateItems, changeItems }] = mountItemComponent(
    getId,
    setupProbeComponent(connected, disconnected, children),
    {
      test: received,
    },
    options
  );
  return {
    component,
    updateItems,
    changeItems,
    getConnected,
    getDisconnected,
    getReceived,
  };
};

test("children is connected after component is rendered", () => {
  const { component, updateItems, getConnected } = newPropComponent();
  const render = createComponentRenderer(document.createElement("div"));

  updateItems([[1, "test"]]);
  expect(getConnected()).toHaveLength(0);

  render(component);
  expect(getConnected()).toHaveLength(1);
});

test("children receives data after component is rendered", () => {
  const { component, updateItems } = newPropComponent();
  const parent = document.createElement("div");
  const render = createComponentRenderer(parent);

  updateItems([[1, "test"]]);
  expect(parent.children).toHaveLength(0);

  render(component);
  expect(parent.firstElementChild!.innerHTML).toEqual(
    `<div class="component">item: test</div>`
  );
});

test("children is connected after it is added to rendered component", () => {
  const { component, updateItems, getConnected } = newPropComponent();
  const render = createComponentRenderer(document.createElement("div"));

  render(component);
  updateItems([[1, "test"]]);
  expect(getConnected()).toHaveLength(1);
});

test("children is disconnected after component is removed", () => {
  const { component, updateItems, getDisconnected } = newPropComponent();
  const render = createComponentRenderer(document.createElement("div"));

  render(component);
  updateItems([[1, "test"]]);
  render();

  expect(getDisconnected()).toHaveLength(1);
});

test("children is disconnected after it is removed", () => {
  const { component, updateItems, getDisconnected } = newPropComponent();
  const render = createComponentRenderer(document.createElement("div"));

  render(component);
  updateItems([[1, "test"]]);
  updateItems([]);

  expect(getDisconnected()).toHaveLength(1);
});

test("children is not reconnected when component is re-rendered", () => {
  const { component, updateItems, getConnected } = newPropComponent();
  const render = createComponentRenderer(document.createElement("div"));

  render(component);
  updateItems([[1, "test"]]);
  expect(getConnected()).toHaveLength(1);

  render([span("test"), div(div(component))]);
  expect(getConnected()).toHaveLength(0);
});

test("children is reconnected when component is re-rendered after removal", () => {
  const { component, updateItems, getConnected } = newPropComponent();
  const render = createComponentRenderer(document.createElement("div"));

  render(component);
  updateItems([[1, "test"]]);
  render();
  render(component);

  expect(getConnected()).toHaveLength(2);
});

test("children is reconnected when is added again", () => {
  const { component, updateItems, getConnected } = newPropComponent();
  const render = createComponentRenderer(document.createElement("div"));

  render(component);
  updateItems([[1, "test"]]);
  updateItems([]);
  updateItems([[1, "test"]]);

  expect(getConnected()).toHaveLength(2);
});

test("children content is updated when new array is pushed", () => {
  const { component, updateItems } = newPropComponent();
  const parent = document.createElement("div");
  const render = createComponentRenderer(parent);

  render(component);
  updateItems([[1, "test"]]);
  expect(parent.firstElementChild!.innerHTML).toEqual(
    `<div class="component">item: test</div>`
  );

  updateItems([[1, "test2"]]);
  expect(parent.firstElementChild!.innerHTML).toEqual(
    `<div class="component">item: test2</div>`
  );
});

test("children content is update when new value for the item is pushed", () => {
  const { component, updateItems, changeItems, getConnected } =
    newPropComponent();
  const parent = document.createElement("div");
  const render = createComponentRenderer(parent);

  render(component);
  updateItems([[1, "test"]]);
  changeItems(["set", [1, "test2"]]);
  expect(parent.firstElementChild!.innerHTML).toEqual(
    `<div class="component">item: test2</div>`
  );
  expect(getConnected()).toHaveLength(1);
});

test("children is added when new item is pushed", () => {
  const { component, changeItems, getConnected } = newPropComponent();
  const parent = document.createElement("div");
  const render = createComponentRenderer(parent);

  render(component);
  changeItems(["set", [1, "test"]]);
  expect(parent.firstElementChild!.innerHTML).toEqual(
    `<div class="component">item: test</div>`
  );
  expect(getConnected()).toHaveLength(1);
});

test("list is updated when item is removed", () => {
  const { component, updateItems, changeItems, getDisconnected } =
    newPropComponent();
  const parent = document.createElement("div");
  const render = createComponentRenderer(parent);

  render(component);
  updateItems([
    [1, "test"],
    [2, "test2"],
  ]);
  changeItems(["del", 1]);
  expect(parent.firstElementChild!.innerHTML).toEqual(
    `<div class="component">item: test2</div>`
  );
  expect(getDisconnected()).toHaveLength(1);
});

test("list is updated when last item is removed", () => {
  const { component, updateItems, changeItems, getDisconnected } =
    newPropComponent();
  const parent = document.createElement("div");
  const render = createComponentRenderer(parent);

  render(component);
  updateItems([[1, "test"]]);
  changeItems(["del", 1]);
  expect(parent.firstElementChild!.innerHTML).toEqual(``);
  expect(getDisconnected()).toHaveLength(1);
});

test("list updated wen new array is pushed", () => {
  const { component, updateItems, changeItems } = newPropComponent();
  const parent = document.createElement("div");
  const render = createComponentRenderer(parent);

  render(component);
  updateItems([[1, "test"]]);
  changeItems([
    "to",
    [
      [2, "test2"],
      [3, "test3"],
    ],
  ]);
  expect(parent.firstElementChild!.innerHTML).toEqual(
    `<div class="component">item: test2</div><div class="component">item: test3</div>`
  );
});

test("children can communicate with parent", () => {
  const { component, updateItems, getReceived } = newPropComponent();
  const render = createComponentRenderer(document.createElement("div"));

  render(component);
  updateItems([[1, "test"]]);
  expect(getReceived()).toEqual([[1, "from child: test"]]);

  updateItems([[1, "test2"]]);
  expect(getReceived()).toEqual([[1, "from child: test2"]]);
});

test("parent and children is rendered using provided tag", () => {
  const { component, updateItems } = newPropComponent(undefined, {
    childrenTag: "li",
    parentTag: "ul",
  });
  const parent = document.createElement("div");
  const render = createComponentRenderer(parent);

  render(component);
  updateItems([[1, "test"]]);
  expect(parent.innerHTML).toEqual(
    `<ul class="component"><li class="component">item: test</li></ul>`
  );
});

test("parent and children is rendered using provided element", () => {
  const children = document.createElement("li");
  children.classList.add("item");
  children.setAttribute("data-type", "item");
  const parent = document.createElement("ul");
  parent.classList.add("list");
  parent.setAttribute("data-type", "parent");

  const { component, updateItems } = newPropComponent(undefined, {
    childrenElementFactory: () => children,
    parent: parent,
  });
  const container = document.createElement("div");
  const render = createComponentRenderer(container);

  render(component);
  updateItems([[1, "test"]]);
  expect(container.innerHTML).toEqual(
    `<ul class="list component" data-type="parent"><li class="item component" data-type="item">item: test</li></ul>`
  );
});
