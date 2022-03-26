import type { ArrayChange, Callback, NamedCallbacks } from "linki";
import { isEqual } from "linki";

import type { ComponentIO } from "./components-extra";
import type { JsonHtml, JsonHtmlNode } from "./jsonhtml";
import { dom } from "./jsonhtml";
import type { ComponentMountOptions } from "./ui-component";
import {
  componentClassName,
  createComponentRenderer,
  getParentForComponentMount,
} from "./ui-component";

export type UiItemComponent<T, I extends object = {}, O extends object = {}> = (
  a: NamedCallbacks<O & { render: JsonHtml }>
) => NamedCallbacks<I & { start?: void; stop?: void; updateItem: T }>;

export type NamedItemCallbacks<ID, T extends object> = {
  [K in keyof T]: Callback<[ID, T[K]]>;
};

const enhanceWithId = <ID, S extends object>(
  id: ID,
  callbacks: NamedItemCallbacks<ID, S>
): NamedCallbacks<S> => {
  return Object.fromEntries(
    (Object.entries(callbacks) as [string, Callback<[ID, S[keyof S]]>][]).map(
      ([k, v]): [string, Callback<S[keyof S]>] => [
        k,
        (value) => {
          v([id, value]);
        },
      ]
    )
  ) as unknown as NamedCallbacks<S>;
};

export type ItemComponentMountOptions<ID> = ComponentMountOptions &
  (
    | {
        childrenElementFactory?: (id: ID) => HTMLElement;
      }
    | {
        childrenTag?: string;
      }
  );

export const getChildrenForComponentMountFactory = <ID>(
  options: ItemComponentMountOptions<ID>
): ((id: ID) => HTMLElement) => {
  if (
    (options as { childrenElementFactory?: (id: ID) => HTMLElement })
      .childrenElementFactory
  ) {
    return (id) =>
      (
        options as { childrenElementFactory: (id: ID) => HTMLElement }
      ).childrenElementFactory(id);
  }
  const tag = (options as { childrenTag?: string }).childrenTag ?? "div";
  return () => document.createElement(tag);
};

type ItemData<T> = {
  node: Node;
  last: T;
  updateItem: Callback<T>;
};
export const mountItemComponent = <ID, T, I extends object, O extends object>(
  getId: (item: T) => ID,
  itemComponent: UiItemComponent<T, I, O>,
  props: NamedItemCallbacks<ID, O>,
  options: ItemComponentMountOptions<ID> = {}
): [
  JsonHtmlNode,
  ComponentIO<{ updateItems: T[]; changeItems: ArrayChange<T, ID> }>
] => {
  const existingItems = new Map<ID, ItemData<T>>();
  let connected = false;

  const parent = getParentForComponentMount(options);
  const getChildren = getChildrenForComponentMountFactory(options);
  parent.classList.add(componentClassName);
  parent.addEventListener("disconnected", () => {
    for (const [, { node }] of existingItems) {
      node.dispatchEvent(new CustomEvent("disconnected"));
    }
    connected = false;
  });
  parent.addEventListener("connected", () => {
    connected = true;
    for (const [, data] of existingItems) {
      start(data);
    }
  });

  const setup = (id: ID, item: T) => {
    const node = getChildren(id);
    const render = createComponentRenderer(node);
    const namedCallbacks: NamedCallbacks<O> = enhanceWithId(id, props);
    const { updateItem, stop, start, ...rest } = itemComponent({
      ...namedCallbacks,
      render,
    } as NamedCallbacks<O & { render: JsonHtml }>);
    if (start) {
      node.addEventListener("connected", () => (start as Callback)());
    }
    if (stop) {
      node.addEventListener("disconnected", () => (stop as Callback)());
    }

    const value = {
      last: item,
      node,
      updateItem: updateItem as Callback<T>,
    };
    existingItems.set(id, value);
    return value;
  };
  const start = ({ node, updateItem, last }: ItemData<T>) => {
    node.dispatchEvent(new CustomEvent("connected"));
    updateItem(last);
  };
  const updateData = (existing: ItemData<T>, newItem: T) => {
    if (isEqual(newItem)(existing.last)) return;
    existing.last = newItem;
    existing.updateItem(newItem);
  };
  const update = (item: T) => {
    const id = getId(item);
    const existing = existingItems.get(id);
    if (existing) {
      updateData(existing, item);
    } else {
      const data = setup(id, item);
      parent.appendChild(data.node);
      start(data);
    }
  };
  const removeItem = (id: ID) => {
    const existing = existingItems.get(id);
    if (!existing) return;

    existing.node.dispatchEvent(new CustomEvent("disconnected"));
    existingItems.delete(id);
    parent.removeChild(existing.node);
  };
  const updateItems = (items: T[]) => {
    const nodes: Node[] = [];
    const usedItems = new Set<ID>();
    const newItems = new Set<ID>();

    for (const item of items) {
      const id = getId(item);
      usedItems.add(id);
      const existing = existingItems.get(id);
      if (existing) {
        updateData(existing, item);
        nodes.push(existing.node);
      } else {
        const { node } = setup(id, item);

        newItems.add(id);
        nodes.push(node);
      }
    }

    for (const [id, { node }] of existingItems.entries()) {
      if (!usedItems.has(id)) {
        node.dispatchEvent(new CustomEvent("disconnected"));
        existingItems.delete(id);
      }
    }
    parent.replaceChildren(...nodes);

    if (connected) {
      for (const id of newItems) {
        start(existingItems.get(id)!);
      }
    }
  };

  return [
    dom(parent),
    {
      changeItems: (op) => {
        switch (op[0]) {
          case "to": {
            updateItems(op[1]);
            return;
          }
          case "set": {
            update(op[1]);
            return;
          }
          case "del": {
            removeItem(op[1]);
            return;
          }
        }
      },
      updateItems,
    },
  ];
};
