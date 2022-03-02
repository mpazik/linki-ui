import { combine, link, map, kick } from "linki";

import type { JsonHtml, View } from "../src";
import { createRenderer, div, dom, p } from "../src";
import { numberInput } from "../src/helper-views";

export default {};

const sumView: View<[number, number]> = ([a, b]) => p(`${a} + ${b} = ${a + b}`);

const calculatorView = (initA: number, initB: number): JsonHtml => {
  const sumElement = document.createElement("div");

  const [updateA, updateB] = link(
    combine(initA, initB),
    kick([initA, initB]),
    map(sumView),
    createRenderer(sumElement)
  );

  return div(
    numberInput({
      value: initA,
      onChange: (it) => updateA(it),
    }),
    numberInput({
      value: initB,
      onChange: (it) => updateB(it),
    }),
    dom(sumElement)
  );
};
export const Default = (): JsonHtml => calculatorView(1, 2);
