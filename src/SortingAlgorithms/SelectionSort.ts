import { publish, subscribe } from "../Helpers/EventHelper.ts";
import { delay } from "../Helpers/VisualizationHelper.ts";

async function selectionSort(oldArr, setArr) {
  publish("sortingStarted", null);
  let arr = [...oldArr];

  let pauseSorting: boolean = false;

  subscribe("pauseSorting", () => {
    pauseSorting = true;
  });

  for (let i = 0; i < arr.length; i++) {
    let minIndex: number = i;
    for (let j = i; j < arr.length; j++) {
      //* Pause sorting when pauseSorting is invoked.
      if (pauseSorting) {
        publish("sortingStopped", arr);
        setArr([...arr]);
        return arr;
      }

      if (arr[j]) if (arr[j].id < arr[minIndex].id) minIndex = j;

      arr[j].isActive = true;
      arr[minIndex].isActive = true;

      setArr([...arr]);
      await delay(10);

      arr[j].isActive = false;
      arr[minIndex].isActive = false;
    }

    //* Pause sorting when pauseSorting is invoked.
    if (pauseSorting) {
      publish("sortingStopped", arr);
      setArr([...arr]);
      return arr;
    }

    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

    arr[i].isSwapped = true;
    arr[minIndex].isSwapped = true;

    setArr([...arr]);
    await delay(10);

    arr[i].isSwapped = false;
    arr[minIndex].isSwapped = false;
  }
    setArr([...arr]);

    console.log("Sorting has ended.");
    if (!pauseSorting) {
      publish("sortingEnded", arr);
    }
  
  return arr;
}

export { selectionSort };
