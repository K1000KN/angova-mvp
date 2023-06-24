import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
const NotFoundImage = "../404.png";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing(8),
  },
  image: {
    width: "300px",
    marginBottom: theme.spacing(2),
  },
}));

const NotFound = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className={classes.root}>
      <img src={NotFoundImage} alt="404 Not Found" className={classes.image} />
      <Typography variant="h4" component="h1" gutterBottom>
        404 Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" onClick={handleGoBack}>
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
