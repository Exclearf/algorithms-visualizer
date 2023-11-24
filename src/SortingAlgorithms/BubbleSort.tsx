import { publish, subscribe } from "../Helpers/EventHelper.ts";
import { delay } from "../Helpers/VisualiztionHelper.ts";

async function bubbleSort(oldarr, setArr) {
  publish("sortingStarted", null);

  let arr = [...oldarr];
  let pauseSorting: boolean = false;
  let swapped: boolean = false;

  subscribe("pauseSorting", () => {
    pauseSorting = true;
    return arr;
  });

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j <= arr.length - i - 2; j++) {
      arr[j].isActive = true;
      arr[j + 1].isActive = true;

      setArr([...arr]);
      await delay(20);

      if (arr[j].id > arr[j + 1].id) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        arr[j].isSwapped = true;
        arr[j + 1].isSwapped = true;

        setArr([...arr]);
        await delay(20);

        arr[j].isSwapped = false;
        arr[j + 1].isSwapped = false;

        swapped = true;
      }

      arr[j].isActive = false;
      arr[j + 1].isActive = false;

      if (pauseSorting) {
        if (arr[j - 1]) {
          arr[j - 1].isActive = false;
        } else {
          if (arr[arr.length - i - 1]) arr[arr.length - i - 1].isActive = false;
          if (arr[arr.length - i]) arr[arr.length - i].isActive = false;
        }
        publish("sortingStopped", arr);
        setArr(arr);
        return;
      }
    }

    if (!swapped) {
      break;
    }
    if (i > arr.length - 1) {
      publish("sortingStopped", arr);
      return arr;
    }
  }
  publish("sortingEnded", arr);
  return arr;
}
export { bubbleSort };
