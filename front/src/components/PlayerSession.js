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
        console.log("interval");
        console.log(currentSourceIndex);
        console.log(content.length);
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
  console.log("currentSource", currentSource);
  render = <img className="imgResponsive" alt="road" src={content} />;

  return <>{render}</>;
};

export default PlayerSession;
