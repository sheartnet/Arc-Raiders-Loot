// Script para actualizar las rutas de imágenes en items.json
const fs = require('fs');
const path = require('path');

// Leer el archivo items.json
const itemsPath = path.join(__dirname, 'items.json');
const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

console.log(`Procesando ${items.length} items...`);

// Actualizar cada item
items.forEach(item => {
  if (item.imageFilename && item.imageFilename.startsWith('https://')) {
    // Extraer el nombre del archivo de la URL
    const filename = item.imageFilename.split('/').pop();
    // Actualizar a ruta local
    item.imageFilename = `./img/${filename}`;
  }
});

// Guardar el archivo actualizado
fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2), 'utf8');

console.log('✓ Rutas de imágenes actualizadas correctamente');
console.log(`✓ Todas las rutas ahora apuntan a ./img/`);
