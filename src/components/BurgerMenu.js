import React, {forwardRef} from 'react';
import '../index.css';
import { slide as Menu } from 'react-burger-menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';



export default forwardRef (({
    scrollToQuestion, 
    scrollToCode, 
    handleClickOpenLogin,   
})=>{ 
    const { t, i18n } = useTranslation();
    
    
    return (
        <Menu right>
            <Typography className="menu-item"  onClick={scrollToCode} >{t("title-1.1.1")}</Typography>
            <Typography className="menu-item"  onClick={scrollToQuestion} >{t("burger-qa")}</Typography>
            <Button 
                className="menu-item" 
                onClick={handleClickOpenLogin}
                sx={{textTransform: "none", boxShadow: 0}}
                style={{ width:"100%", height:40, backgroundColor:'#F49E4C',marginTop:11,
                borderRadius: 20}}
                variant='contained' >{t("loginButton")}
            </Button>       
        </Menu>
      
    ); 
})
