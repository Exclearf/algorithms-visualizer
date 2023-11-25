import { publish, subscribe } from "../Helpers/EventHelper.ts";
import { delay } from "../Helpers/VisualizationHelper.ts";

async function insertionSort(oldArr, setArr) {
  publish("sortingStarted", null);

  let arr = [...oldArr];
  let pauseSorting: boolean = false;

  subscribe("pauseSorting", () => {
    pauseSorting = true;
  });

  //!Insertion sorting algorithm implementation
  let n = arr.length;

  for (let i = 1; i < n; i++) {
    arr[i].isActive = true;
    let key = arr[i];
    let j = i - 1;

    const resetStylesForCurrentIteration = () => {
      if (arr[i]) {
        arr[i].isActive = false;
        arr[i].isSwapped = false;
      }
      if (arr[j + 1]) {
        arr[j + 1].isSwapped = false;
        arr[i].isActive = false;
        arr[j + 1].isActive = false;
      }
      if (arr[i]) arr[i].isActive = false;
    }

    //* Find the correct position for the key
    while (j >= 0 && arr[j].id > key.id) {
      arr[j].isActive = true;
      if (arr[j + 1] && j + 1 != i) arr[j + 1].isActive = false;

      j = j - 1;
      setArr([...arr]);
      await delay(20);

      //* PauseSorting event invoked
      if (pauseSorting) {
        publish("sortingStopped", arr);
        resetStylesForCurrentIteration();
        setArr(arr);
        return;
      }
    }

    //* PauseSorting event invoked
    if (pauseSorting) {
      publish("sortingStopped", arr);
      resetStylesForCurrentIteration();
      setArr(arr);
      return;
    }

    arr.splice(j + 1, 0, key);
    arr.splice(i + 1, 1);
    if (j < i - 1) {
      arr[i].isSwapped = true;
      arr[j + 1].isSwapped = true;
    }
    if (arr[j + 2]) arr[j + 2].isActive = false;
    setArr([...arr]);
    await delay(20);

    //*Reset styles
    arr[i].isSwapped = false;
    arr[j + 1].isSwapped = false;
    arr[i].isActive = false;
    arr[j + 1].isActive = false;
  }

  console.log("Sorting has ended.");
  if (!pauseSorting) {
    publish("sortingEnded", arr);
  }
  return arr;
}

export { insertionSort };
