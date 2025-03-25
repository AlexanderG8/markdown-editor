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


