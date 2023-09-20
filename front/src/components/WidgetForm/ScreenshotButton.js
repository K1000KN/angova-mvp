import React, { useState } from "react";
import html2canvas from "html2canvas";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Grid } from "@mui/material";

export const ScreenshotButton = ({ screenshot, onScreenshotTook }) => {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector("#root"));
    const base64image = canvas.toDataURL("image/png");
    if (base64image) onScreenshotTook(base64image);
    setIsTakingScreenshot(false);
  }

  const buttonStyle = {
    height: "300px",
    width: "200px",
  };

  const buttonCameraStyle = {
    height: "2rem",
    width: "3rem",
    padding: "0.5rem",
  };
  const backgroundImageStyle = {
    backgroundImage: `url(${screenshot})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  if (screenshot) {
    return (
      <>
        <div onClick={() => onScreenshotTook(null)}>
          <div style={{ ...buttonStyle, ...backgroundImageStyle }}></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        style={buttonCameraStyle}
        onClick={handleTakeScreenshot}
        disabled={isTakingScreenshot}
      >
        {isTakingScreenshot ? "Loading" : <CameraAltIcon />}
      </Button>
    </>
  );
};
