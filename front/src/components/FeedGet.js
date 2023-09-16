import React from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { WidgetForm } from "./WidgetForm";
import FeedbackIcon from "@mui/icons-material/Feedback";
export const FeedGet = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8"
        onClick={handleClickOpen}
      >
        <FeedbackIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <WidgetForm />
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          style={{ margin: "16px" }}
        >
          Feedback
        </Button>
      </Dialog>
    </>
  );
};
