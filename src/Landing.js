import './index.css';
import React, {useRef} from 'react';
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
import LoginForm from './components/LoginForm';
import FlagIcon from '@mui/icons-material/Flag';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
import RequestForm from './components/RequestForm';
import MultiCarousel from './components/MultiCarousel';
import ReviewCard from './components/ReviewCard';
import BurgerMenu from './components/BurgerMenu';

function Landing() {
  
  const refCode = useRef(null);
  const refDesc = useRef(null);
  const refQuestion = useRef(null);

  const theme = createTheme({
    typography: {
      fontFamily: ['IgraSans', 'Raleway', 'Arial'].join(','),
    },
   
  })
  const appItem =  {
    color: "#000",
    cursor: "pointer",
    "&:hover":{
      color:"#F49E4C"
    }
  }
  
  const iconStyle ={color:'#F49E4C', stroke: "black",
  strokeWidth: 1, fontSize:30};
  
 

  
  const [openLogin, setOpenLogin] = React.useState(false);

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const [openRegister, setOpenRegister] = React.useState(false);
  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };
  const handleCloseRegister = () => {
    setOpenRegister(false);
  };
  const scrollToCode = () => {
    refCode.current?.scrollIntoView({behavior: 'smooth'});
  };
 
  const scrollToQuestion = () => {
    refQuestion.current?.scrollIntoView({behavior: 'smooth'});
  };
  
  const changeBackgroundColor = () => {
    document.getElementsByClassName("flagPopup").style.backgroundColor= "rgba(216, 216, 216, 0.56)";
  };
  return (
   

    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar  sx={{ borderBottom: 2,borderColor:'#D9DBE0', height: 80, justifyContent:'center' }} style={{ background: '#FFFF'}} elevation={0} position='fixed'>
          
          <Grid container direction="row" style={{marginLeft:"8%"}}>
            
            <Grid item sx={{ display: { xs: 'block', lg: 'none' }}}>
              <BurgerMenu  
                scrollToQuestion={scrollToQuestion}
                scrollToCode={scrollToCode}
                handleClickOpenLogin={handleClickOpenLogin}
              />
            </Grid>
            <Grid item xs={9} md={6} >
              <img style={{ width:130}} alt='road' src='./images/logo.png'/>
            </Grid>
           
            
          
            <Grid item 
              style={{display: "flex", alignItems: "center", justifyContent: "center"}}
              onMouseOver={() => {
                document.getElementById("overlayGrid").style.backgroundColor= "rgba(216, 216, 216, 0.56)";
                document.getElementById("overlayGrid").style.borderRadius= "10px";
                document.getElementById("overlayLangue").style.display = "block";
                //f49d4c5e
              }} 
              onMouseLeave={() => {
                document.getElementById("overlayGrid").style.backgroundColor= "rgba(216, 216, 216, 0)";
                document.getElementById("overlayLangue").style.display = "none";
              }}  
              xs={3} 
             
              sx={{ display: { xs: 'none', lg: 'block' }}}>
              <div   id="overlayGrid" style={{display: "flex", alignItems: "center", justifyContent: "center", width:'75%'}} >
                <Toolbar> <Typography  variant="h7" style={{color:'black'}}>Langue du site :</Typography></Toolbar>
                <img  style={{width:45, borderRadius: 5}} 
                  src="./images/france2.png" 
                />
              </div>
             
              <div id='overlayLangue'>
                <div className='flagPopup' onMouseOver={ () => {
                      document.getElementsByClassName("flagPopup").style.backgroundColor= "rgba(216, 216, 216, 0.56)";
                    }}  style={{display: "flex", alignItems: "center", padding:20}}>
                  <img  style={{width:35, borderRadius: 5}} 
                    src="./images/france2.png" 
                  />
                  <span style={{color:'black',marginLeft:24}}> Francais</span>
                </div>
                <div className='flagPopup' style={{display: "flex", alignItems: "center", padding:20}}>
                  <img  style={{width:35, borderRadius: 5}} 
                    src="./images/arabe.jpeg" 
                  />
                  <span style={{color:'black', marginLeft:24}}> Arabe</span>
                </div>
                <div className='flagPopup'  style={{display: "flex", alignItems: "center", padding:20}}>
                  <img  style={{width:35, borderRadius: 5}} 
                    src="./images/france2.png" 
                  />
                  <span style={{color:'black', marginLeft:24}}> Espagnol</span>
                </div>
                <div className='flagPopup' style={{display: "flex", alignItems: "center", padding:20}}>
                  <img  style={{width:35, borderRadius: 5}} 
                    src="./images/france2.png" 
                  />
                  <span style={{color:'black', marginLeft:24}}> Anglais</span>
                </div>
                <div className='flagPopup'  style={{display: "flex", alignItems: "center", padding:20}}>
                  <img  style={{width:35, borderRadius: 5}} 
                    src="./images/france2.png" 
                  />
                  <span style={{color:'black', marginLeft:24}}> Turc</span>
                </div>
                
              </div> 
            </Grid>
            
            
            <Grid item xs={2} sx={{ display: { xs: 'none', lg: 'block' }}} >
                <Button 
                   onClick={handleClickOpenLogin}
                   sx={{textTransform: "none", boxShadow: 0}}
                  style={{ width:"10vw", height:40, backgroundColor:'#F49E4C',marginTop:11,
                  borderRadius: 20}}
                  variant='contained' >Connexion
                </Button>                        
            </Grid>
          </Grid> 
        </AppBar>
        
        <div style={{width:"100%", height:'10vh'}} ref={refCode}></div>
        <Grid  container direction='row' className='gridContainer' justifyContent='center' > 
          <Grid className='codeDeLaRoute'  item xs={12} lg={5}  >
            <Typography className='title' >Code de la route </Typography>
            <Typography id='title2'>traduit dans la langue de votre choix</Typography>
            <Grid container direction='column' justifyContent='center'  sx={{ display: { xs: 'block', lg: 'none' } }}>

              <MultiCarousel/>
             
              <Player/>
            </Grid>
            <Typography id="callToAction">
              Pour plus de vidéo :
            </Typography>
            
            <Button   onClick={handleClickOpenRegister} className="btnRegister" variant='contained' 
            startIcon={<AppRegistrationIcon/>}>Inscrivez-vous GRATUITEMENT</Button>
          
          
          </Grid>
          <Grid id="player1" style={{ paddingLeft:30, marginTop: "7vh"}}  sx={{ display: { xs: 'none', lg: 'block' }}} item xs={7}>
            
            <MultiCarousel/>
            <Player/>

          </Grid>
          
        </Grid>
        <RegistrationForm 
         open= {openRegister}
         handleClose={handleCloseRegister}
        />
         <LoginForm 
         open= {openLogin}
         handleClose={handleCloseLogin}
        />
        <div className='scrollerPoint'  ref={refDesc}></div>
        <Divider sx={{marginLeft: '10%', marginRight: '10%', borderBottomWidth: 2 }} variant="middle" />
        <Grid id="descContainer" container  direction="row" justifyContent='center'>
          <Grid item xs={12} md={5}>
            <Typography className='title' sx={{ display: { xs: 'block', md: 'none' }}}>TraduCode vous conduit <br/> à l'indépendance</Typography>
            <img style={{ width:"96%"}} alt='road' src='./images/car.gif'/>
          </Grid>
          <Grid  item xs={12} md={6}>
            <Typography className='title' sx={{ display: { xs: 'none', md: 'block' }}}>TraduCode vous conduit <br/> à l'indépendance</Typography>
            <Grid id='descWrapper' container direction="row" >
              <Grid item xs={12} md={6} style={{padding:20}}>
                  <FlagIcon style={iconStyle}/>
                  <Typography className='title3'  >
                    NOTRE OBJECTIF
                  </Typography>
                  <Typography style={{fontSize: 18,fontFamily:"'Raleway', 'Arial'"}} >
                    Angova a pour objectif de rendre l'apprentissage de la conduite accessible à tout le monde.
                  </Typography>
              </Grid>
              <Grid item xs={12} md={6} style={{padding:20}}>
                  <HelpIcon style={iconStyle}/>
                  <Typography className='title3' >
                    POURQUOI
                  </Typography>
                  <Typography style={{fontSize: 18,fontFamily:"'Raleway', 'Arial'"}} >
                    En cas de surdité ou d'incompréhension de la langue française, le code de la route est difficilement accessible.
                    Les solutions sont rares et coûteuses.
                  </Typography>
              </Grid>
              <Grid item xs={12} md={6} style={{paddingLeft:21}}>
                  <SearchIcon style={iconStyle}/>
                  <Typography className='title3'  >
                    COMMENT
                  </Typography>
                  <Typography style={{fontSize: 18,fontFamily:"'Raleway', 'Arial'"}} >
                    Pour répondre à ces problématiques, l'application web Angova propose le code de la route traduit en LSF et dans un large choix de langues.
                  </Typography>
              </Grid>
            </Grid>
          

          </Grid>
        </Grid>
        <div  className='scrollerPoint2' ref={refQuestion}></div>
        <Divider sx={{marginLeft: '10%', marginRight: '10%', borderBottomWidth: 2 }} variant="middle" />
        <Grid container  
          direction="row" 
          justifyContent='center' 
          className='contactezNous' 
        >

          <Grid className='contactWrapper' sx={{ display: { xs: 'none', md: 'block' }}} item xs={12} md={6} >
            <Typography className='title' id="titleContact" >Contactez-nous</Typography>
            <ReviewCard/>                  
          </Grid>
          <Grid item xs={12} lg={6} id='requestForm'  >
            <Typography className='title' id="titleContact" sx={{ display: { xs: 'block', md: 'none' }}} >Contactez-nous</Typography>
            <RequestForm/>
          </Grid>
          <Grid className='contactWrapper' sx={{ display: { xs: 'block', md: 'none' }}}  item xs={12} md={6} >
            <ReviewCard/>                  
          </Grid>
        </Grid>
        
        <Grid container direction='row'  alignItems='center' xs ={12} 
          style={{backgroundColor:'#000', height: "37vh"}}>

        </Grid>
      </ThemeProvider>
    </>
  );
}

export default Landing;
