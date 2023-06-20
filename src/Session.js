import React, { useState,useEffect } from 'react'
import './session.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { quiz } from './data/questions'
import ProgressBar from "./components/ProgressBar";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Session() {
  const theme = createTheme({
    typography: {
      fontFamily: ['IgraSans', 'Raleway', 'Arial'].join(','),
    },
   
  })
  const [completed, setCompleted] = useState(0);

  // useEffect(() => {
  //   setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  // }, []);

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
    setCompleted((((activeQuestion+1)/40)*100)*10);
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
  const handleLeave = () => {
    console.log('ok');
  };
  return (
    <>
     <ThemeProvider theme={theme}>
        <CssBaseline />
        {!showResult ? (
        <div>
          <Grid container direction="row" >
            <Grid item sm={1.8}  sx={{display: { xs: 'none', sm: 'flex' }}} style={{ height:"6vh",paddingLeft: 18,paddingTop: 11}} >  
              <span className="active-question-no">
                {addLeadingZero(activeQuestion + 1)}
              </span>
              <span className="total-question">
                /{addLeadingZero(questions.length)}
              </span>   
                     
            </Grid>
            <Grid item xs={10} sm={7.8} id="progressContainer"  >         
              <ProgressBar bgcolor={"#F49E4C"} completed={completed} />           
            </Grid> 
            <Grid item xs={2}  style={{ height:"6vh",display: "flex",justifyContent:"center", alignItems: "center"}} >  
             
              <div id='leaveQuizz'>
                <IconButton aria-label="close"  onClick={handleLeave}>
                  <CloseIcon style={{ color: '#F49E4C' }} />
                </IconButton>
              </div>               
            </Grid>
          </Grid>
          
          <Grid id="imgContainer" item xs={10} >
            <img className='imgResponsive' alt='road' src='./images/test_img.png'/>
          </Grid>
          <Grid item xs={12} id="quizContainer"  >
            
            <h7 id="questionQuizz">{question} </h7>
            
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
          <Grid className='quizButton' item xs={12}  >
            <div style={{alignItems:"center", width:"100%", display: "flex",alignItems: "center",justifyContent: "center"}}>
              <button              
                onClick={onClickPast}
                disabled={false}>
               Passer
              </button>
            </div>
            <div style={{alignItems:"center", width:"100%", display: "flex",alignItems: "center",justifyContent: "center"}}>
              <button              
                onClick={onClickNext}
                disabled={selectedAnswerIndex === null}>
                {activeQuestion === questions.length - 1 ? 'Finir' : 'Valider'}
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