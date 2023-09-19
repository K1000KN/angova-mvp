import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { WidgetForm } from "./WidgetForm";
import FeedbackIcon from "@mui/icons-material/Feedback";

const FeedGet = () => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
    console.log("close");
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const iconButtonStyles = {
    backgroundColor: "rgb(244, 158, 76)",
    border: "1px solid rgb(244, 158, 76)",
    margin: "3rem 2rem",
    zIndex: "1000",
    "&:hover": {
      backgroundColor: "white",
    },
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        right: "0",
        zIndex: "1000",
      }}
    >
      <IconButton
        onClick={handleClickOpen}
        sx={iconButtonStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="feedback-button"
      >
        <FeedbackIcon
          sx={{
            color: isHovered ? "rgb(244, 158, 76)" : "white",
          }}
        />
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <WidgetForm onClose={handleClose} />
      </Dialog>
    </div>
  );
};

export default FeedGet;
