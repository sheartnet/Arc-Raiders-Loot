// Sistema de base de datos y idiomas
let itemsDatabase = {};
let questsDatabase = {};
let currentLanguage = localStorage.getItem('selectedLanguage') || 'es';

// Traducciones de la interfaz
const uiTranslations = {
  'es': {
    pageTitle: 'Guía Esencial de Objetos - ARC Raiders',
    mainTitle: 'ARC RAIDERS — Guía Esencial de Objetos',
    navMission: 'Misión/Proyecto',
    navRecyclables: 'Fuentes Reciclables',
    navWorkshops: 'Estaciones de Taller',
  navHighValue: 'Objetos de Valor',
    missionObjects: 'Objetos de Misión',
    projectObjects: 'Objetos de Proyecto - Expedición',
    resetButton: 'Resetear',
    stage1: 'Etapa 1/6 - Cimentación',
    stage2: 'Etapa 2/6 - Sistemas Centrales',
    stage3: 'Etapa 3/6 - Estructura',
    stage4: 'Etapa 4/6 - Equipamiento',
    stage5: 'Etapa 5/6 - Carga',
    stage6: 'Etapa 6/6 - Partida',
    stage6Text: 'Tu caravana está lista para partir en tu Expedición. Todos los items en tu alijo contribuirán a la Expedición, y tu próximo Raider puede ganar hasta 5 puntos de habilidad basados en el valor total de esos items.',
    combat: 'Combate',
    survival: 'Supervivencia',
    provisions: 'Provisiones',
    materials: 'Materiales',
  highValue3000: 'Objetos de Valor - $3000+',
  highValue2000: 'Objetos de Valor - $2000-2999',
  highValue1000: 'Objetos de Valor - $1000-1999',
    recyclablesQuestMaterials: 'Reciclables para Materiales de Quest/Workshop',
    recyclablesArcAlloy: 'Fuentes Reciclables de Aleación ARC',
    recyclablesComponents: 'Componentes',
    gunsmith: 'Armero',
    medic: 'Médico',
    refinery: 'Refinadora'
  },
  'en': {
    pageTitle: 'Essential Items Guide - ARC Raiders',
    mainTitle: 'ARC RAIDERS — Essential Items Guide',
    navMission: 'Mission/Project',
    navRecyclables: 'Recyclable Sources',
    navWorkshops: 'Workshop Stations',
    navHighValue: 'High Value Items',
    missionObjects: 'Mission Objects',
    projectObjects: 'Project Objects - Expedition',
    resetButton: 'Reset',
    stage1: 'Stage 1/6 - Foundation',
    stage2: 'Stage 2/6 - Core Systems',
    stage3: 'Stage 3/6 - Structure',
    stage4: 'Stage 4/6 - Equipment',
    stage5: 'Stage 5/6 - Cargo',
    stage6: 'Stage 6/6 - Departure',
    stage6Text: 'Your caravan is ready to depart on your Expedition. All items in your stash will contribute to the Expedition, and your next Raider can earn up to 5 skill points based on the total value of those items.',
    combat: 'Combat',
    survival: 'Survival',
    provisions: 'Provisions',
    materials: 'Materials',
    highValue3000: 'High Value Items - $3000+',
    highValue2000: 'High Value Items - $2000-2999',
    highValue1000: 'High Value Items - $1000-1999',
    recyclablesQuestMaterials: 'Recyclables for Quest/Workshop Materials',
    recyclablesArcAlloy: 'ARC Alloy Recyclable Sources',
    recyclablesComponents: 'Components',
    gunsmith: 'Gunsmith',
    medic: 'Medic',
    refinery: 'Refinery'
  },
  'de': {
    pageTitle: 'Wesentliche Gegenstände Anleitung - ARC Raiders',
    mainTitle: 'ARC RAIDERS — Wesentliche Gegenstände Anleitung',
    navMission: 'Mission/Projekt',
    navRecyclables: 'Recycelbare Quellen',
    navWorkshops: 'Werkstattstationen',
    navHighValue: 'Hochwertige Gegenstände',
    missionObjects: 'Missionsgegenstände',
    projectObjects: 'Projektgegenstände - Expedition',
    resetButton: 'Zurücksetzen',
    stage1: 'Stufe 1/6 - Fundament',
    stage2: 'Stufe 2/6 - Kernsysteme',
    stage3: 'Stufe 3/6 - Struktur',
    stage4: 'Stufe 4/6 - Ausrüstung',
    stage5: 'Stufe 5/6 - Fracht',
    stage6: 'Stufe 6/6 - Abreise',
    stage6Text: 'Ihre Karawane ist bereit für die Expedition. Alle Gegenstände in Ihrem Versteck tragen zur Expedition bei, und Ihr nächster Raider kann bis zu 5 Fähigkeitspunkte basierend auf dem Gesamtwert dieser Gegenstände verdienen.',
    combat: 'Kampf',
    survival: 'Überleben',
    provisions: 'Vorräte',
    materials: 'Materialien',
    highValue3000: 'Hochwertige Gegenstände - $3000+',
    highValue2000: 'Hochwertige Gegenstände - $2000-2999',
    highValue1000: 'Hochwertige Gegenstände - $1000-1999',
    recyclablesQuestMaterials: 'Recycelbar für Quest-/Werkstattmaterialien',
    recyclablesArcAlloy: 'ARC-Legierung Recycelbare Quellen',
    recyclablesComponents: 'Komponenten',
    gunsmith: 'Waffenschmied',
    medic: 'Sanitäter',
    refinery: 'Raffinerie'
  },
  'fr': {
    pageTitle: 'Guide des Objets Essentiels - ARC Raiders',
    mainTitle: 'ARC RAIDERS — Guide des Objets Essentiels',
    navMission: 'Mission/Projet',
    navRecyclables: 'Sources Recyclables',
    navWorkshops: 'Stations d\'Atelier',
    navHighValue: 'Objets de Grande Valeur',
    missionObjects: 'Objets de Mission',
    projectObjects: 'Objets de Projet - Expédition',
    resetButton: 'Réinitialiser',
    stage1: 'Étape 1/6 - Fondation',
    stage2: 'Étape 2/6 - Systèmes de Base',
    stage3: 'Étape 3/6 - Structure',
    stage4: 'Étape 4/6 - Équipement',
    stage5: 'Étape 5/6 - Fret',
    stage6: 'Étape 6/6 - Départ',
    stage6Text: 'Votre caravane est prête à partir pour votre Expédition. Tous les objets de votre réserve contribueront à l\'Expédition, et votre prochain Raider peut gagner jusqu\'à 5 points de compétence basés sur la valeur totale de ces objets.',
    combat: 'Combat',
    survival: 'Survie',
    provisions: 'Provisions',
    materials: 'Matériaux',
    highValue3000: 'Objets de Grande Valeur - $3000+',
    highValue2000: 'Objets de Grande Valeur - $2000-2999',
    highValue1000: 'Objets de Grande Valeur - $1000-1999',
    recyclablesQuestMaterials: 'Recyclables pour Matériaux de Quête/Atelier',
    recyclablesArcAlloy: 'Sources Recyclables d\'Alliage ARC',
    recyclablesComponents: 'Composants',
    gunsmith: 'Armurier',
    medic: 'Médecin',
    refinery: 'Raffinerie'
  },
  'it': {
    pageTitle: 'Guida Oggetti Essenziali - ARC Raiders',
    mainTitle: 'ARC RAIDERS — Guida Oggetti Essenziali',
    navMission: 'Missione/Progetto',
    navRecyclables: 'Fonti Riciclabili',
    navWorkshops: 'Stazioni di Officina',
    navHighValue: 'Oggetti di Alto Valore',
    missionObjects: 'Oggetti di Missione',
    projectObjects: 'Oggetti di Progetto - Spedizione',
    resetButton: 'Resetta',
    stage1: 'Fase 1/6 - Fondazione',
    stage2: 'Fase 2/6 - Sistemi Principali',
    stage3: 'Fase 3/6 - Struttura',
    stage4: 'Fase 4/6 - Equipaggiamento',
    stage5: 'Fase 5/6 - Carico',
    stage6: 'Fase 6/6 - Partenza',
    stage6Text: 'La tua carovana è pronta a partire per la tua Spedizione. Tutti gli oggetti nella tua scorta contribuiranno alla Spedizione, e il tuo prossimo Raider può guadagnare fino a 5 punti abilità basati sul valore totale di quegli oggetti.',
    combat: 'Combattimento',
    survival: 'Sopravvivenza',
    provisions: 'Provviste',
    materials: 'Materiali',
    highValue3000: 'Oggetti di Alto Valore - $3000+',
    highValue2000: 'Oggetti di Alto Valore - $2000-2999',
    highValue1000: 'Oggetti di Alto Valore - $1000-1999',
    recyclablesQuestMaterials: 'Riciclabili per Materiali Quest/Officina',
    recyclablesArcAlloy: 'Fonti Riciclabili di Lega ARC',
    recyclablesComponents: 'Componenti',
    gunsmith: 'Armaiolo',
    medic: 'Medico',
    refinery: 'Raffineria'
  },
  'pt': {
    pageTitle: 'Guia de Itens Essenciais - ARC Raiders',
    mainTitle: 'ARC RAIDERS — Guia de Itens Essenciais',
    navMission: 'Missão/Projeto',
    navRecyclables: 'Fontes Recicláveis',
    navWorkshops: 'Estações de Oficina',
    navHighValue: 'Itens de Alto Valor',
    missionObjects: 'Objetos de Missão',
    projectObjects: 'Objetos de Projeto - Expedição',
    resetButton: 'Resetar',
    stage1: 'Etapa 1/6 - Fundação',
    stage2: 'Etapa 2/6 - Sistemas Centrais',
    stage3: 'Etapa 3/6 - Estrutura',
    stage4: 'Etapa 4/6 - Equipamento',
    stage5: 'Etapa 5/6 - Carga',
    stage6: 'Etapa 6/6 - Partida',
    stage6Text: 'Sua caravana está pronta para partir na sua Expedição. Todos os itens no seu esconderijo contribuirão para a Expedição, e seu próximo Raider pode ganhar até 5 pontos de habilidade baseados no valor total desses itens.',
    combat: 'Combate',
    survival: 'Sobrevivência',
    provisions: 'Provisões',
    materials: 'Materiais',
    highValue3000: 'Itens de Alto Valor - $3000+',
    highValue2000: 'Itens de Alto Valor - $2000-2999',
    highValue1000: 'Itens de Alto Valor - $1000-1999',
    recyclablesQuestMaterials: 'Recicláveis para Materiais de Missão/Oficina',
    recyclablesArcAlloy: 'Fontes Recicláveis de Liga ARC',
    recyclablesComponents: 'Componentes',
    gunsmith: 'Armeiro',
    medic: 'Médico',
    refinery: 'Refinaria'
  }
};

