import { newProbe } from "linki";

import type { JsonHtml } from "./jsonhtml";
import { dangerousHtml, div, dom, fragment } from "./jsonhtml";
import { renderJsonHtmlToDom } from "./render";

describe("renderToDom should render", () => {
  const check = (input: JsonHtml, result: string) => () => {
    const parent = document.createElement("div");
    parent.appendChild(renderJsonHtmlToDom(input));
    renderJsonHtmlToDom(undefined);
    expect(parent.innerHTML).toEqual(result);
  };

  test("simple element", check(div(), "<div></div>"));
  test("text", check("hello world", "hello world"));
  test("undefined", check(undefined, ""));
  test("empty array", check([], ""));
  test("element with text", check(div("text"), "<div>text</div>"));
  test("element with id", check(div({ id: "test" }), '<div id="test"></div>'));
  test(
    "element with attribute",
    check(div({ title: "test" }), '<div title="test"></div>')
  );
  test(
    "element with class",
    check(div({ class: "my-class" }), '<div class="my-class"></div>')
  );
  test(
    "element with undefined class",
    check(div({ class: undefined }), "<div></div>")
  );
  test(
    "element with two classes",
    check(
      div({ class: "my-class your-class" }),
      '<div class="my-class your-class"></div>'
    )
  );
  test(
    "element with duplicated class",
    check(div({ class: "my-class my-class" }), '<div class="my-class"></div>')
  );
  test(
    "element with children",
    check(div("parent", div("child")), "<div>parent<div>child</div></div>")
  );
  test(
    "array of elements",
    check([div("node"), div("sibling")], "<div>node</div><div>sibling</div>")
  );
  test(
    "array of elements of string is interpreted as tag and its children",
    check(["tag", "text", div("sibling")], "<tag>text<div>sibling</div></tag>")
  ); // it is not necessarily a desirable behaviour, the way only way to fix it would be change the node representation from array to an object or forbit passing arrays as an argument
  test(
    "array of strings can be rendered when wrapped with fragment",
    check(fragment("text1", "text2"), "text1text2")
  );
  test("array of single element", check([div("node")], "<div>node</div>"));
  test(
    "style",
    check(
      [div({ style: { width: "100px", left: "50px" } })],
      '<div style="width: 100px; left: 50px;"></div>'
    )
  );
  test(
    "element with boolean attribute",
    check(div({ hidden: true }), '<div hidden="hidden"></div>')
  );
  test(
    "element with boolean attribute set to false",
    check(div({ hidden: false }), "<div></div>")
  );
  test(
    "element with explicit boolean attribute",
    check(div({ draggable: true }), '<div draggable="true"></div>')
  );
  test(
    "element with explicit boolean attribute set to false",
    check(div({ draggable: false }), "<div></div>")
  );
  test("dom element", check(dom(document.createElement("div")), "<div></div>"));
  test(
    "html",
    check(dangerousHtml("<div>Test<p>Hi</p></div>"), "<div>Test<p>Hi</p></div>")
  );

  test(
    "element with custom data attributes",
    check(
      div({ dataSet: { id: "test", name: "something" } }),
      '<div data-id="test" data-name="something"></div>'
    )
  );

  test("event handler", () => {
    const [callback, getCalls] = newProbe<MouseEvent>();
    const result = renderJsonHtmlToDom(div({ onClick: callback }));
    (result as HTMLElement).click();
    expect(getCalls()).toHaveLength(1);
  });
});
