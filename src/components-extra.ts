import type { NamedCallbacks } from "linki";

export type ComponentIO<T extends object | void> = T extends object
  ? NamedCallbacks<T>
  : void;

export type RelaxedComponent<
  I extends object | void = void,
  O extends object | void = void
> = (props: ComponentIO<O>) => ComponentIO<I>;
