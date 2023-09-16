import React, { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

import bugImage from "./bug.svg";
import ideaImage from "./idea.svg";
import thoughtImage from "./thought.svg";

import { useTranslation } from "react-i18next"; // Import useTranslation from react-i18next

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

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const { t } = useTranslation(); // Use useTranslation hook to translate strings

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <div className="dark:bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}
      <footer className="text-xs text-neutral-400">
        {t("Made with ♥ by")}{" "}
        <a
          href="https://rocketseat.com.br"
          className="underline underline-offset-2"
        >
          Angova
        </a>
      </footer>
    </div>
  );
}
