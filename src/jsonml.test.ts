import type { DirtyJsonMl, JsonMl, Attributes, Tag } from "./jsonml";
import { mapDirtyJsonMl, mapJsonMl, normaliseJsonMl } from "./jsonml";

test("mapJsonMl", () => {
  const input: JsonMl = ["tag", { value: 5 }, ["tag2"]];
  const result = mapJsonMl(
    input,
    (it) => [it],
    ([tag, , kids]) => [tag, ...kids.flat()]
  );

  expect(result).toEqual(["tag", "tag2"]);
});

describe("normaliseJsonMl", () => {
  const check =
    (
      input: Parameters<typeof normaliseJsonMl>[0],
      expected: ReturnType<typeof normaliseJsonMl>
    ) =>
    () => {
      expect(normaliseJsonMl(input)).toEqual(expected);
    };

  test("empty node", check(["tag"], ["tag", {}, []]));
  test(
    "node with attribute",
    check(["tag", { attr: 5 }], ["tag", { attr: 5 }, []])
  );
  test("node with child", check(["tag", ["kid"]], ["tag", {}, [["kid"]]]));
  test(
    "node with attribiute and child",
    check(["tag", { attr: 5 }, ["kid"]], ["tag", { attr: 5 }, [["kid"]]])
  );
});

describe("mapDirtyJsonMl", () => {
  type MappedType = string[];
  const onString = (it: string): MappedType => ["s-" + it];
  const flattenKids = ([tag, , kids]: [
    Tag,
    Attributes,
    MappedType[]
  ]): MappedType => [tag, ...kids.flat()];
  const check = (input: DirtyJsonMl, expected: MappedType[]) => () => {
    expect(mapDirtyJsonMl(input, onString, flattenKids)).toEqual(expected);
  };

  test(
    "regular element",
    check(["tag", { value: 5 }, ["me"]], [["tag", "me"]])
  );
  test(
    "element with flat children",
    check(["tag", "text"], [["tag", "s-text"]])
  );
  test("undefined", check(undefined, []));
  test("string", check("text", [["s-text"]]));
  test("empty array", check([], []));
  test("array of elements", check([["tag1"], ["tag2"]], [["tag1"], ["tag2"]]));
  test(
    "undefined children",
    check(["tag", { value: 5 }, [], ["me"], undefined], [["tag", "me"]])
  );
});
