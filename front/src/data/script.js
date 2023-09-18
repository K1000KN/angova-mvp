const fs = require('fs');

// Lire le fichier JSON existant
fs.readFile('content_en.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Erreur de lecture du fichier JSON : ', err);
    return;
  }

  try {
    // Analyser le contenu JSON en un tableau d'objets
    const jsonArray = JSON.parse(data);

    // Boucle à travers chaque objet
    jsonArray.forEach((item) => {
      // Vérifie si la longueur de questions est égale à 2
      if (item.questions && item.questions.length === 2) {
        // Ajoute une chaîne vide au début de l'array questions
        item.questions.unshift('');
      }
    });

    // Convertir le tableau modifié en une chaîne JSON
    const modifiedJson = JSON.stringify(jsonArray, null, 2);

    // Écrire le fichier JSON modifié
    fs.writeFile('votre_fichier.json', modifiedJson, 'utf8', (err) => {
      if (err) {
        console.error('Erreur d\'écriture du fichier JSON : ', err);
        return;
      }
      console.log('Fichier JSON modifié avec succès !');
    });
  } catch (err) {
    console.error('Erreur lors de l\'analyse du fichier JSON : ', err);
  }
});
