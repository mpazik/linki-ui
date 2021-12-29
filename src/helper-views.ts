import type { Callback } from "linki";

import type { Attributes } from "./jsonml";
import type { View } from "./view";

export const numberInput: View<
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
            props.onChange!(+(event.target as HTMLInputElement).value);
          },
        }
      : {}),
  },
];
