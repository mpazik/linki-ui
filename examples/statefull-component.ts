import { combine, link } from "linki";
import { withKick } from "linki-experimental/dist/kick";

import type { JsonHtml } from "../src";
import { dom, createViewRenderer, p } from "../src";
import { numberInput } from "../src/helper-views";

export default {};
const summaryView = (initA: number, initB: number): JsonHtml => {
  const [sumRoot, renderSum] = createViewRenderer(([a, b]: [number, number]) =>
    p(`${a} + ${b} = ${a + b}`)
  );

  const [updateA, updateB] = link(
    withKick((args) => combine(...args), [initA, initB]),
    renderSum
  );

  return [
    numberInput({
      value: initA,
      onChange: (it) => updateA(it),
    }),
    numberInput({
      value: initB,
      onChange: (it) => updateB(it),
    }),
    dom(sumRoot),
  ];
};
export const Default = (): JsonHtml => summaryView(1, 2);
