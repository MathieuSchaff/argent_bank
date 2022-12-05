import "./Spinner.scss";
import React from "react";

const Spinner = () => {
  return (
    <div className="spinner__container">
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1.5"
              floodColor="#16c786"
            />
          </filter>
        </defs>
        <circle
          id="spinner"
          style={{
            fill: "transparent",
            stroke: "#00bc77",
            strokeWidth: "7px",
            strokeLinecap: "round",
            filter: "url(#shadow)",
          }}
          cx="50"
          cy="50"
          r="45"
        />
      </svg>
    </div>
  );
};

export default Spinner;
