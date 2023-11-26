import React, { useEffect, useState } from "react";

import { generateArray, shuffleArray } from "./Helpers/ArrayHelper.ts";
import { publish, subscribe } from "./Helpers/EventHelper.ts";
import { InitializeRangeWheel } from "./Helpers/RangeWheelHelper.ts";
import {
  bubbleSort,
  insertionSort,
  quickSort,
  mergeSort,
  selectionSort,
  countingSort,
} from "./SortingAlgorithms/AlgorithmsImport.ts";

import "./App.css";
import "./Styles/ArrayItems.css";
import "./Styles/Select.css";
import "./Styles/Button.css";
import "./Styles/RangeWheel.css";

import configData from "./config.json";

import Header from "./Components/HeaderComponents/Header.tsx";
import Body from "./Components/BodyComponents/Body.tsx";

function App() {
  const [arrLength, setArrLength] = useState(
    Math.floor(configData.MAX_ARRAY_LENGTH / 2)
  );
  const [arr, setArr] = useState(shuffleArray(generateArray(arrLength)));
  const [selectedSort, setSelectedSort] = useState("bubbleSort");
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [buttonText, setButtonText] = useState("SORT");

  useEffect(() => {
    setArr(shuffleArray(generateArray(arrLength)));
  }, [arrLength]);

  //* Initialize the app
  useEffect(() => {
    //* Initialize the range input
    //! REWRITE WITH REDUX
    InitializeRangeWheel(setArrLength, setIsSorting);

    //* Subscribe to events
    subscribe("stopSort", () => {
      publish("pauseSorting", null);
    });

    subscribe("sortingStopped", async () => {
      setIsSorting(false);

      //? Is it needed?
      //setIsSorted(true);

      changeText("SORT");
    });

    subscribe("sortingEnded", async (event) => {
      /*
       * Well-known green thingy :)
       * Post sort algorithm to alternately set isSorted and isActive on each item.
       */
      let newArr = [...event.detail];

      for (let i = 1; i < newArr.length; i++) {
        newArr[i - 1].isSorted = true;
        newArr[i - 1].isActive = false;

        newArr[i].isActive = true;

        setArr([...newArr]);
        await new Promise((resolve) => setTimeout(resolve, 20));
      }

      newArr[newArr.length - 1].isSorted = true;
      newArr[newArr.length - 1].isActive = false;

      setArr([...newArr]);
      await new Promise((resolve) => setTimeout(resolve, 20));

      setIsSorting(false);
      setIsSorted(true);
      changeText("SORT");
    });

    subscribe("sortingStarted", async () => {
      setIsSorting(true);
      setIsSorted(false);
    });
  }, []);

  //!MAIN
  const sortingFunctions = {
    bubbleSort: async () => {
      console.log("Running Optimized Bubble Sort");
      await bubbleSort(arr, setArr);
    },
    insertionSort: async () => {
      console.log("Running Insertion Sort");
      await insertionSort(arr, setArr);
    },
    quickSort: async () => {
      console.log("Running Quick Sort");
      await quickSort(arr, setArr);
    },
    mergeSort: async () => {
      console.log("Running Merge Sort");
      await mergeSort(arr, setArr);
    },
    selectionSort: async () => {
      console.log("Running Selection Sort");
      await selectionSort(arr, setArr);
    },
    countingSort: async () => {
      console.log("Running Counting Sort");
      await countingSort(arr, setArr);
    },
    /*
    radixSort: async () => {
      console.log("Running Radix Sort");
      await mergeSort(arr, setArr);
    },
    heapSort: async () => {
      console.log("Running Heap Sort");
      await mergeSort(arr, setArr);
    },*/
  };

  function setIsSortedToFalse(array, handler) {
    var newArr = [...array];
    newArr.forEach((item) => {
      item.isSorted = false;
      item.isActive = false;
    });
    handler(newArr);
  }

  const handleRunSort = async () => {
    if (isSorting) {
      publish("stopSort", null);
      setIsSorting(false);
    } else {
      if (isSorted) {
        console.log("isSorted is true!");
        setIsSorted(false);
        setIsSortedToFalse(arr, setArr);
        setArr(shuffleArray(arr));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      if (selectedSort && sortingFunctions[selectedSort]) {
        changeText("SORTING...");

        let res = sortingFunctions[selectedSort]();
        console.log(res);
      }
    }
  };

  const changeText = async (newButtonText) => {
    for (let i = 0; i < buttonText.length; i++) {
      setButtonText(buttonText.slice(0, buttonText.length - i));
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
    for (let i = 0; i < newButtonText.length + 1; i++) {
      setButtonText(newButtonText.slice(0, i));
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
  };

  return (
    <div className="App">
      <Header
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        handleRunSort={handleRunSort}
        isSorting={isSorting}
        buttonText={buttonText}
      />
      <Body arr={arr} arrLength={arrLength} />
    </div>
  );
}

export default App;
