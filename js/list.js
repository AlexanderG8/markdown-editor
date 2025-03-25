/**
 * Función de orden superior que procesa cada línea del texto y aplica una transformación
 * cuando detecta un patrón específico.
 * @param {string} text - El texto completo del editor
 * @param {RegExp} pattern - Patrón para detectar las líneas a procesar
 * @param {Function} lineProcessor - Función de callback que transforma cada línea coincidente
 * @returns {string} - Texto procesado con las transformaciones aplicadas
 */
function processMatchingLines(text, pattern, lineProcessor) {
  if (!text) return '';
  const lines = text.split('\n');
  const processedLines = identifyAndProcessLists(lines, pattern, lineProcessor);
  return processedLines.join('\n');
}

/**
 * Identifica secuencias de líneas que forman listas numeradas y las procesa juntas
 * @param {string[]} lines - Arreglo de líneas de texto
 * @param {RegExp} pattern - Patrón para detectar líneas de lista numerada
 * @param {Function} lineProcessor - Función de callback para procesar cada línea
 * @returns {string[]} - Arreglo de líneas procesadas
 */
function identifyAndProcessLists(lines, pattern, lineProcessor) {
  const result = [];
  let currentListItems = [];
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isListItem = pattern.test(line);
    
    if (isListItem && !inList) {
      inList = true;
      currentListItems = [line];
    } 
    else if (isListItem && inList) {
      currentListItems.push(line);
    } 
    else if (!isListItem && inList) {
      result.push(generateOrderedList(currentListItems, lineProcessor));
      result.push(line); 
      inList = false;
      currentListItems = [];
    } 
    else {
      result.push(line);
    }
  }
  
  if (inList && currentListItems.length > 0) {
    result.push(generateOrderedList(currentListItems, lineProcessor));
  }
  
  return result;
}

/**
 * Genera el HTML para una lista ordenada a partir de un array de líneas
 * @param {string[]} listItems - Arreglo de líneas que forman la lista
 * @param {Function} lineProcessor - Función de callback para procesar cada línea
 * @returns {string} - HTML de la lista ordenada
 */
function generateOrderedList(listItems, lineProcessor) {
  let result = '<ol class="list-decimal pl-5 my-2 space-y-1">';
  
  listItems.forEach(item => {
    const processedItem = lineProcessor(item);
    result += processedItem;
  });
  
  result += '</ol>';
  
  return result;
}

/**
 * Procesa una línea de texto para convertirla en un elemento <li>
 * Esta función se pasa como callback a processMatchingLines
 * @param {string} line - Línea de texto que representa un elemento de lista
 * @returns {string} - Elemento <li> generado
 */
function processListItem(line) {
  const content = line.replace(/^\d+\.\s*/, '');
  return `<li class="text-slate-300">${content}</li>`;
}

/**
 * Convierte texto con formato de lista numerada a HTML
 * Es la función principal exportada que utiliza las funciones de orden superior
 * @param {string} text - Texto del editor Markdown
 * @returns {string} - Texto con las listas numeradas convertidas a HTML
 */
function convertOrderedLists(text) {
  const orderedListPattern = /^\d+\.\s+.+$/;
  
  return processMatchingLines(text, orderedListPattern, processListItem);
}

window.createOrderedLists = convertOrderedLists;