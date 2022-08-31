import React from "react";
import percentageBar from "../modules/percentageBar";

export default function StatBar(props) {
  return (
    <div className="stat-bar">
      <p>{props.name}: {props.stat}</p>
      <div className="bar">
        <div className="bar-progress" style={{ width: percentageBar(props.stat) }}></div>
      </div>
    </div>
  );
}
