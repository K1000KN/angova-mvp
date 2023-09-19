import React from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { WidgetForm } from "./WidgetForm";
import FeedbackIcon from "@mui/icons-material/Feedback";

const FeedGet = () => {
  const [open, setOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <>
      <IconButton
        onClick={handleClickOpen}
        sx={iconButtonStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FeedbackIcon
          sx={{
            color: isHovered ? "rgb(244, 158, 76)" : "white",
          }}
        />
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <WidgetForm onClose={handleClose} />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgb(244, 158, 76)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgb(244, 158, 76, 0.8)",
            },
          }}
          onClick={handleClose}
          style={{ margin: "16px" }}
        >
          Feedback
        </Button>
      </Dialog>
    </>
  );
};

export default FeedGet;
