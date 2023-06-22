import React, {forwardRef} from 'react';
import '../index.css';
import { slide as Menu } from 'react-burger-menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';



export default forwardRef (({
    scrollToQuestion, 
    scrollToCode, 
    handleClickOpenLogin,  
    changeFlag,
    t,
    i18n
})=>{ 
    const { t, i18n } = useTranslation();
    
    
    return (
        <Menu right>
            <Typography className="menu-item"  onClick={scrollToCode} >{t("title-1.1.1")}</Typography>
            <Typography className="menu-item"  onClick={scrollToQuestion} >{t("burger-qa")}</Typography>
            <div   
             
              style={{display: "flex", alignItems: "center", justifyContent: "center"}}
              onMouseOver={() => {
                document.getElementById("overlayGridMobile").style.backgroundColor= "rgba(216, 216, 216, 0.56)";
                document.getElementById("overlayGridMobile").style.borderRadius= "10px";
                document.getElementById("overlayLangueMobile").style.display = "block";
                //f49d4c5e
              }} 
              onMouseLeave={() => {
                document.getElementById("overlayGridMobile").style.backgroundColor= "rgba(216, 216, 216, 0)";
                document.getElementById("overlayLangueMobile").style.display = "none";
              }}  
              xs={5 } 
             
              sx={{ display: { xs: 'none', lg: 'block' }}}>
              <div   id="overlayGridMobile" style={{display: "flex", alignItems: "center", justifyContent: "center", width:'100%',padding: 8}} >
                <Typography  className="menu-item" sx={{fontSize:11.5}} >{t('popup')}</Typography>
                <img id='flagOfLanguage' style={{width:30, borderRadius:4, marginLeft:5}} 
                  src="./images/france2.png" 
                />
              </div>
             
              <div id='overlayLangueMobile'>
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
            </div>
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
