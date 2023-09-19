import React from "react";
import { CloseButton } from "../../CloseButton";
import { feedbackTypes } from "../index";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import "./FeedbackTypeStep.css";
export function FeedbackTypeStep({ onFeedbackTypeChanged, handleClose }) {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "space-between",
        width: "90%",
        margin: "0 auto",
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
          gap: "18px",
          flexWrap: "wrap",
          justifyContent: "space-between",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <div
            key={key}
            onClick={() => onFeedbackTypeChanged(key)}
            className="feedback-type"
            style={{
              width: "30%",
              height: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #d9d9d9",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
            }}
          >
            <img
              src={value.image.source}
              alt={value.image.alt}
              style={{
                marginTop: "20px",
              }}
            />
            <br />
            <Typography variant="body1" component="span" sx={{}}>
              {value.title}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
