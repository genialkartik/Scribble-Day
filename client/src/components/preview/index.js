import React from "react";
import "./style.css";
import t1 from "./tshirt1.png";
import t2 from "./tshirt2.png";

export default function Preview() {
  return (
    <div className="tshirt-preview-container">
      <div className="box">
        <span>
          <img src={t1} alt="t2" className={"i-1"} />
        </span>
        <span>
          <img src={t2} className={"i-2"} alt="t1" />
        </span>
      </div>
    </div>
  );
}
