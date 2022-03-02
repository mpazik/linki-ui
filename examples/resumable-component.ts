import type { Callback, ClosableProvider, Close } from "linki";
import { count, link, map, pipe, reduce, wrap, kick } from "linki";

import type { JsonHtml, UiComponent, View } from "../src";
import { button, div, span, setupView, mountComponent } from "../src";

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

const timer =
  (init: number): UiComponent<{ restart: number }> =>
  ({ render }) => {
    let stopProvider: Close | undefined;

    const startTimer = (seconds: number) => {
      if (stopProvider) {
        stopProvider();
        stopProvider = undefined;
      }
      stopProvider = periodicProvider(seconds)((n) => render(timerView({ n })));
    };

    return {
      start: () => startTimer(init),
      stop: () => {
        if (stopProvider) {
          stopProvider();
          stopProvider = undefined;
        }
      },
      restart: startTimer,
    };
  };

const mainView: View<{
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

const main: UiComponent = ({ render }) => {
  const initNumber = 10;

  const [timerRoot, { restart: startTimer }] = mountComponent(timer(3));

  const setupMainView: View<{ num: number }> = setupView(mainView, {
    bottomSlot: timerRoot,
    onClick: () => increaseState(),
    onClickTrigger: () => startTimer(Math.floor(Math.random() * 10)),
  });

  const increaseState: Callback = link(
    reduce(count, initNumber),
    kick(initNumber),
    map(pipe(wrap("num")), setupMainView),
    render
  );
};

export default {};
export const Default = (): JsonHtml => {
  const [root] = mountComponent(main);
  return root;
};
