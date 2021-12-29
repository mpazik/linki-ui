import type { Callback, NamedCallbacks as OriginalNamedCallbacks } from "linki";

import type { JsonHtml } from "./jsonhtml";
import { dom } from "./jsonhtml";
import { renderJsonHtmlToDom } from "./render";
import type { View } from "./view";

interface ComponentElementEventMap {
  connected: Event;
  disconnected: Event;
}
interface ComponentElement extends HTMLElement {
  addEventListener<K extends keyof ComponentElementEventMap>(
    type: K,
    listener: (this: ComponentElement, ev: ComponentElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
}

export type Render = Callback<JsonHtml | void>;

const componentClassName = "component";
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

export const createComponentRenderer = (): [ComponentElement, Render] => {
  const parent: HTMLElement = document.createElement("div");
  parent.classList.add(componentClassName);
  parent.addEventListener("disconnected", () => {
    existingComponents.forEach((existingComponent) => {
      existingComponent.dispatchEvent(new CustomEvent("disconnected"));
    });
  });

  let existingComponents: Element[] = [];
  const render: Render = (jsonHtml) => {
    const dom = renderJsonHtmlToDom(jsonHtml ?? undefined);
    const renderedComponents: Element[] = findComponentNodes(dom);

    existingComponents
      .filter((it) => renderedComponents.indexOf(it) < 0)
      .forEach((existingComponent) => {
        existingComponent.dispatchEvent(new CustomEvent("disconnected"));
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

  return [parent, render];
};

export const createViewRenderer = <T>(
  view: View<T>
): [ComponentElement, Callback<T>] => {
  const [parent, render] = createComponentRenderer();
  return [
    parent,
    (props) => {
      const jsonHtml = view(props);
      return render(jsonHtml);
    },
  ];
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
    const [parent, render] = createComponentRenderer();
    const handlers = factory(render, props);
    if (!handlers) {
      return [dom(parent), {} as NamedCallbacks<S>];
    }

    if (handlers.mounted) {
      parent.addEventListener("connected", () => handlers.mounted!());
    }
    if (handlers.willUnmount) {
      parent.addEventListener("disconnected", () => handlers.willUnmount!());
    }
    return [dom(parent), handlers as NamedCallbacks<S>];
  };
