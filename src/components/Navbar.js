import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import '../index.css';
const NavbarComponent = ({setShow, page}) => {
    return(
        <div id="navContainer">
            <Grid 
                container 
                className='navContent'
                style={{width:'85%'}}  
            > 
                <Grid item xs={4} id="languageNav" sx={{display:"flex",flexDirection:'column' ,alignItems:'start', paddingLeft:'5vw' }}> <img id="languageNavImg" style={{width:45,position:"absolute", bottom: 50}} onClick={() => { setShow(true)}} src="./images/france.png" /> </Grid>

                <Grid item xs={12}lg={4}  id="logoNav" sx={{display:"flex",flexDirection:'column' ,alignItems:'center' }}> <img id="imgLogoNav" style={{ width:130}} alt='road' src='./images/logo2.png'/> </Grid>
                {page =="profil" ? (
                    <Grid item xs={4} id="profilNav" sx={{display:"flex",flexDirection:'column' ,alignItems:'end', paddingRight:'5vw'}}>
                        <Link to="/home">
                            <div id="homeNavImgDiv">
                                <img  id="homeNavImg" src='./images/home.png'alt='profil' />
                            </div>
                           
                        </Link> 
                    </Grid>
                ):(
                    <Grid item xs={4} id="profilNav" sx={{display:"flex",flexDirection:'column' ,alignItems:'end', paddingRight:'5vw'}}>
                        <Link to="/profil">
                            <img  id="profilNavImg" src='./images/user.png' style={{width:45,position:"absolute", bottom: 55}} alt='profil' />
                        </Link> 
                    </Grid>
                )}
                
                
                <Grid item   id="languageMobileNav" > <img id="flagNav"  onClick={() => { setShow(true)}} src="./images/france.png" /> </Grid>
                
                <Grid item xs={12} id="welcomeHome"> Bienvenue Auto Ecole Aire de Conduite </Grid>

            </Grid>
        </div>
    )
}
export default NavbarComponent;