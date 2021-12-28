import type { Callback, ClosableProvider, Close } from "linki";
import { count, link, map, pipe, reduce, wrap } from "linki";
import { withKick } from "linki-experimental/dist/kick";

import type { ElementComponent, JsonHtml, View } from "../src";
import { button, defineUiComponent, div, span, setupView } from "../src";

const periodicProvider =
  (start: number): ClosableProvider<number> =>
  (push) => {
    console.log(`periodic provider started on: ${start}`);

    let secondsTotal = start;
    const interval = setInterval(async () => {
      secondsTotal += 1;
      console.log(`count: ${secondsTotal}`);
      push(secondsTotal);
    }, 1000);

    push(secondsTotal);

    return () => {
      clearInterval(interval);
      console.log("periodic provider aborted");
    };
  };

const timerView: View<{ n: number }> = ({ n }) => {
  return div(`time:${n}`);
};

const timer: ElementComponent<{ init: number }, { restart: number }> =
  defineUiComponent((render, { init }) => {
    let stopProvider: Close | undefined;

    const startTimer = (seconds: number) => {
      if (stopProvider) {
        stopProvider();
        stopProvider = undefined;
      }
      stopProvider = periodicProvider(seconds)((n) => render(timerView({ n })));
    };

    return {
      mounted: () => startTimer(init),
      willUnmount: () => {
        if (stopProvider) {
          stopProvider();
          stopProvider = undefined;
        }
      },
      restart: startTimer,
    };
  });

const mainView: View<{
  init: string;
  bottomSlot: JsonHtml;
  onClick: () => void;
  onClickTrigger: () => void;
  num: number;
}> = ({ num, onClick, onClickTrigger, bottomSlot }) =>
  div(
    {
      id: "main",
    },
    span(`number: ${num}`),
    button({ onClick: onClick }, "test"),
    button({ onClick: onClickTrigger }, "trigger"),
    ...(num % 2 === 0 ? [bottomSlot] : [])
  );

const main = defineUiComponent((render) => {
  const initNumber = 10;

  const [timerRoot, { restart: startTimer }] = timer({ init: 3 });
  const setupMainView: View<{ num: number }> = setupView(mainView, {
    init: "test",
    bottomSlot: timerRoot,
    onClick: () => increaseState(),
    onClickTrigger: () => startTimer(Math.floor(Math.random() * 10)),
  });

  const increaseState: Callback = link(
    withKick((init) => reduce(count, init), initNumber),
    map(pipe(wrap("num")), setupMainView),
    render
  );
});

export default {};
export const Default = (): JsonHtml => {
  const [root] = main();
  return root;
};
