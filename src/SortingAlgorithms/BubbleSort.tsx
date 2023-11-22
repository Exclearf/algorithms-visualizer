import { publish, subscribe } from "../Helpers/EventHelper.tsx";

async function bubbleSort(oldarr, setArr) {
  publish("sortingStarted", null);

  let arr = [...oldarr];

  let swapped = false;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j <= arr.length - i - 2; j++) {
      arr[j].isActive = true;
      arr[j + 1].isActive = true;

      if (arr[j].id > arr[j + 1].id) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }

      if (arr[j - 1]) {
        arr[j - 1].isActive = false;
      } else {
        arr[arr.length - i - 1].isActive = false;
        if (arr[arr.length - i]) arr[arr.length - i].isActive = false;
      }

      let callBack = () => {
        if (arr[j - 1]) {
          console.log("1212312313");
          arr[j - 1].isActive = false;
        } else {
          console.log("456745674567");
          if (arr[arr.length - i - 1]) arr[arr.length - i - 1].isActive = false;
          if (arr[arr.length - i]) arr[arr.length - i].isActive = false;
        }
        i = arr.length + 1;
        j = arr.length + 1;
      }

      if(!i && !j)
      subscribe("stopSort", callBack);

      setArr([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 20));
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
