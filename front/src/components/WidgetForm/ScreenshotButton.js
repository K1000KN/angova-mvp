import React, { useState } from "react";
import html2canvas from "html2canvas";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export const ScreenshotButton = ({ screenshot, onScreenshotTook }) => {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector("html"));
    const base64image = canvas.toDataURL("image/png");

    onScreenshotTook(base64image);
    setIsTakingScreenshot(false);
  }

  const buttonStyle = {
    width: "10rem", // Set a fixed width
    height: "10rem", // Set a fixed height
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${screenshot})`,
    backgroundSize: "cover", // Ensure the background image covers the button
    backgroundPosition: "center", // Center the background image
  };

  if (screenshot) {
    return (
      <IconButton
        style={buttonStyle}
        className="rounded-md border-transparent flex justify-end items-end text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        onClick={() => onScreenshotTook(null)}
      >
        <div style={{ ...buttonStyle, ...backgroundImageStyle }}></div>
        <DeleteIcon />
      </IconButton>
    );
  }

  return (
    <Button
      variant="contained"
      color="primary"
      style={buttonStyle}
      className="rounded-md border-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700"
      onClick={handleTakeScreenshot}
      disabled={isTakingScreenshot}
    >
      {isTakingScreenshot ? "Loading" : <CameraAltIcon />}
    </Button>
  );
};
