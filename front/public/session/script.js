const fs = require('fs');
const path = require('path');

const parentFolder = __dirname; // Chemin du dossier contenant les dossiers q{id}/mar/

fs.readdirSync(parentFolder)
  .filter(item => fs.statSync(path.join(parentFolder, item)).isDirectory()) // Filtrer uniquement les dossiers
  .forEach(folder => {
    const folderPath = path.join(parentFolder, folder, 'mar');
    const newFolderPath = path.join(parentFolder, folder, 'ma');

    try {
      fs.renameSync(folderPath, newFolderPath);
      console.log(`Dossier renommé : ${folder}/mar/ -> ${folder}/ma/`);
    } catch (error) {
      console.error(`Erreur lors du renommage du dossier ${folder}/mar/ : ${error.message}`);
    }
  });
