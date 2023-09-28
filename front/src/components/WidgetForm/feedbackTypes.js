import bugImage from "./bug.svg";
import ideaImage from "./idea.svg";
import thoughtImage from "./thought.svg";
import { useTranslation } from "react-i18next";

const FeedbackTypesData = () => {
  const { t } = useTranslation();

  const feedbackTypes = {
    BUG: {
      title: t("bug"),
      image: {
        source: bugImage,
        alt: t("Image of an insect"),
      },
    },
    IDEA: {
      title: t("idea"),
      image: {
        source: ideaImage,
        alt: t("Image of a lightbulb"),
      },
    },
    OTHER: {
      title: t("other"),
      image: {
        source: thoughtImage,
        alt: t("Image of a thought bubble"),
      },
    },
  };

  return feedbackTypes;
};

export default FeedbackTypesData;
