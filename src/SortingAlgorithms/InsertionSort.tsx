import { publish, subscribe } from "../Helpers/EventHelper.tsx";
import { sleep } from "../Helpers/VisualiztionHelper.tsx";

async function insertionSort(oldArr, setArr) {
  publish("sortingStarted", null);

  let arr = [...oldArr];
  let pauseSorting: boolean = false;

  subscribe("pauseSorting", () => {
    pauseSorting = true;
  });

  // Insertion sorting algorithm implementation
  let n = arr.length;

  for (let i = 1; i < n; i++) {
    if (pauseSorting) break; // Check for pause
    arr[i].isActive = true;
    let key = arr[i];
    let j = i - 1;

    // Find the correct position for the key
    while (j >= 0 && arr[j].id > key.id) {
      arr[j].isActive = true;
      if (arr[j + 1] && j + 1 != i) arr[j + 1].isActive = false;

      j = j - 1;
      setArr([...arr]);
      await sleep(100);
    }

    arr.splice(j + 1, 0, key);
    arr.splice(i + 1, 1);
    if (j < i - 1) {
      arr[i].isSwapped = true;
      arr[j + 1].isSwapped = true;
    }
    if (arr[j + 2]) arr[j + 2].isActive = false;
    setArr([...arr]);
    await sleep(1000);

    //Reset styles
    arr[i].isSwapped = false;
    arr[j + 1].isSwapped = false;
    arr[i].isActive = false;
    arr[j + 1].isActive = false;
  }

  console.log("Sorting has ended.");
  publish("sortingEnded", arr);
  return arr;
}

export { insertionSort };
