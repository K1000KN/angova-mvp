import React from "react";
import { CloseButton } from "../../CloseButton";
import { feedbackTypes } from "../index";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import "./FeedbackTypeStep.css";

export function FeedbackTypeStep({ onFeedbackTypeChanged, onClose }) {
  const { t } = useTranslation();

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
        {/* Sorry but i've had to align center this text but it was late at night ..  */}
        <div
          type="button"
          onClick={handleClose}
          style={{
            width: "60px",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        ></div>
        <div>
          {" "}
          <Typography
            variant="h5"
            component="span"
            style={{
              textAlign: "center",
            }}
          >
            {t("send-feedback")}
          </Typography>
        </div>

        <CloseButton onClose={handleClose} />
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
              width: "150px",
              height: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #d9d9d9",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              margin: "0 auto",
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
              {t(value.title)}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
