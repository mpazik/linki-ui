import type { Callback, NamedCallbacks as NamedCallbacks } from "linki";

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

export type Render = Callback<JsonHtml>;
export const createPureRenderer = (root: ParentNode): Render => {
  return (jsonHtml) => {
    const dom = renderJsonHtmlToDom(jsonHtml);
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
  const renderer = createPureRenderer(fragment);
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

    parent.replaceChildren(dom);

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

export type RelaxedNamedCallbacks<T extends object | void> = NamedCallbacks<
  T extends object ? T : {}
>;

export type ElementComponent<T = void, S extends object | void = void> = (
  props: T
) => [JsonHtml, RelaxedNamedCallbacks<S>];

export const defineUiComponent =
  <T = void, S extends object | void = void>(
    factory: (
      render: Render,
      props: T
    ) => S extends object
      ? RelaxedNamedCallbacks<S> & {
          mounted?: Callback;
          willUnmount?: Callback;
        }
      : void | { mounted?: Callback; willUnmount?: Callback }
  ): ElementComponent<T, S> =>
  (props) => {
    const [parent, render] = createComponentRenderer();
    const handlers = factory(render, props);
    if (!handlers) {
      return [dom(parent), {} as RelaxedNamedCallbacks<S>];
    }

    if (handlers.mounted) {
      parent.addEventListener("connected", () => handlers.mounted!());
    }
    if (handlers.willUnmount) {
      parent.addEventListener("disconnected", () => handlers.willUnmount!());
    }
    return [dom(parent), handlers as RelaxedNamedCallbacks<S>];
  };

type ComponentInput<S extends object | void> = S extends object
  ? NamedCallbacks<S>
  : void;
type ComponentOutput<T extends object | void> = T extends object
  ? NamedCallbacks<T>
  : void;

export type RelaxedComponent<
  T extends object | void = void,
  S extends object | void = void
> = (props: ComponentInput<S>) => ComponentOutput<T>;

export type UiComponent<
  T extends object | void = void,
  S extends object | void = void
> = RelaxedComponent<
  T extends object ? T & { start?: void; stop?: void } : void,
  S extends object ? S & { render: JsonHtml } : { render: JsonHtml }
>;

export type PureUiComponent = UiComponent;

export const mountComponent = <
  T extends object | void,
  S extends object | void
>(
  ...[component, props]: S extends object
    ? [UiComponent<T, S>, ComponentInput<S>]
    : [UiComponent<T, S>]
): [JsonHtml, ComponentOutput<T>] => {
  const [parent, render] = createComponentRenderer();
  const handlers = component(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props ? { ...(props as any), render } : { render }
  );
  if (!handlers) {
    return [dom(parent), {} as T extends object ? NamedCallbacks<T> : void];
  }

  if (handlers.start) {
    parent.addEventListener("connected", () => handlers.start!());
  }
  if (handlers.stop) {
    parent.addEventListener("disconnected", () => handlers.stop!());
  }

  return [
    dom(parent),
    handlers as unknown as T extends object ? NamedCallbacks<T> : void,
  ];
};
