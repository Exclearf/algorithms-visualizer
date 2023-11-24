import React, { useEffect, useState } from "react";

import { generateArray, shuffleArray } from "./Helpers/ArrayHelper.ts";
import { publish, subscribe } from "./Helpers/EventHelper.ts";
import { InitializeRangeWheel } from "./Helpers/RangeWheelHelper.ts";

import { bubbleSort } from "./SortingAlgorithms/BubbleSort.tsx";
import { insertionSort } from "./SortingAlgorithms/InsertionSort.tsx";
import { quickSort } from "./SortingAlgorithms/QuickSort.tsx";
import { mergeSort } from "./SortingAlgorithms/MergeSort.tsx";

import "./App.css";
import "./Styles/ArrayItems.css";
import "./Styles/Select.css";
import "./Styles/Button.css";
import "./Styles/RangeWheel.css"

const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_WIDTH = window.innerWidth;

function App() {
  const [arrLength, setArrLength] = useState(50);
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
      //* Well-known green thingy :)
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
      <div className="centerDiv">
        {/* Selector of algorithm */}
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

        {/* Amount of array items wheel */}
        <div
          className="range-container"
          data-min="10"
          data-max="100"
          data-default="50"
        >
          <div className="content">
            <p className="label">ITEMS</p>
            <p className="value">0</p>
          </div>

          <svg
            className="range"
            width="150px"
            height="150px"
            viewBox="0 0 280 280"
          >
            <circle
              stroke-width="24"
              fill="none"
              stroke="#FFECEC"
              cx="140"
              cy="140"
              r="128"
            />
            <path
              stroke-dasharray="804.361083984375"
              stroke-dashoffset="804.361083984375"
              stroke="#FF4646"
              stroke-width="24"
              stroke-linecap="round"
              fill="none"
              d=" M 140, 140 m 0, -128 a 128,128 0 0,1 0,256 a -128,-128 0 0,1 0,-256"
            />
          </svg>
        </div>

        {/* Sort button */}
        <label className="buttonLabel">
          <input type="checkbox" onClick={handleRunSort} checked={isSorting} />
          <span className="buttonSpan">{buttonText}</span>
        </label>
      </div>

      <div className="ItemsContainer" style={{height:  WINDOW_HEIGHT * 0.5}}>
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
              height: WINDOW_HEIGHT / arrLength * item.id * 0.5,
              width: WINDOW_WIDTH / arrLength * 0.8,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
