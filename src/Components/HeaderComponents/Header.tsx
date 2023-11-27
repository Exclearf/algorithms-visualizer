import React from "react";

import configData from "../../config.json";

function Header({
  selectedSort,
  setSelectedSort,
  handleRunSort,
  isSorting,
  buttonText,
}) {
  return (
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
          <option value="countingSort">Counting Sort</option>
          <option value="radixSort" disabled>
            Radix Sort
          </option>
          <option value="heapSort" disabled>
            Heap Sort
          </option>
          <option value="selectionSort">Selection Sort</option>
        </select>
        <span className="focus"></span>
      </div>

      {/* Amount of array items wheel */}
      <div
        className={`range-container ${isSorting ? 'disabled' : ''}`}
        data-min="10"
        data-max= {configData.MAX_ARRAY_LENGTH}
        data-default= {Math.floor(configData.MAX_ARRAY_LENGTH / 2)}
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
  );
}

export default Header;
