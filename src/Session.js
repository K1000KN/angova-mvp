import React, { useState,useEffect } from 'react'
import './session.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { quiz } from './data/questions'
import ProgressBar from "./components/ProgressBar";


function Session() {
  const theme = createTheme({
    typography: {
      fontFamily: ['IgraSans', 'Raleway', 'Arial'].join(','),
    },
   
  })
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  }, []);

  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  const { questions } = quiz
  const { question, choices, correctAnswer } = questions[activeQuestion]

  const onClickNext = () => {
    setSelectedAnswerIndex(null)
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }

  }
  const onClickPast = () => {
    setSelectedAnswerIndex(null)
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 0,
            wrongAnswers: prev.wrongAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
   
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    } 
    console.log(activeQuestion)
  }
  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    if (answer === correctAnswer) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

  return (
    <>
     <ThemeProvider theme={theme}>
        <CssBaseline />
        {!showResult ? (
        <div>
          <Grid item xs={12} style={{ height:"6vh", display:'flex', justifyContent:'center', padding:15}} >
            <div style={{position:"absolute", marginRight:'60%'}}>
              <span className="active-question-no">
                {addLeadingZero(activeQuestion + 1)}
              </span>
              <span className="total-question">
                /{addLeadingZero(questions.length)}
              </span>
            </div>
              <ProgressBar bgcolor={"#F49E4C"} completed={completed} />
          </Grid>
          <Grid item xs={10} style={{ height:"45vh", display:'flex', justifyContent:'center', padding:15}} >
            <img className='responsive' alt='road' src='./images/test_img.png'/>
          </Grid>
          <Grid item xs={12} style={{  height:"38vh",justifyContent:'center', paddingLeft:"20%", paddingRight:"20%"}} >
              
            <h7>{question}</h7>
            <div >
              <ul className='quizList'>
                {choices.map((answer, index) => (
                  <li
                    onClick={() => onAnswerSelected(answer, index)}
                    key={answer}
                    className={
                      selectedAnswerIndex === index ? 'selected-answer' : null
                    }>
                    {answer}
                  </li>
                ))}
              </ul>
            </div>
           
              
          </Grid>
          <Grid className='quizButton' item xs={12} style={{ height:"10vh"}} >
            <div style={{alignItems:"center", width:"100%", display: "flex",alignItems: "center",justifyContent: "center"}}>
              <button              
                onClick={onClickPast}
                disabled={false}>
               PASSER
              </button>
            </div>
            <div style={{alignItems:"center", width:"100%", display: "flex",alignItems: "center",justifyContent: "center"}}>
              <button              
                onClick={onClickNext}
                disabled={selectedAnswerIndex === null}>
                {activeQuestion === questions.length - 1 ? 'Finish' : 'VALIDER'}
              </button>
            </div>
           
          </Grid>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
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
        </div>
      )}
      
       
      
     
     
    </ThemeProvider>
    </>
  );
}

export default Session;