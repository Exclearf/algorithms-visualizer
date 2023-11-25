import { publish, subscribe } from "../Helpers/EventHelper.ts";
import { delay } from "../Helpers/VisualizationHelper.ts";

async function mergeSort(arr, setArr) {
  publish("sortingStarted", null);

  let pauseSorting: boolean = false;

  subscribe("pauseSorting", () => {
    pauseSorting = true;
  });

  async function merge(left, right, origStart, origEnd) {
    let sortedArr: any = [];
    while (left.length && right.length) {
      
      //* If sortingStopped event invoked
      if (pauseSorting) {
        publish("sortingStopped", arr);
        setArr(arr);
        return arr;
      }

      if (left[0]) {
        left[0].isActive = true;
      }

      if (right[0]) {
        right[0].isActive = true;
      }
      if (left[0].id < right[0].id) {
        sortedArr.push(left.shift());
      } else {
        sortedArr.push(right.shift());
      }

      //* Update the visualization for each step
      setArr([...arr]);
      await delay(20);

      if (sortedArr[sortedArr.length - 1]) {
        sortedArr[sortedArr.length - 1].isActive = false;
      }

      if (left[0]) {
        left[0].isActive = false;
      }
      if (right[0]) {
        right[0].isActive = false;
      }
    }

    //* Handle remaining items
    let newArr = [...sortedArr, ...left, ...right];
    for (let i = origStart, j = 0; i <= origEnd; i++, j++) {
      arr[i] = newArr[j];
    }

    //* Update the visualization after merging
    setArr([...arr]);
    await delay(20);

    return newArr;
  }

  async function mergeSortHelper(start, end) {
    if (start < end) {
      let mid = Math.floor((start + end) / 2);
      await mergeSortHelper(start, mid);
      await mergeSortHelper(mid + 1, end);
      let left = arr.slice(start, mid + 1);
      let right = arr.slice(mid + 1, end + 1);
      await merge(left, right, start, end);
    }
  }

  await mergeSortHelper(0, arr.length - 1);

  console.log("Sorting has ended.");
  if (!pauseSorting) {
    publish("sortingEnded", arr);
  }
  return arr;
}

export { mergeSort };
