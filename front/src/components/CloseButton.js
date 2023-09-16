import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export function CloseButton() {
  return (
    <IconButton color="primary" aria-label="Close">
      <CloseIcon />
    </IconButton>
  );
}
