import React, { useEffect, useState } from "react";
import { generateArray, shuffleArray } from "./Helpers/ArrayHelper.tsx";
import { bubbleSort } from "./SortingAlgorithms/BubbleSort.tsx";
import { insertionSort } from "./SortingAlgorithms/InsertionSort.tsx";
import "./App.css";
import "./Styles/Boostrap.css";
import { quickSort } from "./SortingAlgorithms/QuickSort.tsx";
import { mergeSort } from "./SortingAlgorithms/MergeSort.tsx";

let sorted = true;

function setSorted(value) {
  console.log("sorted is " + value);
  sorted = value;
}

function App() {
  let arrLength = 50;

  const [arr, setArr] = useState(shuffleArray(generateArray(arrLength)));
  const [selectedSort, setSelectedSort] = useState("bubbleSort");
  const [checked, setChecked] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [buttonText, setButtonText] = useState("SORT");

  const sortingFunctions = {
    bubbleSort: () => {
      console.log("Running Bubble Sort");
      bubbleSort(arr, setArr, setChecked, setSorted, changeText);
    },
    insertionSort: () => {
      console.log("Running Insertion Sort");
      insertionSort(arr, setArr, setChecked, setSorted, changeText);
    },
    quickSort: () => {
      console.log("Running Insertion Sort");
      quickSort(arr, setArr);
    },
    mergeSort: () => {
      console.log("Running Insertion Sort");
      mergeSort(arr, setArr);
    },
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  function setIsSortedToFalse(array, handler) {
    var newArr = [...array];
    newArr.forEach((item) => {
      item.isSorted = false;
      item.isActive = false;
    });
    handler(newArr);
  }
  const handleRunSort = () => {
    if (sorted) {
      setSorted(false);
      setIsSortedToFalse(arr, setArr);
      setArr(shuffleArray(arr));
      setIsSorted(false);
      if (selectedSort && sortingFunctions[selectedSort]) {
        setChecked(true);

        changeText("SORTING...");

        let res = sortingFunctions[selectedSort]();
        console.log(res);
        if (res) {
          setChecked(false);
        }
      }
    }
  };
  function changeText (nextText) {
    let charArray = buttonText.split("");
        const clearButtonTextInterval = setInterval(() => {
          if(charArray.pop())
            setButtonText(charArray.join(""));
          else{
            clearInterval(clearButtonTextInterval);

            let sortingText = nextText;
            let newText = "";
            charArray = sortingText.split("");
            let newLetter: string = "";
            const setButtonTextInterval = setInterval(() => {
              setButtonText(newText);
              if(newLetter = (charArray.shift() ?? ''))
                newText += newLetter;
              else 
                clearInterval(setButtonTextInterval);
            }, 50);
          }
        }, 50);
  }

  return (
    <div className="App">
      <div className="centerDiv">
        <div className="select">
          <select
            id="sortingAlgorithm"
            value={selectedSort}
            onChange={handleSortChange}
          >
            <option value="bubbleSort">Bubble Sort</option>
            <option value="insertionSort">Insertion Sort</option>
            <option value="quickSort">Quick Sort</option>
            <option value="mergeSort">Merge Sort</option>
          </select>
          <span className="focus"></span>
        </div>
        <label className="buttonLabel" onClick={handleRunSort}>
          <input type="checkbox" checked={checked} />
          <span className="buttonSpan">{buttonText}</span>
        </label>
      </div>

      <div className="ItemsContainer">
        {arr.map((item) => (
          <div
            className={
              "Item " +
              (item.isActive ? "ActiveItem " : "") +
              (item.isSorted ? "SortedItem" : "")
            }
            key={item.id}
            style={{ height: item.height / 2 }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
