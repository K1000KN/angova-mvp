// sessionService.js
export function processSessions(sessionData, batchSize, t) {
  const processedSessions = [];
  for (let i = 0; i < sessionData.length; i += batchSize) {
    const batch = sessionData.slice(i, i + batchSize);

    const sessionBatch = batch.map((session) => ({
      id: session.id,
      questions: session.questions,
      choices: session.choices,
      language: session.language,
    }));
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
