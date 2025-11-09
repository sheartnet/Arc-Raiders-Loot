// ===== SISTEMA DE TRACKING CON COOKIES =====
const COOKIE_NAME = 'arc_raiders_progress';
const COOKIE_EXPIRY_DAYS = 365;

// Funciones de manejo de cookies
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function saveProgress(itemId, count) {
  let progress = {};
  const savedData = getCookie(COOKIE_NAME);
  if (savedData) {
    try {
      progress = JSON.parse(decodeURIComponent(savedData));
    } catch (e) {
      progress = {};
    }
  }
  
  if (count > 0) {
    progress[itemId] = count;
  } else {
    delete progress[itemId];
  }
  
  setCookie(COOKIE_NAME, encodeURIComponent(JSON.stringify(progress)), COOKIE_EXPIRY_DAYS);
}

function loadProgress() {
  const savedData = getCookie(COOKIE_NAME);
  if (savedData) {
    try {
      return JSON.parse(decodeURIComponent(savedData));
    } catch (e) {
      return {};
    }
  }
  return {};
}

function resetSectionProgress(sectionId) {
  if (confirm('¿Estás seguro de que quieres resetear el progreso de esta sección?')) {
    let progress = loadProgress();
    
    // Eliminar items normales (li) de esta sección
    document.querySelectorAll(`#${sectionId} li[data-item-id]`).forEach(item => {
      const itemId = item.getAttribute('data-item-id');
      delete progress[itemId];
      
      // Resetear visualmente
      const counter = item.querySelector('.item-counter');
      if (counter) counter.textContent = '0';
      item.style.opacity = '1';
      item.style.textDecoration = 'none';
    });
    
    // Eliminar categorías de carga de esta sección
    document.querySelectorAll(`#${sectionId} .cargo-category[data-item-id]`).forEach(category => {
      const itemId = category.getAttribute('data-item-id');
      delete progress[itemId];
      
      // Resetear visualmente
      const counter = category.querySelector('.item-counter');
      if (counter) counter.textContent = '0';
      const maxAmount = parseInt(category.getAttribute('data-max')) || 1;
      updateProgressBar(itemId, 0, maxAmount);
    });
    
    // Guardar cambios en cookies
    setCookie(COOKIE_NAME, encodeURIComponent(JSON.stringify(progress)), COOKIE_EXPIRY_DAYS);
  }
}

function getRequiredAmount(element) {
  // Para items normales (li), extraer del texto
  if (element.tagName === 'LI') {
    const text = element.textContent;
    const match = text.match(/x\s*(\d+)/);
    return match ? parseInt(match[1]) : 1;
  }
  // Para categorías de carga, obtener del atributo data-max
  const cargoCategory = element.closest('.cargo-category');
  if (cargoCategory) {
    return parseInt(cargoCategory.getAttribute('data-max')) || 1;
  }
  return 1;
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateCounter(itemId, change) {
  const counterSpan = document.querySelector(`[data-item-id="${itemId}"] .item-counter`);
  if (!counterSpan) return;
  
  // Determinar si es un item normal o una categoría de carga
  const listItem = counterSpan.closest('li');
  const cargoCategory = counterSpan.closest('.cargo-category');
  
  let requiredAmount;
  if (listItem) {
    requiredAmount = getRequiredAmount(listItem);
  } else if (cargoCategory) {
    requiredAmount = parseInt(cargoCategory.getAttribute('data-max')) || 1;
  } else {
    return;
  }
  
  let currentCount = parseInt(counterSpan.textContent.replace(/,/g, '')) || 0;
  currentCount = Math.max(0, Math.min(requiredAmount, currentCount + change));
  
  counterSpan.textContent = formatNumber(currentCount);
  saveProgress(itemId, currentCount);
  
  // Actualizar estilo visual
  if (listItem) {
    // Items normales
    if (currentCount >= requiredAmount) {
      listItem.style.opacity = '0.5';
      listItem.style.textDecoration = 'line-through';
    } else {
      listItem.style.opacity = '1';
      listItem.style.textDecoration = 'none';
    }
  } else if (cargoCategory) {
    // Categorías de carga - actualizar barra de progreso
    updateProgressBar(itemId, currentCount, requiredAmount);
  }
}

function updateProgressBar(itemId, current, max) {
  const progressBar = document.querySelector(`.progress-bar-fill[data-item-id="${itemId}"]`);
  const progressText = progressBar?.parentElement.querySelector('.progress-bar-text');
  
  if (progressBar && progressText) {
    const percentage = Math.min(100, (current / max) * 100);
    progressBar.style.width = percentage + '%';
    progressText.textContent = `${formatNumber(current)} / ${formatNumber(max)}`;
  }
}

function initTracking() {
  const progress = loadProgress();
  
  // Inicializar items normales
  document.querySelectorAll('li[data-item-id]').forEach(item => {
    const itemId = item.getAttribute('data-item-id');
    const savedCount = progress[itemId] || 0;
    
    const counterSpan = item.querySelector('.item-counter');
    if (counterSpan) {
      counterSpan.textContent = savedCount;
      
      const requiredAmount = getRequiredAmount(item);
      if (savedCount >= requiredAmount) {
        item.style.opacity = '0.5';
        item.style.textDecoration = 'line-through';
      }
    }
  });
  
  // Inicializar categorías de carga
  document.querySelectorAll('.cargo-category').forEach(category => {
    const itemId = category.getAttribute('data-item-id');
    const savedCount = progress[itemId] || 0;
    const maxAmount = parseInt(category.getAttribute('data-max')) || 1;
    
    const counterSpan = category.querySelector('.item-counter');
    if (counterSpan) {
      counterSpan.textContent = formatNumber(savedCount);
      updateProgressBar(itemId, savedCount, maxAmount);
    }
  });
}
