function getSelectedText(event) {
  const start = event.target.selectionStart;
  const end = event.target.selectionEnd;
  currentSelectedText = event.target.value.substring(start, end);
}

/**
 * Aplica formato Markdown al texto seleccionado en el editor
 * @param {string} formatType - Tipo de formato a aplicar (bold, italic, h1, h2, h3)
 */
function applyFormat(formatType) {
  const textarea = document.getElementById('markdown-input');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  let formattedText = '';
  let cursorOffset = 0;
  
  // Si no hay texto seleccionado, insertamos marcadores de posición
  const textToFormat = selectedText.length > 0 ? selectedText : 'texto';
  
  switch (formatType) {
    case 'bold':
      formattedText = `**${textToFormat}**`;
      cursorOffset = 2; // Para posicionar el cursor después de los ** iniciales si no hay selección
      break;
    case 'italic':
      formattedText = `*${textToFormat}*`;
      cursorOffset = 1; // Para posicionar el cursor después del * inicial si no hay selección
      break;
    case 'h1':
      // Para encabezados, verificamos si estamos al inicio de la línea
      const beforeSelection = textarea.value.substring(0, start);
      const lineStart = beforeSelection.lastIndexOf('\n') + 1;
      const isStartOfLine = start === lineStart || start === 0;
      
      if (isStartOfLine) {
        formattedText = `# ${textToFormat}`;
      } else {
        // Si no estamos al inicio, insertamos una nueva línea antes
        formattedText = `\n# ${textToFormat}`;
      }
      cursorOffset = 2; // Para posicionar el cursor después del # y espacio si no hay selección
      break;
    case 'h2':
      const beforeSelectionH2 = textarea.value.substring(0, start);
      const lineStartH2 = beforeSelectionH2.lastIndexOf('\n') + 1;
      const isStartOfLineH2 = start === lineStartH2 || start === 0;
      
      if (isStartOfLineH2) {
        formattedText = `## ${textToFormat}`;
      } else {
        formattedText = `\n## ${textToFormat}`;
      }
      cursorOffset = 3; // Para posicionar el cursor después de ## y espacio si no hay selección
      break;
    case 'h3':
      const beforeSelectionH3 = textarea.value.substring(0, start);
      const lineStartH3 = beforeSelectionH3.lastIndexOf('\n') + 1;
      const isStartOfLineH3 = start === lineStartH3 || start === 0;
      
      if (isStartOfLineH3) {
        formattedText = `### ${textToFormat}`;
      } else {
        formattedText = `\n### ${textToFormat}`;
      }
      cursorOffset = 4; // Para posicionar el cursor después de ### y espacio si no hay selección
      break;
    default:
      formattedText = textToFormat;
  }
  
  // Actualizar el valor del textarea con el texto formateado
  const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
  textarea.value = newValue;
  
  // Si no había texto seleccionado, posicionamos el cursor dentro de los marcadores de formato
  if (selectedText.length === 0) {
    const newCursorPos = start + cursorOffset;
    textarea.selectionStart = newCursorPos;
    textarea.selectionEnd = newCursorPos;
  } else {
    // Si había texto seleccionado, seleccionamos el texto formateado completo
    textarea.selectionStart = start;
    textarea.selectionEnd = start + formattedText.length;
  }
  
  // Asegurarse de que el textarea mantenga el foco
  textarea.focus();
  
  // Disparar un evento de entrada para actualizar la vista previa
  textarea.dispatchEvent(new Event('input'));
}

// Inicializar los manejadores de eventos cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
  // Obtener referencias a los botones de formato
  const boldButton = document.getElementById('format-bold');
  const italicButton = document.getElementById('format-italic');
  const h1Button = document.getElementById('format-h1');
  const h2Button = document.getElementById('format-h2');
  const h3Button = document.getElementById('format-h3');
  
  // Añadir manejadores de eventos para los botones
  boldButton.addEventListener('click', function() {
    applyFormat('bold');
  });
  
  italicButton.addEventListener('click', function() {
    applyFormat('italic');
  });
  
  h1Button.addEventListener('click', function() {
    applyFormat('h1');
  });
  
  h2Button.addEventListener('click', function() {
    applyFormat('h2');
  });
  
  h3Button.addEventListener('click', function() {
    applyFormat('h3');
  });
  
  // También podemos implementar atajos de teclado comunes
  const markdownInput = document.getElementById('markdown-input');
  markdownInput.addEventListener('keydown', function(event) {
    // Ctrl+B para negrita
    if (event.ctrlKey && event.key === 'b') {
      event.preventDefault();
      applyFormat('bold');
    }
    
    // Ctrl+I para cursiva
    if (event.ctrlKey && event.key === 'i') {
      event.preventDefault();
      applyFormat('italic');
    }
  });
});
