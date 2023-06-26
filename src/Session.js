import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./session.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { quiz } from "./data/questions";
import ProgressBar from "./components/ProgressBar";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { session1 } from "./data/sessions/fr/session_1";
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
      "https://upnow-prod.ff45e40d1a1c8f7e7de4e976d0c9e555.r2.cloudflarestorage.com/Wz37iLOI6af22lRY2hza3O958kC3/6429315b-1f69-4a3f-9992-3f11281705bd?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=cdd12e35bbd220303957dc5603a4cc8e%2F20230626%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20230626T164808Z&X-Amz-Expires=43200&X-Amz-Signature=4a8715c59f93ca8e7f524a98c16d59249f7dde2b8f24666a51762d8c327a4b20&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22House%20DarkChil.mp3%22";
    const audio = new Audio(audioSrc);

    if (isPlayingAudio) {
      // audio.pause();
    } else {
      setIsPlayingAudio(true);

      audio.play();
      audio.ended.then(() => {
        setIsPlayingAudio(false);
      });
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

  const { questions } = session1;
  const { question, choices, correctAnswer, explaination } =
    questions[activeQuestion];

  const onClickNext = () => {
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setSelectedAnswerIndices([]);
      setShowExplanation(false);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setCompleted(((activeQuestion + 1) / questions.length) * 100);
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
                  /{addLeadingZero(questions.length)}
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
                src="./images/test_img.png"
              />
            </Grid>
            <Grid item xs={12} id="quizContainer">
              <h7 id="questionQuizz">{question}</h7>
              <div>
                <ul className="quizList">
                  {choices.map((answer, index) => (
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
                  {activeQuestion === questions.length - 1 && showResult
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
              <img style={{ width: "50px" }} alt="road" src="./images/ok.gif" />
            </div>

            <p>
              Total Question: <span>{questions.length}</span>
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
