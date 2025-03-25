// Elementos DOM
const markdownInput = document.querySelector("#markdown-input");
const previewSection = document.querySelector("#preview-section");
// const changeBoldOrCursive = document.querySelector("#change-bold-or-cursive");
const wordCountElement = document.querySelector("#word-count");
const charCountElement = document.querySelector("#char-count");
const maxCharCountElement = document.querySelector("#max-char-count");
const clearEditorButton = document.querySelector("#clear-editor");
const copyCodeButton = document.querySelector("#copy-code");
const exportHtmlButton = document.querySelector("#export-html");
// Variables de estado
let state = false;
let currentSelectedText = "";


/**
 * * Función para implementar el debounce
 * * Debounce es una técnica que limita la frecuencia de ejecución de una función.
 * @param {Function} func - Función a ejecutar
 * @param {number} delay - Retardo en milisegundos
 * @returns {Function} - Función debounced
 */
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
          func.apply(this, args);
      }, delay);
  };
}
const MAX_LENGTH_CHARACTERS = 1500;
maxCharCountElement.textContent = MAX_LENGTH_CHARACTERS;

/**
 * Actualiza el contador de palabras y caracteres
 */
function updateWordCounter() {
  const text = markdownInput.value;

  // Contador de caracteres (incluye espacios en blanco)
  const charCount = text.length;

  // Contador de palabras mejorado
  const wordCount = text.trim() === '' ? 0 :
    text.trim()
      .replace(/\s+/g, ' ')     // Reemplaza múltiples espacios con uno solo
      .split(' ').length;       // Divide por espacios y cuenta

  // Actualiza los contadores en el DOM
  wordCountElement.textContent = wordCount;
  charCountElement.textContent = charCount;
  maxCharCountElement.textContent = MAX_LENGTH_CHARACTERS - charCount;

  // Limitar el número de caracteres
  if (charCount > MAX_LENGTH_CHARACTERS) {
    markdownInput.value = text.substring(0, MAX_LENGTH_CHARACTERS);
    markdownInput.dispatchEvent(new Event('input'));
  }
}

/**
 * Actualiza la vista previa en tiempo real mientras el usuario escribe
 * Aplica todas las transformaciones de Markdown a HTML
 */
function updatePreviewInRealTime() {
  const text = markdownInput.value;

  if (text.trim() === '') {
    previewSection.innerHTML = '';
    return;
  }

  // Aplicamos la conversión completa de Markdown a HTML
  // Utilizamos directamente la función convertToHtml de format.js
  convertToHtml(text);
}


/**
 * Ejecuta los eventos de actualización
 */
function execEvents(){
  updateWordCounter();
  updatePreviewInRealTime();
}



/**
 * Evento de actualización
 */
const debounceEvents = debounce(execEvents, 100);
markdownInput.addEventListener("input", debounceEvents);

clearEditorButton.addEventListener("click", function() {
  markdownInput.value = '';
  previewSection.innerHTML = '';
  wordCountElement.textContent = 0;
  charCountElement.textContent = 0;
  maxCharCountElement.textContent = MAX_LENGTH_CHARACTERS;
});

copyCodeButton.addEventListener("click", function() {
  navigator.clipboard.writeText(markdownInput.value);
});

/**
 * Exporta el contenido del editor como HTML
 */
exportHtmlButton.addEventListener("click", function() {
  const html = convertToHtml(markdownInput.value);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "document.html";
  link.click();
  URL.revokeObjectURL(url);
});


