import React from "react";
import "./style.css";

export default function Preview({frontImg, backImg}) {
  return (
    <div className="tshirt-preview-container">
      <div className="box">
        <span>
          <img src={frontImg} alt="t2" className={"i-1"} />
        </span>
        <span>
          <img src={backImg} className={"i-2"} alt="t1" />
        </span>
      </div>
    </div>
  );
}
