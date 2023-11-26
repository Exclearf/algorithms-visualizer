import { publish, subscribe } from "../Helpers/EventHelper.ts";
import { delay } from "../Helpers/VisualizationHelper.ts";

async function countingSort(oldArr, setArr) {
  publish("sortingStarted", null);

  let arr = [...oldArr];
  let pauseSorting: boolean = false;
  const countedItems: number[] = Array(arr.length).fill(0);

  subscribe("pauseSorting", () => {
    pauseSorting = true;
  });

  //* Count cardinality of set unique array items
  for (let i = 0; i < arr.length; i++) {
    countedItems[arr[i].id] += 1;
    arr[i].isActive = true;

    setArr([...arr]);
    await delay(20);

    arr[i].isActive = false;

    if (pauseSorting) {
      publish("sortingStopped", arr);
      setArr([...arr]);
      return arr;
    }
  }

  //* Accumulate the IDs
  for (let i = 1; i < arr.length; i++) {
    countedItems[i] += countedItems[i - 1];
  }

  let outArr: number[] = Array(arr.length).fill(0);

  /*
   * For each item in original array,
   * get its accumulated index (amount of items smaller basically)
   * and set its value at such index in outArr
   */
  for (let i = 0; i < countedItems.length; i++) {
    outArr[countedItems[arr[i].id] - 1] = arr[i];

    arr[i].isActive = true;

    setArr([...arr]);
    await delay(20);

    arr[i].isActive = false;

    if (pauseSorting) {
      publish("sortingStopped", arr);
      setArr([...arr]);
      return arr;
    }
  }

  //* Just update original array in a fancy way :)
  for (let i = 0; i < outArr.length; i++) {
    arr[i] = outArr[i];

    setArr([...arr]);
    await delay(20);

    if (pauseSorting) {
      publish("sortingStopped", arr);
      setArr([...arr]);
      return arr;
    }
  }

  console.log("Sorting has ended.");

  if (!pauseSorting) {
    publish("sortingEnded", arr);
  }

  return arr;
}

export { countingSort };
