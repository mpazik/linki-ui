export type Tag = string;
export type Attributes = Record<string, unknown>;

export type JsonMl =
  | [Tag, Attributes, ...JsonMl[]]
  | [Tag, ...JsonMl[]]
  | string;

type Props = [Attributes, ...JsonMl[]] | [...JsonMl[]];

export const normaliseJsonMl = (
  jsonMl: [Tag, ...Props]
): [Tag, Attributes, JsonMl[]] => {
  const [tag, ...props] = jsonMl as [Tag, ...Props];

  if (props.length === 0) {
    return [tag, {}, []];
  }

  let attrs: Attributes = {};
  if (typeof props[0] === "object" && !Array.isArray(props[0])) {
    attrs = props.shift() as Attributes;
  }
  const children = props as JsonMl[];
  return [tag, attrs, children];
};

export const mapJsonMl = <T>(
  jsonMl: JsonMl,
  onString: (v: string) => T,
  onNode: (a: [Tag, Attributes, T[]]) => T
): T => {
  if (typeof jsonMl === "string") {
    return onString(jsonMl);
  }

  const [tag, attrs, children] = normaliseJsonMl(jsonMl);
  return onNode([
    tag,
    attrs,
    children.map((it: JsonMl): T => mapJsonMl(it, onString, onNode)),
  ]);
};

export type DirtyJsonMl =
  | [Tag, Attributes, ...DirtyJsonMl[]]
  | [Tag, ...DirtyJsonMl[]]
  | DirtyJsonMl[]
  | undefined
  | string;

export const mapDirtyJsonMl = <T>(
  jsonMl: DirtyJsonMl,
  onString: (v: string) => T,
  onNode: (a: [Tag, Attributes, T[]]) => T
): T[] => {
  if (jsonMl === undefined) {
    return [];
  }
  if (typeof jsonMl === "string") {
    return [onString(jsonMl)];
  }
  if (jsonMl.length === 0 || typeof jsonMl[0] !== "string") {
    return (jsonMl as DirtyJsonMl[])
      .map((it) => mapDirtyJsonMl(it, onString, onNode))
      .flat();
  }

  const [tag, attrs, children] = normaliseJsonMl(
    jsonMl as [Tag, Attributes, ...JsonMl[]] | [Tag, ...JsonMl[]]
  );
  return [
    onNode([
      tag,
      attrs,
      children.map((it) => mapDirtyJsonMl(it, onString, onNode)).flat(),
    ]),
  ];
};
