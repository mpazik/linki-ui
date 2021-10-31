import type { DirtyJsonMl, JsonMl } from "./jsonml";
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

test.each<
  [Parameters<typeof normaliseJsonMl>[0], ReturnType<typeof normaliseJsonMl>]
>([
  [["test"], ["test", {}, []]],
  [
    ["test", { attr: 5 }],
    ["test", { attr: 5 }, []],
  ],
  [
    ["test", ["kid"]],
    ["test", {}, [["kid"]]],
  ],
  [
    ["test", { attr: 5 }, ["kid"]],
    ["test", { attr: 5 }, [["kid"]]],
  ],
])("normaliseJsonMl", (input, result) => {
  expect(normaliseJsonMl(input)).toEqual(result);
});

describe("mapDirtyJsonMl", () => {
  const getResult = (input: DirtyJsonMl) =>
    mapDirtyJsonMl(
      input,
      (it) => [it],
      ([tag, , kids]) => [tag, ...kids.flat()]
    );

  test.each<[string, DirtyJsonMl, string[][]]>([
    ["regular element", ["test", { value: 5 }, ["me"]], [["test", "me"]]],
    ["undefined", undefined, []],
    ["empty array", [], []],
    ["array of elements", [["test"], ["test"]], [["test"], ["test"]]],
    [
      "undefined childrens",
      ["test", { value: 5 }, [], ["me"], undefined],
      [["test", "me"]],
    ],
  ])("handles %p", (name, input, result) => {
    expect(getResult(input)).toEqual(result);
  });
});
