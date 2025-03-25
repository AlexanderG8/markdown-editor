// Elementos DOM
const markdownInput = document.querySelector("#markdown-input");
const previewSection = document.querySelector("#preview-section");
const changeBoldOrCursive = document.querySelector("#change-bold-or-cursive");
const wordCountElement = document.querySelector("#word-count");
const charCountElement = document.querySelector("#char-count");

// Variables de estado
let state = false;
let currentSelectedText = "";

/**
 * Actualiza el nombre del botón según su estado
 */
function changeBtnName() {
  changeBoldOrCursive.textContent = state
    ? "Cambiar a Negrita"
    : "Cambiar a cursiva";
}

// Inicialización del botón
changeBtnName();

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
 * Obtiene el texto seleccionado por el usuario
 */
function getSelectedText(event) {
  const start = event.target.selectionStart;
  const end = event.target.selectionEnd;
  currentSelectedText = event.target.value.substring(start, end);
}

// Event Listeners
markdownInput.addEventListener("select", getSelectedText);

markdownInput.addEventListener("input", function() {
  updateWordCounter();
  updatePreviewInRealTime();
});

changeBoldOrCursive.addEventListener("click", function() {
  state = !state;
  changeBtnName();
});
