import type { Callback } from "linki";

import type { JsonHtml } from "./jsonhtml";
import { div, span } from "./jsonhtml";
import { createRendererForElement, defineUiComponent } from "./ui-component";

import Mock = jest.Mock;

const probeComponent = defineUiComponent<{
  connected: Callback;
  disconnected: Callback;
  content?: JsonHtml;
}>((render, { connected, disconnected, content = span("test component") }) => {
  render(content);
  return {
    mounted: connected,
    willUnmount: disconnected,
  };
});

const newPropComponent = (content?: JsonHtml): [JsonHtml, Mock, Mock] => {
  const connected = jest.fn();
  const disconnected = jest.fn();
  const [child] = probeComponent({ connected, disconnected, content });
  return [child, connected, disconnected];
};

describe("children is detected as component when", () => {
  test("rendered directly", () => {
    const [component, connected] = newPropComponent();
    const render = createRendererForElement(document.createElement("div"));

    render(component);
    expect(connected.mock.calls.length).toEqual(1);
  });

  test("rendered as dom fragment", () => {
    const [component, connected] = newPropComponent();
    const render = createRendererForElement(document.createElement("div"));

    render([component, div()]);
    expect(connected.mock.calls.length).toEqual(1);
  });

  test("rendered in nested dom", () => {
    const [component, connected] = newPropComponent();
    const render = createRendererForElement(document.createElement("div"));

    render(div(component));
    expect(connected.mock.calls.length).toEqual(1);
  });

  test("rendered in nested component", () => {
    const [child, connected] = newPropComponent();
    const [component] = newPropComponent(child);
    const render = createRendererForElement(document.createElement("div"));

    render(div(component));
    expect(connected.mock.calls.length).toEqual(1);
  });

  test("rendered in nested component as a fragment", () => {
    const [child, connected] = newPropComponent();
    const [component] = newPropComponent(child);
    const render = createRendererForElement(document.createElement("div"));

    render([component, span("test")]);
    expect(connected.mock.calls.length).toEqual(1);
  });
});

test("children is not disconnected when is re-rendered", () => {
  const [component, connected] = newPropComponent();
  const render = createRendererForElement(document.createElement("div"));

  render(div(component));
  expect(connected.mock.calls.length).toEqual(1);

  render([span("test"), div(div(component))]);
  expect(connected.mock.calls.length).toEqual(1);
});

test("children is not disconnected after is removed", () => {
  const [component, , disconnected] = newPropComponent();
  const render = createRendererForElement(document.createElement("div"));

  render(component);
  render();

  expect(disconnected.mock.calls.length).toEqual(1);
});

test("children is not re-connected when is re-rendered after removal", () => {
  const [component, connected] = newPropComponent();
  const render = createRendererForElement(document.createElement("div"));

  render(component);
  render();
  render(component);

  expect(connected.mock.calls.length).toEqual(2);
});

test("content of nested component is preserved when component is moved around", () => {
  const [component] = newPropComponent("my-component");
  const parent = document.createElement("div");
  const render = createRendererForElement(parent);

  render(component);
  render(div(component));
  render([div(), div(component)]);
  expect(parent.innerHTML).toContain("my-component");
});
