import React, { useState } from "react";
import { ScreenshotButton } from "../ScreenshotButton";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CloseButton } from "../../CloseButton";
import { CircularProgress } from "@mui/material";
import { feedbackTypes } from "../index.js";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}) {
  const { t } = useTranslation();
  const [screenshot, setScreenshot] = useState(null);
  const [comment, setComment] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedback(e) {
    e.preventDefault();

    setIsSendingFeedback(true);
    // await api.post("/feedbacks", {
    //   type: feedbackType,
    //   comment,
    //   screenshot,
    // });
    console.log({ feedbackType, comment, screenshot });

    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="absolute top-5 left-5 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowBackIcon weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <TextField
          fullWidth
          label="Votre message"
          id="fullWidth"
          placeholder={t("feedback-placeholder")}
          onChange={(event) => setComment(event.target.value)}
        />

        <ScreenshotButton
          screenshot={screenshot}
          onScreenshotTook={setScreenshot}
        />
      </form>
    </>
  );
}
