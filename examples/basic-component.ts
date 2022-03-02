import { kick, link, map } from "linki";

import type { ElementComponent, JsonHtml, View } from "..";
import { button, div, h3, span } from "..";
import type { UiComponent } from "../src";
import { mountComponent } from "../src";

const supComponentView: View<string> = (param) =>
  div(h3("sub-component"), span(`Value: ${param}`));

const subComponent: UiComponent<{ updateParam: string }> = ({ render }) => {
  const renderValue = link(
    kick("Initial value"),
    map(supComponentView),
    render
  );

  return {
    updateParam: renderValue,
  };
};

const mainView: View<{
  init: string;
  bottomSlot: JsonHtml;
  onClick: () => void;
}> = ({ onClick, bottomSlot }) =>
  div(
    {
      id: "main",
    },
    button({ onClick: onClick }, "test"),
    bottomSlot
  );

const main: ElementComponent = () => {
  const [bottomSlot, { updateParam }] = mountComponent(subComponent);

  return [
    mainView({
      init: "test",
      bottomSlot,
      onClick: () => updateParam("clicked at " + new Date().toISOString()),
    }),
    {},
  ];
};

const [mainRoot] = main();

export default {};
export const Default = (): JsonHtml => mainRoot;
