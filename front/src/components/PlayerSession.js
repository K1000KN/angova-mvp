import React, { useState, useEffect } from "react";
import ImageS3 from "./ImageS3";

var PlayerSession = ({
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
    if (content.length > 1) {
      intervalId = setInterval(() => {
        setCurrentSourceIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
      }, 1000);
    } else {
      setCurrentSourceIndex(0);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [audioExplanation, audioQuestion, content, setAudioSrc, setExpAudioSrc]);

  let render;

  const currentSource = content.substring(1);

  render = <ImageS3 source={currentSource} />;
  // render = <img className="imgResponsive" alt="road" src={currentSource} />;

  return <>{render}</>;
};

export default PlayerSession;
