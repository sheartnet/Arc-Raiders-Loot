const fs = require('fs');
const path = require('path');

// Función para convertir nombres de archivos a minúsculas con guiones bajos
function toLowerSnakeCase(filename) {
  if (!filename || filename === '') return '';
  // Extraer el nombre sin extensión
  const namePart = filename.replace(/\.png$/i, '');
  // Convertir a snake_case lowercase
  return namePart
    .replace(/([a-z])([A-Z])/g, '$1_$2') // CamelCase a snake_case
    .replace(/\s+/g, '_')                 // Espacios a guiones bajos
    .toLowerCase() + '.png';
}

// Función para actualizar un archivo HTML
function fixImageCases(filePath) {
  console.log(`\nProcesando: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let updates = 0;
  
  // Patrón para encontrar data-img con mayúsculas
  const pattern = /data-img="([^"]+\.png)"/gi;
  
  content = content.replace(pattern, (match, imageName) => {
    const lowerImage = toLowerSnakeCase(imageName);
    
    if (imageName !== lowerImage) {
      updates++;
      console.log(`  ✓ ${imageName} → ${lowerImage}`);
      return `data-img="${lowerImage}"`;
    }
    
    return match;
  });
  
  // Guardar el archivo actualizado
  if (updates > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ ${updates} imágenes actualizadas`);
  } else {
    console.log(`  ℹ️  Todas las imágenes ya están en minúsculas`);
  }
}

// Actualizar todos los archivos HTML
const htmlFiles = ['quest.html', 'workshops.html', 'recyclables.html', 'highvalue.html'];
htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    fixImageCases(filePath);
  } else {
    console.log(`⚠️ No se encontró: ${filePath}`);
  }
});

console.log('\n✅ Proceso completado');
