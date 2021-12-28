import { link, map } from "linki";

import type { ElementComponent, JsonHtml, View } from "..";
import { button, defineUiComponent, div, h3, span } from "..";

const supComponentView: View<string> = (param) =>
  div(h3("sub-component"), span(`Value: ${param}`));

const subComponent: ElementComponent<
  { param: string },
  { updateParam: string }
> = defineUiComponent((render, { param }) => {
  const renderValue = link(map(supComponentView), render);

  renderValue(param);
  return {
    updateParam: renderValue,
  };
});

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
  const [bottomSlot, { updateParam }] = subComponent({
    param: "custom param",
  });

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
