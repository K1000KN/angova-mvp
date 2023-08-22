import '../home.css';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const ListSession = ({classes, sessions, navigate, handleHover, hoveredCard}) => {
    return(
        <Grid item xs={12} lg={8}>
            <Grid container flexDirection="row" className={classes.container}>
              {sessions.map((session) => (
                <Grid item xs={12} sm={5} lg={3.7} key={session.id}>
                  <Card
                    onClick={() => {
                      navigate(`/session/${session.id}`);
                    }}
                    className={classes.card}
                    onMouseEnter={() => handleHover(session.id)}
                    onMouseLeave={() => handleHover(null)}
                  >
                    <CardMedia
                      component="img"
                      height="100%"
                      image={session.image}
                      alt="session"
                      className={classes.cardMedia}
                    />
                    <div
                      className={`${classes.slide2} ${hoveredCard === session.id ? 'active' : ''}`}
                    >
                      <Typography variant="h6" className={classes.slide2Title}>
                        {session.title}
                      </Typography>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
    )
}
export default ListSession;