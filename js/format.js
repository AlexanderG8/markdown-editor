/**
 * Aplica formato de negrita o cursiva al texto seleccionado según el estado
 * @param {string} text - Texto seleccionado a formatear
 * @returns {string} - Texto con formato aplicado
 */
function formatTextToCursiveOrBold(text) {
  if (state) {
    return `*${text}*`;
  } else {
    return `**${text}**`;
  }
}

/**
 * Convierte encabezados Markdown (# texto) en elementos HTML <h1>-<h6>
 * - Detecta hasta 6 niveles de encabezados
 * - Aplica estilos específicos para cada nivel con Tailwind
 */
function convertHeadings(html) {
  // Convierte encabezados de nivel 1 a 6
  html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-blue-300 mb-4">$1</h1>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-blue-300 mb-3">$1</h2>');
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-blue-300 mb-2">$1</h3>');
  html = html.replace(/^#### (.*$)/gm, '<h4 class="text-lg font-bold text-blue-300 mb-2">$1</h4>');
  html = html.replace(/^##### (.*$)/gm, '<h5 class="text-base font-bold text-blue-300 mb-1">$1</h5>');
  html = html.replace(/^###### (.*$)/gm, '<h6 class="text-sm font-bold text-blue-300 mb-1">$1</h6>');
  return html;
}

/**
 * Convierte texto en negrita Markdown (**texto**) en elementos HTML <strong>
 */
function convertBold(html) {
  return html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
}

/**
 * Convierte texto en cursiva Markdown (*texto*) en elementos HTML <em>
 */
function converCursive(html) {
  return html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
}

/**
 * Convierte listas no ordenadas Markdown (iniciadas con * o -) en elementos HTML <ul><li>
 * - Detecta ítems que comienzan con * o - seguidos de un espacio
 * - Agrupa ítems adyacentes en una sola lista
 * - Aplica estilos con Tailwind para una visualización mejorada
 */
function convertUnorderedLists(html) {
  // Dividimos el HTML en líneas
  const lines = html.split('\n');
  let inList = false;
  let result = [];

  for (let i = 0; i < lines.length; i++) {
    // Verifica si la línea es un elemento de lista no ordenada
    if (lines[i].match(/^[\*\-] /)) {
      // Si no estamos en una lista, iniciamos una nueva
      if (!inList) {
        result.push('<ul class="list-disc pl-5 my-2 space-y-1">');
        inList = true;
      }
      // Extraemos el contenido y lo convertimos en un elemento <li>
      const content = lines[i].substring(2);
      result.push(`<li class="text-slate-300">${content}</li>`);
    } else {
      // Si no es un elemento de lista y estábamos en una, cerramos la lista
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      // Añadimos la línea tal como está
      result.push(lines[i]);
    }
  }

  // Si terminamos el bucle y aún estamos en una lista, la cerramos
  if (inList) {
    result.push('</ul>');
  }

  // Unimos todo y devolvemos el resultado
  return result.join('\n');
}

/**
 * Convierte listas ordenadas Markdown (iniciadas con números) en elementos HTML <ol><li>
 * - Utiliza una implementación basada en funciones de orden superior desde list.js
 * - Detecta ítems que comienzan con número seguido de un punto y un espacio
 * - Agrupa ítems adyacentes en una sola lista
 * - Aplica estilos con Tailwind para una visualización clara
 */
function convertOrderedLists(html) {
  // Utilizamos la implementación de list.js que aprovecha funciones de orden superior
  // Llamamos a createOrderedLists (no a convertOrderedLists) para evitar recursión infinita
  return window.createOrderedLists(html);
}

/**
 * Convierte enlaces Markdown [texto](url) en elementos HTML <a>
 * - Aplica estilos con Tailwind para destacar los enlaces
 * - Abre enlaces en nuevas pestañas por seguridad
 */
function convertLinks(html) {
  return html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" class="text-blue-400 hover:underline">$1</a>'
  );
}

/**
 * Convierte imágenes Markdown ![alt](url) en elementos HTML <img>
 * - Aplica estilos responsivos con Tailwind
 * - Añade texto alternativo para accesibilidad
 */
function convertImages(html) {
  return html.replace(
    /!\[([^\]]+)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="max-w-full h-auto my-2 rounded">'
  );
}

/**
 * Convierte bloques de código Markdown (entre ```) en elementos HTML <pre><code>
 * - Soporta bloques de código multilínea delimitados por ```
 * - Aplica estilos para destacar el código
 */
function convertCodeBlocks(html) {
  const codeBlockRegex = /```([\s\S]*?)```/g;
  
  // Reemplazamos bloques de código con etiquetas <pre><code>
  return html.replace(codeBlockRegex, function(match, codeContent) {
    // Formateamos el contenido del código: eliminamos la primera línea en blanco si existe
    let formattedCode = codeContent;
    if (formattedCode.startsWith('\n')) {
      formattedCode = formattedCode.substring(1);
    }
    
    // Escapamos caracteres especiales HTML
    formattedCode = formattedCode
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    // Retornamos el bloque de código con estilos
    return `<pre class="bg-slate-800 p-3 rounded my-3 overflow-x-auto"><code class="text-green-300 font-mono text-sm">${formattedCode}</code></pre>`;
  });
}

/**
 * Convierte código en línea Markdown (`código`) en elementos HTML <code>
 * - Detecta texto entre acentos graves simples
 * - Aplica estilos para destacar el código en línea dentro del texto
 */
function convertInlineCode(html) {
  return html.replace(
    /`([^`]+)`/g,
    '<code class="bg-slate-800 text-green-300 px-1 rounded font-mono text-sm">$1</code>'
  );
}

/**
 * Convierte citas Markdown (> texto) en elementos HTML <blockquote>
 * - Detecta líneas que comienzan con >
 * - Aplica estilos elegantes para las citas
 */
function convertBlockquotes(html) {
  // Dividimos el HTML en líneas
  const lines = html.split('\n');
  let inBlockquote = false;
  let blockquoteContent = [];
  let result = [];

  for (let i = 0; i < lines.length; i++) {
    // Verifica si la línea es parte de una cita
    if (lines[i].startsWith('> ')) {
      // Si no estamos en una cita, iniciamos una nueva
      if (!inBlockquote) {
        inBlockquote = true;
        blockquoteContent = [];
      }
      
      // Extraemos el contenido sin el prefijo '> '
      const content = lines[i].substring(2);
      blockquoteContent.push(content);
    } else {
      // Si no es parte de una cita y estábamos en una, cerramos la cita
      if (inBlockquote) {
        // Unimos el contenido de la cita y lo añadimos como un blockquote
        const content = blockquoteContent.join('\n');
        result.push(
          `<blockquote class="border-l-4 border-blue-400 pl-4 py-2 my-3 text-slate-300 italic">${content}</blockquote>`
        );
        inBlockquote = false;
      }
      
      // Añadimos la línea tal como está
      result.push(lines[i]);
    }
  }

  // Si terminamos el bucle y aún estamos en una cita, la cerramos
  if (inBlockquote) {
    const content = blockquoteContent.join('\n');
    result.push(
      `<blockquote class="border-l-4 border-blue-400 pl-4 py-2 my-3 text-slate-300 italic">${content}</blockquote>`
    );
  }

  // Unimos todo y devolvemos el resultado
  return result.join('\n');
}

/**
 * Convierte líneas horizontales Markdown (---, ***, ___) en elementos HTML <hr>
 * - Detecta líneas que contienen solo ---, *** o ___
 * - Aplica estilos para separadores visuales
 */
function convertHorizontalRules(html) {
  // Busca líneas que solo contienen ---, *** o ___
  return html.replace(
    /^(\-{3,}|\*{3,}|_{3,})$/gm,
    '<hr class="my-6 border-t border-slate-600">'
  );
}

/**
 * Convierte texto Markdown a HTML aplicando todas las transformaciones
 * @param {string} text - Texto en formato Markdown
 */
function convertToHtml(text) {
  let html = text;
  
  // Conversión de elementos de formato
  html = convertHeadings(html);
  html = convertBold(html);
  html = converCursive(html);
  
  // Conversión de elementos estructurales
  html = convertBlockquotes(html);
  html = convertCodeBlocks(html);
  html = convertInlineCode(html);
  
  // Conversión de listas
  html = convertUnorderedLists(html);
  
  // Aseguramos que la función para listas numéricas esté disponible
  if (typeof window.createOrderedLists === 'function') {
    html = convertOrderedLists(html);
  } else {
    console.warn('La función createOrderedLists no está disponible. Verifique que list.js se ha cargado correctamente.');
  }
  
  // Conversión de elementos multimedia y enlaces
  html = convertLinks(html);
  html = convertImages(html);
  html = convertHorizontalRules(html);
  
  renderPreview(html);
}

/**
 * Actualiza el contenido del elemento de vista previa
 */
function renderPreview(html) {
  previewSection.innerHTML = html;
}

// Exportamos las funciones básicas para que puedan ser utilizadas 
// en la actualización en tiempo real desde app.js
window.formatMD = {
  convertHeadings,
  convertBold,
  converCursive,
  convertOrderedLists
};
