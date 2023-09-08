const fs = require('fs');
const path = require('path');

const sourceFolder = path.join(__dirname, 'session_copy');
const targetFolder = path.join(__dirname, 'session');

function moveAndReplaceFiles(sourcePath, targetPath) {
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  fs.readdirSync(sourcePath).forEach(item => {
    const sourceItemPath = path.join(sourcePath, item);
    const targetItemPath = path.join(targetPath, item);

    if (fs.statSync(sourceItemPath).isDirectory()) {
      moveAndReplaceFiles(sourceItemPath, targetItemPath);
    } else {
      fs.copyFileSync(sourceItemPath, targetItemPath);
      console.log(`Fichier copié : ${sourceItemPath} -> ${targetItemPath}`);
    }
  });
}

moveAndReplaceFiles(sourceFolder, targetFolder);
console.log('Transfert terminé.');
