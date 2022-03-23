import { link, map, pipe } from "linki";

export const getTarget = (event: Event): HTMLElement =>
  event.target as HTMLElement;

export const getTargetInput = (event: Event): HTMLInputElement =>
  event.target as HTMLInputElement;

export const inputValue = (input: HTMLInputElement): string => input.value;
export const inputChecked = (input: HTMLInputElement): boolean => input.checked;

export const focusElement = (element: HTMLElement): void => element.focus();

export const selectInput = (input: HTMLInputElement): void =>
  input.setSelectionRange(0, input.value.length);

export const selectTargetInput = link(map(getTargetInput), selectInput);

export const resetInput = (input: HTMLInputElement): void => {
  input.value = "";
};

export const resetTargetInput = link(map(getTargetInput), resetInput);

export const getTargetInputValue = pipe(getTargetInput, inputValue);
export const isTargetInputChecked = pipe(getTargetInput, inputChecked);

export const preventDefault = (event: Event): void => event.preventDefault();

export const trim = (text: string): string => text.trim();

export const getKey = (event: KeyboardEvent): string => event.key;
export const isKey =
  (key: string) =>
  (event: KeyboardEvent): boolean =>
    getKey(event) === key;

export const getKeyCode = (event: KeyboardEvent): string => event.code;
export const isKeyCode =
  (code: string) =>
  (event: KeyboardEvent): boolean =>
    getKeyCode(event) === code;

export const hasMetaKey = (event: KeyboardEvent): boolean => event.metaKey;

export const hasCtrlKey = (event: KeyboardEvent): boolean => event.ctrlKey;

export const hasNoKeyModifier = (event: KeyboardEvent): boolean =>
  !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey;
