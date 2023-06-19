import React, { useRef} from 'react';

import './index.css';
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
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SearchIcon from '@mui/icons-material/Search';
import RequestForm from './components/RequestForm';
import MultiCarousel from './components/MultiCarousel';
import ReviewCard from './components/ReviewCard';
import BurgerMenu from './components/BurgerMenu';

import { useTranslation } from 'react-i18next';
function Landing() {
  const { t, i18n } = useTranslation();
 
 
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

  const sections ={color:'#FFFF',fontSize:20, cursor: 'pointer'};
  const flexCenter = { display: "flex",alignItems: "center",justifyContent: "center"};

  
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
  const scrollToDesc = () => {
    refDesc.current?.scrollIntoView({behavior: 'smooth'});
  };
  const scrollToQuestion = () => {
    refQuestion.current?.scrollIntoView({behavior: 'smooth'});
  };
  
  const changeFlag = (lgn) => {
    console.log(lgn+".png")
    document.getElementById("flagOfLanguage").src="./images/"+lgn+".png";
  }
  
  return (
   

      
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
            <Grid item xs={4} md={4} >
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
              xs={5 } 
             
              sx={{ display: { xs: 'none', lg: 'block' }}}>
              <div   id="overlayGrid" style={{display: "flex", alignItems: "center", justifyContent: "center", width:'75%'}} >
                <Toolbar> <Typography  variant="h7" style={{color:'black'}}>{t('popup')}</Typography></Toolbar>
                <img id='flagOfLanguage' style={{width:45, borderRadius:4}} 
                  src="./images/france2.png" 
                />
              </div>
             
              <div id='overlayLangue'>
                <div className='flagPopup'
                  onClick={()=>{
                    i18n.changeLanguage("fr");
                    changeFlag("france2");
                  }}
                >
                  <img  style={{width:35, borderRadius: 3}} 
                    src="./images/france2.png" 
                  />
                  <span style={{color:'black',marginLeft:24}}>  {t('lgn1')}</span>
                </div>

                <div className='flagPopup'
                  onClick={()=>{
                    i18n.changeLanguage("fr");
                    changeFlag("arabe");
                  }}
                >
                  <img  style={{width:35, borderRadius: 3}} 
                    src="./images/arabe.png" 
                  />
                  <span style={{color:'black', marginLeft:24}}> {t('lgn2')}</span>
                </div>

                <div className='flagPopup' 
                  onClick={()=>{
                    i18n.changeLanguage("fr");
                    changeFlag("espagne2");
                  }}
                >
                  <img  style={{width:35, borderRadius: 3}} 
                    src="./images/espagne2.png" 
                  />
                  <span style={{color:'black', marginLeft:24}}> {t('lgn3')}</span>
                </div>

                <div className='flagPopup'
                  onClick={()=>{
                    i18n.changeLanguage("en");
                    changeFlag("uk2");
                  }}
                >
                  <img  style={{width:35, borderRadius: 3}} 
                    src="./images/uk2.png" 
                  />
                  <span style={{color:'black', marginLeft:24}}> {t('lgn4')}</span>
                </div>

                <div className='flagPopup'  
                  onClick={()=>{
                    i18n.changeLanguage("en");
                    changeFlag("turc2");
                  }}
                >
                  <img  style={{width:35, borderRadius:3}} 
                    src="./images/turc2.png" 
                  />
                  <span style={{color:'black', marginLeft:24}}> {t('lgn5')}</span>
                </div>
                
              </div> 
            </Grid>
            
            
            <Grid item xs={2} sx={{ display: { xs: 'none', lg: 'block' }}} >
                <Button 
                   onClick={handleClickOpenLogin}
                   sx={{textTransform: "none", boxShadow: 0}}
                  style={{ width:"10vw", height:40, backgroundColor:'#F49E4C',marginTop:11,
                  borderRadius: 20}}
                  variant='contained' >{t('loginButton')}
                </Button>                        
            </Grid>
          </Grid> 
        </AppBar>
        
        <div style={{width:"100%", height:'10vh'}} ref={refCode} id='code'></div>
        <Grid  container direction='row' className='gridContainer' justifyContent='center' > 
          <Grid className='codeDeLaRoute'  item xs={12} lg={5}  >
            <Typography className='title' >{t('title-1.1.1')} </Typography>
            <Typography id='title2'>{t('title-1.1.2')}</Typography>
            <Grid container direction='column' justifyContent='center'  sx={{ display: { xs: 'block', lg: 'none' } }}>

              <MultiCarousel/>
             
              <Player/>
            </Grid>
            <Typography id="callToAction">
              {t('title-1.2')}
            </Typography>
            
            <Button   onClick={handleClickOpenRegister} className="btnRegister" variant='contained' 
            startIcon={<AppRegistrationIcon/>}>{t('registerButton')}</Button>
          
          
          </Grid>
          <Grid id="player1" style={{ paddingLeft:30, marginTop: "7vh"}}  sx={{ display: { xs: 'none', lg: 'block' }}} item xs={7}>
            
            <MultiCarousel/>
            <Player/>

          </Grid>
          
        </Grid>
        {/* <RegistrationForm 
         open= {openRegister}
         handleClose={handleCloseRegister}
        /> */}
         <LoginForm 
         open= {openLogin}
         handleClose={handleCloseLogin}
        />
        <div className='scrollerPoint'  ref={refDesc}></div>
        <Divider sx={{marginLeft: '10%', marginRight: '10%', borderBottomWidth: 2 }} variant="middle" />
        <Grid id="descContainer" container  direction="row" justifyContent='center'>
          <Grid item xs={12} md={5}>
            <Typography className='title' sx={{ display: { xs: 'block', md: 'none' }}}>{t('title-1.3.1')} <br/> {t('title-1.3.2')}</Typography>
            <img style={{ width:"96%"}} alt='road' src='./images/car.gif'/>
          </Grid>
          <Grid  item xs={12} md={6}>
            <Typography className='title' sx={{ display: { xs: 'none', md: 'block' }}}>{t('title-1.3.1')} <br/> {t('title-1.3.2')}</Typography>
            <Grid id='descWrapper' container direction="row" >
              <Grid item xs={12} md={6} style={{padding:20}}>
                  <FlagIcon style={iconStyle}/>
                  <Typography className='title3'  >
                    {t('objective')} 
                  </Typography>
                  <Typography style={{fontSize: 18,fontFamily:"'Raleway', 'Arial'"}} >
                    {t('objectiveP')}                   
                  </Typography>
              </Grid>
              <Grid item xs={12} md={6} style={{padding:20}}>
                  <HelpIcon style={iconStyle}/>
                  <Typography className='title3' >
                    {t('why')} 
                  </Typography>
                  <Typography style={{fontSize: 18,fontFamily:"'Raleway', 'Arial'"}} >
                    {t('whyP')} 
                  </Typography>
              </Grid>
              <Grid item xs={12} md={6} style={{paddingLeft:21}}>
                  <SearchIcon style={iconStyle}/>
                  <Typography className='title3'  >
                    {t('how')} 
                  </Typography>
                  <Typography style={{fontSize: 18,fontFamily:"'Raleway', 'Arial'"}} >
                    {t('howP')} 
                  </Typography>
              </Grid>
            </Grid>
          

          </Grid>
        </Grid>
        <div  className='scrollerPoint2' ref={refQuestion} id='contact'></div>
        <Divider sx={{marginLeft: '10%', marginRight: '10%', borderBottomWidth: 2 }} variant="middle" />
        <Grid container  
          direction="row" 
          justifyContent='center' 
          className='contactezNous' 
        >

          <Grid className='contactWrapper' sx={{ display: { xs: 'none', md: 'block' }}} item xs={12} md={6} >
            <Typography className='title' id="titleContact" >{t("title-1.3")} </Typography>
            <ReviewCard/>                  
          </Grid>
          <Grid item xs={12} lg={6} id='requestForm'  >
            <Typography className='title' id="titleContact" sx={{ display: { xs: 'block', md: 'none' }}} >{t("title-1.3")} </Typography>
            <RequestForm/>
          </Grid>
          <Grid className='contactWrapper' sx={{ display: { xs: 'block', md: 'none' }}}  item xs={12} md={6} >
            <ReviewCard/>                  
          </Grid>
        </Grid>
        
        <Grid container direction='row'   xs ={12} style={{backgroundColor:'#000', height: "30vh"}}>
          <Grid item xs={12}  md={2} sx={flexCenter}>
            <img style={{ width:160}} alt='road' src='./images/logo2.png'/>
          </Grid>
          <Grid item md={8} sx={{marginTop: "14px", display:'flex', flexDirection:'column', justifyContent:'end',display: { xs: 'none', md: 'block' }}} >
            <Grid container direction="row" sx={flexCenter} >
              <Typography style={sections} onClick={scrollToCode}> Code de la route&nbsp; . &nbsp;</Typography>
              <Typography style={sections} onClick={scrollToDesc}> Ce que nous faisons&nbsp; . &nbsp;</Typography> 
              <Typography style={sections} onClick={scrollToQuestion}> Contactez-nous</Typography> 
            </Grid>
            <Divider variant="middle" sx={{borderColor: "#FFFF",marginTop:"20px"}}/>
                      
            <Typography style={{marginTop:"165px" ,marginBottom:"10px",color:'#FFFF', fontSize: 13, textAlign:'center'}} >Copywright Angova</Typography>
            
          </Grid>
         
          <Grid item xs={12}  md={2}sx={flexCenter}>
            <img style={{ width:35, marginRight:"10px" }} alt='road' src='./images/tiktok.png'/><InstagramIcon  sx={{color:"#FFFF", fontSize:35,marginRight:"10px" }}/> <LinkedInIcon  sx={{color:"#FFFF", fontSize:35}}/>
          </Grid>
          <Grid item xs={12} sx={{marginTop:"10px", display:'flex', flexDirection:'column', justifyContent:'end',display: { xs: 'block', md: 'none' }}} >
            <Grid container direction="row" sx={flexCenter} >
              <Typography style={sections} onClick={scrollToCode}> Code de la route&nbsp; . &nbsp;</Typography>
              <Typography style={sections} onClick={scrollToDesc}> Ce que nous faisons&nbsp; . &nbsp;</Typography> 
              <Typography style={sections} onClick={scrollToQuestion}> Contactez-nous</Typography> 
            </Grid>
            <Divider variant="middle" sx={{borderColor: "#FFFF",marginTop:"10px", marginBottom:"10px"}}/>
                      
            <Typography style={{marginTop:"10px",color:'#FFFF', fontSize: 13, textAlign:'center'}} >Copywright Angova</Typography>
            
          </Grid>
        </Grid>

        
      </ThemeProvider>
    
  );
}
export default Landing;
