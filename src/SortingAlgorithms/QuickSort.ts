import { publish, subscribe } from "../Helpers/EventHelper.ts";
import { delay } from "../Helpers/VisualizationHelper.ts";

async function quickSort(oldArr, setArr) {
  publish("sortingStarted", null);

  let arr = [...oldArr];
  let arrLength = arr.length;

  const pivotChooser = (arr) => {
    //Implementation of medium-of-three pivot pick scheme
    const pivotChooserArr = [arr[0], arr[Math.floor((arrLength - 1) / 2)] ,arr[arrLength - 1]]
    
    const pivot = pivotChooserArr.sort()[1]
    return pivot
  }

  

  return arr;
}
export { quickSort };