import React from "react";

import configData from "../../config.json"

const MAX_ELEM_HEIGHT = window.innerHeight;
const MAX_ELEM_WIDTH = window.innerWidth;

function Body({ arr, arrLength }) {
    
  return (
    <div className="ItemsContainer" style={{ height: (MAX_ELEM_HEIGHT / arrLength) * (arrLength + 1) * 0.6 }}>
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
            height: (MAX_ELEM_HEIGHT / arrLength) * (item.id + 1) * 0.6,
            width: (MAX_ELEM_WIDTH / arrLength) * 0.85,
          }}
        ></div>
      ))}
    </div>
  );
}

export default Body;
