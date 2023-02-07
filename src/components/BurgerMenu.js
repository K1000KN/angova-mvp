import React, {forwardRef} from 'react';
import '../index.css';
import { slide as Menu } from 'react-burger-menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



export default forwardRef (({
    scrollToQuestion, 
    scrollToCode, 
    handleClickOpenLogin,   
})=>{ 
    
    
    return (
        <Menu right>
            <Typography className="menu-item"  onClick={scrollToCode} >Code de la route</Typography>
            <Typography className="menu-item"  onClick={scrollToQuestion} >Des questions ?</Typography>
            <Button 
                className="menu-item" 
                onClick={handleClickOpenLogin}
                sx={{textTransform: "none", boxShadow: 0}}
                style={{ width:"100%", height:40, backgroundColor:'#F49E4C',marginTop:11,
                borderRadius: 20}}
                variant='contained' >Connexion
            </Button>       
        </Menu>
      
    ); 
})
