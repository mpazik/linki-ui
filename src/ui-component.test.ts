import type { Callback } from "linki";

import type { JsonHtml } from "./jsonhtml";
import { div, span } from "./jsonhtml";
import type { UiComponent } from "./ui-component";
import { createComponentRenderer, mountComponent } from "./ui-component";

import Mock = jest.Mock;

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

const newPropComponent = (content?: JsonHtml): [JsonHtml, Mock, Mock] => {
  const connected = jest.fn();
  const disconnected = jest.fn();
  const [child] = mountComponent(
    setupProbeComponent(connected, disconnected, content)
  );
  return [child, connected, disconnected];
};

describe("children is detected as component when", () => {
  test("rendered directly", () => {
    const [component, connected] = newPropComponent();
    const render = createComponentRenderer(document.createElement("div"));

    render(component);
    expect(connected.mock.calls.length).toEqual(1);
  });

  test("rendered as dom fragment", () => {
    const [component, connected] = newPropComponent();
    const render = createComponentRenderer(document.createElement("div"));

    render([component, div()]);
    expect(connected.mock.calls.length).toEqual(1);
  });

  test("rendered in nested dom", () => {
    const [component, connected] = newPropComponent();
    const render = createComponentRenderer(document.createElement("div"));

    render(div(component));
    expect(connected.mock.calls.length).toEqual(1);
  });

  test("rendered in nested component", () => {
    const [child, connected] = newPropComponent();
    const [component] = newPropComponent(child);
    const render = createComponentRenderer(document.createElement("div"));

    render(div(component));
    expect(connected.mock.calls.length).toEqual(1);
  });

  test("rendered in nested component as a fragment", () => {
    const [child, connected] = newPropComponent();
    const [component] = newPropComponent(child);
    const render = createComponentRenderer(document.createElement("div"));

    render([component, span("test")]);
    expect(connected.mock.calls.length).toEqual(1);
  });
});

test("children is not disconnected when is re-rendered", () => {
  const [component, connected] = newPropComponent();
  const render = createComponentRenderer(document.createElement("div"));

  render(div(component));
  expect(connected.mock.calls.length).toEqual(1);

  render([span("test"), div(div(component))]);
  expect(connected.mock.calls.length).toEqual(1);
});

test("children is not disconnected after is removed", () => {
  const [component, , disconnected] = newPropComponent();
  const render = createComponentRenderer(document.createElement("div"));

  render(component);
  render();

  expect(disconnected.mock.calls.length).toEqual(1);
});

test("children is not re-connected when is re-rendered after removal", () => {
  const [component, connected] = newPropComponent();
  const render = createComponentRenderer(document.createElement("div"));

  render(component);
  render();
  render(component);

  expect(connected.mock.calls.length).toEqual(2);
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
  const [grandChild, connected, disconnected] = newPropComponent();
  const [child] = newPropComponent(grandChild);
  const [component] = newPropComponent(child);
  const render = createComponentRenderer(document.createElement("div"));

  render(component);
  expect(connected.mock.calls.length).toEqual(1);
  expect(disconnected.mock.calls.length).toEqual(0);

  render();
  expect(connected.mock.calls.length).toEqual(1);
  expect(disconnected.mock.calls.length).toEqual(1);
});
