// ===== SISTEMA DE NAVEGACIÓN =====
document.addEventListener('DOMContentLoaded', async function() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const contentContainer = document.getElementById('content-container');
  const loadingScreen = document.getElementById('loading-screen');
  
  // Cache para almacenar el contenido de las páginas ya cargadas (exponer globalmente)
  window.pageCache = {};
  const pageCache = window.pageCache;
  
  // Guardar el contenido original de quest (Mission/Project) que ya está en el HTML
  pageCache['quest'] = contentContainer.innerHTML;
  
  // Inicializar selector de idioma
  initLanguageSelector();
  
  // Cargar bases de datos (ESPERAR a que terminen)
  await loadItemsDatabase();
  await loadQuestsDatabase();
  console.log('Bases de datos cargadas, iniciando página...');
  
  // Pre-cargar todas las páginas en segundo plano para tener navegación instantánea
  preloadPages();
  
  // Cargar la última página visitada o 'quest' por defecto
  const lastPage = localStorage.getItem('arc_raiders_active_tab') || 'quest';
  await loadPage(lastPage);
  
  // Ocultar pantalla de carga y mostrar contenido (con delay de 1 segundo)
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    document.body.classList.add('content-ready');
  }, 1000);
  
  // Marcar el botón correcto como activo
  navButtons.forEach(btn => {
    const btnPage = btn.getAttribute('data-page').replace('.html', '');
    if (btnPage === lastPage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      navButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const page = this.getAttribute('data-page').replace('.html', '');
      localStorage.setItem('arc_raiders_active_tab', page);
      loadPage(page);
    });
  });
  
  function preloadPages() {
    // Pre-cargar todas las páginas en el cache
    const pages = ['recyclables', 'workshops', 'itemsvalue'];
    pages.forEach(page => {
      fetch(`./${page}.html`)
        .then(response => response.text())
        .then(html => {
          pageCache[page] = html;
        })
        .catch(error => {
          console.error(`Error pre-cargando ${page}:`, error);
        });
    });
  }
  
  async function loadPage(page) {
    // Si la página está en cache, cargarla instantáneamente
    if (pageCache[page]) {
      contentContainer.innerHTML = pageCache[page];
      
      // Enriquecer items con información de la base de datos
      enrichItemsFromDatabase();
      
      // Actualizar nombres de items según idioma
      updateItemNames();
      
      // Inicializar sistemas
      initImagePreview();
      initTracking();
      initCounterButtons();
      
      return;
    }
    
    // Si no está en cache, cargar el archivo HTML externo
    try {
      const response = await fetch(`./${page}.html`);
      if (!response.ok) {
        throw new Error('Archivo no encontrado');
      }
      const html = await response.text();
      
      // Guardar en cache
      pageCache[page] = html;
      contentContainer.innerHTML = html;
      
      // Enriquecer items con información de la base de datos
      enrichItemsFromDatabase();
      
      // Actualizar nombres de items según idioma
      updateItemNames();
      
      // Inicializar sistemas
      initImagePreview();
      initTracking();
      initCounterButtons();
    } catch (error) {
      contentContainer.innerHTML = '<p>Error: No se pudo cargar el contenido.</p>';
      console.error('Error cargando página:', error);
    }
  }
  
  function initCounterButtons() {
    document.querySelectorAll('.counter-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const itemId = this.getAttribute('data-item-id');
        const change = parseInt(this.getAttribute('data-change'));
        updateCounter(itemId, change);
      });
    });
    
    document.querySelectorAll('.item-counter').forEach(counter => {
      counter.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const listItem = this.closest('li');
        const cargoCategory = this.closest('.cargo-category');
        
        let itemId, requiredAmount, currentValue;
        
        if (listItem) {
          itemId = listItem.getAttribute('data-item-id');
          requiredAmount = getRequiredAmount(listItem);
          currentValue = this.textContent;
        } else if (cargoCategory) {
          itemId = cargoCategory.getAttribute('data-item-id');
          requiredAmount = parseInt(cargoCategory.getAttribute('data-max')) || 1;
          currentValue = this.textContent.replace(/,/g, '');
        } else {
          return;
        }
        
        const newCount = prompt(`Ingresa la cantidad (máximo ${formatNumber(requiredAmount)}):`, currentValue);
        if (newCount !== null) {
          let count = parseInt(newCount.replace(/,/g, '')) || 0;
          count = Math.max(0, Math.min(requiredAmount, count));
          this.textContent = formatNumber(count);
          saveProgress(itemId, count);
          
          if (listItem) {
            if (count >= requiredAmount) {
              listItem.style.opacity = '0.5';
              listItem.style.textDecoration = 'line-through';
            } else {
              listItem.style.opacity = '1';
              listItem.style.textDecoration = 'none';
            }
          } else if (cargoCategory) {
            updateProgressBar(itemId, count, requiredAmount);
          }
        }
      });
    });
    
    // Inicializar botones de reset por sección
    document.querySelectorAll('.reset-section-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section-id');
        resetSectionProgress(sectionId);
      });
    });
    
    // Inicializar pestañas de high value (si existen)
    initHighValueTabs();
  }
  
  function initHighValueTabs() {
    const valueTabs = document.querySelectorAll('.value-tab');
    const valueContents = document.querySelectorAll('.value-content');
    
    if (valueTabs.length === 0) return; // No hay pestañas, salir
    
    valueTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const targetValue = this.getAttribute('data-value');
        
        // Remover clase active de todas las pestañas y contenidos
        valueTabs.forEach(t => t.classList.remove('active'));
        valueContents.forEach(c => c.classList.remove('active'));
        
        // Agregar clase active a la pestaña clickeada
        this.classList.add('active');
        
        // Mostrar el contenido correspondiente
        const targetContent = document.querySelector(`.value-content[data-content="${targetValue}"]`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }
  
  window.resetSectionProgress = resetSectionProgress;
});
