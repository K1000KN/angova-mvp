import React from "react";
import { CloseButton } from "../../CloseButton";
import { feedbackTypes } from "../index";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export function FeedbackTypeStep({ onFeedbackTypeChanged, onClose }) {
  const { t } = useTranslation();

  const handleClose = () => {
    // Call the onClose function to close the modal
    onClose();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        justifyContent: "space-between",
      }}
    >
      <header
        style={{
          display: "flex",
          padding: "16px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>{""}</div>
        <Typography variant="h5" component="span">
          {t("send-feedback")}
        </Typography>
        <CloseButton onClick={handleClose} />
      </header>

      <div
        style={{
          display: "flex",
          padding: "16px",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "space-between",
          margin: "0 auto",
          width: "80%",
        }}
      >
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Button
            key={key}
            variant="outlined"
            onClick={() => onFeedbackTypeChanged(key)}
            style={{
              width: "24%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "2px solid transparent",
              "&:hover": {
                border: "2px solid #fcb44d", // Change border color on hover
              },
            }}
          >
            <img src={value.image.source} alt={value.image.alt} />
            <Typography
              variant="body1"
              component="span"
              sx={{
                marginTop: "8px",
              }}
            >
              {value.title}
            </Typography>
          </Button>
        ))}
      </div>
    </div>
  );
}
