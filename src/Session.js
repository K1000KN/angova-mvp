import './session.css';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

function Session() {
  const theme = createTheme({
    typography: {
      fontFamily: ['IgraSans', 'Raleway', 'Arial'].join(','),
    },
   
  })
  return (
    <>
     <ThemeProvider theme={theme}>
        <CssBaseline />
        
            
        <Grid item xs={12} style={{ height:"52vh", display:'flex', justifyContent:'center', padding:15}} >
            <img style={{ width:"45%"}} alt='road' src='./images/test_img.png'/>
        </Grid>
        <Grid container direction="column" xs={12} style={{ backgroundColor: 'yellow', height:"38vh",justifyContent:'center'}} >
           
            <h7>Certains médicaments pouvant être achetés sans ordonnance peuvent avoir des effets sur la conduite :</h7>
            <div style={{display:'flex', flexDirection:'row'}}>
                <div>Oui</div>
            </div>
            <div>
                <div>Non</div>
            </div>
           
        </Grid>
        <Grid item xs={12} style={{ backgroundColor: 'purple', height:"10vh"}} >
            
        </Grid>
      
     
     
    </ThemeProvider>
    </>
  );
}

export default Session;