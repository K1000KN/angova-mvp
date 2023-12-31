import React, { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

import { useTranslation } from "react-i18next"; // Import useTranslation from react-i18next
import { Typography } from "@mui/material";

export const WidgetForm = ({ onClose }) => {
  const [feedbackType, setFeedbackType] = useState(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const { t } = useTranslation();

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <div>
      {feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
          onClose={onClose}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep
              onFeedbackTypeChanged={setFeedbackType}
              onClose={onClose}
            />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
              onClose={onClose}
            />
          )}
        </>
      )}

      <Typography
        style={{
          fontStyle: "italic",
          margin: "16px 0",
          textAlign: "center",
        }}
      >
        {t("Made with ♥ by")}{" "}
        <a
          href="https://angova.io"
          style={{
            fontStyle: "italic",
            color: "#fcb44d",
          }}
        >
          Angova
        </a>
      </Typography>
    </div>
  );
};
