import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./session.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { session1FR } from "./data/sessions/fr/session_1";
import { session1ES } from "./data/sessions/es/session_1";
// import { session2 } from "./data/sessions/fr/session_2";
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

  //const audio = new Audio( "../session/audio/fr/q1.mp3");

  useEffect(() => {
    if (isPlaying) {
      var audio = new Audio(audioSrc);
      audio.play().catch((error) => {
        console.error("Error autoplaying audio:", error);
        setIsPlaying(false);
        // Handle autoplay error here (e.g., show a UI element to manually play the audio)
      });
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [activeQuestion, isPlaying, audioSrc]);

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

  const verifyAnswer = (indices) => {
    const isCorrect = arraysEqual(indices, correctAnswer);
    highlightCorrectAnswers(indices);

    if (isCorrect) {
      setResult((prevResult) => ({
        ...prevResult,
        score: prevResult.score + 1,
        correctAnswers: prevResult.correctAnswers + 1,
      }));
    } else {
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
      if (localStorage.getItem("language") === "fr") {
        sessionData = session1FR;
      } else if (localStorage.getItem("language") === "es") {
        sessionData = session1ES;
      } else {
        return (
          <Typography
            sx={{
              color: "#F49E4C",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Language not supported
          </Typography>
        );
      }
      break;
    // case "2":
    //   sessionData = session2;
    //   break;
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
      return (
        <Typography
          sx={{
            color: "#F49E4C",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Invalid session ID or language not supported
        </Typography>
      );
  }

  let { quizz } = sessionData;
  const { questions, choices, correctAnswer, explaination, assets } =
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

  const handleToggleAudio = () => {
    setIsPlaying(!isPlaying);
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
                <PlayerSession
                  type={assets.type}
                  content={assets.img}
                  setAudioSrc={setAudioSrc}
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
                    <Typography variant="h7" id="questionQuizz">
                      {questions[0]}
                    </Typography>
                    <br />
                    <Typography variant="h7" id="questionQuizz">
                      {questions[1]}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h7" id="questionQuizz">
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
                            {answer}
                          </li>
                        ))}
                      </ul>

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
              //onClick={playAudioResponse}
              className={classes.orangeTonalBtn}
            >
              <VolumeUp />
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
