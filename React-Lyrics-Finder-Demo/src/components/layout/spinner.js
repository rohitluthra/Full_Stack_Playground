import React from "react";
import spinnerr from "./Spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinnerr}
        alt="Loading..."
        style={{ width: "200px", margin: " 40px auto", display: "block" }}
      />
    </div>
  );
};
