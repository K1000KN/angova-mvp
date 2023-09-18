import React, { useState, useEffect } from "react";
import ImageS3 from "./ImageS3";
const ImageSessionHandler = ({ content }) => {
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);

  useEffect(() => {
    let intervalId;

    // Check if content has more than one element
    if (content.length > 1) {
      intervalId = setInterval(() => {
        setCurrentSourceIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
      }, 1000);
    } else {
      setCurrentSourceIndex(0);
    }

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, [content]);

  let render;
  if (content.length > 1) {
    const currentSource = content[currentSourceIndex].substring(1);
    render = (
      <div>
        <ImageS3 id="imgContainer" source={currentSource} />
      </div>
    );
  } else {
    const currentSource = content[0].substring(1);
    render = (
      <div>
        <ImageS3 id="imgContainer" source={currentSource} />
      </div>
    );
  }

  return <>{render}</>;
};

export default ImageSessionHandler;
