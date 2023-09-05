import React, { useState, useEffect } from "react";
import Loader from "./Loader"; // Import your Loader component here

const ImageLoader = ({ src, alt, className, loaderClassName }) => {
  // State to track if the image is loading
  const [isLoading, setIsLoading] = useState(true);

  // State to track if the image has loaded successfully
  const [isLoaded, setIsLoaded] = useState(false);

  // Use useEffect to listen for image load events
  useEffect(() => {
    const image = new Image();
    image.src = src;

    // When the image is loaded successfully
    image.onload = () => {
      setIsLoading(false);
      setIsLoaded(true);
    };

    // When there's an error loading the image
    image.onerror = () => {
      setIsLoading(false);
      setIsLoaded(false);
    };
  }, [src]);

  return (
    <div className={className}>
      {isLoading && <Loader />}
      {isLoaded ? <img src={src} alt={alt} /> : null}
    </div>
  );
};

export default ImageLoader;
