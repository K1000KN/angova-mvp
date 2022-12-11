import './index.css';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Player from './components/Player';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RegistrationForm from './components/RegistrationForm';
import FlagIcon from '@mui/icons-material/Flag';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
import RequestForm from './components/RequestForm';
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ['IgraSans', 'Raleway', 'Arial'].join(','),
    }
  })
  const styleFlag= { margin: '10px', width:'60px'}
  const showUkArticle = async ()=> {
    // var apiResponse = await fetch(`https://newsapi.org/v2/sources?apiKey=ecae1c873b6f419eb922a2078e805a2e&country=us`);
    // var response = await apiResponse.json();
    // setSourceList(response.sources)
  }
  const showFrArticle = async ()=> {
    // var apiResponse = await fetch(`https://newsapi.org/v2/sources?apiKey=ecae1c873b6f419eb922a2078e805a2e&country=fr`);
    // var response = await apiResponse.json();
    // setSourceList(response.sources)
  }
  const showMarocArticle = async ()=> {
    // var apiResponse = await fetch(`https://newsapi.org/v2/sources?apiKey=ecae1c873b6f419eb922a2078e805a2e&country=fr`);
    // var response = await apiResponse.json();
    // setSourceList(response.sources)
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
   
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar  sx={{ borderBottom: 2,borderColor:'#D9DBE0', height: 80, justifyContent:'center' }} style={{ background: '#FFFF'}} elevation={0} position='fixed'>
          <Grid container direction="row" style={{marginLeft:"8%"}}>
            <Grid item xs={5} >
              <Toolbar> <Typography  style={{color:"#000", fontWeight:800}} variant="h7">Tradu<span  style={{ color:"#F49E4C"}}>Code</span></Typography></Toolbar>
            </Grid>
            <Grid item xs={2} >
              <Toolbar> <Typography style={{color:"#000"}} variant="h6">Code de la route</Typography></Toolbar>
            </Grid>
            <Grid item xs={2} >
              <Toolbar> <Typography style={{color:"#000"}} variant="h6">Ce que nous faisons</Typography></Toolbar>
            </Grid>
            <Grid item xs={2} >
              <Toolbar> <Typography style={{color:"#000"}} variant="h6">Nous contacter</Typography></Toolbar>
            </Grid>
          
          </Grid> 
        </AppBar>
        <Grid container  direction='row'  justifyContent='center' style={{marginTop:76, paddingLeft:20, paddingRight:30}}> 
          <Grid style={{paddingTop:60, paddingLeft:80}} item xs={5} >
            <Typography style={{fontSize: 55}}>Code de la route </Typography>
            <Typography style={{fontSize: 41}}>traduit dans la langue de votre choix</Typography>
            
            <Typography style={{fontSize: 27, marginTop:"25vh", marginBottom:10}}>
              Pour plus de vidéo :
            </Typography>
            
            <Button onClick={handleClickOpen} style={{ width:"95%", height:65, backgroundColor:'#F49E4C'}}variant='contained' 
            startIcon={<AppRegistrationIcon/>}>Inscrivez-vous</Button>
          
          
          </Grid>
          <Grid style={{ paddingLeft:30}}  item xs={7}>
            <div style={{textAlign: 'center'}}>
              <img src='./images/maroc.png' onClick={() => {showMarocArticle()}} style={styleFlag}/>
              <img src='./images/algerie.png' onClick={() => {showMarocArticle()}} style={styleFlag}/>
              <img src='./images/tuni.png' onClick={() => {showMarocArticle()}} style={styleFlag}/>
              <img src='./images/france.png' onClick={() => {showFrArticle()}} style={styleFlag}/>
              <img src='./images/turq.png' onClick={() => {showFrArticle()}} style={styleFlag}/>
              <img src='./images/uk.png' onClick={() => {showUkArticle()}} style={styleFlag}/>
              <img src='./images/albanie.png' onClick={() => {showFrArticle()}} style={styleFlag}/>
              <img src='./images/roumanie.png' onClick={() => {showFrArticle()}} style={styleFlag}/>

            </div>
            <Player/>
          </Grid>
        
        </Grid>
        <RegistrationForm
         open= {open}
         handleClose={handleClose}
        />
        <Divider sx={{marginLeft: '10%', marginRight: '10%', borderBottomWidth: 2 }} variant="middle" />
        <Grid container  direction="row" justifyContent='center'
         style={{marginTop:86, paddingLeft:20, paddingRight:30, marginBottom: 86}}>
          <Grid item xs={6}>
            <img style={{ height:"64vh"}} alt='road' src='./images/road.png'/>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{fontSize: 47}}>What we do</Typography>
            <Grid container direction="row" style={{marginTop:60, paddingRight:"14%"}}>
              <Grid item xs={6} style={{padding:20}}>
                  <FlagIcon/>
                  <Typography style={{fontSize: 20,fontFamily:"'Raleway', 'Arial'",fontWeight:"bold"}} >
                    NOTRE OBJECTIF
                  </Typography>
                  <Typography style={{fontSize: 18,fontFamily:"'Raleway', 'Arial'"}} >
                    TraduCode a pour objectif de rendre l'apprentissage de la conduite accessible à tout le monde.
                  </Typography>
              </Grid>
              <Grid item xs={6} style={{padding:20}}>
                  <HelpIcon/>
                  <Typography style={{fontSize: 20,fontFamily:"'Raleway', 'Arial'",fontWeight:"bold"}} >
                    POURQUOI
                  </Typography>
                  <Typography style={{fontSize: 18,fontFamily:"'Raleway', 'Arial'"}} >
                    TraduCode a pour objectif de rendre l'apprentissage de la conduite accessible à tout le monde.
                  </Typography>
              </Grid>
              <Grid item xs={6} style={{paddingLeft:21}}>
                  <SearchIcon/>
                  <Typography style={{fontSize: 20,fontFamily:"'Raleway', 'Arial'",fontWeight:"bold"}} >
                    COMMENT
                  </Typography>
                  <Typography style={{fontSize: 18,fontFamily:"'Raleway', 'Arial'"}} >
                    TraduCode a pour objectif de rendre l'apprentissage de la conduite accessible à tout le monde.
                  </Typography>
              </Grid>
            </Grid>
          

          </Grid>
        </Grid>
       
        <Divider sx={{marginLeft: '10%', marginRight: '10%', borderBottomWidth: 2 }} variant="middle" />
        <Grid container  
          direction="row" 
          justifyContent='center' 
          style={{marginTop:80,marginBottom:100, paddingLeft:20, paddingRight:30}}>
          <Grid item xs={6}  style={{paddingLeft: "14%"}}>
            <Typography style={{fontSize: 47, marginLeft: "3%"}}>Nous contacter</Typography>
          </Grid>
          <Grid item xs={5} style={{marginTop:110, paddingLeft:"4%"}} >
            <RequestForm/>
          </Grid>
        </Grid>
      </ThemeProvider>

    </>
  );
}

export default App;
