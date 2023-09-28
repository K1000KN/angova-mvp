import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./session.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Grid } from "@mui/material";
import ProgressBar from "./components/ProgressBar";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { VolumeUp, VolumeOff } from "@mui/icons-material";
import ReactHowler from 'react-howler';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ImageSessionHandler from "./components/ImageSessionHandler";
import { useTranslation } from "react-i18next";

import jsonDataFr from "./data/content_fr.json";
import jsonDataEs from "./data/content_es.json";
//import jsonDataEn from "./data/content_en.json";
import jsonDataMa from "./data/content_fr.json";
import {
  processSessions,
  filterSessionsByLanguage,
} from "./services/sessionService";
import AudioS3 from "./components/AudioS3";

import FeedGet from "./components/FeedGet";

const Session = () => {
  const { t } = useTranslation();
  const [completed, setCompleted] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndices, setSelectedAnswerIndices] = useState([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const [showExplanation, setShowExplanation] = useState(false);

  // GESTION DES AUDIOS
  const [activeSource, setActiveSource] = useState(null);

  const handleAudioToggle = (source) => {
    // Pause the previously active audio source
    if (activeSource && activeSource !== source) {
      setActiveSource(null);
    }
    // Set the currently active source
    setActiveSource(source);
  };

 

  
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
    closeButton: {
      position: "absolute !important",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
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

  const highlightCorrectAnswers = (correctAnswer) => {
    const answerListItems = document.querySelectorAll(".quizList li");
    answerListItems.forEach((item, index) => {
      if (correctAnswer.includes(index)) {
        item.classList.add("correct-answer");
      }
    });
  };

  const highlightWrongAnswers = (indices, correctAnswer) => {
    const answerListItems = document.querySelectorAll(".quizList li");
    answerListItems.forEach((item, index) => {
      if (indices.includes(index)) {
        if (correctAnswer.includes(index)) {
          item.classList.add("correct-answer");
        } else {
          item.classList.add("wrong-answer");
        }
      }
    });
  };

  const verifyAnswer = (
    indices,
    correctAnswer,
    setShowExplanation,
    setResult
  ) => {

    const isCorrect = arraysEqual(indices, correctAnswer);

    if (isCorrect) {
      setResult((prevResult) => ({
        ...prevResult,
        score: prevResult.score + 1,
        correctAnswers: prevResult.correctAnswers + 1,
      }));
    } else {
      setResult((prevResult) => ({
        ...prevResult,
        wrongAnswers: prevResult.wrongAnswers + 1,
      }));
    }

    setShowExplanation(true);
    highlightCorrectAnswers(correctAnswer);
    highlightWrongAnswers(indices, correctAnswer);
  };

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

  const createSessionData = (language, jsonData) => {
    return jsonData.map((session) => {
      const imgPaths = [];

      if (session.multiple && session.multiple === true) {
        // Si session.multiple existe et est true
        imgPaths.push(`/session/q${session.id}/q${session.id}_1.jpg`);
        imgPaths.push(`/session/q${session.id}/q${session.id}_2.jpg`);
      } else {
        // Si session.multiple n'existe pas ou est false
        imgPaths.push(`/session/q${session.id}/q${session.id}.jpg`);
      }

      return {
        id: session.id,
        language: language,
        questions: session.questions,
        choices: session.choices,
        correctAnswer: session.correctAnswer,
        explanation: session.explanation,
        assets: {
          img: imgPaths,
          audio: `/session/q${session.id}/${language}/q${session.id}.mp3`,
          explanation: `/session/q${session.id}/${language}/exp${session.id}.mp3`,
        },
      };
    });
  };

  const sessionFR = createSessionData("fr", jsonDataFr);
  const sessionES = createSessionData("es", jsonDataEs);
  const sessionMA = createSessionData("ma", jsonDataMa);
  const batchSize = 40;
  const sessions = [];
  const selectedLanguage = localStorage.getItem("language");

  switch (selectedLanguage) {
    case "fr":
      sessions.push(...processSessions(sessionFR, batchSize, t));
      break;
    case "es":
      sessions.push(...processSessions(sessionES, batchSize, t));
      break;
    case "en":
      //   sessions.push(...processSessions(sessionEN, batchSize, t));
      break;
    case "ma":
      sessions.push(...processSessions(sessionMA, batchSize, t));
      break;
    case "dz":
      // sessions.push(...processSessions(sessionDZ, batchSize, t));
      break;
    case "tn":
      // sessions.push(...processSessions(sessionTN, batchSize, t));
      break;
    // ... cases for other languages ...
    default:
      break;
  }

  const filteredSessions = filterSessionsByLanguage(sessions, selectedLanguage);
  const getSessionData = (id) => {
    const sessionData = filteredSessions.find(
      (session) => session.id === parseInt(id)
    );
    return sessionData;
  };

  const sessionData = getSessionData(id);
  
  // Handle invalid session ID or language not supported
  if (!sessionData) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#F49E4C",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          {sessionData === undefined
            ? t("invalid-session")
            : t("forbidden-language")}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#F49E4C",
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Arrive bientot
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/home")}
        >
          Retourner en arrière
        </Button>
      </div>
    );
  }

  const { questions, choices, correctAnswer, explanation, assets } =
    sessionData[activeQuestion];

  const onClickNext = () => {
    // Verify the answer before proceeding to the next question
    verifyAnswer(
      selectedAnswerIndices,
      correctAnswer,
      setShowExplanation,
      setResult
    );

    // Remove highlighting from all answer list items
    const answerListItems = document.querySelectorAll(".quizList li");
    answerListItems.forEach((item) => {
      item.classList.remove(
        "selected-answer",
        "correct-answer",
        "wrong-answer"
      );
      item.classList.add("answer-untouched");
    });

    // Reset state variables and move to the next question
    if (activeQuestion !== sessionData.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setSelectedAnswerIndices([]);
      setSelectedAnswerIndex(null);
      setShowExplanation(false); // Hide the explanation
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setCompleted(((activeQuestion + 1) / sessionData.length) * 100);
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

  const closeExplanationDialogAndNext = () => {
    setShowExplanation(false);
    setOpenDialog(false);
    setSelectedAnswerIndices([]);
    setSelectedAnswerIndex(null);
    onClickNext();
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!showResult ? (
          <div>
            <div className="scroll-container">
              <Grid
                container
                direction="row"
                style={{
                  position: "fixed",
                  backgroundColor: "#FFFFFFE6",
                  borderRadius: "0px 0px 10px 10px",
                  height: "6vh",
                }}
              >
                <Grid
                  item
                  sm={1.8}
                  sx={{ display: { xs: "none", sm: "flex" } }}
                  style={{ height: "6vh", paddingLeft: 18, paddingTop: 10 }}
                >
                  <span className="active-question-no">
                    {addLeadingZero(activeQuestion + 1)}
                  </span>
                  <span className="total-question">
                    /{addLeadingZero(sessionData.length)}
                  </span>
                </Grid>
                <Grid item xs={10} sm={7} id="progressContainer">
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "80px",
                }}
              >
                <ImageSessionHandler content={assets.img} />
              </div>

              <Grid item xs={12} id="quizContainer">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  {assets.audio && (
                    <AudioS3
                      source={assets.audio}
                      onAudioToggle={handleAudioToggle}
                      activeSource={activeSource}
                    />
                  )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <FeedGet />
                  <div
                    style={{
                      width: "20px",
                    }}
                  ></div>

                </div>
                
                {questions && questions.length > 1 ? (
                  <>
                    <Typography variant="h6" id="questionQuizz">
                      {questions[0]}
                    </Typography>
                    <br />
                    <br />
                    <Typography variant="h6" id="questionQuizz">
                      {questions[1]}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" id="questionQuizz">
                      {questions}
                    </Typography>
                  </>
                )}
                <div>
                  {questions && questions.length > 1 ? (
                    <>
                      <ul className="quizList">
                        {choices.slice(0, 2).map((answer, index) => (
                          <li
                            onClick={() => {
                              if (showExplanation) {
                                return null;
                              } else {
                                onAnswerSelected(index);
                              }
                            }}
                            key={answer}
                            className={
                              isAnswerSelected(index) ? "selected-answer" : null
                            }
                          >
                            <span
                              className="answer-index"
                              style={{
                                marginRight: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              {index === 0
                                ? "A"
                                : index === 1
                                ? "B"
                                : index === 2
                                ? "C"
                                : "D"}
                            </span>
                            {answer}
                          </li>
                        ))}
                      </ul>
                      <br />
                      <Typography variant="h6" id="questionQuizz">
                        {questions[2]}
                      </Typography>
                      {questions && questions.length > 1 ? (
                        <ul className="quizList">
                          {choices.slice(2, 4).map((answer, index) => (
                            <li
                              onClick={() => {
                                if (showExplanation) {
                                  return null;
                                } else {
                                  onAnswerSelected(index + 2);
                                }
                              }}
                              key={answer}
                              className={
                                isAnswerSelected(index + 2)
                                  ? "selected-answer"
                                  : null
                              }
                            >
                              <span
                                className="answer-index"
                                style={{
                                  marginRight: "10px",
                                  fontWeight: "bold",
                                }}
                              >
                                {index === 0 ? "C" : "D"}
                              </span>
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
                          onClick={() => {
                            if (showExplanation) {
                              return null;
                            } else {
                              onAnswerSelected(index);
                            }
                          }}
                          key={answer}
                          className={
                            isAnswerSelected(index) ? "selected-answer" : null
                          }
                        >
                          <span
                            className="answer-index"
                            style={{ marginRight: "10px", fontWeight: "bold" }}
                          >
                            {index === 0
                              ? "A"
                              : index === 1
                              ? "B"
                              : index === 2
                              ? "C"
                              : "D"}
                          </span>
                          {answer}
                        </li>
                      ))}
                  </ul>
                </div>
              </Grid>
            </div>
            <Grid className="quizButton bottomNav" item xs={12}>
              <div
                style={{
                  alignItems: "center",
                  width: "100%",
                  display: "flex",
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
                  {t("explications")}
                </button>
              </div>

              <div
                style={{
                  alignItems: "center",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => {
                    if (showExplanation) {
                      // Mute the audio if it is playing
                      if (activeSource) {
                        setActiveSource(null);
                      }
                      closeExplanationDialogAndNext();
                    } else {
                      verifyAnswer(
                        selectedAnswerIndices,
                        correctAnswer,
                        setShowExplanation,
                        setResult
                      );
                    }
                  }}
                  disabled={selectedAnswerIndices.length === 0}
                >
                  {activeQuestion === sessionData.length - 1 && showResult
                    ? t("finir")
                    : showExplanation
                    ? t("suivant")
                    : t("valider")}
                </button>
              </div>
            </Grid>
          </div>
        ) : (
          <div className="result">
            <h3>Resultat</h3>
            <div
              style={{
                alignItems: "center",
                width: "100%",
                display: "flex",
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
              Total des questions: <span>{sessionData.length}</span>
            </p>
            <p>
              Score:<span> {result.score}</span>
            </p>
            <p>
              Bonne réponse:<span> {result.correctAnswers}</span>
            </p>
            <p>
              Mauvaise réponse:<span> {result.wrongAnswers}</span>
            </p>
            <div
              style={{
                alignItems: "center",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button onClick={() => navigate("/home")}>Continuer</button>
            </div>
          </div>
        )}
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>
            {t("explications")}
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>{explanation}</DialogContent>
          <DialogActions>
            {assets.explanation && (
              <AudioS3
                source={assets.explanation}
                onAudioToggle={handleAudioToggle}
                activeSource={activeSource}
              />
            )}

            <div
              style={{
                alignItems: "center",
                width: "80px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FeedGet />
            </div>
            <button
              onClick={closeExplanationDialogAndNext}
              className={classes.orangeBtn}
            >
              {t("suivant")}
            </button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default Session;
