import React, { useState, useEffect } from "react";
import ImageS3 from "./ImageS3";

const PlayerSession = ({
  content,
  setAudioSrc,
  setExpAudioSrc,
  audioQuestion,
  audioExplanation,
}) => {
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);

  useEffect(() => {
    let intervalId;
    setAudioSrc(audioQuestion);
    setExpAudioSrc(audioExplanation);

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
  }, [audioExplanation, audioQuestion, content, setAudioSrc, setExpAudioSrc]);

  let render;
  console.log(content);

  if (content.length > 1) {
    const currentSource = content[currentSourceIndex].substring(1);
    render = <ImageS3 source={currentSource} />;

    return <>{render}</>;
  } else {
    const currentSource = content[0].substring(1);

    render = <ImageS3 source={currentSource} />;

    return <>{render}</>;
  }
};

export default PlayerSession;
