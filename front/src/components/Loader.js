import React from "react";
import "./Loader.css";

const Loader = ({ size, color }) => {
  return (
    <div
      className="loader"
      style={{
        width: size,
        height: size,
        color: color,
      }}
    ></div>
  );
};

Loader.defaultProps = {
  size: "50px",
  color: "#fff",
};

export default Loader;