// Traducciones de locaciones
const locationTranslations = {
  'es': {
    'Medical': 'Médico',
    'Commercial': 'Comercio',
    'ARC': 'ARC',
    'Mechanical': 'Mecánico',
    'Industrial': 'Industria',
    'Electrical': 'Eléctrico',
    'Technological': 'Tecnología',
    'Residential': 'Residencial',
    'Security': 'Seguridad',
    'Exodus': 'Éxodo'
  },
  'en': {
    'Medical': 'Medical',
    'Commercial': 'Commercial',
    'ARC': 'ARC',
    'Mechanical': 'Mechanical',
    'Industrial': 'Industrial',
    'Electrical': 'Electrical',
    'Technological': 'Technological',
    'Residential': 'Residential',
    'Security': 'Security',
    'Exodus': 'Exodus'
  }
};

// Función para traducir una locación
function translateLocation(location, lang = currentLanguage) {
  if (!location) return '';
  
  // Si el idioma tiene traducciones, usarlas
  if (locationTranslations[lang] && locationTranslations[lang][location]) {
    return locationTranslations[lang][location];
  }
  
  // Si no hay traducción para ese idioma, usar inglés por defecto
  if (locationTranslations['en'] && locationTranslations['en'][location]) {
    return locationTranslations['en'][location];
  }
  
  // Si no se encuentra, devolver el original
  return location;
}

