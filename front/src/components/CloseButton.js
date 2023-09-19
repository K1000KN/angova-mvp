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
      aria-label="close"
      style={{ margin: "16px" }}
    >
      <CloseIcon
        style={{
          color: "rgb(244, 158, 76)",
        }}
      />
    </IconButton>
  );
}
