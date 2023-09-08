import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactHowler from "react-howler";
import { VolumeOff, VolumeUp } from "@mui/icons-material";
import "./AudioS3.css";

const AudioS3 = ({ source }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);
  const reactApiUrl = process.env.REACT_APP_API_URL;
  source = source.substring(1);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        setIsPlaying(false); // Set isPlaying to false when audio is being fetched
        const response = await axios.post(reactApiUrl + "/s3", {
          key: source,
        });
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

  const handleToggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePause = () => {
    if (soundRef.current) {
      soundRef.current.seek(0);
    }
    setIsPlaying(false);
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
            onPause={handlePause}
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
