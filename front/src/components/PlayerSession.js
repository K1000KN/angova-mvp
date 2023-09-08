import React, { useState, useEffect } from "react";
import ImageS3 from "./ImageS3";
import AudioS3 from "./AudioS3";
import Grid from "@mui/material/Grid";
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
  if (content.length > 1) {
    const currentSource = content[currentSourceIndex].substring(1);
    render = (
      <>
        <Grid>
          <ImageS3 source={currentSource} />
          <AudioS3 source={audioQuestion} expSource={audioExplanation} />
        </Grid>
      </>
    );
  } else {
    const currentSource = content[0].substring(1);
    render = (
      <>
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <ImageS3 source={currentSource} />
          <br />
          <AudioS3 source={audioQuestion} expSource={audioExplanation} />
        </Grid>
      </>
    );
  }

  return <>{render}</>;
};

export default PlayerSession;
