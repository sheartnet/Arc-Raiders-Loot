# Base de Datos de Items - Arc Raiders

## Estructura

La carpeta `data/` contiene los archivos JSON con la base de datos completa de items del juego.

### items.json

Archivo principal con todos los items del juego en múltiples idiomas:
- **Idiomas soportados**: Español, English, Français, Deutsch, Português, Italiano, Русский, 日本語, 中文, 한국어, y más
- **Datos incluidos**: 
  - Nombre del item en todos los idiomas
  - Descripción completa en todos los idiomas
  - Tipo de item
  - Rareza
  - Valor ($)
  - Imagen (URL)
  - Ubicaciones donde se encuentra (foundIn)

## Selector de Idioma

La web incluye un selector de idioma en la parte superior derecha que permite:
- Cambiar entre múltiples idiomas
- El idioma seleccionado se guarda en localStorage
- Los tooltips de items se muestran en el idioma seleccionado

## Uso en la Web

La base de datos se carga automáticamente al iniciar la página mediante:
```javascript
loadItemsDatabase();
```

Los items se mapean usando el nombre del archivo de imagen como clave, soportando múltiples variantes de nombre.

## Actualización

Para actualizar la base de datos, simplemente reemplaza el archivo `items.json` con la versión más reciente del repositorio oficial.
