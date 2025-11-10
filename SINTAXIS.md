# Sintaxis Simplificada para Items

## Concepto

Ahora solo necesitas especificar el **ID del item** del `items.json` y toda la información (nombre, precio, rareza, imagen) se carga automáticamente desde la base de datos.

## Sintaxis

### Items con Contador (Misiones/Proyectos)

```html
<li data-item="arc_alloy" 
    data-mission="Misión 2 (Cielos Más Claros)" 
    data-quantity="3" 
    data-item-id="quest_m2_arc">
  <span class="item-controls">
    <button class="counter-btn" data-item-id="quest_m2_arc" data-change="-1">-</button>
    <span class="item-counter">0</span>
    <button class="counter-btn" data-item-id="quest_m2_arc" data-change="1">+</button>
  </span>
</li>
```

**Resultado en pantalla:**
```
Misión 2 (Cielos Más Claros) - Aleación ARC: x 3 [-] 0 [+]
```

### Items Simples (Reciclables/Alto Valor)

```html
<li data-item="wasp_driver"></li>
```

**Resultado en pantalla:**
```
Controlador de Avispa: $1,000
```

### Items Sin Base de Datos (Exclusivos de Misión)

Para items que no están en la base de datos (items exclusivos de misión):

```html
<li class="rarity-r" data-item-id="quest_m21_esr">
  Misión 21 (Una Revelación en Ruinas) - Analizador ESR: x 1
  <span class="item-controls">...</span>
</li>
```

## Atributos

### `data-item` (Requerido para items de BD)
El ID del item del `items.json`. Ejemplos:
- `arc_alloy`
- `wires`
- `battery`
- `wasp_driver`
- `great_mullein`

### `data-mission` (Opcional - solo para misiones)
El nombre de la misión que aparecerá antes del nombre del item.
Ejemplo: `"Misión 2 (Cielos Más Claros)"`

### `data-quantity` (Opcional - solo para misiones)
La cantidad requerida del item.
Ejemplo: `"3"`

### `data-item-id` (Requerido para tracking)
ID único para guardar el progreso en cookies.
Ejemplo: `"quest_m2_arc"`

## Lo que se Genera Automáticamente

Cuando usas `data-item="arc_alloy"`, el sistema automáticamente:

1. ✅ **Busca el item** en la base de datos por ID
2. ✅ **Añade la imagen** (`data-img="arc_alloy.png"`) para tooltips
3. ✅ **Asigna la rareza** (clase `rarity-u`, `rarity-r`, etc.)
4. ✅ **Muestra el nombre** en el idioma seleccionado (español, inglés, etc.)
5. ✅ **Muestra el precio** formateado ($200)
6. ✅ **Tooltip** con imagen, nombre, precio y ubicaciones

## Comparación

### ❌ Sintaxis Antigua (Hardcodeada)
```html
<li class="rarity-u" data-img="ARC_Alloy.png" data-item-id="quest_m2_arc">
  Misión 2 (Cielos Más Claros) - <span data-img="ARC_Alloy.png">Aleación ARC</span>: x 3
  <span class="item-controls">...</span>
</li>
```

### ✅ Sintaxis Nueva (Dinámica)
```html
<li data-item="arc_alloy" 
    data-mission="Misión 2 (Cielos Más Claros)" 
    data-quantity="3" 
    data-item-id="quest_m2_arc">
  <span class="item-controls">...</span>
</li>
```

## Ventajas

1. **Mucho más corto** - Solo 3 atributos en lugar de todo el texto
2. **Multiidioma automático** - Cambia de idioma y se actualiza solo
3. **Mantenimiento fácil** - Solo cambias el `items.json`
4. **Sin errores de tipeo** - Los nombres vienen de la BD
5. **Rareza automática** - No necesitas especificar la clase
6. **Precios actualizados** - Se actualizan desde el JSON

## IDs de Items Comunes

```
arc_alloy         - Aleación ARC
wires             - Cables
battery           - Batería
wasp_driver       - Controlador de Avispa
hornet_driver     - Controlador de Avispón
snitch_scanner    - Escáner Soplón
surveyor_vault    - Depósito de Vigilante
antiseptic        - Antiséptico
syringe           - Jeringa
durable_cloth     - Tela Resistente
great_mullein     - Gran Verbasco
fertilizer        - Fertilizante
water_pump        - Bomba de Agua
rocketeer_driver  - Controlador de Cohetero
leaper_pulse_unit - Unidad de Pulso de Saltador
```

Para ver todos los IDs disponibles, consulta `data/items.json` y busca el campo `"id"`.

## Debugging

Si un item no se muestra:
1. Abre la consola del navegador (F12)
2. Busca mensajes como: `Item no encontrado en base de datos: xxx`
3. Verifica que el ID exista en `items.json`
4. Verifica que el nombre del archivo de imagen coincida
