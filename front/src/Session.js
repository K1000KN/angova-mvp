import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./session.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Grid } from "@mui/material";
import {
  session1FR,
  session2FR,
  session1ES,
  session2ES,
  session3FR,
  session3ES,
} from "./data/sessions/index";
import ProgressBar from "./components/ProgressBar";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { VolumeUp, VolumeOff } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PlayerSession from "./components/PlayerSession";

const Session = () => {
  const [completed, setCompleted] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndices, setSelectedAnswerIndices] = useState([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const [openDialog, setOpenDialog] = useState(false); // State for controlling the dialog visibility

  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const [showExplanation, setShowExplanation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioSrc, setAudioSrc] = useState("");
  const [expAudioSrc, setExpAudioSrc] = useState("");
  const [isPlayingExp, setIsPlayingExp] = useState(false);

  useEffect(() => {
    if (isPlaying && isPlayingExp === false) {
      var audio = new Audio(audioSrc);
      audio.play().catch((error) => {
        console.error("Error autoplaying audio:", error);
        setIsPlaying(false);
      });
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
    if (isPlayingExp && isPlaying === false) {
      var audioExp = new Audio(expAudioSrc);
      audioExp.play().catch((error) => {
        console.error("Error autoplaying audio:", error);
        setIsPlayingExp(false);
      });
      return () => {
        audioExp.pause();
        audioExp.currentTime = 0;
      };
    }
  }, [activeQuestion, isPlaying, audioSrc, isPlayingExp, expAudioSrc]);

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

  const sessionMap = {
    1: { fr: session1FR, es: session1ES },
    2: { fr: session2FR, es: session2ES },
    3: { fr: session3FR, es: session3ES },
    // Add more sessions as needed...
  };

  const getSessionData = (id) => {
    const language = localStorage.getItem("language");
    return sessionMap[id] && sessionMap[id][language];
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
            ? "Invalid session ID"
            : "Language not supported"}
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
          Coming Soon
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/home")}
        >
          Go Back
        </Button>
      </div>
    );
  }

  let { quizz } = sessionData;
  const { questions, choices, correctAnswer, explaination, assets } =
    quizz[activeQuestion];

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
    if (activeQuestion !== quizz.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setSelectedAnswerIndices([]);
      setSelectedAnswerIndex(null);
      setShowExplanation(false); // Hide the explanation
    } else {
      console.log("Quiz completed!");
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

  const closeExplanationDialogAndNext = () => {
    setShowExplanation(false);
    setOpenDialog(false);
    setSelectedAnswerIndices([]);
    setSelectedAnswerIndex(null);
    onClickNext();
  };

  const handleToggleAudio = () => {
    setIsPlayingExp(false);
    setIsPlaying(!isPlaying);
  };
  const handleToggleAudioExp = () => {
    setIsPlaying(false);
    setIsPlayingExp(!isPlayingExp);
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
              <Grid container direction="row">
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
                    /{addLeadingZero(quizz.length)}
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

              <Grid id="imgContainer" item xs={10}>
                <PlayerSession
                  content={assets.img}
                  setAudioSrc={setAudioSrc}
                  setExpAudioSrc={setExpAudioSrc}
                  audioQuestion={assets.question}
                  audioExplaination={assets.explaination}
                />
              </Grid>
              <Grid item xs={12} id="quizContainer">
                <div style={{ width: "100%", paddingLeft: "94%" }}>
                  <button
                    className={classes.orangeTonalBtn}
                    onClick={handleToggleAudio}
                  >
                    {" "}
                    {!isPlaying ? <VolumeOff /> : <VolumeUp />}
                  </button>
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

                      <h7 id="questionQuizz">{questions[2]}</h7>
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
                  Explications
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
                  {activeQuestion === quizz.length - 1 && showResult
                    ? "Finir"
                    : showExplanation
                    ? "Suivant"
                    : "Valider"}
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
              Total des questions: <span>{quizz.length}</span>
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
            Explications
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>{explaination}</DialogContent>
          <DialogActions>
            <button
              onClick={handleToggleAudioExp}
              className={classes.orangeTonalBtn}
            >
              {!isPlayingExp ? <VolumeOff /> : <VolumeUp />}
            </button>
            <button
              onClick={closeExplanationDialogAndNext}
              className={classes.orangeBtn}
            >
              Suivant
            </button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default Session;
