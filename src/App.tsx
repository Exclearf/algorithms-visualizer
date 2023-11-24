import React, { useEffect, useState } from "react";

import { generateArray, shuffleArray } from "./Helpers/ArrayHelper.tsx";
import { publish, subscribe } from "./Helpers/EventHelper.tsx";

import { bubbleSort } from "./SortingAlgorithms/BubbleSort.tsx";
import { insertionSort } from "./SortingAlgorithms/InsertionSort.tsx";
import { quickSort } from "./SortingAlgorithms/QuickSort.tsx";
import { mergeSort } from "./SortingAlgorithms/MergeSort.tsx";

import "./App.css";
import "./Styles/Boostrap.css";

function App() {
  let arrLength = 50;
  const [arr, setArr] = useState(shuffleArray(generateArray(arrLength)));
  const [selectedSort, setSelectedSort] = useState("bubbleSort");
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [buttonText, setButtonText] = useState("SORT");

  //TODO: Remove them and all their dependencies

  //Initialize the app
  useEffect(() => {
    //Subscribe to events
    subscribe("stopSort", () => {
      publish("pauseSorting", null);
    });

    subscribe("sortingStopped", async () => {
      setIsSorting(false);
      setIsSorted(true);
      changeText("SORT");
    });

    subscribe("sortingEnded", async (event) => {
      //Well-known green thingy :)
      let newArr = [...event.detail];
      for (let i = 0; i < newArr.length; i++) {
        newArr[i].isSorted = true;
        setArr([...newArr]);
        await new Promise((resolve) => setTimeout(resolve, 20));
      }

      setIsSorting(false);
      setIsSorted(true);
      changeText("SORT");
    });

    subscribe("sortingStarted", () => {
      setIsSorting(true);
      setIsSorted(false);
    });
  }, []);

  //MAIN

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
      console.log("Running Insertion Sort");
      await quickSort(arr, setArr);
    },
    mergeSort: async () => {
      console.log("Running Insertion Sort");
      await mergeSort(arr, setArr);
    },
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
      setIsSorting(true);
    } else {
      if (isSorted) {
        setIsSorted(false);
        setIsSortedToFalse(arr, setArr);
        setArr(shuffleArray(arr));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      if (selectedSort && sortingFunctions[selectedSort]) {
        changeText("SORTING...");

        let res =  sortingFunctions[selectedSort]();
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
      <div className="centerDiv">
        <div className="select">
          <select
            id="sortingAlgorithm"
            value={selectedSort}
            onChange={(event) => {
              setSelectedSort(event.target.value);
            }}
          >
            <option value="BubbleSort">Bubble Sort</option>
            <option value="insertionSort">Insertion Sort</option>
            <option value="quickSort">Quick Sort</option>
            <option value="mergeSort">Merge Sort</option>
          </select>
          <span className="focus"></span>
        </div>
        <label className="buttonLabel">
          <input type="checkbox" onClick={handleRunSort} checked={isSorting} />
          <span className="buttonSpan">{buttonText}</span>
        </label>
      </div>

      <div className="ItemsContainer">
        {arr.map((item) => (
          <div
            className={
              "Item " +
              (item.isActive ? " ActiveItem" : "") +
              (item.isSorted ? " SortedItem" : "") +
              (item.isSwapped ? " SwappedItem" : "") 
            }
            key={item.id}
            style={{
              height: item.height / 3,
              width: "10px",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
