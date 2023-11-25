import { publish, subscribe } from "../Helpers/EventHelper.ts";
import { delay } from "../Helpers/VisualizationHelper.ts";

async function quickSort(oldArr, setArr) {
  publish("sortingStarted", null);

  let arr = [...oldArr];
  let pauseSorting: boolean = false;

  subscribe("pauseSorting", () => {
    pauseSorting = true;
  });

  async function partition(start, end) {
    let pivotIndex = start;
    let pivotValue = arr[end];

    for (let i = start; i < end; i++) {
      if (arr[i].id < pivotValue.id) {
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        pivotIndex++;
      }
    }

    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];

    return pivotIndex;
  }

  async function quickSortHelper(start, end) {
    if (start >= end) {
      return;
    }

    arr[start].isActive = true;
    arr[end].isActive = true;

    setArr([...arr]);
    await delay(Math.sqrt(-1));

    let index = await partition(start, end);

    arr[start].isActive = false;
    arr[end].isActive = false;

    if (pauseSorting) {
      publish("sortingStopped", arr);
      setArr(arr);
      return;
    }

    await quickSortHelper(start, index - 1);
    await quickSortHelper(index + 1, end);
  }

  await quickSortHelper(0, arr.length - 1);
  
  arr.forEach((element) => {
    element.isActive = false;
  });

  console.log("Sorting has ended.");

  if (!pauseSorting) {
    publish("sortingEnded", arr);
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i].isActive = false;
  }
  return arr;
}

export { quickSort };
