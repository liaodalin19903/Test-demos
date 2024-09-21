import React from "react";
//import ReactDOM from "react-dom";
import "./style.css";

const App = () => {
  const itemData = new Array(500).fill(0);
  const indexData = new Array(20).fill(0);

  return (
    <div className="App">
      <div className="left-box">
        {indexData.map((item, index) => (
          <div
            key={index}
            style={{
              fontSize: "8px",
              width: "9px",
              height: "9px",
              margin: "4px",
              backgroundColor: 'red'
            }}
          >
            {index}
          </div>
        ))}
      </div>
      <div 
        style={{ marginTop: '2px' }}
        className="right-box">
        {itemData.map((item, index) => (
          <div
            key={index}
            style={{
              float: 'left',
              display: "inline-block",
              width: "9px",
              height: "9px",
              margin: "2px",
              backgroundColor: item.selected ? "green" : "lightgreen",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
