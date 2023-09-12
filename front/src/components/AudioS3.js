import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import ReactHowler from "react-howler";
import { VolumeOff, VolumeUp } from "@mui/icons-material";
import "./AudioS3.css";
const reactApiUrl = process.env.REACT_APP_API_URL;

const AudioS3 = ({ source, activeSource, onAudioToggle }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);
  source = source.substring(1);

  useEffect(() => {
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

    fetchAudio();
  }, [source]);

  useEffect(() => {
    // Pause audio if it's not the active source
    if (activeSource !== source) {
      setIsPlaying(false);
    }
  }, [activeSource, source]);

  const handleToggleAudio = () => {
    if (soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause();
      } else {
        soundRef.current.seek(0);
        soundRef.current.play();
      }
      setIsPlaying(!isPlaying);
      onAudioToggle(source);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loader-container"></div>
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
    </>
  );
};

export default AudioS3;
