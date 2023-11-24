import { publish, subscribe } from "../Helpers/EventHelper.tsx";
import { delay } from "../Helpers/VisualiztionHelper.tsx";

async function bubbleSort(oldarr, setArr) {
  publish("sortingStarted", null);

  let arr = [...oldarr];

  let swapped = false;
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

      let callBack = () => {
        if (arr[j - 1]) {
          arr[j - 1].isActive = false;
        } else {
          if (arr[arr.length - i - 1]) arr[arr.length - i - 1].isActive = false;
          if (arr[arr.length - i]) arr[arr.length - i].isActive = false;
        }
        i = arr.length + 1;
        j = arr.length + 1;
      };

      if (!i && !j) subscribe("stopSort", callBack);
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
