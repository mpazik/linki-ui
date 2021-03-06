import type { JsonHtml } from "./jsonhtml";
import { mapJsonHtml } from "./jsonhtml";
import type { Attributes } from "./jsonml";

const explicitBooleanAttributes = ["contenteditable", "draggable"];

export const classList = (classes: Record<string, boolean>): string =>
  Object.keys(classes)
    .reduce((selectedClsses, className) => {
      if (classes[className]) {
        selectedClsses.push(className);
      }
      return selectedClsses;
    }, [] as string[])
    .join(" ");

const renderNode = (tag: string, attrs: Attributes, children: Node[]): Node => {
  if (tag === "dom") {
    return attrs["element"] as Node;
  } else if (tag === "fragment") {
    const fragment = document.createDocumentFragment();
    children.forEach((child) => fragment.appendChild(child));
    return fragment;
  }
  const is = attrs["is"] as string;
  const node = document.createElement(tag, is ? { is } : undefined);

  for (const attrKey of Object.keys(attrs)) {
    const attrVal = attrs[attrKey];
    if (attrVal === undefined) {
      continue; // ignore undefined attributes
    }
    if (attrKey === "id") {
      node.id = attrVal as unknown as string;
    } else if (attrKey === "class") {
      for (const cls of (attrVal as unknown as string).split(" ")) {
        if (cls !== "") node.classList.add(cls);
      }
    } else if (typeof attrVal === "function") {
      const type = attrKey.substr(2).toLowerCase();
      const listener = attrVal as unknown as (event: Event) => void;
      node.addEventListener(type, (e: Event) => listener(e));
    } else if (attrKey === "style") {
      const styles: CSSStyleDeclaration =
        attrVal as unknown as CSSStyleDeclaration;
      for (const styleKey of Object.keys(styles)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        node.style[styleKey] = styles[styleKey as keyof CSSStyleDeclaration];
      }
    } else if (attrKey === "dataSet") {
      const data: DOMStringMap = attrVal as DOMStringMap;
      for (const key of Object.keys(data)) {
        const value = data[key];
        if (value !== undefined) {
          node.setAttribute("data-" + key, value);
        }
      }
    } else if (typeof attrVal === "boolean") {
      if (attrVal) {
        if (explicitBooleanAttributes.includes(attrKey)) {
          node.setAttribute(attrKey, "true");
        } else {
          node.setAttribute(attrKey, attrKey);
        }
      } else {
        node.removeAttribute(attrKey);
      }
    } else {
      node.setAttribute(attrKey, attrVal as unknown as string);
    }
  }

  children.forEach((child) => node.appendChild(child));

  return node;
};

export const renderJsonHtmlToDom = (elem: JsonHtml): Node => {
  const nodes = mapJsonHtml<Node>(
    elem,
    (string) => document.createTextNode(string),
    ([tag, attrs, children]) => renderNode(tag, attrs, children)
  );
  if (nodes.length === 0) {
    return document.createDocumentFragment();
  } else if (nodes.length === 1) {
    return nodes[0];
  }
  const fragment = document.createDocumentFragment();
  nodes.forEach((it) => fragment.appendChild(it));
  return fragment;
};
