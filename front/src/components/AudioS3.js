import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ReactHowler from "react-howler";
import { VolumeOff, VolumeUp } from "@mui/icons-material";

const AudioS3 = ({ source, expSource }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
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
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <CircularProgress size={50} />
        </div>
      ) : (
        <>
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
          <button className={"orangeTonalBtn"} onClick={handleToggleAudio}>
            {!isPlaying ? <VolumeOff /> : <VolumeUp />}
          </button>
        </>
      )}
    </>
  );
};

export default AudioS3;
