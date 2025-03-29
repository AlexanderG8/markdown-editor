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
const exportPdfButton = document.querySelector("#export-pdf");
const loadFileButton = document.querySelector("#load-file");
const fileInput = document.querySelector("#file-input");
const loadingIndicator = document.querySelector("#loading-indicator");
const pdfLoadingIndicator = document.querySelector("#pdf-loading-indicator");

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
 * Convierte un FileReader en una promesa para lectura asíncrona
 * @param {File} file - El archivo a leer
 * @returns {Promise<string>} - Promesa que resuelve con el contenido del archivo
 */
function readFileAsPromise(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    
    reader.onerror = (error) => {
      reject(new Error(`Error al leer el archivo: ${error.message}`));
    };
    
    reader.readAsText(file);
  });
}

/**
 * Maneja la carga de archivos Markdown de forma asíncrona
 * @param {Event} event - Evento de cambio de archivo
 */
async function handleFileUpload(event) {
  const file = event.target.files[0];
  
  if (!file) return;
  
  // Verificar que sea un archivo Markdown
  if (!file.name.toLowerCase().endsWith('.md')) {
    alert('Por favor, selecciona un archivo Markdown (.md)');
    return;
  }
  
  try {
    // Mostrar indicador de carga
    loadingIndicator.classList.remove('hidden');
    
    // Leer el archivo como texto de forma asíncrona
    const content = await readFileAsPromise(file);
    
    // Actualizar el editor con el contenido
    markdownInput.value = content;
    
    // Procesar el contenido Markdown con la versión asíncrona que incluye validación
    const result = await window.convertToHtmlAsync(content);
    
    // Disparar evento de input para actualizar la vista previa
    markdownInput.dispatchEvent(new Event('input'));
    
    // Mostrar notificación de éxito
    if (window.showNotification) {
      window.showNotification(`Archivo "${file.name}" cargado correctamente`, 'success');
    }
    
    // Si hay errores de sintaxis, mostrar advertencias pero sin detener la carga
    if (result.validationResult && result.validationResult.hasErrors) {
      console.warn('Advertencias de sintaxis Markdown:', result.validationResult.errors);
      
      // Mostrar notificación con las advertencias
      if (window.showNotification) {
        const warningMessage = 'El archivo se cargó, pero contiene posibles problemas de sintaxis Markdown:\n' + 
                              result.validationResult.errors.map(error => `- ${error}`).join('\n');
        
        // Mostrar después de un breve retraso para que no se solape con la notificación de éxito
        setTimeout(() => {
          window.showNotification(warningMessage, 'warning');
        }, 1500);
      }
    }
    
    // Actualizar el contador de palabras y caracteres
    updateWordCounter();
  } catch (fileError) {
    console.error('Error al cargar el archivo:', fileError);
    
    // Mostrar notificación de error en la carga
    if (window.showNotification) {
      window.showNotification(`No se pudo cargar el archivo: ${fileError.message}`, 'error');
    } else {
      alert(`No se pudo cargar el archivo: ${fileError.message}`);
    }
  } finally {
    // Ocultar indicador de carga
    loadingIndicator.classList.add('hidden');
  }
  
  // Limpiar el input de archivo para permitir cargar el mismo archivo nuevamente
  fileInput.value = '';
}

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

  // Aplicamos la conversión de Markdown a HTML (versión sincrónica)
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

// Eventos para carga de archivos
loadFileButton.addEventListener("click", function() {
  fileInput.click(); // Activar el diálogo de selección de archivo
});

fileInput.addEventListener("change", handleFileUpload);

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

/**
 * Genera un PDF a partir del contenido HTML de forma asíncrona
 * @param {string} html - Contenido HTML para convertir a PDF
 * @param {string} filename - Nombre del archivo PDF a generar
 * @returns {Promise<Blob>} - Promesa que resuelve con el Blob del PDF generado
 */
async function generatePdf(html, filename) {
  return new Promise((resolve, reject) => {
    // Simulamos un proceso asíncrono con setTimeout
    setTimeout(() => {
      try {
        // Aquí iría la lógica real de generación de PDF con una biblioteca como jsPDF o html2pdf
        // Por ahora, simulamos la creación de un PDF (en realidad es un archivo de texto)
        
        // Simulamos un error aleatorio para probar el manejo de errores (20% de probabilidad)
        if (Math.random() < 0.2) {
          throw new Error('Error al generar el PDF: Simulación de fallo');
        }
        
        // Creamos un blob que simula un PDF (en realidad es texto plano)
        const blob = new Blob([html], { type: 'application/pdf' });
        resolve(blob);
      } catch (error) {
        reject(error);
      }
    }, 2000); // Simulamos que tarda 2 segundos en generar el PDF
  });
}

/**
 * Maneja la exportación a PDF de forma asíncrona
 */
async function handlePdfExport() {
  try {
    // Mostrar indicador de carga
    pdfLoadingIndicator.classList.remove('hidden');
    
    // Obtener el contenido HTML actual
    const html = previewSection.innerHTML;
    
    // Verificar que haya contenido para exportar
    if (!html.trim() || markdownInput.value.trim() === '') {
      throw new Error('No hay contenido para exportar');
    }
    
    // Generar el PDF de forma asíncrona
    const pdfBlob = await generatePdf(html, 'markdown.pdf');
    
    // Crear un enlace para descargar el PDF
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'markdown.pdf';
    link.click();
    
    // Liberar el objeto URL
    URL.revokeObjectURL(url);
    
    // Mostrar notificación de éxito
    if (window.showNotification) {
      window.showNotification('Documento PDF generado y descargado correctamente', 'success');
    }
  } catch (error) {
    console.error('Error al exportar a PDF:', error);
    
    // Mostrar notificación de error
    if (window.showNotification) {
      window.showNotification(`No se pudo generar el PDF: ${error.message}`, 'error');
    } else {
      alert(`No se pudo generar el PDF: ${error.message}`);
    }
  } finally {
    // Ocultar indicador de carga
    pdfLoadingIndicator.classList.add('hidden');
  }
}

// Evento para exportar a PDF
exportPdfButton.addEventListener('click', handlePdfExport);
