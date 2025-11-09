# Estructura de JavaScript

## Archivos Principales

### app.js
Sistema de navegación y controlador principal de la aplicación.
- Maneja la navegación entre páginas (Misión/Proyecto, Reciclables, Talleres, Alto Valor)
- Inicializa todos los sistemas al cargar la página
- Gestiona los botones de contador (+/-)
- Persiste la última página visitada en localStorage

### database.js
Sistema de base de datos de items y tooltips.
- Carga `items.json` y crea mapeo por ID, filename y variantes
- Sistema multiidioma (10 idiomas soportados)
- Enriquece items del DOM con información de la BD (rareza, nombres, precios)
- Gestiona tooltips con información completa de items
- Selector de idioma con actualización en vivo

### tracking.js
Sistema de progreso y tracking con cookies.
- Guarda/carga progreso de items con cookies (365 días)
- Maneja contadores de items y categorías de carga
- Barras de progreso visuales
- Botón de reset por sección
- Formato de números con comas (1,000)

### script.js (DEPRECATED)
Script antiguo de tooltips. Mantener por compatibilidad pero ya no se usa.
Los nuevos archivos (app.js, database.js, tracking.js) reemplazan completamente su funcionalidad.

## Orden de Carga

Los scripts deben cargarse en este orden en el HTML:

```html
<script src="./js/tracking.js"></script>
<script src="./js/database.js"></script>
<script src="./js/app.js"></script>
```

**Importante:** `app.js` debe ser el último porque contiene el `DOMContentLoaded` que inicializa todo y depende de las funciones de `tracking.js` y `database.js`.

## Variables Globales

- `itemsDatabase` - Base de datos de items cargada desde JSON
- `currentLanguage` - Idioma actual seleccionado (default: 'es')
- `COOKIE_NAME` - Nombre de la cookie de progreso
- `COOKIE_EXPIRY_DAYS` - Días de expiración de cookies (365)

## Funciones Principales

### Tracking
- `saveProgress(itemId, count)` - Guardar progreso en cookies
- `loadProgress()` - Cargar progreso desde cookies
- `updateCounter(itemId, change)` - Actualizar contador (+/-)
- `resetSectionProgress(sectionId)` - Resetear sección completa

### Database
- `loadItemsDatabase()` - Cargar items.json
- `enrichItemsFromDatabase()` - Actualizar DOM con info de BD
- `initLanguageSelector()` - Inicializar selector de idioma
- `initImagePreview()` - Configurar tooltips

### Utils
- `formatNumber(num)` - Formatear números con comas
- `getRequiredAmount(element)` - Obtener cantidad requerida de un item
