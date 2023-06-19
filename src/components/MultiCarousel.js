import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function MultiCarousel() {
  const franceFlag = "../../images/flag/rounded/france.png";
  const ukFlag = "../../images/flag/rounded/uk.png";
  const algerieFlag = "../../images/flag/rounded/algeria.png";
  const moroccoFlag = "../../images/flag/rounded/morocco.png";
  const tuniFlag = "../../images/flag/rounded/tunisia.png";
  const turkeyFlag = "../../images/flag/rounded/turkey.png";
  const lsfFlag = "../../images/flag/rounded/lsf.png";
  const albaniaFlag = "../../images/flag/rounded/albania.png";
  const showUkArticle = async () => {
    // var apiResponse = await fetch(`https://newsapi.org/v2/sources?apiKey=ecae1c873b6f419eb922a2078e805a2e&country=us`);
    // var response = await apiResponse.json();
    // setSourceList(response.sources)
  };
  const showFrArticle = async () => {
    // var apiResponse = await fetch(`https://newsapi.org/v2/sources?apiKey=ecae1c873b6f419eb922a2078e805a2e&country=fr`);
    // var response = await apiResponse.json();
    // setSourceList(response.sources)
  };
  const showMarocArticle = async () => {
    // var apiResponse = await fetch(`https://newsapi.org/v2/sources?apiKey=ecae1c873b6f419eb922a2078e805a2e&country=fr`);
    // var response = await apiResponse.json();
    // setSourceList(response.sources)
  };
  return (
    <Carousel
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // Change the size to fit the parent element of this div
        width: "100%",
        height: 30,
        backgroundColor: "red",
      }}
      arrows
      centerMode={true}
      swipeable={true}
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
    >
      <img
        alt="lsfFlag"
        src={lsfFlag}
        onClick={() => {
          showMarocArticle();
        }}
        className="styleFlag"
      />
      <img
        alt="moroccoFlag"
        src={moroccoFlag}
        onClick={() => {
          showMarocArticle();
        }}
        className="styleFlag"
      />
      <img
        alt="algerieFlag"
        src={algerieFlag}
        onClick={() => {
          showMarocArticle();
        }}
        className="styleFlag"
      />
      <img
        alt="tuniFlag"
        src={tuniFlag}
        onClick={() => {
          showMarocArticle();
        }}
        className="styleFlag"
      />
      <img
        alt="franceFlag"
        src={franceFlag}
        onClick={() => {
          showFrArticle();
        }}
        className="styleFlag"
      />
      <img
        alt="turkeyFlag"
        src={turkeyFlag}
        onClick={() => {
          showFrArticle();
        }}
        className="styleFlag"
      />
      <img
        alt="ukFlag"
        src={ukFlag}
        onClick={() => {
          showUkArticle();
        }}
        className="styleFlag"
      />
      <img
        alt="albaniaFlag"
        src={albaniaFlag}
        onClick={() => {
          showFrArticle();
        }}
        className="styleFlag"
      />
    </Carousel>
  );
}
export default MultiCarousel;
