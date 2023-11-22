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
      pauseSorting = false; // Reset the flag
      i = arr.length - 1; // Stop the loop after the current iteration
      continue;
    }

    const currentElement = arr[i];
    let j = i - 1;

    arr.forEach((element) => {
      element.isActive = false;
    });

    if (arr[i]) arr[i].isActive = true;

    for (j = i - 1; j >= 0 && arr[j].id > currentElement.id; j--) {
      if(arr[j+1])
      arr[j+1].isActive = true;
      if(arr[j])
        arr[j].isActive = false;
      arr[j + 1] = arr[j];
      setArr([...arr]);

    }

    arr[j + 1] = currentElement;
    if (arr[j + 1]) arr[j + 1].isActive = false; // Reset isActive for the element being placed in its sorted position

    setArr([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (arr[j + 1]) {
      arr[j + 1].isActive = false; // Reset isActive after the update
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

// const insertionSort = (
//   arr,
//   setArrayHandler,
// ) => {
//   let newArr = [...arr];
//   let currentIndex = 1;

//   subscribe("stopSort", () => {
//     if (intervalId) {
//       clearInterval(intervalId);
//     }
//   });

//   const intervalId = setInterval(() => {
//     const currentElement = newArr[currentIndex];
//     let j = currentIndex - 1;

//     if (newArr[currentIndex]) newArr[currentIndex].isActive = false;

//     newArr.forEach((element) => {
//       element.isActive = false;
//     });

//     newArr[j].isActive = true;
//     newArr[currentIndex].isActive = true;

//     while (j >= 0 && parseInt(newArr[j].id) > parseInt(currentElement.id)) {
//       newArr[j + 1] = newArr[j];
//       j--;
//       setArrayHandler([...newArr]);
//     }

//     newArr[j + 1] = currentElement;
//     setArrayHandler([...newArr]);

//     currentIndex++;

//     if (currentIndex >= newArr.length) {
//       clearInterval(intervalId);
//       console.log(j + 1);

//       if (newArr[j + 1]) newArr[j + 1].isActive = false;

//       if (newArr[newArr.length - 1]) newArr[newArr.length - 1].isActive = false;

//       setArrayHandler([...newArr]);

//       let currentSortedIndex = 0;

//       subscribe("stopSort", () => {
//         if (sortedIntervalId) {
//           clearInterval(sortedIntervalId);
//         }
//       });

//       const sortedIntervalId = setInterval(() => {
//         if (newArr[currentSortedIndex + 1]) {
//           newArr[currentSortedIndex].isSorted = true;
//           newArr[currentSortedIndex + 1].isActive = true;
//           currentSortedIndex++;
//           setArrayHandler([...newArr]);
//         } else {
//           newArr[currentSortedIndex].isSorted = true;
//           setArrayHandler([...newArr]);
//           clearInterval(sortedIntervalId);
//         }
//       }, 1);
//     }
//   }, 100);
// };

// export { insertionSort };