// Traducciones de tipos de items
const itemTypeTranslations = {
  'es': {
    'Ammunition': 'Munición',
    'Assault Rifle': 'Rifle de Asalto',
    'Augment': 'Aumento',
    'Backpack Attachment': 'Accesorio de Mochila',
    'Backpack Charm': 'Amuleto de Mochila',
    'Basic Material': 'Material Básico',
    'Battle Rifle': 'Rifle de Batalla',
    'Blueprint': 'Plano',
    'Cosmetic': 'Cosmético',
    'Hand Cannon': 'Cañón de Mano',
    'Key': 'Llave',
    'LMG': 'Ametralladora Ligera',
    'Material': 'Material',
    'Misc': 'Varios',
    'Modification': 'Modificación',
    'Nature': 'Naturaleza',
    'Outfit': 'Atuendo',
    'Pistol': 'Pistola',
    'Quick Use': 'Uso Rápido',
    'Recyclable': 'Reciclable',
    'Refined Material': 'Material Refinado',
    'Shield': 'Escudo',
    'Shotgun': 'Escopeta',
    'Topside Material': 'Material de Superficie',
    'Trinket': 'Baratija',
    'Valuable': 'Valioso',
    'Weapon': 'Arma'
  },
  'en': {
    'Ammunition': 'Ammunition',
    'Assault Rifle': 'Assault Rifle',
    'Augment': 'Augment',
    'Backpack Attachment': 'Backpack Attachment',
    'Backpack Charm': 'Backpack Charm',
    'Basic Material': 'Basic Material',
    'Battle Rifle': 'Battle Rifle',
    'Blueprint': 'Blueprint',
    'Cosmetic': 'Cosmetic',
    'Hand Cannon': 'Hand Cannon',
    'Key': 'Key',
    'LMG': 'LMG',
    'Material': 'Material',
    'Misc': 'Misc',
    'Modification': 'Modification',
    'Nature': 'Nature',
    'Outfit': 'Outfit',
    'Pistol': 'Pistol',
    'Quick Use': 'Quick Use',
    'Recyclable': 'Recyclable',
    'Refined Material': 'Refined Material',
    'Shield': 'Shield',
    'Shotgun': 'Shotgun',
    'Topside Material': 'Topside Material',
    'Trinket': 'Trinket',
    'Valuable': 'Valuable',
    'Weapon': 'Weapon'
  },
  'de': {
    'Ammunition': 'Munition',
    'Assault Rifle': 'Sturmgewehr',
    'Augment': 'Verstärkung',
    'Backpack Attachment': 'Rucksackaufsatz',
    'Backpack Charm': 'Rucksackanhänger',
    'Basic Material': 'Grundmaterial',
    'Battle Rifle': 'Kampfgewehr',
    'Blueprint': 'Bauplan',
    'Cosmetic': 'Kosmetik',
    'Hand Cannon': 'Handkanone',
    'Key': 'Schlüssel',
    'LMG': 'LMG',
    'Material': 'Material',
    'Misc': 'Sonstiges',
    'Modification': 'Modifikation',
    'Nature': 'Natur',
    'Outfit': 'Outfit',
    'Pistol': 'Pistole',
    'Quick Use': 'Schnellnutzung',
    'Recyclable': 'Recycelbar',
    'Refined Material': 'Raffiniertes Material',
    'Shield': 'Schild',
    'Shotgun': 'Schrotflinte',
    'Topside Material': 'Oberflächenmaterial',
    'Trinket': 'Schmuckstück',
    'Valuable': 'Wertvoll',
    'Weapon': 'Waffe'
  },
  'fr': {
    'Ammunition': 'Munitions',
    'Assault Rifle': 'Fusil d\'Assaut',
    'Augment': 'Augmentation',
    'Backpack Attachment': 'Accessoire de Sac à Dos',
    'Backpack Charm': 'Charme de Sac à Dos',
    'Basic Material': 'Matériau de Base',
    'Battle Rifle': 'Fusil de Bataille',
    'Blueprint': 'Plan',
    'Cosmetic': 'Cosmétique',
    'Hand Cannon': 'Canon de Poing',
    'Key': 'Clé',
    'LMG': 'Mitrailleuse Légère',
    'Material': 'Matériau',
    'Misc': 'Divers',
    'Modification': 'Modification',
    'Nature': 'Nature',
    'Outfit': 'Tenue',
    'Pistol': 'Pistolet',
    'Quick Use': 'Utilisation Rapide',
    'Recyclable': 'Recyclable',
    'Refined Material': 'Matériau Raffiné',
    'Shield': 'Bouclier',
    'Shotgun': 'Fusil à Pompe',
    'Topside Material': 'Matériau de Surface',
    'Trinket': 'Bibelot',
    'Valuable': 'Précieux',
    'Weapon': 'Arme'
  },
  'it': {
    'Ammunition': 'Munizioni',
    'Assault Rifle': 'Fucile d\'Assalto',
    'Augment': 'Aumento',
    'Backpack Attachment': 'Accessorio Zaino',
    'Backpack Charm': 'Ciondolo Zaino',
    'Basic Material': 'Materiale Base',
    'Battle Rifle': 'Fucile da Battaglia',
    'Blueprint': 'Progetto',
    'Cosmetic': 'Cosmetico',
    'Hand Cannon': 'Cannone a Mano',
    'Key': 'Chiave',
    'LMG': 'Mitragliatrice Leggera',
    'Material': 'Materiale',
    'Misc': 'Varie',
    'Modification': 'Modifica',
    'Nature': 'Natura',
    'Outfit': 'Outfit',
    'Pistol': 'Pistola',
    'Quick Use': 'Uso Rapido',
    'Recyclable': 'Riciclabile',
    'Refined Material': 'Materiale Raffinato',
    'Shield': 'Scudo',
    'Shotgun': 'Fucile a Pompa',
    'Topside Material': 'Materiale di Superficie',
    'Trinket': 'Ninnolo',
    'Valuable': 'Prezioso',
    'Weapon': 'Arma'
  },
  'pt': {
    'Ammunition': 'Munição',
    'Assault Rifle': 'Rifle de Assalto',
    'Augment': 'Aumento',
    'Backpack Attachment': 'Acessório de Mochila',
    'Backpack Charm': 'Amuleto de Mochila',
    'Basic Material': 'Material Básico',
    'Battle Rifle': 'Rifle de Batalha',
    'Blueprint': 'Projeto',
    'Cosmetic': 'Cosmético',
    'Hand Cannon': 'Canhão de Mão',
    'Key': 'Chave',
    'LMG': 'Metralhadora Leve',
    'Material': 'Material',
    'Misc': 'Diversos',
    'Modification': 'Modificação',
    'Nature': 'Natureza',
    'Outfit': 'Roupa',
    'Pistol': 'Pistola',
    'Quick Use': 'Uso Rápido',
    'Recyclable': 'Reciclável',
    'Refined Material': 'Material Refinado',
    'Shield': 'Escudo',
    'Shotgun': 'Espingarda',
    'Topside Material': 'Material de Superfície',
    'Trinket': 'Bugiganga',
    'Valuable': 'Valioso',
    'Weapon': 'Arma'
  }
};

