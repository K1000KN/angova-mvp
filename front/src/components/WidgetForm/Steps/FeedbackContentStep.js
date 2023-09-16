import React, { useState } from "react";
import { ScreenshotButton } from "../ScreenshotButton";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CloseButton } from "../../CloseButton";
import { CircularProgress } from "@mui/material";
import { feedbackTypes } from "../index.js";
import { useTranslation } from "react-i18next";

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
        <textarea
          className="min-w-[304px] w-full min-h-[112px] max-h-96 text-sm placeholder-zinc-500 text-zinc-800 border-zinc-300 dark:placeholder-zinc-400 dark:text-zinc-100 dark:border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize:none scrollbar scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
          placeholder={t("feedback-placeholder")}
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
        </footer>
      </form>
    </>
  );
}
