import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import CardMedia from "@mui/material/CardMedia";
import "./ImageS3.css";
import Card from "@mui/material/Card";
const reactApiUrl = process.env.REACT_APP_API_URL;
const ImageS3 = ({ source }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.post(
          reactApiUrl + "/s3/image",
          { key: source },
          config
        );

        setImageUrl(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [source]);

  return (
    <div>
      {isLoading ? (
        <div className="loader-container">
          <CircularProgress size={50} />
        </div>
      ) : (
        <Card className="card">
          <CardMedia
            component="img"
            height="100%"
            src={
              imageUrl
                ? `data:image/jpeg;base64,${imageUrl}`
                : "./images/placeholder.png"
            }
            alt="session"
            style={{
              cursor: "pointer",
              height: imageUrl ? "100%" : "100px",
              transition: "all 0.2s ease",
            }}
          />
        </Card>
      )}
    </div>
  );
};

export default ImageS3;
