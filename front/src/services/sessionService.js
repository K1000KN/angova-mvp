export function processSessions(sessionData, batchSize, t) {
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
    sessionBatch.image = `/session/q${sessionBatch.id}/q${sessionBatch.id}.jpeg`;
    sessionBatch.title = `Session ${sessionBatch.id}`;
    sessionBatch.description = t("code-de-la-route-description");

    processedSessions.push(sessionBatch);
  }
  return processedSessions;
}

export function filterSessionsByLanguage(sessions, selectedLanguage) {
  return sessions.filter((session) => session[0].language === selectedLanguage);
}