// Función para traducir tipo de item
function translateItemType(type, lang = currentLanguage) {
  if (!type) return '';
  
  // Si el idioma tiene traducciones, usarlas
  if (itemTypeTranslations[lang] && itemTypeTranslations[lang][type]) {
    return itemTypeTranslations[lang][type];
  }
  
  // Si no hay traducción para ese idioma, usar inglés por defecto
  if (itemTypeTranslations['en'] && itemTypeTranslations['en'][type]) {
    return itemTypeTranslations['en'][type];
  }
  
  // Si no se encuentra, devolver el original
  return type;
}

// Función para enriquecer items del DOM con información de la base de datos
function enrichItemsFromDatabase() {
  // Verificar que la base de datos esté cargada
  if (Object.keys(itemsDatabase).length === 0) {
    console.warn('Base de datos vacía, esperando carga...');
    return;
  }
  
  // IMPORTANTE: No procesar spans que ya tienen contenido dentro de #mission-section
  // porque ya tienen su contenido correcto con la estructura .rarity-text
  document.querySelectorAll('[data-item], [data-img]').forEach(element => {
    // Si es un span con contenido de texto dentro de #mission-section, saltar
    const parentSection = element.closest('section');
    if (parentSection && parentSection.id === 'mission-section' && 
        element.tagName === 'SPAN' && element.textContent.trim() !== '') {
      return; // Saltar spans con contenido en mission-section
    }
    
    // Si es un span sin data-img (ya procesado por PowerShell), saltar
    if (element.tagName === 'SPAN' && !element.hasAttribute('data-img')) {
      return;
    }
    
    // Priorizar data-item (ID) sobre data-img (filename)
    const itemKey = element.getAttribute('data-item') || element.getAttribute('data-img');
    if (!itemKey) return;
    
    const itemData = itemsDatabase[itemKey];
    if (!itemData) {
      // No mostrar warning, es normal que algunos items no estén
      return;
    }
    
    // Actualizar data-img si no existe (para tooltips)
    if (!element.getAttribute('data-img')) {
      element.setAttribute('data-img', itemData.imageFilename);
    }
    
    // Actualizar clase de rareza
    const rarityMap = {
      'Common': 'rarity-c',
      'Uncommon': 'rarity-u',
      'Rare': 'rarity-r',
      'Epic': 'rarity-e',
      'Legendary': 'rarity-l'
    };
    
    // Limpiar clases de rareza existentes
    element.classList.remove('rarity-c', 'rarity-u', 'rarity-r', 'rarity-e', 'rarity-l');
    
    // Añadir nueva clase de rareza
    if (itemData.rarity && rarityMap[itemData.rarity]) {
      element.classList.add(rarityMap[itemData.rarity]);
    }
    
    // Obtener nombre según idioma
    const itemName = itemData.name[currentLanguage] || itemData.name['en'] || itemData.name['es'];
    
    // Actualizar solo spans dentro de elementos, no los elementos completos
    if (element.tagName === 'SPAN') {
      element.textContent = itemName;
    }
  });
}

