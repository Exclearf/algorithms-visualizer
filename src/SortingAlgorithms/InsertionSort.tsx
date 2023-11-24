import { publish, subscribe } from "../Helpers/EventHelper.tsx";

async function insertionSort(oldArr, setArr) {
  publish("sortingStarted", null);

  let arr = [...oldArr];
  let pauseSorting = false;

  for (let i = 1; i < arr.length; i++) {
    subscribe("pauseSorting", () => {
      pauseSorting = true;
    });

    if (pauseSorting) {
      pauseSorting = false; 
      i = arr.length - 1;
      continue;
    }

    const currentElement = arr[i];
    let j = i - 1;

    if (arr[i]) arr[i].isActive = true;

    for (j; j >= 0 && arr[j].id > currentElement.id; j--) {
      arr[j + 1] = arr[j];
      setArr([...arr]);
    }
    arr[j + 1] = currentElement;
    if (arr[j]) arr[j].isActive = false

    setArr([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 20));

    if (arr[j + 1]) {
      arr[j + 1].isActive = false;
    }

    arr.forEach((element) => {
      element.isActive = false;
    });
  }

  console.log("Sorting has ended.");
  publish("sortingEnded", arr);
  return arr;
}

export { insertionSort };

