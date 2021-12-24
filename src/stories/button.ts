import type { JsonHtml } from "../jsonhtml";
import { button } from "../jsonhtml";
import type { View } from "../view";

export interface ButtonProps {
  primary?: boolean;
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
}

const fontSizeMap = {
  small: "12px",
  medium: "16px",
  large: "24px",
};

const myButton: View<ButtonProps> = ({
  primary = false,
  size = "medium",
  label,
  onClick,
}) =>
  button(
    {
      style: {
        backgroundColor: primary ? "red" : "white",
        fontSize: fontSizeMap[size],
      },
      type: "button",
      onClick: onClick ? () => onClick() : undefined,
    },
    label
  );

export default {};

export const primary = (): JsonHtml =>
  myButton({
    primary: true,
    label: "Button",
    onClick: () => console.log("custom"),
  });

export const secondary = (): JsonHtml =>
  myButton({
    label: "Button",
    primary: false,
  });

export const large = (): JsonHtml =>
  myButton({
    label: "Button",
    size: "large",
  });

export const small = (): JsonHtml =>
  myButton({
    label: "Button",
    size: "small",
  });
