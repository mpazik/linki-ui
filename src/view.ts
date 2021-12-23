import type { JsonHtml } from "./jsonhtml";

export type View<T = void> = (props: T) => JsonHtml;
