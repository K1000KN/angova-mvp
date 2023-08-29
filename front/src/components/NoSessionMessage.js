import React from "react";
import { Button, Typography } from "@mui/material";

const NoSessionMessage = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        width: "100%",
      }}
    >
      <Typography variant="h6">No sessions available.</Typography>
      <Typography variant="subtitle1">Sessions are coming soon!</Typography>
      <Button variant="contained" color="primary" href="/">
        Back to home
      </Button>
    </div>
  );
};

export default NoSessionMessage;
