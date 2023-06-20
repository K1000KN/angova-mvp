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
import { Link } from 'react-router-dom';
const theme = createTheme();


function Home() {
  const theme = createTheme({
    typography: {
      fontFamily: ['IgraSans', 'Raleway', 'Arial'].join(','),
    },
   
  })
  const [show, setShow] = useState(false);

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

      <div id="navContainer">
        <Grid container direction="row" 
          sx={{display: { xs: 'none', lg: 'flex' }}}
          style={{
            width:'85%',
            backgroundColor:'#F49E4C',
            height:'60%', borderRadius:30,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            color:'white'
          }}
        > 
          <Grid item xs={4} sx={{display: 'flex' ,flexDirection:'column' ,alignItems:'start', paddingLeft:'5vw' }}> <img style={{width:45}} onClick={() => { setShow(true)}} src="./images/france.png" /> </Grid>
          <Grid item xs={4} sx={{display:'flex' ,flexDirection:'column' ,alignItems:'center' }}> <img style={{ width:130}} alt='road' src='./images/logo2.png'/> </Grid>
          <Grid item xs={4} sx={{display: 'flex' ,flexDirection:'column' ,alignItems:'end', paddingRight:'5vw'}}>
            <Link to="/profil">
              <img style={{width:45, marginTop: "9px"}} src='./images/user.png' alt='profil' />
            </Link> 
          </Grid>
         
        </Grid>
        <Grid container direction="row" 
          sx={{display: { xs: 'flex', lg: 'none' }}}
          style={{
            width:'100%',
            backgroundColor:'#F49E4C',
            height:'100%', 
            paddingTop:"2.5vh",
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            color:'white'
          }}
        > 
          <Grid item xs={4} sx={{display: 'flex' ,flexDirection:'column' ,alignItems:'start', paddingLeft:'5vw' }}> <img style={{width:45}} onClick={() => { setShow(true)}} src="./images/france.png" /> </Grid>
          <Grid item xs={4} sx={{display:'flex' ,flexDirection:'column' ,alignItems:'center' }}> <img style={{ width:130}} alt='road' src='./images/logo2.png'/> </Grid>
          <Grid item xs={4} sx={{display: 'flex' ,flexDirection:'column' ,alignItems:'end', paddingRight:'5vw'}}>
            <Link to="/profil">
              <img style={{width:45, marginTop: "9px"}} src='./images/user.png' alt='profil' />
            </Link> 
          </Grid>
          <Grid item xs={12} sx={{display:'flex' ,flexDirection:'column' ,alignItems:'center' }}> Bienvenue Auto Ecole Aire de Conduite </Grid>
         
        </Grid>

      </div>
        <Grid container direction="row" style={{height:"92vh"}}>
            <Grid item lg={3} sx={{flexDirection:'column' ,alignItems:'end' ,display: { xs: 'none', lg: 'flex' }}}>
              <button className='btn-section' ><img src='./home.png'alt='' style={{width:40, marginRight:15}}/><span className='btn-section-title' >SESSION DE CODE</span></button>
            </Grid>
            <Grid item xs={12}  sx={{flexDirection:'column' ,alignItems:'center', display: { xs: 'flex', lg: 'none' }}} >
              <button className='btn-section' ><img src='./home.png'alt='' style={{width:40, marginRight:15}}/><span className='btn-section-title' >SESSION DE CODE</span></button>
            </Grid>
            <Grid item xs={12} lg={8} >
              <Grid container direction="row" >
                <Grid item xs={12} lg={4}style={{display:'flex', flexDirection:"column", alignItems:'center', marginTop:35}}  >
                  <a className="container" href='/session'>
                    <img src='./images/session1.png' alt="Image Session 1" className="image"/>
                    <div className="overlay">
                      <img className="icon" src="./images/play.png" />
                    </div>
                  </a>
                    
                  <h4 style={{textAlign:"center"}}>Session 1</h4>
                </Grid>
                <Grid item xs={12} lg={4}style={{display:'flex', flexDirection:"column", alignItems:'center',marginTop:35}}  >
                  <a className="container" href='#'>
                    <img src='./images/session1.png' alt="Image Session 1" className="image"/>
                    <div className="overlay">
                        <img className="icon" src="./images/play.png" />
                    </div>
                  </a>
                  <h4 style={{textAlign:"center"}}>Session 2</h4>
                </Grid>
                <Grid item xs={12} lg={4}style={{display:'flex', flexDirection:"column", alignItems:'center',marginTop:35}}  >
                  <a className="container" href='#'>
                    <img src='./images/session1.png' alt="Image Session 1" className="image"/>
                    <div className="overlay">
                      <img className="icon" src="./images/play.png" />
                    </div>
                  </a>
                    
                  <h4 style={{textAlign:"center"}}>Session 3</h4>
                </Grid>
                <Grid item xs={12} lg={4}style={{display:'flex', flexDirection:"column", alignItems:'center',marginTop:35}}  >
                  <a className="container" href='#'>
                    <img src='./images/session1.png' alt="Image Session 1" className="image"/>
                    <div className="overlay">
                      <img className="icon" src="./images/play.png" />
                    </div>
                  </a>
                    
                  <h4 style={{textAlign:"center"}}>Session 4</h4>
                </Grid>
              </Grid>
              
            </Grid>
           
          
          </Grid> 
          <Dialog fullWidth
            maxWidth="sm" open={show} onClose={handleClose}> 
            <div style={{ display:"flex",
            flexDirection: "column",
            alignItems: 'center'}} >
   
            <DialogTitle> 
                <Typography variant="h5" style={{fontWeight:700}}>Choisir la langue du code de la route</Typography>
                <IconButton aria-label="close" style={{position: 'absolute', right: theme.spacing(1), top: theme.spacing(1),color: theme.palette.grey[500]}} 
                onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container direction="row" style={{alignItems:'center', marginBottom:40}}>
                  <Grid item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                    <img className="flag" style={{width:"50%"}} onClick={() => {showFrArticle()}} src="./images/france.png" />
                  </Grid>
                  <Grid item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                    <img className="flag" style={{width:"50%"}} onClick={() => {showUkArticle()}}  src="./images/uk.png" />
                  </Grid>
                  <Grid item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                    <img className="flag" style={{width:"50%"}} onClick={() => {showAlgArticle()}} src="./images/algerie.png" />
                  </Grid>
                  <Grid item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                    <img className="flag" style={{width:"50%"}} onClick={() => {showMarocArticle()}} src="./images/maroc.png" />
                  </Grid>
                  <Grid item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                    <img className="flag" style={{width:"50%"}} onClick={() => {showTuniArticle()}} src="./images/tuni.png" />
                  </Grid>
                  <Grid item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                    <img className="flag" style={{width:"50%"}} onClick={() => {showTurcArticle()}} src="./images/turq.png" />
                  </Grid>
                  
                </Grid> 
            </DialogContent>
            </div>
          </Dialog>
       
      </ThemeProvider>

    </>
  );
}
export default Home;