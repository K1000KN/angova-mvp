import React, { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

import bugImage from "./bug.svg";
import ideaImage from "./idea.svg";
import thoughtImage from "./thought.svg";

import { useTranslation } from "react-i18next"; // Import useTranslation from react-i18next
import { Typography } from "@mui/material";

export const feedbackTypes = {
  BUG: {
    title: "Bug",
    image: {
      source: bugImage,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideas",
    image: {
      source: ideaImage,
      alt: "Imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Other", // Add the title for "OTHER" feedback type
    image: {
      source: thoughtImage,
      alt: "Imagem de um balão de pensamento",
    },
  },
};

export const WidgetForm = ({ onClose }) => {
  const [feedbackType, setFeedbackType] = useState(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const { t } = useTranslation(); // Use useTranslation hook to translate strings

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <div>
      {feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
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
            />
          )}
        </>
      )}

      <Typography
        style={{
          fontStyle: "italic",
          marginTop: "16px",
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
