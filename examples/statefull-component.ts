import type { Callback, Processor } from "linki";
import { combine, link, map } from "linki";

import type { JsonHtml, View } from "../src";
import { defineUiComponent, p } from "../src";
import type { Attributes } from "../src/jsonml";

const numberInput: View<
  Attributes["input"] & {
    value?: number | undefined;
    onChange?: Callback<number> | undefined;
    max?: number | undefined;
    min?: number | undefined;
  }
> = (props) => [
  "input",
  {
    ...props,
    type: "number",
    ...(props.value ? { value: props.value.toString() } : {}),
    ...(props.min ? { min: props.min.toString() } : {}),
    ...(props.max ? { value: props.max.toString() } : {}),
    ...(props.onChange
      ? {
          onChange: (event: Event) => {
            props.onChange(+(event.target as HTMLInputElement).value);
          },
        }
      : {}),
  },
];

const kick =
  <C>(initState: C): Processor<C, C> =>
  (callback) => {
    callback(initState);
    return callback;
  };

const sumComponent = defineUiComponent<
  { initA: number; initB: number },
  { updateA: number; updateB: number }
>((render, { initA, initB }) => {
  const [updateA, updateB] = link(
    combine(initA, initB),
    kick([initA, initB]),
    map(([a, b]) => p(`${a} + ${b} = ${a + b}`)),
    render
  );

  return {
    updateA,
    updateB,
  };
});

export default {};
const summaryView = (initA: number, initB: number): JsonHtml => {
  const [sum, { updateA, updateB }] = sumComponent({ initA, initB });
  return [
    numberInput({
      value: initA,
      onChange: (it) => updateA(it),
    }),
    numberInput({
      value: initB,
      onChange: (it) => updateB(it),
    }),
    sum,
  ];
};
export const Default = (): JsonHtml => summaryView(1, 2);
