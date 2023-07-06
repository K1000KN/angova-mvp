import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { makeStyles } from "@mui/styles";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
const franceFlag = "../../images/flag/rounded/france.png";
const ukFlag = "../../images/flag/rounded/uk.png";
const algerieFlag = "../../images/flag/rounded/algeria.png";
const moroccoFlag = "../../images/flag/rounded/morocco.png";
const tuniFlag = "../../images/flag/rounded/tunisia.png";
const turkeyFlag = "../../images/flag/rounded/turkey.png";
const lsfFlag = "../../images/flag/rounded/lsf.png";
const albaniaFlag = "../../images/flag/rounded/albania.png";
const ukraineRoundedFlag = "../../images/flag/rounded/ukraine.png";

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
    transition: "filter 0.3s",
  },
  tooltip: {
    zIndex: 999,
  },
}));

function MultiCarousel() {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [tooltipOpen, setTooltipOpen] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const showMarocArticle = () => {
    // Handle showing Maroc article
  };

  const showFrArticle = () => {
    // Handle showing France article
  };

  const showUkArticle = () => {
    // Handle showing UK article
  };

  const handleFlagClick = (flagIndex) => {
    if (window.innerWidth <= 464) {
      if (tooltipOpen === flagIndex) {
        setTooltipOpen(null);
        setTooltipVisible(false);
      } else {
        setTooltipOpen(flagIndex);
        setTooltipVisible(true);
      }
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

  const renderFlag = (src, onClick, className, isAvailable, flagIndex) => {
    const flagClicked = tooltipOpen === flagIndex;

    return (
      <Tooltip
        title={isAvailable ? t("available") : t("comingSoon")}
        placement="top"
        classes={{ tooltip: classes.tooltip }}
        open={flagClicked && tooltipVisible}
        disableHoverListener
      >
        <div
          className={classes.flagImage}
          onClick={() => {
            onClick();
            handleFlagClick(flagIndex);
          }}
        >
          <img src={src} alt="flag" className={className} />
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
      {renderFlag(lsfFlag, showMarocArticle, "styleFlag", true, 1)}
      {renderFlag(moroccoFlag, showMarocArticle, "styleFlag", true, 2)}
      {renderFlag(algerieFlag, showMarocArticle, "styleFlag", false, 3)}
      {renderFlag(tuniFlag, showMarocArticle, "styleFlag", false, 4)}
      {renderFlag(franceFlag, showFrArticle, "styleFlag", true, 5)}
      {renderFlag(turkeyFlag, showFrArticle, "styleFlag", false, 6)}
      {renderFlag(ukFlag, showUkArticle, "styleFlag", true, 7)}
      {renderFlag(albaniaFlag, showFrArticle, "styleFlag", false, 8)}
      {renderFlag(ukraineRoundedFlag, showFrArticle, "styleFlag", true, 9)}
    </Carousel>
  );
}

export default MultiCarousel;
