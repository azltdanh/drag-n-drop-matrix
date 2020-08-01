import React, { useState } from "react";
import "./App.scss";

function App() {
  const colors = [
    [255, 0, 0], // red
    [255, 128, 0], // orange
    [255, 255, 0], // yellow
    [191, 255, 0], // lime
    [0, 255, 0], // green
    [0, 255, 191], // turquoise
    [0, 255, 255], // aqua
    [0, 0, 255], // blue
  ];

  const generateGrids = () => {
    const arr = [];
    for (let row = 1; row <= colors.length; row += 1) {
      for (let col = 1; col <= colors.length; col += 1) {
        arr.push({
          key: `${row}x${col}`,
          style: {
            background: `rgba(${colors[col - 1]}, ${row / colors.length})`,
          },
        });
      }
    }
    return arr;
  };

  const [items, setItems] = useState(generateGrids());

  const [dragStartIndex, setDragStartIndex] = useState();
  const [dragEndIndex, setDragEndIndex] = useState();

  const onDragStart = (idx) => {
    setDragStartIndex(idx);
  };

  const onDragOver = (idx) => {
    setDragEndIndex(idx);
  };

  const swap = (a, b) => {
    var tmp = items[a];
    items[a] = items[b];
    items[b] = tmp;
  };

  const onDragEnd = () => {
    swap(dragStartIndex, dragEndIndex);
    setDragStartIndex(null);
    setDragEndIndex(null);
  };

  return (
    <div className="wrapper">
      {items.map((item, idx) => (
        <div
          className="box"
          key={item.key}
          style={item.style}
          draggable
          onDragStart={() => onDragStart(idx)}
          onDragOver={() => onDragOver(idx)}
          onDragEnd={() => onDragEnd()}
        >
          {item.key}
        </div>
      ))}
    </div>
  );
}

export default App;
