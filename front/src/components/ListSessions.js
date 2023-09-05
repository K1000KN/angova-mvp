import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import NoSessionMessage from "./NoSessionMessage";
import axios from "axios";

const ListSession = ({
  classes,
  sessions,
  navigate,
  handleHover,
  hoveredCard,
}) => {
  const [sessionImages, setSessionImages] = useState({});

  useEffect(() => {
    const fetchSessionImages = async (key) => {
      try {
        const response = await axios.post("http://localhost:3001/api/v1/s3", {
          key: key,
        });
        const updatedImages = { ...sessionImages };
        updatedImages[key] = `data:image/jpeg;base64,${response.data.toString(
          "base64"
        )}`;
        setSessionImages(updatedImages);
      } catch (error) {
        console.error("Error fetching image from S3:", error);
      }
    };

    if (sessions.length > 0) {
      sessions.forEach((session) => {
        const imageKey = session.image;
        fetchSessionImages(imageKey);
      });
    }
  }, [sessions, sessionImages]);

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
              <CardMedia
                component="img"
                height="100%"
                image={sessionImages[session.image]}
                alt="session"
                className={classes.cardMedia}
              />
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
