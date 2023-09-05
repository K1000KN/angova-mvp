export function processSessions(sessionData, batchSize, t) {
  let counter = 1;
  const processedSessions = [];
  for (let i = 0; i < sessionData.length; i += batchSize) {
    const batch = sessionData.slice(i, i + batchSize);

    const sessionBatch = batch.map((session) => {
      return {
        id: session.id,
        language: session.language,
        questions: session.questions,
        choices: session.choices,
        correctAnswer: session.correctAnswer,
        explanation: session.explanation,
        assets: session.assets,
      };
    });

    sessionBatch.id = i / batchSize + 1;
    sessionBatch.image = `session/q${counter}/q${counter}.jpeg`;
    sessionBatch.title = `Session ${sessionBatch.id}`;
    sessionBatch.description = t("code-de-la-route-description");

    processedSessions.push(sessionBatch);

    counter = counter + 40;
  }
  return processedSessions;
}

export function filterSessionsByLanguage(sessions, selectedLanguage) {
  return sessions.filter((session) => session[0].language === selectedLanguage);
}
