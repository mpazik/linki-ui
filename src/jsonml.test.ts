import type { DirtyJsonMl, JsonMl, Attributes, Tag } from "./jsonml";
import { mapDirtyJsonMl, mapJsonMl, normaliseJsonMl } from "./jsonml";

test("mapJsonMl", () => {
  const input: JsonMl = ["test", { value: 5 }, ["me"]];
  const result = mapJsonMl(
    input,
    (it) => [it],
    ([tag, , kids]) => [tag, ...kids.flat()]
  );

  expect(result).toEqual(["test", "me"]);
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

  test("empty node", check(["test"], ["test", {}, []]));
  test(
    "node with attribute",
    check(["test", { attr: 5 }], ["test", { attr: 5 }, []])
  );
  test("node with child", check(["test", ["kid"]], ["test", {}, [["kid"]]]));
  test(
    "node with attribiute and child",
    check(["test", { attr: 5 }, ["kid"]], ["test", { attr: 5 }, [["kid"]]])
  );
});

describe("mapDirtyJsonMl", () => {
  type MappedType = string[];
  const onString = (it: string): MappedType => [it];
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
    check(["test", { value: 5 }, ["me"]], [["test", "me"]])
  );
  test("undefined", check(undefined, []));
  test("empty array", check([], []));
  test("array of elements", check([["test"], ["test"]], [["test"], ["test"]]));
  test(
    "undefined children",
    check(["test", { value: 5 }, [], ["me"], undefined], [["test", "me"]])
  );
});
