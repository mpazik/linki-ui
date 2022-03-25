import type { Callback, NamedCallbacks } from "linki";
import { not } from "linki";

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

export const componentClassName = "component";
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
  let existing: Element[] = [];

  parent.classList.add(componentClassName);
  parent.addEventListener("disconnected", () => {
    existing.forEach((existingComponent) => {
      existingComponent.dispatchEvent(new CustomEvent("disconnected"));
    });
  });

  return (jsonHtml) => {
    const dom = renderJsonHtmlToDom(jsonHtml ?? undefined);
    const rendered: Element[] = findComponentNodes(dom);

    const removed = existing.filter(not(rendered.includes.bind(rendered)));
    removed.forEach((existingComponent) => {
      existingComponent.dispatchEvent(new CustomEvent("disconnected"));
    });

    parent.replaceChildren(dom);

    const added = rendered.filter(not(existing.includes.bind(existing)));
    added.forEach((newComponent) => {
      newComponent.dispatchEvent(new CustomEvent("connected"));
    });

    existing = rendered;
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

export type ComponentMountOptions =
  | {
      parent?: HTMLElement;
    }
  | { parentTag?: string };

export const getParentForComponentMount = (
  options: ComponentMountOptions
): HTMLElement => {
  if ((options as { parent?: HTMLElement }).parent) {
    return (options as { parent: HTMLElement }).parent.cloneNode(
      false
    ) as HTMLElement;
  }
  const tag = (options as { parentTag?: string }).parentTag ?? "div";
  return document.createElement(tag);
};

export const mountComponent = <
  I extends object | void,
  O extends object | void
>(
  ...[component, props, options]: O extends object
    ?
        | [UiComponent<I, O>, ComponentIO<O>]
        | [UiComponent<I, O>, ComponentIO<O>, ComponentMountOptions | undefined]
    :
        | [UiComponent<I, O>]
        | [UiComponent<I, O>, {}, ComponentMountOptions | undefined]
): [JsonHtmlNode, ComponentIO<I>] => {
  const parent = getParentForComponentMount(options ?? {});
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
