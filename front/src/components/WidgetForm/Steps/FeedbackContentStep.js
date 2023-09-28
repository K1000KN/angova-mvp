import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { feedbackTypes } from "../index.js";
import { useTranslation } from "react-i18next";
import { TextareaAutosize, Box, IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { CloseButton } from "../../CloseButton";
// import { ScreenshotButton } from "../ScreenshotButton.js";
import MailService from "../../../services/mailService";
import {
  fetchCurrentUser,
  fetchUsername,
  fetchUserEmail,
} from "../../../services/userService";
export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
  onClose,
}) {
  const { t } = useTranslation();
  // const [screenshot, setScreenshot] = useState(null);
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
      try {
        const token = localStorage.getItem("token");
        // Fetch the current user's data
        const currentUser = await fetchCurrentUser(token);

        // Get username and user email
        const username = fetchUsername(currentUser);
        const userEmail = fetchUserEmail(currentUser);

        // Perform submission logic
        console.log({
          feedbackType,
          sanitizedComment,
          username,
          userEmail,
        });

        // You can use username and userEmail in your email service
        MailService.sendFeedback({
          name: username,
          email: userEmail,
          message: `${feedbackType}: ${sanitizedComment}`,
        });

        onFeedbackSent();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
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
        <Typography
          variant="body2"
          align="right"
          sx={{ color: "text.secondary", fontStyle: "italic" }}
        >
          minimum characters {minCharacters}
        </Typography>
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

        {/* create a typography to incitate user to take a screenshot of the page if necessary  */}
        {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {t("feedback-screenshot")}
        </Typography>

        <ScreenshotButton
          screenshot={screenshot}
          onScreenshotTook={setScreenshot}
        /> */}
        <Button
          disabled={comment.trim().length < minCharacters}
          variant="contained"
          sx={{
            backgroundColor: "rgb(244, 158, 76)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgb(244, 158, 76, 0.8)",
            },
          }}
          onClick={handleSubmitFeedback}
          style={{ margin: "16px" }}
        >
          Feedback
        </Button>
      </form>
    </>
  );
}
