import type { Meta } from "@storybook/html";

import { button } from "../jsonhtml";
import { renderJsonHtmlToDom } from "../render";
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

const createButton: View<ButtonProps> = ({
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

const setup =
  (props: Partial<ButtonProps>): (() => Node) =>
  () =>
    renderJsonHtmlToDom(
      createButton({
        primary: false,
        label: "Default name",
        onClick: () => console.log("default click"),
        ...props,
      })
    );

export default {
  title: "Example/Button",
} as Meta;

export const Primary = setup({
  primary: true,
  label: "Button",
  onClick: () => console.log("custom"),
});

export const Secondary = setup({
  label: "Button",
  primary: false,
});

export const Large = setup({
  label: "Button",
  size: "large",
});

export const Small = setup({
  label: "Button",
  size: "small",
});
