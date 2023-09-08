import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ReactHowler from "react-howler";
import { VolumeOff, VolumeUp } from "@mui/icons-material"; // Import VolumeOff and VolumeUp icons
import "./AudioS3.css";

const AudioPlayer = ({ source }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false); // State for audio playback
  source = source.substring(1);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await axios.post("http://localhost:3001/api/v1/s3", {
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
    setIsPlaying(!isPlaying); // Toggle audio playback
  };

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <CircularProgress size={50} />
        </div>
      ) : (
        <div className="audio-player">
          <ReactHowler
            src={audioUrl}
            playing={isPlaying}
            onPlay={() => console.log("Lecture en cours")}
            onPause={() => console.log("Pause")}
            onStop={() => console.log("Arrêt")}
            onLoadError={(id, error) =>
              console.error("Erreur de chargement", error)
            }
          />

          <button
            className={"orangeTonalBtn"}
            onClick={handleToggleAudio}
            style={{
              marginRight: "30px",
            }}
          >
            {!isPlaying ? <VolumeOff /> : <VolumeUp />}
          </button>
        </div>
      )}
    </>
  );
};

export default AudioPlayer;
