import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./session.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { session1 } from "./data/sessions/fr/session_1";
import { session2 } from "./data/sessions/fr/session_2";
import ProgressBar from "./components/ProgressBar";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";

import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { makeStyles } from "@mui/styles";

const Session = () => {
  const navigate = useNavigate();
  const theme = createTheme({
    typography: {
      fontFamily: ["IgraSans", "Raleway", "Arial"].join(","),
    },
  });

  const useStyles = makeStyles({
    orangeBtn: {
      background: "#F49E4C",
      borderRadius: "9px",
      fontSize: "18px",
      color: "#ffffff",
      width: "200px",
      height: "40px",
      maxWidth: "150px",
      outline: "none",
      border: "none",
      cursor: "pointer",
    },

    orangeTonalBtn: {
      background: "#ffffff",
      borderRadius: "9px",
      fontSize: "18px",
      color: "#F49E4C",
      width: "50px",
      height: "40px",
      maxWidth: "150px",
      outline: "none",
      border: "solid 1px #F49E4C",
      cursor: "pointer",
    },
  });
  const classes = useStyles();
  const { id } = useParams();

  const [completed, setCompleted] = useState(0);

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndices, setSelectedAnswerIndices] = useState([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const [openDialog, setOpenDialog] = useState(false); // State for controlling the dialog visibility
  const [dialogContent, setDialogContent] = useState(""); // State for the dialog content

  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const [showExplanation, setShowExplanation] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const playAudioResponse = () => {
    let audioSrc =
      "https://whyp.it/tracks/106593/2023-code-de-la-route-permis-de-conduire-nouvelle-40-questions-dexamen?token=pyKDQ";
    const audio = new Audio(audioSrc);

    if (isPlayingAudio) {
      // audio.pause();
    } else {
      setIsPlayingAudio(true);

      audio.play();
    }
  };
  const verifyAnswer = (indices) => {
    const isCorrect = arraysEqual(indices, correctAnswer);
    highlightCorrectAnswers(indices);

    if (isCorrect) {
      console.log("correct");
      setResult((prevResult) => ({
        ...prevResult,
        score: prevResult.score + 1,
        correctAnswers: prevResult.correctAnswers + 1,
      }));
    } else {
      console.log("wrong");
      highlightWrongAnswers(indices);

      setResult((prevResult) => ({
        ...prevResult,
        wrongAnswers: prevResult.wrongAnswers + 1,
      }));
    }

    setShowExplanation(true);
  };

  // Function to check if two arrays are equal
  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  };

  let sessionData;

  switch (id) {
    case "1":
      sessionData = session1;
      break;
    case "2":
      sessionData = session2;
      break;
    // case "3":
    //   sessionData = session3;
    //   break;
    // case "4":
    //   sessionData = session4;
    //   break;
    // case "5":
    //   sessionData = session5;
    //   break;
    // case "6":
    //   sessionData = session6;
    //   break;
    default:
      // Handle invalid session ID
      return <div>Invalid session ID</div>;
  }

  const { quizz } = sessionData;
  const { questions, choices, correctAnswer, explaination } =
    quizz[activeQuestion];

  const onClickNext = () => {
    if (activeQuestion !== quizz.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setSelectedAnswerIndices([]);
      setShowExplanation(false);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setCompleted(((activeQuestion + 1) / quizz.length) * 100);
  };

  const onAnswerSelected = (index) => {
    setSelectedAnswerIndex(index);
    const isSelected = selectedAnswerIndices.includes(index);
    if (isSelected) {
      setSelectedAnswerIndices((prevIndices) =>
        prevIndices.filter((i) => i !== index)
      );
    } else {
      setSelectedAnswerIndices((prevIndices) => [...prevIndices, index]);
    }
  };

  const isAnswerSelected = (index) => {
    return selectedAnswerIndices.includes(index);
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);
  const handleLeave = () => {
    navigate("/home");
  };

  const highlightCorrectAnswers = () => {
    const answerListItems = document.querySelectorAll(".quizList li");
    answerListItems.forEach((item, index) => {
      if (correctAnswer.includes(index)) {
        item.classList.add("correct-answer");
      }
    });
  };

  const highlightWrongAnswers = (indices) => {
    console.log("indices", indices);

    const answerListItems = document.querySelectorAll(".quizList li");
    answerListItems.forEach((item, index) => {
      if (indices.includes(index)) {
        if (item.classList.contains("correct-answer")) {
        } else {
          item.classList.add("wrong-answer");
        }
      }
    });
  };

  const closeExplanationDialogAndNext = () => {
    setShowExplanation(false);
    setOpenDialog(false);
    setSelectedAnswerIndices([]);
    setSelectedAnswerIndex(null);
    onClickNext();
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!showResult ? (
          <div>
            <Grid container direction="row">
              <Grid
                item
                sm={1.8}
                sx={{ display: { xs: "none", sm: "flex" } }}
                style={{ height: "6vh", paddingLeft: 18, paddingTop: 11 }}
              >
                <span className="active-question-no">
                  {addLeadingZero(activeQuestion + 1)}
                </span>
                <span className="total-question">
                  /{addLeadingZero(quizz.length)}
                </span>
              </Grid>
              <Grid item xs={10} sm={7.8} id="progressContainer">
                <ProgressBar bgcolor={"#F49E4C"} completed={completed} />
              </Grid>
              <Grid
                item
                xs={2}
                id="leaveQuizzContainer"
                style={{
                  height: "6vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div id="leaveQuizz">
                  <IconButton aria-label="close" onClick={handleLeave}>
                    <CloseIcon style={{ color: "#F49E4C" }} />
                  </IconButton>
                </div>
              </Grid>
            </Grid>

            <Grid id="imgContainer" item xs={10}>
              <img
                className="imgResponsive"
                alt="road"
                src="../images/test_img.png"
              />
            </Grid>
            <Grid item xs={12} id="quizContainer">
              {questions && questions.length > 1 ? (
                <>
                  <h7 id="questionQuizz">{questions[0]}</h7>
                  <br />
                  <h7 id="questionQuizz">{questions[1]}</h7>
                </>
              ) : (
                <>
                  <h7 id="questionQuizz">{questions}</h7>
                </>
              )}
              <div>
                {questions && questions.length > 1 ? (
                  <>
                    <ul className="quizList">
                      {choices.slice(0, 2).map((answer, index) => (
                        <li
                          onClick={() => onAnswerSelected(index)}
                          key={answer}
                          className={
                            isAnswerSelected(index) ? "selected-answer" : null
                          }
                        >
                          {answer}
                        </li>
                      ))}
                    </ul>

                    <h7 id="questionQuizz">{questions[2]}</h7>
                    {questions && questions.length > 1 ? (
                      <ul className="quizList">
                        {choices.slice(2, 4).map((answer, index) => (
                          <li
                            onClick={() => onAnswerSelected(index + 2)}
                            key={answer}
                            className={
                              isAnswerSelected(index + 2)
                                ? "selected-answer"
                                : null
                            }
                          >
                            {answer}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                ) : null}

                <ul className="quizList">
                  {questions &&
                    questions.length === 1 &&
                    choices.map((answer, index) => (
                      <li
                        onClick={() => onAnswerSelected(index)}
                        key={answer}
                        className={
                          isAnswerSelected(index) ? "selected-answer" : null
                        }
                      >
                        {answer}
                      </li>
                    ))}
                </ul>
              </div>
            </Grid>
            <Grid className="quizButton" item xs={12}>
              <div
                style={{
                  alignItems: "center",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => {
                    setShowExplanation(true);
                    setOpenDialog(true);
                  }}
                  disabled={!showExplanation}
                >
                  Explications
                </button>
              </div>
              <div
                style={{
                  alignItems: "center",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => {
                    if (showExplanation) {
                      onClickNext();
                    } else {
                      verifyAnswer(selectedAnswerIndices);
                    }
                  }}
                  disabled={selectedAnswerIndices.length === 0}
                >
                  {activeQuestion === quizz.length - 1 && showResult
                    ? "Finish"
                    : showExplanation
                    ? "Next"
                    : "Submit"}
                </button>
              </div>
            </Grid>
          </div>
        ) : (
          <div className="result">
            <h3>Result</h3>
            <div
              style={{
                alignItems: "center",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{ width: "50px" }}
                alt="road"
                src="../images/ok.gif"
              />
            </div>

            <p>
              Total Question: <span>{quizz.length}</span>
            </p>
            <p>
              Total Score:<span> {result.score}</span>
            </p>
            <p>
              Correct Answers:<span> {result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers:<span> {result.wrongAnswers}</span>
            </p>
            <div
              style={{
                alignItems: "center",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button onClick={() => navigate("/home")}>Continuer</button>
            </div>
          </div>
        )}
        <Dialog open={openDialog}>
          <DialogTitle>Explications</DialogTitle>
          <DialogContent>{explaination}</DialogContent>
          <DialogActions>
            <button
              onClick={playAudioResponse}
              className={classes.orangeTonalBtn}
            >
              <VolumeUpIcon />
            </button>
            <button
              onClick={closeExplanationDialogAndNext}
              className={classes.orangeBtn}
            >
              Next
            </button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default Session;
