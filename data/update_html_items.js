const fs = require('fs');
const path = require('path');

// Cargar la base de datos de items
const itemsDatabase = JSON.parse(fs.readFileSync('./items.json', 'utf8'));

// Crear un mapa de ID a item para búsqueda rápida
const itemsMap = {};
itemsDatabase.forEach(item => {
  itemsMap[item.id] = item;
});

// Función para extraer el nombre del item en español
function getSpanishName(item) {
  return item.name?.es || item.name?.en || '';
}

// Función para extraer el nombre de archivo de imagen (sin ruta)
function getImageFilename(item) {
  if (!item.imageFilename) return '';
  const filename = item.imageFilename.split('/').pop();
  return filename;
}

// Mapeo manual de IDs conocidos a IDs de la base de datos
const idMapping = {
  'arc_alloy': 'arc_alloy',
  'wires': 'wires',
  'battery': 'battery',
  'wasp_driver': 'wasp_driver',
  'hornet_driver': 'hornet_driver',
  'snitch_scanner': 'snitch_scanner',
  'surveyor_vault': 'surveyor_vault',
  'antiseptic': 'antiseptic',
  'syringe': 'syringe',
  'durable_cloth': 'durable_cloth',
  'great_mullein': 'great_mullein',
  'fertilizer': 'fertilizer',
  'water_pump': 'water_pump',
  'rocketeer_driver': 'rocketeer_driver',
  'leaper_pulse_unit': 'leaper_pulse_unit',
  'damaged_rocketeer_driver': 'damaged_rocketeer_driver',
  'tick_pod': 'tick_pod',
  'burned_arc_circuitry': 'burned_arc_circuitry',
  'damaged_arc_motion_core': 'damaged_arc_motion_core',
  'damaged_arc_powercell': 'damaged_arc_powercell',
  'metal_parts': 'metal_parts',
  'rubber_parts': 'rubber_parts',
  'plastic_parts': 'plastic_parts',
  'fabric': 'fabric',
  'processor': 'processor',
  'steel_spring': 'steel_spring',
  'chemicals': 'chemicals',
  'magnet': 'magnet',
  'oil': 'oil'
};

// Función para actualizar un archivo HTML
function updateHtmlFile(filePath) {
  console.log(`\nProcesando: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let updates = 0;
  
  // Patrón para encontrar items con data-img
  // Captura: class, data-img actual, texto del item
  const pattern = /<li\s+class="rarity-[^"]+"\s+data-img="([^"]*)">([^<]+)/g;
  
  content = content.replace(pattern, (match, currentImg, itemText) => {
    // Extraer el nombre del item (parte antes de ':')
    const itemName = itemText.split(':')[0].trim();
    // Eliminar prefijos de misión si existen
    const cleanName = itemName.replace(/^Misión \d+ \([^)]+\) - /, '');
    
    // Buscar el item en la base de datos por nombre
    let foundItem = null;
    for (const item of itemsDatabase) {
      if (getSpanishName(item) === cleanName) {
        foundItem = item;
        break;
      }
    }
    
    if (foundItem) {
      const newImg = getImageFilename(foundItem);
      if (newImg && newImg !== currentImg) {
        updates++;
        console.log(`  ✓ "${cleanName}": ${currentImg || '(vacío)'} → ${newImg}`);
        return match.replace(`data-img="${currentImg}"`, `data-img="${newImg}"`);
      }
    }
    
    return match;
  });
  
  // Patrón para actualizar spans internos con data-img
  const spanPattern = /<span\s+data-img="([^"]*)">([^<]+)<\/span>/g;
  
  content = content.replace(spanPattern, (match, currentImg, itemName) => {
    const cleanName = itemName.trim();
    
    // Buscar el item en la base de datos por nombre
    let foundItem = null;
    for (const item of itemsDatabase) {
      if (getSpanishName(item) === cleanName) {
        foundItem = item;
        break;
      }
    }
    
    if (foundItem) {
      const newImg = getImageFilename(foundItem);
      const correctName = getSpanishName(foundItem);
      
      let updated = false;
      let result = match;
      
      if (newImg && newImg !== currentImg) {
        result = result.replace(`data-img="${currentImg}"`, `data-img="${newImg}"`);
        updated = true;
      }
      
      if (correctName && correctName !== cleanName) {
        result = result.replace(`>${cleanName}<`, `>${correctName}<`);
        updated = true;
      }
      
      if (updated) {
        updates++;
        console.log(`  ✓ Span "${cleanName}": ${currentImg || '(vacío)'} → ${newImg}`);
      }
      
      return result;
    }
    
    return match;
  });
  
  // Guardar el archivo actualizado
  if (updates > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ ${updates} actualizaciones guardadas`);
  } else {
    console.log(`  ℹ️  No se encontraron actualizaciones necesarias`);
  }
}

// Actualizar index.html
const indexPath = path.join(__dirname, '..', 'index.html');
if (fs.existsSync(indexPath)) {
  updateHtmlFile(indexPath);
} else {
  console.log(`❌ No se encontró: ${indexPath}`);
}

// Actualizar otros archivos HTML
const otherFiles = ['quest.html', 'workshops.html', 'recyclables.html', 'highvalue.html'];
otherFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    updateHtmlFile(filePath);
  } else {
    console.log(`⚠️ No se encontró: ${filePath}`);
  }
});

console.log('\n✅ Proceso completado');
