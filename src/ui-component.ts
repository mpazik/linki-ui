import type { Callback, NamedCallbacks } from "linki";

import type { ComponentIO, RelaxedComponent } from "./components-extra";
import type { JsonHtml, JsonHtmlNode } from "./jsonhtml";
import { dom } from "./jsonhtml";
import { renderJsonHtmlToDom } from "./render";

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
export const createRenderer = (root: ParentNode): Render => {
  return (jsonHtml) => {
    const dom = renderJsonHtmlToDom(jsonHtml ?? undefined);
    root.replaceChildren(dom);
  };
};

/**
 * A boundary that allow children components to render in place without affecting the parent view,
 * and allow to rerender parents with just reusing reference instead of entire dom tree.
 *
 * todo: came up with a better name
 */
export const createRenderingBoundary = (): [JsonHtml, Render] => {
  const fragment = document.createDocumentFragment();
  const renderer = createRenderer(fragment);
  return [dom(fragment), renderer];
};

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

export const createComponentRenderer = (parent: HTMLElement): Render => {
  parent.classList.add(componentClassName);
  parent.addEventListener("disconnected", () => {
    existingComponents.forEach((existingComponent) => {
      existingComponent.dispatchEvent(new CustomEvent("disconnected"));
    });
  });

  let existingComponents: Element[] = [];

  return (jsonHtml) => {
    const dom = renderJsonHtmlToDom(jsonHtml ?? undefined);
    const renderedComponents: Element[] = findComponentNodes(dom);

    existingComponents
      .filter((it) => renderedComponents.indexOf(it) < 0)
      .forEach((existingComponent) => {
        existingComponent.dispatchEvent(new CustomEvent("disconnected"));
      });

    parent.replaceChildren(dom);

    renderedComponents
      .filter((it) => existingComponents.indexOf(it) < 0)
      .forEach((newComponent) => {
        newComponent.dispatchEvent(new CustomEvent("connected"));
      });

    existingComponents = renderedComponents;
  };
};

export type RelaxedNamedCallbacks<T extends object | void> = NamedCallbacks<
  T extends object ? T : {}
>;

export type ElementComponent<T = void, S extends object | void = void> = (
  props: T
) => [JsonHtml, RelaxedNamedCallbacks<S>];

export type UiComponent<
  I extends object | void = void,
  O extends object | void = void
> = RelaxedComponent<
  I extends object ? I & { start?: void; stop?: void } : void,
  O extends object ? O & { render: JsonHtml } : { render: JsonHtml }
>;

export const mountComponent = <
  I extends object | void,
  O extends object | void
>(
  ...[component, props]: O extends object
    ? [UiComponent<I, O>, ComponentIO<O>]
    : [UiComponent<I, O>]
): [JsonHtmlNode, ComponentIO<I>] => {
  const parent = document.createElement("div");
  const render = createComponentRenderer(parent);
  const handlers = component(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props ? { ...(props as any), render } : { render }
  );
  if (!handlers) {
    return [dom(parent), {} as I extends object ? NamedCallbacks<I> : void];
  }

  if (handlers.start) {
    parent.addEventListener("connected", () => handlers.start!());
  }
  if (handlers.stop) {
    parent.addEventListener("disconnected", () => handlers.stop!());
  }

  return [
    dom(parent),
    handlers as unknown as I extends object ? NamedCallbacks<I> : void,
  ];
};
