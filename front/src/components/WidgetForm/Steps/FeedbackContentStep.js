import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { feedbackTypes } from "../index.js";
import { useTranslation } from "react-i18next";
import { TextareaAutosize, Box, IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { CloseButton } from "../../CloseButton";
export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
  onClose,
}) {
  const { t } = useTranslation();
  const [screenshot, setScreenshot] = useState(null);
  const [comment, setComment] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const handleClose = () => {
    onClose();
  };

  const addEmoji = (emoji) => () => setComment(`${comment}${emoji}`);
  const minCharacters = 50;
  async function handleSubmitFeedback(e) {
    e.preventDefault();

    setIsSendingFeedback(true);

    // Sanitize comment
    const sanitizedComment = comment.replace(/(<([^>]+)>)/gi, "").trim();

    // Validate comment
    const isValidComment = sanitizedComment.length >= minCharacters;

    if (isValidComment) {
      // Perform submission logic
      console.log({ feedbackType, sanitizedComment, screenshot });
      onFeedbackSent();
    } else {
      // Display error message or prevent submission
      console.log("Comment is too short");
    }
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
            fontWeight: "bold",
          }}
        >
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton onClose={handleClose} />
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
            height: "150px",
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

        <Button
          disabled={comment.trim().length < 10}
          variant="contained"
          sx={{
            backgroundColor: "rgb(244, 158, 76)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgb(244, 158, 76, 0.8)",
            },
          }}
          onClick={handleClose}
          style={{ margin: "16px" }}
        >
          Feedback
        </Button>

        {/* <ScreenshotButton
          screenshot={screenshot}
          onScreenshotTook={setScreenshot}
        /> */}
      </form>
    </>
  );
}
