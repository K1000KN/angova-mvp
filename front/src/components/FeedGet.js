import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { WidgetForm } from "./WidgetForm";
import FeedbackIcon from "@mui/icons-material/Feedback";

const FeedbackButton = () => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  }

  const iconButtonStyles = {
    backgroundColor: "rgb(244, 158, 76)",
    border: "1px solid rgb(244, 158, 76)",
    zIndex: "1000",
    "&:hover": {
      backgroundColor: "white",
    },
  };

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        sx={iconButtonStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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

export default FeedbackButton;
