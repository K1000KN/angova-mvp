import React, { useState } from "react";
import { ScreenshotButton } from "../ScreenshotButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CloseButton } from "../../CloseButton";
import { feedbackTypes } from "../index.js";
import { useTranslation } from "react-i18next";
import { TextareaAutosize, Box, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";

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

  const addEmoji = (emoji) => () => setComment(`${comment}${emoji}`);

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
      <header
        style={{
          display: "flex",
          padding: "16px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          type="button"
          onClick={onFeedbackRestartRequested}
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        >
          <ArrowBackIcon
            weight="bold"
            style={{
              color: "rgb(244, 158, 76)",
            }}
          />
        </button>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <div></div>
      </header>

      <form
        onSubmit={handleSubmitFeedback}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "space-between",
          width: "90%",
          margin: "0 auto",
        }}
      >
        <TextareaAutosize
          minRows={4}
          placeholder={t("feedback-placeholder")}
          onChange={(event) => setComment(event.target.value)}
          autoCapitalize="sentences"
          autoCorrect="on"
          autoFocus={true}
          resize="none"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            resize: "none",
          }}
          value={comment}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            variant="outlined"
            color="neutral"
            onClick={addEmoji("👎")}
            style={{ marginRight: "8px", borderRadius: "5px" }}
          >
            👎
          </IconButton>
          <IconButton
            variant="outlined"
            color="neutral"
            onClick={addEmoji("👍")}
            style={{ marginRight: "8px", borderRadius: "5px" }}
          >
            👍
          </IconButton>

          <IconButton
            variant="outlined"
            color="neutral"
            onClick={addEmoji("😍")}
            style={{ marginRight: "8px", borderRadius: "5px" }}
          >
            😍
          </IconButton>
        </Box>

        {/* <ScreenshotButton
          screenshot={screenshot}
          onScreenshotTook={setScreenshot}
        /> */}
      </form>
    </>
  );
}
