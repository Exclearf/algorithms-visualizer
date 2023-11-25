import React from "react";

const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_WIDTH = window.innerWidth;

function Body({ arr, arrLength }) {
    
  return (
    <div className="ItemsContainer" style={{ height: WINDOW_HEIGHT * 0.5 }}>
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
            height: (WINDOW_HEIGHT / arrLength) * item.id * 0.5,
            width: (WINDOW_WIDTH / arrLength) * 0.8,
          }}
        ></div>
      ))}
    </div>
  );
}

export default Body;
