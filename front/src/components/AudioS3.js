import React, { useRef, useState } from "react";
import axios from "axios";
import ReactHowler from "react-howler";
import { VolumeOff, VolumeUp } from "@mui/icons-material";
import "./AudioS3.css";
import { CircularProgress } from "@mui/material";
const reactApiUrl = process.env.REACT_APP_API_URL;

const AudioS3 = ({ source, activeSource, onAudioToggle }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);
  source = source.substring(1);

  const fetchAudio = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        reactApiUrl + "/s3",
        {
          key: source,
        },
        config
      );
      const audioData = response.data;
      setAudioUrl(`data:audio/mpeg;base64,${audioData}`);
    } catch (error) {
      console.error("Error fetching audio from S3:", error);
      setAudioUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAudio = () => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause();
        setIsPlaying(false);
      } else {
        soundRef.current.seek(0);
        soundRef.current.play();
        setIsPlaying(true);
      }
      onAudioToggle(source);
    }
  };

  // Check if the active source changes and pause audio if necessary
  if (activeSource !== source && isPlaying) {
    soundRef.current.pause();
    setIsPlaying(false);
  }

  // Fetch audio when the source prop changes
  if (source !== audioUrl) {
    fetchAudio();
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "20px",
      }}
    >
      {isLoading ? (
        <CircularProgress size={25} color="primary" />
      ) : (
        <>
          <ReactHowler
            src={audioUrl}
            playing={isPlaying}
            preload={true}
            html5={true}
            format={["mp3"]}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onEnd={() => setIsPlaying(false)}
            ref={soundRef}
          />
          <button className={"orangeTonalBtn"} onClick={handleToggleAudio}>
            {!isPlaying ? <VolumeOff /> : <VolumeUp />}
          </button>
        </>
      )}
    </div>
  );
};

export default AudioS3;
