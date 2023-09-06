import React, { useState, useEffect } from "react";

const PlayerSession = ({
  content,
  setAudioSrc,
  setExpAudioSrc,
  audioQuestion,
  audioExplanation,
}) => {
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);

  useEffect(() => {
    setAudioSrc(audioQuestion);
    setExpAudioSrc(audioExplanation);
    console.log(audioQuestion);
    console.log(audioExplanation);
    // Vérifiez si content a plus d'une image
    if (content.length > 1) {
      // Démarrez un intervalle pour alterner entre les images
      const intervalId = setInterval(() => {
        setCurrentSourceIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
      }, 500);

      // Nettoyez l'intervalle lorsque le composant est démonté
      return () => {
        clearInterval(intervalId);
      };
    } else {
      // S'il n'y a qu'une seule image, assurez-vous de réinitialiser l'index.
      setCurrentSourceIndex(0);
    }
  }, [audioExplanation, audioQuestion, content, setAudioSrc, setExpAudioSrc]);

  // Utilisez l'index actuel pour afficher l'image appropriée de content
  const currentSource = content[currentSourceIndex];

  return (
    <>
      <img className="imgResponsive" alt="road" src={currentSource} />
    </>
  );
};

export default PlayerSession;