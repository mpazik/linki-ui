import type { JsonHtml } from "./jsonhtml";

export type View<T = void> = (props: T) => JsonHtml;

export const setupView =
  <T extends Record<string, unknown>, S extends keyof T>(
    view: View<T>,
    initProps: Pick<T, S>
  ): View<Omit<T, S>> =>
  (props) =>
    view({ ...initProps, ...props } as T);
