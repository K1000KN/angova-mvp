import React, { useState, useEffect } from "react";

var PlayerSession = ({
  content,
  setAudioSrc,
  setExpAudioSrc,
  audioQuestion,
  audioExplaination,
}) => {
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);

  useEffect(() => {
    let intervalId;
    setAudioSrc(audioQuestion);
    setExpAudioSrc(audioExplaination);
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
  }, [audioExplaination, audioQuestion, content, setAudioSrc, setExpAudioSrc]);

  let render;

  const currentSource = content;
  render = <img className="imgResponsive" alt="road" src={currentSource} />;

  return <>{render}</>;
};

export default PlayerSession;
