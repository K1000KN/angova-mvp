import '../home.css';
import Grid from "@mui/material/Grid";
import { t } from 'i18next';


const Quizz = () => {
    return(
        <Grid item xs={12} lg={8}>
           {t("comingSoon")}
        </Grid>
    )
}
export default Quizz;