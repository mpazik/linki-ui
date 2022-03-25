import type { Callback } from "linki";
import { newProbe } from "linki";

import type { JsonHtml, JsonHtmlNode } from "./jsonhtml";
import { div, span } from "./jsonhtml";
import type { ComponentMountOptions, UiComponent } from "./ui-component";
import { createComponentRenderer, mountComponent } from "./ui-component";

const setupProbeComponent =
  (
    connected: Callback,
    disconnected: Callback,
    content: JsonHtml = span("test component")
  ): UiComponent =>
  ({ render }) => {
    render(content);
    return {
      start: connected,
      stop: disconnected,
    };
  };

const newPropComponent = (
  content?: JsonHtml,
  options?: ComponentMountOptions
): [JsonHtmlNode, () => void[], () => void[]] => {
  const [connected, getConnected] = newProbe();
  const [disconnected, getDisconnected] = newProbe();
  const [child] = mountComponent(
    setupProbeComponent(connected, disconnected, content),
    {},
    options
  );
  return [child, getConnected, getDisconnected];
};

describe("children is detected as component when", () => {
  test("rendered directly", () => {
    const [component, getConnected] = newPropComponent();
    const render = createComponentRenderer(document.createElement("div"));

    render(component);
    expect(getConnected()).toHaveLength(1);
  });

  test("rendered as dom fragment", () => {
    const [component, getConnected] = newPropComponent();
    const render = createComponentRenderer(document.createElement("div"));

    render([component, div()]);
    expect(getConnected()).toHaveLength(1);
  });

  test("rendered in nested dom", () => {
    const [component, getConnected] = newPropComponent();
    const render = createComponentRenderer(document.createElement("div"));

    render(div(component));
    expect(getConnected()).toHaveLength(1);
  });

  test("rendered in nested component", () => {
    const [child, getConnected] = newPropComponent();
    const [component] = newPropComponent(child);
    const render = createComponentRenderer(document.createElement("div"));

    render(div(component));
    expect(getConnected()).toHaveLength(1);
  });

  test("rendered in nested component as a fragment", () => {
    const [child, getConnected] = newPropComponent();
    const [component] = newPropComponent(child);
    const render = createComponentRenderer(document.createElement("div"));

    render([component, span("test")]);
    expect(getConnected()).toHaveLength(1);
  });
});

test("children is disconnected after is removed", () => {
  const [component, , getDisconnected] = newPropComponent();
  const render = createComponentRenderer(document.createElement("div"));

  render(component);
  render();

  expect(getDisconnected()).toHaveLength(1);
});

test("children is not reconnected when is re-rendered", () => {
  const [component, getConnected] = newPropComponent();
  const render = createComponentRenderer(document.createElement("div"));

  render(div(component));
  expect(getConnected()).toHaveLength(1);

  render([span("test"), div(div(component))]);
  expect(getConnected()).toHaveLength(0);
});

test("children is reconnected when is re-rendered after removal", () => {
  const [component, getConnected] = newPropComponent();
  const render = createComponentRenderer(document.createElement("div"));

  render(component);
  render();
  render(component);

  expect(getConnected()).toHaveLength(2);
});

test("content of component is preserved when component is moved around", () => {
  const [component] = newPropComponent("my-component");
  const parent = document.createElement("div");
  const render = createComponentRenderer(parent);

  render(component);
  render(div(component));
  render([div(), div(component)]);
  expect(parent.innerHTML).toContain("my-component");
});

test("nested children are connected and disconnected", () => {
  const [grandChild, getConnected, getDisconnected] = newPropComponent();
  const [child] = newPropComponent(grandChild);
  const [component] = newPropComponent(child);
  const render = createComponentRenderer(document.createElement("div"));

  render(component);
  expect(getConnected()).toHaveLength(1);
  expect(getDisconnected()).toHaveLength(0);

  render();
  expect(getConnected()).toHaveLength(0);
  expect(getDisconnected()).toHaveLength(1);
});

test("parent is rendered using provided tag", () => {
  const [component] = newPropComponent(undefined, {
    parentTag: "p",
  });
  const parent = document.createElement("div");
  const render = createComponentRenderer(parent);

  render(component);
  expect(parent.innerHTML).toEqual(
    `<p class="component"><span>test component</span></p>`
  );
});

test("parent is rendered using provided element", () => {
  const parent = document.createElement("p");
  parent.classList.add("large");
  parent.setAttribute("data-type", "parent");

  const [component] = newPropComponent(undefined, {
    parent: parent,
  });
  const container = document.createElement("div");
  const render = createComponentRenderer(container);

  render(component);
  expect(container.innerHTML).toEqual(
    `<p class="large component" data-type="parent"><span>test component</span></p>`
  );
});
