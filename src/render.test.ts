import type { JsonHtml } from "./jsonhtml";
import { dangerousHtml, div, dom } from "./jsonhtml";
import { renderJsonHtmlToDom } from "./render";

test.each<[string, JsonHtml, string]>([
  ["simple element", div(), "<div></div>"],
  ["undefined", undefined, ""],
  ["empty array", [], ""],
  ["element with text", div("text"), "<div>text</div>"],
  ["element with id", div({ id: "test" }), '<div id="test"></div>'],
  [
    "element with attribute",
    div({ title: "test" }),
    '<div title="test"></div>',
  ],
  [
    "element with class",
    div({ class: "my-class" }),
    '<div class="my-class"></div>',
  ],
  [
    "element with two classes",
    div({ class: "my-class your-class" }),
    '<div class="my-class your-class"></div>',
  ],
  [
    "element with duplicated class",
    div({ class: "my-class my-class" }),
    '<div class="my-class"></div>',
  ],
  [
    "element with children",
    div("parent", div("child")),
    "<div>parent<div>child</div></div>",
  ],
  [
    "array of elements",
    [div("node"), div("sibling")],
    "<div>node</div><div>sibling</div>",
  ],
  ["unwrapped single element", [div("node")], "<div>node</div>"],
  [
    "style",
    [div({ style: { width: "100px", left: "50px" } })],
    '<div style="width: 100px; left: 50px;"></div>',
  ],
  [
    "element with boolean attribute",
    [div({ hidden: true })],
    '<div hidden="hidden"></div>',
  ],
  [
    "element with boolean attribute set to false",
    [div({ hidden: false })],
    "<div></div>",
  ],
  [
    "element with explicit boolean attribute",
    [div({ draggable: true })],
    '<div draggable="true"></div>',
  ],
  [
    "element with explicit boolean attribute set to false",
    [div({ draggable: false })],
    "<div></div>",
  ],
  ["dom element", [dom(document.createElement("div"))], "<div></div>"],
  [
    "html",
    [dangerousHtml("<div>Test<p>Hi</p></div>")],
    "<div>Test<p>Hi</p></div>",
  ],
])(`renderToDom should render %p`, (name, input, result) => {
  const parent = document.createElement("div");
  parent.appendChild(renderJsonHtmlToDom(input));
  expect(parent.innerHTML).toEqual(result);
});

test('renderToDom should render "event handler"', () => {
  const callback = jest.fn();

  const result = renderJsonHtmlToDom(div({ onClick: callback }));
  (result as HTMLElement).click();
  expect(callback.mock.calls.length).toEqual(1);
});
