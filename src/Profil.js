import './index.css';
import './home.css';
import React ,{useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BottomBar  from './components/BottomBar';
import {
  useNavigate    
} from "react-router-dom";
import NavbarComponent  from './components/Navbar';
const theme = createTheme();


function Profil() {
  const theme = createTheme({
    typography: {
      fontFamily: ['IgraSans', 'Raleway', 'Arial'].join(','),
    },
   
  })
  const [show, setShow] = useState(false);
  const [value, setValue] = React.useState('profil');
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue == "code"){
      navigate("/home");
    }
  };


  localStorage.setItem('langue', 'fr');
  

  useEffect(()=>{
    setShow(true)
  }, [])
  const handleClose = () => {
    setShow(false);
  };
  const showUkArticle = async ()=> {
    // setter
    localStorage.setItem('langue', 'uk');
    //localStorage.getItem('langue');
  }
  const showSpainArticle = async ()=> {
    // setter
    localStorage.setItem('langue', 'spain');
    //localStorage.getItem('langue');
  }
  const showTurcArticle = async ()=> {
    // setter
    localStorage.setItem('langue', 'turc');
    //localStorage.getItem('langue');
  }
  const showFrArticle = async ()=> {
    // setter
    localStorage.setItem('langue', 'fr');
    //localStorage.getItem('langue');
  }
  const showMarocArticle = async ()=> {
    // setter
    localStorage.setItem('langue', 'maroc');
    //localStorage.getItem('langue');
  }
  const showAlgArticle = async ()=> {
    // setter
    localStorage.setItem('langue', 'alg');
    //localStorage.getItem('langue');
  }
  const showTuniArticle = async ()=> {
    // setter
    localStorage.setItem('langue', 'tuni');
    //localStorage.getItem('langue');
  }

  return (
   
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <NavbarComponent setShow= {setShow} page={value}/>
        <Grid container direction="row" style={{height:"94vh"}}>
          
        
        </Grid> 
        
       
        
        <Dialog fullWidth
          maxWidth="sm" open={show} onClose={handleClose}> 
          <div style={{ display:"flex",
          flexDirection: "column",
          alignItems: 'center'}} >
  
          <DialogTitle> 
              <Typography variant="h5" id="titlePopupFlag" style={{fontWeight:700}}>Choisir la langue du code de la route</Typography>
              <IconButton aria-label="close" style={{position: 'absolute', right: theme.spacing(1), top: theme.spacing(1),color: theme.palette.grey[500]}} 
              onClick={handleClose}>
                  <CloseIcon />
              </IconButton>
          </DialogTitle>
          <DialogContent>
              <Grid container direction="row" style={{alignItems:'center', marginBottom:40}}>
                <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                  <img className="flag" style={{width:"50%"}} onClick={() => {showFrArticle()}} src="./images/france.png" />
                </Grid>
                <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                  <img className="flag" style={{width:"50%"}} onClick={() => {showUkArticle()}}  src="./images/uk.png" />
                </Grid>
                <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                  <img className="flag" style={{width:"50%"}} onClick={() => {showAlgArticle()}} src="./images/algerie.png" />
                </Grid>
                <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                  <img className="flag" style={{width:"50%"}} onClick={() => {showMarocArticle()}} src="./images/maroc.png" />
                </Grid>
                <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                  <img className="flag" style={{width:"50%"}} onClick={() => {showTuniArticle()}} src="./images/tuni.png" />
                </Grid>
                <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                  <img className="flag" style={{width:"50%"}} onClick={() => {showTurcArticle()}} src="./images/turq.png" />
                </Grid>
                
              </Grid> 
          </DialogContent>
          </div>
        </Dialog>
        <BottomBar handleChange= {handleChange}
         value={value}/>
         
      </ThemeProvider>
      
    </>
  );
}
export default Profil;