// Cargar base de datos desde JSON
async function loadItemsDatabase() {
  try {
    console.log('Intentando cargar base de datos...');
    const response = await fetch('./data/items.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const items = await response.json();
    console.log(`JSON cargado: ${items.length} items`);
    
    // Convertir array a objeto usando múltiples claves para búsqueda
    itemsDatabase = {};
    items.forEach(item => {
      // Validar que el item tenga imageFilename
      if (!item.imageFilename) {
        console.warn(`Item sin imageFilename:`, item.id);
        return; // Saltar este item
      }
      
      // Extraer el nombre del archivo (ahora es ruta local ./img/filename.png)
      const filename = item.imageFilename.split('/').pop(); // ejemplo: fabric.png
      
      // Crear todas las variantes de nombres posibles para mapeo
      const baseNameLower = filename.split('.')[0].toLowerCase(); // fabric, arc_alloy
      const ext = '.png';
      
      // Variantes de nombres: TODAS las combinaciones posibles
      const filenameVariants = [
        item.id,                                                                    // arc_alloy (ID)
        item.id.toLowerCase(),                                                      // arc_alloy
        item.id.toUpperCase(),                                                      // ARC_ALLOY
        filename,                                                                   // arc_alloy.png (del JSON)
        filename.toLowerCase(),                                                     // arc_alloy.png
        filename.toUpperCase(),                                                     // ARC_ALLOY.PNG
        baseNameLower,                                                             // arc_alloy
        baseNameLower + ext,                                                       // arc_alloy.png
        baseNameLower.charAt(0).toUpperCase() + baseNameLower.slice(1) + ext,     // Arc_alloy.png
        baseNameLower.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('_') + ext, // Arc_Alloy.png
        baseNameLower.split('_').map(w => w.toUpperCase()).join('_') + ext        // ARC_ALLOY.png
      ];
      
      const itemEntry = {
        id: item.id,
        name: item.name,
        description: item.description,
        type: item.type,
        rarity: item.rarity,
        value: item.value,
        imageFilename: filename, // Nombre de archivo del JSON
        foundIn: item.foundIn || '',
        locations: item.foundIn ? item.foundIn.split(', ') : [],
        weightKg: item.weightKg,
        stackSize: item.stackSize
      };
      
      // Añadir todas las variantes como claves (para buscar)
      filenameVariants.forEach(variant => {
        itemsDatabase[variant] = itemEntry;
      });
    });
    
    console.log(`Base de datos cargada: ${items.length} items`);
    console.log(`Mapeo total: ${Object.keys(itemsDatabase).length} claves`);
    
    // Enriquecer items del DOM con información de la base de datos
    enrichItemsFromDatabase();
    
    // Actualizar nombres de items desde la base de datos
    updateItemNames();
    
    // Inicializar tooltips
    initImagePreview();
  } catch (error) {
    console.error('Error cargando base de datos:', error);
    // Fallback a base de datos incrustada simple si falla
    itemsDatabase = {};
    initImagePreview();
  }
}

// Cargar base de datos de quests desde JSON
async function loadQuestsDatabase() {
  try {
    console.log('Intentando cargar base de datos de quests...');
    const response = await fetch('./data/quests.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const quests = await response.json();
    console.log(`JSON de quests cargado: ${quests.length} quests`);
    
    // Convertir array a objeto usando ID como clave
    questsDatabase = {};
    quests.forEach(quest => {
      questsDatabase[quest.id] = {
        id: quest.id,
        name: quest.name,
        trader: quest.trader,
        description: quest.description
      };
    });
    
    console.log('Base de datos de quests cargada:', Object.keys(questsDatabase).length, 'quests');
  } catch (error) {
    console.error('Error cargando base de datos de quests:', error);
  }
}
// Selector de idioma
function initLanguageSelector() {
  const langSelect = document.getElementById('lang-select');
  langSelect.value = currentLanguage;
  
  langSelect.addEventListener('change', function() {
    currentLanguage = this.value;
    localStorage.setItem('selectedLanguage', currentLanguage);
    
    // Actualizar toda la interfaz
    updateUILanguage();
    
    // Actualizar nombres de items en el DOM según el nuevo idioma
    updateItemNames();
    
    // Limpiar el cache de páginas para forzar recarga con nuevo idioma
    if (window.pageCache) {
      // Mantener solo la página actual
      const currentPage = localStorage.getItem('arc_raiders_active_tab') || 'quest';
      const currentContent = window.pageCache[currentPage];
      window.pageCache = {};
      window.pageCache[currentPage] = currentContent;
    }
    
    // Los tooltips se actualizarán automáticamente en el próximo hover
  });
  
  // Aplicar idioma inicial
  updateUILanguage();
}

// Función para actualizar el idioma de la interfaz
function updateUILanguage() {
  const translations = uiTranslations[currentLanguage] || uiTranslations['es'];
  
  // Actualizar título de la página
  document.title = translations.pageTitle;
  
  // Actualizar título principal
  const mainTitle = document.querySelector('header h1');
  if (mainTitle) mainTitle.textContent = translations.mainTitle;
  
  // Actualizar botones de navegación
  const navButtons = document.querySelectorAll('.nav-btn');
  if (navButtons[0]) navButtons[0].textContent = translations.navMission;
  if (navButtons[1]) navButtons[1].textContent = translations.navRecyclables;
  if (navButtons[2]) navButtons[2].textContent = translations.navWorkshops;
  if (navButtons[3]) navButtons[3].textContent = translations.navHighValue;
  
  // Actualizar títulos de secciones si estamos en la página principal
  const missionTitle = document.querySelector('#mission-section h2');
  if (missionTitle) missionTitle.textContent = translations.missionObjects;
  
  const projectTitle = document.querySelector('#project-section h2');
  if (projectTitle) projectTitle.textContent = translations.projectObjects;
  
  // Actualizar títulos de etapas del proyecto
  const stageHeaders = document.querySelectorAll('#project-section h3');
  if (stageHeaders[0]) stageHeaders[0].textContent = translations.stage1;
  if (stageHeaders[1]) stageHeaders[1].textContent = translations.stage2;
  if (stageHeaders[2]) stageHeaders[2].textContent = translations.stage3;
  if (stageHeaders[3]) stageHeaders[3].textContent = translations.stage4;
  if (stageHeaders[4]) stageHeaders[4].textContent = translations.stage5;
  if (stageHeaders[5]) stageHeaders[5].textContent = translations.stage6;
  
  // Actualizar texto de la etapa 6
  const stage6Text = document.querySelector('#project-section p');
  if (stage6Text) stage6Text.textContent = translations.stage6Text;
  
  // Actualizar nombres de categorías de carga
  const cargoNames = document.querySelectorAll('.cargo-name');
  if (cargoNames[0]) cargoNames[0].textContent = translations.combat;
  if (cargoNames[1]) cargoNames[1].textContent = translations.survival;
  if (cargoNames[2]) cargoNames[2].textContent = translations.provisions;
  if (cargoNames[3]) cargoNames[3].textContent = translations.materials;
  
  // Actualizar botones de reset
  document.querySelectorAll('.reset-section-btn').forEach(btn => {
    btn.textContent = translations.resetButton;
  });
}

// Función para actualizar nombres de items según el idioma
function updateItemNames() {
  // === 1. ACTUALIZAR ITEMS DE MISIÓN (con data-quest-id) ===
  document.querySelectorAll('[data-quest-id]').forEach(element => {
    const questId = element.getAttribute('data-quest-id');
    const imgSrc = element.getAttribute('data-img');
    const itemId = element.getAttribute('data-item-id');
    
    if (!questId || !questsDatabase[questId] || !imgSrc) return;
    
    const quest = questsDatabase[questId];
    const questName = quest.name[currentLanguage] || quest.name['en'] || quest.name['es'];
    
    // Obtener itemData
    let itemData = itemsDatabase[imgSrc];
    if (!itemData) {
      const baseName = imgSrc.replace('.png', '');
      itemData = itemsDatabase[baseName];
    }
    
    if (!itemData || !itemData.name) return;
    
    const itemName = itemData.name[currentLanguage] || itemData.name['en'] || itemData.name['es'];
    
    // Extraer número de misión del data-item-id (quest_m2_arc -> 2)
    const rarityTextSpan = element.querySelector('.rarity-text');
    if (!rarityTextSpan) return;
    
    let missionNumber = '';
    if (itemId) {
      const missionMatch = itemId.match(/quest_m(\d+)_/);
      if (missionMatch) {
        missionNumber = missionMatch[1];
      }
    }
    
    // Traducir "Misión" según el idioma
    const missionWord = currentLanguage === 'es' ? 'Misión' :
                       currentLanguage === 'en' ? 'Mission' :
                       currentLanguage === 'de' ? 'Mission' :
                       currentLanguage === 'fr' ? 'Mission' :
                       currentLanguage === 'it' ? 'Missione' :
                       currentLanguage === 'pt' ? 'Missão' : 'Misión';
    
    // Actualizar el span interno con el nombre del item
    const innerSpan = rarityTextSpan.querySelector('span');
    if (innerSpan) {
      innerSpan.textContent = itemName;
    }
    
    // Construir el texto completo del .rarity-text
    if (missionNumber) {
      // Crear o actualizar el nodo de texto al inicio
      const textNode = rarityTextSpan.childNodes[0];
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        textNode.textContent = `${missionWord} ${missionNumber} (${questName}) - `;
      } else {
        rarityTextSpan.insertBefore(
          document.createTextNode(`${missionWord} ${missionNumber} (${questName}) - `),
          rarityTextSpan.firstChild
        );
      }
    }
  });
  
  // === 2. ACTUALIZAR ITEMS DE PROYECTO (li con data-img pero sin data-quest-id) ===
  // También actualizar workshops y otras páginas con la misma estructura
  document.querySelectorAll('#project-section li[data-img], #workshops-section li[data-img], section.card li[data-img]').forEach(element => {
    const imgSrc = element.getAttribute('data-img');
    if (!imgSrc) return;
    
    // Buscar el item en la base de datos
    let itemData = itemsDatabase[imgSrc];
    if (!itemData) {
      const baseName = imgSrc.replace('.png', '');
      itemData = itemsDatabase[baseName];
    }
    
    if (!itemData || !itemData.name) return;
    
    // Obtener el nombre traducido
    const translatedName = itemData.name[currentLanguage] || itemData.name['en'] || itemData.name['es'];
    
    // Actualizar el primer span hijo (que contiene el nombre)
    const nameSpan = element.querySelector('span:first-child');
    if (nameSpan && !nameSpan.classList.contains('item-controls')) {
      nameSpan.textContent = translatedName;
    }
  });
  
  // === 3. ACTUALIZAR SPANS CON data-img (recyclables, workshops, etc.) ===
  const itemSpans = document.querySelectorAll('span[data-img]');
  
  itemSpans.forEach(element => {
    const imgSrc = element.getAttribute('data-img');
    if (!imgSrc) return;
    
    // Saltar si es un elemento padre con hijos (excepto controles)
    const hasChildSpans = element.querySelector('span:not(.item-controls):not(.item-counter)');
    if (hasChildSpans) return;
    
    // Buscar el item en la base de datos
    let itemData = itemsDatabase[imgSrc];
    
    // Si no se encuentra, probar variantes
    if (!itemData) {
      const baseName = imgSrc.replace('.png', '').toLowerCase();
      const variants = [
        imgSrc,
        imgSrc.toLowerCase(),
        baseName,
        baseName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('_') + '.png'
      ];
      
      for (const variant of variants) {
        if (itemsDatabase[variant]) {
          itemData = itemsDatabase[variant];
          break;
        }
      }
    }
    
    if (!itemData || !itemData.name) {
      return;
    }
    
    // Obtener el nombre traducido
    const translatedName = itemData.name[currentLanguage] || itemData.name['en'] || itemData.name['es'];
    
    // Actualizar el texto del elemento
    element.textContent = translatedName;
  });
}

// Sistema de tooltips
function initImagePreview() {
  const preview = document.getElementById('preview');
  if (!preview) {
    console.error('Elemento preview no encontrado');
    return;
  }
  
  const previewImg = preview.querySelector('img');
  const previewName = preview.querySelector('.preview-name');
  const previewDescription = preview.querySelector('.preview-description');
  const previewLocations = preview.querySelector('.preview-locations');
  const previewType = preview.querySelector('.preview-type');
  const previewPrice = preview.querySelector('.preview-price');
  
  if (!previewName || !previewDescription || !previewLocations || !previewType || !previewPrice) {
    console.error('Faltan elementos del preview:', {
      name: !!previewName,
      description: !!previewDescription,
      locations: !!previewLocations,
      type: !!previewType,
      price: !!previewPrice
    });
    return;
  }
  
  document.querySelectorAll('[data-img]').forEach(item => {
    item.addEventListener('mouseenter', function(e) {
      const imgSrc = this.getAttribute('data-img');
      if (imgSrc) {
        // Buscar información en la base de datos
        let itemData = itemsDatabase[imgSrc];
        
        // Si no se encuentra, probar variantes comunes
        if (!itemData) {
          const baseName = imgSrc.replace('.png', '').toLowerCase();
          const variants = [
            imgSrc,                          // arc_alloy.png
            imgSrc.toLowerCase(),            // arc_alloy.png
            baseName,                        // arc_alloy
            baseName.toUpperCase(),          // ARC_ALLOY
            baseName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('_') + '.png', // Arc_Alloy.png
            baseName.split('_').map(w => w.toUpperCase()).join('_') + '.png' // ARC_ALLOY.png
          ];
          
          for (const variant of variants) {
            if (itemsDatabase[variant]) {
              itemData = itemsDatabase[variant];
              console.log(`✅ Item encontrado con variante "${variant}":`, itemData);
              break;
            }
          }
          
          if (!itemData) {
            console.warn(`❌ Item NO encontrado: "${imgSrc}". Variantes probadas:`, variants);
          }
        } else {
          console.log(`✅ Item encontrado:`, imgSrc, itemData);
        }
        
        // Usar el nombre de archivo del HTML (puede tener mayúsculas correctas)
        // Si no se encuentra en BD, intentar con el nombre original
        const actualFilename = imgSrc;
        const imgPath = `img/${actualFilename}`;
        console.log(`📸 Intentando cargar imagen: ${imgPath}`);
        previewImg.src = imgPath;
        
        if (itemData) {
          console.log('Item data completo:', itemData); // Debug
          
          // Limpiar clases de rareza anteriores
          preview.classList.remove('rarity-c', 'rarity-u', 'rarity-r', 'rarity-e', 'rarity-l');
          
          // Agregar clase de rareza según el item
          if (itemData.rarity) {
            const rarityMap = {
              'Common': 'rarity-c',
              'Uncommon': 'rarity-u',
              'Rare': 'rarity-r',
              'Epic': 'rarity-e',
              'Legendary': 'rarity-l'
            };
            const rarityClass = rarityMap[itemData.rarity];
            if (rarityClass) {
              preview.classList.add(rarityClass);
            }
          }
          
          // Mostrar nombre según el idioma seleccionado
          const itemName = itemData.name[currentLanguage] || itemData.name['en'] || itemData.name['es'];
          previewName.textContent = itemName;
          previewName.style.display = 'block';
          
          // Mostrar tipo traducido en el footer
          if (itemData.type) {
            const translatedType = translateItemType(itemData.type, currentLanguage);
            previewType.textContent = translatedType;
            previewType.style.display = 'block';
          } else {
            previewType.style.display = 'none';
          }
          
          // Mostrar descripción según el idioma seleccionado
          if (itemData.description) {
            const itemDesc = itemData.description[currentLanguage] || itemData.description['en'] || itemData.description['es'];
            previewDescription.textContent = itemDesc;
            previewDescription.style.display = 'block';
          } else {
            previewDescription.style.display = 'none';
          }
          
          // Mostrar ubicaciones desde la base de datos
          if (itemData.locations && itemData.locations.length > 0) {
            previewLocations.innerHTML = itemData.locations.map(loc => 
              `<span class="location-tag">${translateLocation(loc, currentLanguage)}</span>`
            ).join('');
            previewLocations.style.display = 'flex';
          } else {
            previewLocations.style.display = 'none';
          }
          
          // Mostrar precio desde la base de datos
          if (itemData.value) {
            previewPrice.textContent = `$${itemData.value.toLocaleString()}`;
            previewPrice.style.display = 'block';
          } else {
            previewPrice.style.display = 'none';
          }
        } else {
          // Fallback: extraer del texto si no está en la base de datos
          const itemText = this.textContent;
          const parts = itemText.split(':');
          const itemName = parts[0].trim();
          const priceMatch = itemText.match(/\$[\d,]+/);
          
          previewName.textContent = itemName;
          previewDescription.style.display = 'none';
          previewLocations.style.display = 'none';
          previewType.style.display = 'none';
          
          if (priceMatch) {
            previewPrice.textContent = priceMatch[0];
            previewPrice.style.display = 'block';
          } else {
            previewPrice.style.display = 'none';
          }
        }
        
        preview.style.display = 'block';
      }
    });
    
    item.addEventListener('mousemove', function(e) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const previewWidth = 100;
      const previewHeight = 100;
      const offset = 15;
      
      let x = e.clientX + offset;
      let y = e.clientY + offset;
      
      if (x + previewWidth > viewportWidth) {
        x = e.clientX - previewWidth - offset;
      }
      
      if (y + previewHeight > viewportHeight) {
        y = e.clientY - previewHeight - offset;
      }
      
      preview.style.left = x + 'px';
      preview.style.top = y + 'px';
    });
    
    item.addEventListener('mouseleave', function() {
      preview.style.display = 'none';
      // Limpiar clases de rareza
      preview.classList.remove('rarity-c', 'rarity-u', 'rarity-r', 'rarity-e', 'rarity-l');
    });
  });
}
