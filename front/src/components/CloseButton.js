import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export function CloseButton({ onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <IconButton
      onClick={handleClose}
      sx={{
        backgroundColor: "rgb(244, 158, 76)",
        color: "white",
        "&:hover": {
          backgroundColor: "rgb(244, 158, 76, 0.8)",
        },
      }}
      style={{ margin: "16px" }}
    >
      <CloseIcon />
    </IconButton>
  );
}
