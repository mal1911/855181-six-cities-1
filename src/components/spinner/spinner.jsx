import React from "react";
import "./spinner.css";

const Spinner = () => {
  return <div className="lds-css ng-scope" style={{width: `200px`, height: `200px`}}>
    <div className="lds-gear" style={{width: `100%`, height: `100%`}}>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>;
};

export default Spinner;
