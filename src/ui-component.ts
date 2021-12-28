import type { Callback, NamedCallbacks as OriginalNamedCallbacks } from "linki";

import type { JsonHtml } from "./jsonhtml";
import { dom } from "./jsonhtml";
import { renderJsonHtmlToDom } from "./render";

const componentClassName = "component";

export type Render = Callback<JsonHtml | undefined>;

const findComponentNodes = (dom: Node): Element[] => {
  if (dom.nodeType === Node.ELEMENT_NODE) {
    if ((dom as HTMLElement).classList.contains(componentClassName)) {
      return [dom] as Element[];
    }
    return Array.from(
      (dom as Element).querySelectorAll(
        `:not(.${componentClassName}) > .${componentClassName}`
      )
    );
  }
  if (dom.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    return Array.from(dom.childNodes).flatMap((it) => findComponentNodes(it));
  }
  return [];
};

export const createRenderer = (parent: Element): Render => {
  let existingComponents: Element[] = [];

  return (jsonHtml) => {
    const dom = renderJsonHtmlToDom(jsonHtml);
    const renderedComponents: Element[] = findComponentNodes(dom);

    existingComponents
      .filter((it) => renderedComponents.indexOf(it) < 0)
      .forEach((oldComponent) => {
        oldComponent.dispatchEvent(new CustomEvent("disconnected"));
      });

    parent.innerHTML = "";
    parent.appendChild(dom);

    renderedComponents
      .filter((it) => existingComponents.indexOf(it) < 0)
      .forEach((newComponent) => {
        newComponent.dispatchEvent(new CustomEvent("connected"));
      });

    existingComponents = renderedComponents;
  };
};

export type NamedCallbacks<T extends object | void> = T extends object
  ? OriginalNamedCallbacks<T>
  : OriginalNamedCallbacks<{}>;

export type ElementComponent<T = void, S extends object | void = void> = (
  props: T
) => [JsonHtml, NamedCallbacks<S>];

export const defineUiComponent =
  <T = void, S extends object | void = void>(
    factory: (
      render: Render,
      props: T
    ) => S extends object
      ? NamedCallbacks<S> & { mounted?: Callback; willUnmount?: Callback }
      : void | { mounted?: Callback; willUnmount?: Callback }
  ): ElementComponent<T, S> =>
  (props) => {
    const parent: HTMLElement = document.createElement("div");
    parent.classList.add(componentClassName);

    const renderer = createRenderer(parent);
    const handlers = factory(renderer, props);
    if (!handlers) {
      return [dom(parent), {} as NamedCallbacks<S>];
    }

    const { mounted, willUnmount, ...restHandlers } =
      handlers as NamedCallbacks<S> & {
        mounted?: Callback;
        willUnmount?: Callback;
      };

    if (mounted) {
      parent.addEventListener("connected", () => mounted!());
    }
    if (willUnmount) {
      parent.addEventListener("disconnected", () => willUnmount!());
    }
    return [dom(parent), restHandlers as unknown as NamedCallbacks<S>];
  };
