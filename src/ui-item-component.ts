import type { Callback, NamedCallbacks } from "linki";
import { isEqual } from "linki";

import type { ComponentIO } from "./components-extra";
import type { JsonHtml, JsonHtmlNode } from "./jsonhtml";
import { dom } from "./jsonhtml";
import { componentClassName, createComponentRenderer } from "./ui-component";

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

export const mountItemComponent = <ID, T, I extends object, O extends object>(
  getId: (item: T) => ID,
  itemComponent: UiItemComponent<T, I, O>,
  props: NamedItemCallbacks<ID, O>
): [JsonHtmlNode, ComponentIO<{ updateItems: T[] }>] => {
  const existingItems = new Map<
    ID,
    {
      node: Node;
      last: T;
      updateItem: Callback<T>;
    }
  >();
  let connected = false;

  const parent = document.createElement("div");
  parent.classList.add(componentClassName);
  parent.addEventListener("disconnected", () => {
    for (const [, { node }] of existingItems) {
      node.dispatchEvent(new CustomEvent("disconnected"));
    }
    connected = false;
  });
  parent.addEventListener("connected", () => {
    connected = true;
    for (const [, { node, updateItem, last }] of existingItems) {
      node.dispatchEvent(new CustomEvent("connected"));
      updateItem(last);
    }
  });

  return [
    dom(parent),
    {
      updateItems: (items: T[]) => {
        const nodes: Node[] = [];
        const usedItems = new Set<ID>();
        const newItems = new Set<ID>();

        for (const item of items) {
          const id = getId(item);
          usedItems.add(id);
          const existing = existingItems.get(id);
          if (existing) {
            if (!isEqual(item)(existing.last)) {
              existing.updateItem(item);
              existing.last = item;
            }
            nodes.push(existing.node);
          } else {
            const node = document.createElement("div");
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

            newItems.add(id);
            existingItems.set(id, {
              last: item,
              node,
              updateItem: updateItem as Callback<T>,
            });
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
            const { node, updateItem, last } = existingItems.get(id)!;
            node.dispatchEvent(new CustomEvent("connected"));
            updateItem(last);
          }
        }
      },
    },
  ];
};
