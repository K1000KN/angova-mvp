import React, { useState, useEffect } from "react";
import jsonData from "../data/content_fr.json";

function DisplayQuestions() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(jsonData);
  }, []);

  if (!data) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div className="DisplayQuestions">
      {data.map((question) => (
        <div key={question.id}>
          <p>ID : {question.id}</p>
          <p>Question : {question.questions[0]}</p>
          <ul>
            {question.choices.map((choice, index) => (
              <li key={index}>{choice}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default DisplayQuestions;
