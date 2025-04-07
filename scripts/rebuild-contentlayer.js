const fs = require('fs');
const path = require('path');

// Percorso della directory cache di Contentlayer
const contentlayerCachePath = path.join(__dirname, '..', '.contentlayer', '.cache');

console.log('Clearing Contentlayer cache...');

// Verifica se la directory esiste
if (fs.existsSync(contentlayerCachePath)) {
  // Elimina la directory della cache
  fs.rmSync(contentlayerCachePath, { recursive: true, force: true });
  console.log('Contentlayer cache cleared successfully!');
} else {
  console.log('Contentlayer cache directory not found.');
}
