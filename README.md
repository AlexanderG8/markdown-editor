# markdown-editor
Mi propio editor markdown desarrollado con HTML, CSS, JavaScript y Tailwind CSS.

## Uso

1. Abre el archivo `index.html` en tu navegador.
2. Utiliza los botones de la barra de herramientas para:
   - Copiar el texto
   - Borrar el texto
   - Exportar el contenido como HTML
3. Escribe o pega tu texto en el área de entrada.
4. Verifica la vista previa en el área de vista previa.
5. Utiliza los contadores de palabras y caracteres para monitorear el contenido.
6. Exporta el documento como HTML si lo deseas.

## Desarrollo

El proyecto se desarrolla con:

- HTML5
- CSS3
- JavaScript
- Tailwind CSS
- Font Awesome

## Conversiones Markdown Soportadas

El editor soporta las siguientes conversiones de Markdown a HTML:

| Elemento Markdown | Descripción | Ejemplo |
|-------------|-------------|---------|
| # Texto | Encabezados (h1 a h6 según el número de #) | # Título Principal |
| **Texto** | Texto en negrita | **texto importante** |
| *Texto* | Texto en cursiva | *texto enfatizado* |
| * Item o - Item | Lista no ordenada | * Primer elemento |
| 1. Item | Lista ordenada | 1. Primer elemento |
| [Texto](url) | Enlace | [Google](https://www.google.com) |
| ![Logo de Javascript](https://cdn.iconscout.com/icon/free/png-512/free-javascript-logo-icon-download-in-svg-png-gif-file-formats--html-programming-language-coding-logos-icons-1720087.png?f=webp&w=512) | Imagen | ![Logo](https://cdn.iconscout.com/icon/free/png-512/free-javascript-logo-icon-download-in-svg-png-gif-file-formats--html-programming-language-coding-logos-icons-1720087.png?f=webp&w=512) |
| ```código``` | Bloque de código | ```console.log("Hola")``` |
| `código` | Código en línea | `var x = 10;` |
| > Texto | Citas | > Esto es una cita |
| ---, ***, ___ | Línea horizontal | --- |

## Detalle del Proyecto Editor de Markdown

## 1. Estructura del Proyecto
El proyecto del Editor de Markdown está organizado de la siguiente manera:

```
markdown-editor/
│
├── index.html        # Archivo principal HTML con la interfaz de usuario
│
├── js/               # Carpeta con los archivos JavaScript
│   ├── app.js        # Lógica principal de la aplicación
│   ├── format.js     # Funciones de conversión de Markdown a HTML
│   ├── list.js       # Gestión de listas ordenadas con programación funcional
│   └── blocks.js     # Utilidades para manejo de bloques de texto
│
└── README.md         # Documentación del proyecto
```

## 2. Funciones Creadas

### Funciones en app.js

| Función | Descripción |
|---------|-------------|
| debounce(func, delay) | Implementa la técnica de "debounce" para limitar la frecuencia de ejecución de funciones, mejorando el rendimiento |
| updateWordCounter() | Actualiza los contadores de palabras y caracteres en tiempo real |
| updatePreviewInRealTime() | Actualiza la vista previa del contenido Markdown convertido a HTML |
| execEvents() | Ejecuta los eventos de actualización de manera coordinada |

También se implementan varios event listeners para manejar acciones como:

- Limpiar el editor
- Copiar el código
- Exportar el contenido como HTML

### Funciones en format.js

| Función | Descripción |
|---------|-------------|
| formatTextToCursiveOrBold(text) | Aplica formato de negrita o cursiva al texto seleccionado |
| convertHeadings(html) | Convierte encabezados Markdown (# texto) en elementos HTML ``<h1>-<h6>`` |
| convertBold(html) | Convierte texto en negrita (texto) en elementos ``<strong>`` |
| converCursive(html) | Convierte texto en cursiva (texto) en elementos ``<em>`` |
| convertUnorderedLists(html) | Convierte listas no ordenadas Markdown (iniciadas con * o -) en elementos ``<ul><li>`` |
| convertOrderedLists(html) | Convierte listas ordenadas Markdown (iniciadas con números) en elementos ``<ol><li>`` |
| convertLinks(html) | Convierte enlaces Markdown texto en elementos ``<a>`` |
| convertImages(html) | Convierte imágenes Markdownalten elementos ``<img>`` |
| convertCodeBlocks(html) | Convierte bloques de código Markdown (entre ```) en elementos ``<pre><code>`` |
| convertInlineCode(html) | Convierte código en línea Markdown (código) en elementos ``<code>`` |
| convertBlockquotes(html) | Convierte citas Markdown (> texto) en elementos ``<blockquote>`` |
| convertHorizontalRules(html) | Convierte líneas horizontales Markdown (---, ***, ___) en elementos ``<hr>`` |
| convertToHtml(text) | Función principal que aplica todas las transformaciones de Markdown a HTML |
| renderPreview(html) | Actualiza el contenido del elemento de vista previa |

### Funciones en list.js

| Función | Descripción |
|---------|-------------|
| processMatchingLines(text, pattern, lineProcessor) | Función de orden superior que procesa líneas de texto según un patrón específico |
| identifyAndProcessLists(lines, pattern, lineProcessor) | Identifica secuencias de líneas que forman listas numeradas |
| generateOrderedList(listItems, lineProcessor) | Genera el HTML para una lista ordenada a partir de un array de líneas |
| processListItem(line) | Procesa una línea de texto para convertirla en un elemento ``<li>`` |
| convertOrderedLists(text) | Función principal que convierte texto con formato de lista numerada a HTML |

### Funciones en blocks.js

| Función | Descripción |
|---------|-------------|
| getSelectedText(event) | Obtiene el texto seleccionado por el usuario en el editor |

## 3. Buenas Prácticas Implementadas

### Arquitectura y Organización de Código

Separación de responsabilidades: El código está organizado en módulos separados según su funcionalidad (app.js para la lógica principal, format.js para conversiones, list.js para manejo específico de listas).

Comentarios y documentación: Las funciones incluyen comentarios detallados explicando su propósito, parámetros y funcionamiento.

Uso de funciones puras: Especialmente en list.js, se implementan conceptos de programación funcional con funciones que no tienen efectos secundarios.

### Rendimiento

Implementación de debounce: Se utiliza la técnica de debounce para limitar la frecuencia de actualización durante la escritura, mejorando significativamente el rendimiento.

Procesamiento eficiente de texto: Las conversiones de Markdown a HTML se realizan utilizando expresiones regulares optimizadas.

### Interfaz de Usuario

Diseño responsivo: La interfaz se adapta a diferentes tamaños de pantalla, funcionando tanto en dispositivos móviles como de escritorio.

Feedback instantáneo: El usuario recibe retroalimentación en tiempo real sobre su texto (contadores de palabras/caracteres y vista previa).

Accesibilidad: Se utilizan atributos ARIA para mejorar la accesibilidad (aria-label, aria-live) y etiquetas semánticas HTML5.

### Estilización

Uso de Tailwind CSS: Se aplica un framework moderno de CSS para estilos consistentes y optimizados.

Paleta de colores coherente: Se mantiene una paleta de colores en tonos azul/slate oscuro consistente con el tema de la aplicación.

Estilos personalizados: Se aplican estilos específicos para diferentes elementos de Markdown, mejorando la legibilidad de la vista previa.

### Seguridad

Enlaces externos seguros: Los enlaces generados desde Markdown se abren en nuevas pestañas con target="_blank" por seguridad.
Escapado de HTML: Se escapan caracteres especiales HTML en bloques de código para prevenir vulnerabilidades XSS.

### Experiencia de Usuario

Iconos intuitivos: Se utilizan iconos de Font Awesome para mejorar la comprensión visual de las acciones disponibles.
Exportación de contenido: Se incluye la funcionalidad para exportar el contenido como HTML, facilitando el uso posterior del documento generado.
Contador de caracteres con límite: Se implementa un contador que limita automáticamente el texto a un número máximo de caracteres, evitando problemas de rendimiento con textos extremadamente largos.

### Nuevas Implementaciones

### HU1: Barra de Herramientas de Formato Markdown

**"Como usuario, quiero tener una barra de herramientas básica para aplicar formato Markdown rápidamente sin recordar la sintaxis."**

#### Criterios de Aceptación:

- La barra de herramientas debe incluir botones para aplicar negrita, cursiva, y encabezados.
- Al hacer clic en un botón, el formato correspondiente debe aplicarse al texto seleccionado.
- La barra de herramientas debe ser intuitiva y fácil de usar.

### Implementación HU1

He implementado la nueva barra de herramientas de formato Markdown según los requisitos especificados. Estas son las mejoras realizadas:

#### Cambios en el Diseño

He añadido una elegante barra de herramientas en la parte superior del panel del editor que incluye:

- Botón para texto en **negrita** (con un ícono de negrita)
- Botón para texto en *cursiva* (con un ícono de cursiva)
- Botones para encabezados de nivel 1, 2 y 3 (H1, H2, H3)

#### Funcionalidades Implementadas

**Aplicación de formato al texto seleccionado:**

- Si seleccionas texto y haces clic en un botón, el formato se aplica al texto seleccionado.
- Si no hay texto seleccionado, se inserta un marcador de posición "texto" con el formato apropiado.

**Manejo inteligente de encabezados:**

- Si el cursor está al inicio de una línea, se coloca el formato de encabezado directamente.
- Si el cursor está en medio de una línea, se inserta automáticamente un salto de línea antes del encabezado.

**Atajos de teclado:**

- `Ctrl+B` para texto en negrita
- `Ctrl+I` para texto en cursiva

#### Características Adicionales

- Cada botón tiene un título (tooltip) que aparece al pasar el cursor, mostrando su función y algunos atajos de teclado.
- La barra de herramientas es responsiva y adaptable a diferentes tamaños de pantalla.
- El formato aplicado se refleja inmediatamente en la vista previa.

#### Validación de Criterios de Aceptación

- ✅ Incluye botones para negrita, cursiva y encabezados
- ✅ Al hacer clic en un botón, se aplica el formato al texto seleccionado
- ✅ La barra es intuitiva y fácil de usar

---

### HU2: Insertar Enlaces y Elementos Multimedia

**"Como usuario que escribe documentación, quiero tener botones para insertar enlaces e imágenes fácilmente, sin tener que recordar la sintaxis exacta de Markdown."**

#### Criterios de Aceptación:

- La barra de herramientas debe incluir un botón para insertar enlaces y otro para insertar imágenes.
- Al hacer clic en el botón de enlace, debe mostrarse un diálogo sencillo para ingresar la URL y el texto del enlace.
- Al hacer clic en el botón de imagen, debe mostrarse un diálogo para ingresar la URL de la imagen y el texto alternativo.
- El formato debe aplicarse correctamente y reflejarse inmediatamente en la vista previa.
- Los diálogos deben ser intuitivos y fáciles de usar.

#### Implementación HU2

He implementado la funcionalidad para insertar enlaces e imágenes en tu editor Markdown. Estos son los cambios que he realizado:

#### 1. Nuevos botones en la barra de herramientas

He añadido dos botones a la barra de herramientas existente:

- 🔗 Un botón con icono de enlace para insertar enlaces
- 🖼️ Un botón con icono de imagen para insertar imágenes

#### 2. Diálogos modales intuitivos

He creado dos diálogos modales con un diseño moderno que coincide con la estética de tu aplicación:

**Diálogo de enlaces:**

- Campo para ingresar el texto a mostrar
- Campo para ingresar la URL del enlace
- Botones para cancelar o insertar

**Diálogo de imágenes:**

- Campo para ingresar el texto alternativo (importante para accesibilidad)
- Campo para ingresar la URL de la imagen
- Botones para cancelar o insertar

#### 3. Características inteligentes

La implementación incluye varias características inteligentes:

- Si seleccionas texto antes de hacer clic en el botón de enlace, ese texto se usará automáticamente como el texto del enlace.
- Si seleccionas texto antes de hacer clic en el botón de imagen, ese texto se usará como texto alternativo.
- Los campos de URL vienen con `https://` pre-llenado para facilitar la entrada.
- Se muestran notificaciones de éxito o error después de insertar o cuando falta información.
- El foco vuelve automáticamente al editor después de cerrar los diálogos.
- Los diálogos se pueden cerrar haciendo clic en "Cancelar" o en el ícono X.

#### 4. Formato Markdown generado

Cuando insertas:

- Un enlace: `[texto del enlace](url)`
- Una imagen: `![texto alternativo](url)`

✅ Esta implementación cumple con todos los criterios de aceptación de la historia de usuario y mejora significativamente la usabilidad del editor, ya que los usuarios no necesitan recordar la sintaxis exacta para enlaces e imágenes.

### Decisiones Técnicas Clave

**HU1: Barra de Herramientas de Formato Markdown:**

Para esta historia, implementé un sistema modular de formateo que captura la selección actual del texto antes de aplicar el formato, permitiendo manipular solo el texto seleccionado o insertar marcadores de posición cuando no hay selección. Las decisiones clave incluyeron el posicionamiento inteligente del cursor después de aplicar formato, la detección contextual para insertar saltos de línea cuando sea necesario (especialmente para encabezados), y la implementación de atajos de teclado comunes (Ctrl+B, Ctrl+I) para mejorar la productividad, todo manteniendo la coherencia visual con la interfaz existente mediante Tailwind CSS.

**HU2: Insertar Enlaces y Elementos Multimedia:**

La implementación de esta historia requirió crear diálogos modales reutilizables para la inserción de enlaces e imágenes, con la decisión técnica más crítica siendo la corrección del orden de procesamiento en format.js para convertir primero las imágenes y luego los enlaces, evitando así que la sintaxis de imágenes `![alt](url)` fuera incorrectamente procesada como enlaces. Otras decisiones importantes incluyeron el manejo de errores para imágenes que no pueden cargarse (mostrando mensajes informativos), el pre-llenado inteligente de los campos del diálogo cuando hay texto seleccionado, y la preservación de la posición del cursor durante todo el proceso de inserción, mejorando significativamente la experiencia del usuario sin requerir conocimiento de la sintaxis Markdown.
