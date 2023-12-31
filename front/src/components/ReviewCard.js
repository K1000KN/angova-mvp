import Grid from '@mui/material/Grid';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import StarIcon from '@mui/icons-material/Star';
import Carousel from 'react-material-ui-carousel';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

function ReviewCard() {
    const { t } = useTranslation();
    const carousselWapper= {  width:"100%", paddingTop: "20%" };
    const reviewImg ={
      width: "32%", zIndex:2, position:'absolute', marginTop:"-17%"
    }
    
    const reviewCard={backgroundColor: "#f49e4c",  height:'75%', width:"70%",
     zIndex:1, position:'relative', top:"15%", borderRadius:50};
  
    const starReview ={ marginTop :12, marginBottom: 12}
    const starFull = {color:"#FFFF"};
    return(
    <div id="reviewCarousel">
        <Carousel               
        indicators={false}               
        navButtonsAlwaysVisible={true}  
        NextIcon={<ArrowForwardIosIcon style={{color:'#f49e4c'}}/>}          
        PrevIcon={<ArrowBackIosNewIcon  style={{color:'#f49e4c'}}/>}       >
        <Grid container direction='column'  alignItems='center' style={carousselWapper}>
            <img src='./images/auto_ecole.png' alt="femme" style={reviewImg}/>
            <Grid container  direction='column'  alignItems='center'  style={reviewCard}>
            <Typography className='nameReview'>
                Auto-école <br/>Aire de conduite
            </Typography>
            <Typography className='descReview'>
            {t('feedback-content-1')}
            </Typography>
            <div style={starReview}>
                <StarIcon style={starFull}/>
                <StarIcon style={starFull}/>
                <StarIcon style={starFull}/>
                <StarIcon style={starFull}/>
                <StarIcon style={starFull}/>
            </div>
            </Grid>
        </Grid>
        <Grid container direction='column'  alignItems='center' style={carousselWapper}>
            <img src='./images/homme.png' alt="homme" style={reviewImg}/>
            <Grid container  direction='column'  alignItems='center'  style={reviewCard}>
            <Typography className='nameReview'>
                Thierry .A
            </Typography>
            <Typography className='descReview'>
            {t('feedback-content-2')}

            </Typography>
            <div style={starReview}>
                <StarIcon style={starFull}/>
                <StarIcon style={starFull}/>
                <StarIcon style={starFull}/>
                <StarIcon style={starFull}/>
                <StarIcon />
            </div>
            </Grid>   
        </Grid>  
        </Carousel>
    </div>
    )
}
export default ReviewCard;

