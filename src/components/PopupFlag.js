import '../home.css';

const BottomBar = ({handleChange, value}) => {
    return(
        <Dialog fullWidth
        maxWidth="sm" open={show} onClose={handleClose}> 
        <div style={{ display:"flex",
        flexDirection: "column",
        alignItems: 'center'}} >

        <DialogTitle> 
            <Typography variant="h5" id="titlePopupFlag" style={{fontWeight:700}}>Choisir la langue du code de la route</Typography>
            <IconButton aria-label="close" style={{position: 'absolute', right: theme.spacing(1), top: theme.spacing(1),color: theme.palette.grey[500]}} 
            onClick={handleClose}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <Grid container direction="row" style={{alignItems:'center', marginBottom:40}}>
              <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                <img className="flag" style={{width:"50%"}} onClick={() => {showFrArticle()}} src="./images/france.png" />
              </Grid>
              <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                <img className="flag" style={{width:"50%"}} onClick={() => {showUkArticle()}}  src="./images/uk.png" />
              </Grid>
              <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                <img className="flag" style={{width:"50%"}} onClick={() => {showAlgArticle()}} src="./images/algerie.png" />
              </Grid>
              <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                <img className="flag" style={{width:"50%"}} onClick={() => {showMarocArticle()}} src="./images/maroc.png" />
              </Grid>
              <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                <img className="flag" style={{width:"50%"}} onClick={() => {showTuniArticle()}} src="./images/tuni.png" />
              </Grid>
              <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                <img className="flag" style={{width:"50%"}} onClick={() => {showTurcArticle()}} src="./images/turq.png" />
              </Grid>
              
            </Grid> 
        </DialogContent>
        </div>
      </Dialog>
    )
}
export default BottomBar;