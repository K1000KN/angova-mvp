import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { makeStyles } from "@mui/styles";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

const flags = [
  {
    src: "../../images/flag/rounded/france.png",
    onClick: () => {
      // Handle showing France article
    },
    isAvailable: true,
  },
  {
    src: "../../images/flag/rounded/spain.png",
    onClick: () => {
      // Handle showing Spain article
    },
    isAvailable: true,
  },
  {
    src: "../../images/flag/rounded/uk.png",
    onClick: () => {
      // Handle showing UK article
    },
    isAvailable: true,
  },
  {
    src: "../../images/flag/rounded/algeria.png",
    onClick: () => {
      // Handle showing Algeria article
    },
    isAvailable: false,
  },
  {
    src: "../../images/flag/rounded/morocco.png",
    onClick: () => {
      // Handle showing Morocco article
    },
    isAvailable: true,
  },
  {
    src: "../../images/flag/rounded/ukraine.png",
    onClick: () => {
      // Handle showing Ukraine article
    },
    isAvailable: false,
  },
  {
    src: "../../images/flag/rounded/tunisia.png",
    onClick: () => {
      // Handle showing Tunisia article
    },
    isAvailable: false,
  },
  {
    src: "../../images/flag/rounded/turkey.png",
    onClick: () => {
      // Handle showing Turkey article
    },
    isAvailable: false,
  },
  {
    src: "../../images/flag/rounded/lsf.png",
    onClick: () => {
      // Handle showing LSF article
    },
    isAvailable: true,
  },
  {
    src: "../../images/flag/rounded/albania.png",
    onClick: () => {
      // Handle showing Albania article
    },
    isAvailable: false,
  },
];

const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  flagImage: {
    position: "relative",
    cursor: "pointer",
    width: "auto",
    height: "100%",
  },
}));

function MultiCarousel() {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [tooltipOpen, setTooltipOpen] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleFlagClick = (flagIndex) => {
    if (tooltipOpen === flagIndex) {
      setTooltipOpen(null);
      setTooltipVisible(false);
    } else {
      setTooltipOpen(flagIndex);
      setTooltipVisible(true);
    }
  };

  useEffect(() => {
    if (tooltipOpen) {
      const timeout = setTimeout(() => {
        setTooltipOpen(null);
        setTooltipVisible(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [tooltipOpen]);

  const renderFlag = (flag, flagIndex) => {
    const flagClicked = tooltipOpen === flagIndex;

    return (
      <Tooltip
        title={flag.isAvailable ? t("available") : t("comingSoon")}
        placement="top"
        open={flagClicked && tooltipVisible}
        disableHoverListener
        key={flagIndex}
      >
        <div
          className={classes.flagImage}
          onClick={() => {
            flag.onClick();
            handleFlagClick(flagIndex);
          }}
        >
          <img src={flag.src} alt="flag" className="styleFlag" />
        </div>
      </Tooltip>
    );
  };

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      centerMode
      swipeable
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 9,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 4,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 4,
        },
      }}
      slidesToSlide={1}
      containerClass={classes.carouselContainer}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      itemClass="carousel-item-padding-40-px"
    >
      {flags.map((flag, index) => renderFlag(flag, index))}
    </Carousel>
  );
}

export default MultiCarousel;
