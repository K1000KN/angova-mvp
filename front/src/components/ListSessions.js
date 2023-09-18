import "../home.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ImageS3 from "./ImageS3";
import NoSessionMessage from "./NoSessionMessage";

const ListSession = ({
  classes,
  sessions,
  navigate,
  handleHover,
  hoveredCard,
}) => {
  if (sessions.length === 0) {
    return <NoSessionMessage />;
  }

  return (
    <Grid item xs={12} lg={8}>
      <Grid
        container
        flexDirection="row"
        className={classes.container}
        sx={{
          marginBottom: "14vh",
        }}
      >
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
              <ImageS3 source={session.image} isSkeleton={true} />
              <div
                className={`${classes.slide2} ${
                  hoveredCard === session.id ? "active" : ""
                }`}
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
  );
};
export default ListSession;
