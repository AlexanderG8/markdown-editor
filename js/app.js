/**
 * Variables para obtener elementos HTML
 */
const generateHtml = document.querySelector("#generate-html");
const markdownInput = document.querySelector("#markdown-input");
const previewSection = document.querySelector("#preview-section");
const toggleContrastBtn = document.querySelector("#toggle-contrast");

// Variable to track contrast state
let isContrastActive = false;

function getTextFromTextArea() {
  const text = markdownInput.value;
  return text;
}

function convertHeadings(html) {
  html = html.replace(
    /^# (.+)$/gm,
    "<h1 class='text-6xl font-bold border-b'>$1</h1>"
  );
  // ## titulo -> <h2>titulo</h2>
  html = html.replace(
    /^## (.+)$/gm,
    "<h2 class='text-5xl font-bold border-b'>$1</h2>"
  );
  html = html.replace(/^### (.+)$/gm, "<h3 class='text-4xl font-bold'>$1</h3>");
  html = html.replace(
    /^#### (.+)$/gm,
    "<h4 class='text-3xl font-bold'>$1</h4>"
  );
  html = html.replace(
    /^##### (.+)$/gm,
    "<h5 class='text-2xl font-bold'>$1</h5>"
  );
  html = html.replace(
    /^###### (.+)$/gm,
    "<h6 class='text-xl font-bold'>$1</h6>"
  );

  return html;
}

function convertToHtml(text) {
  let html = text;
  // evaluamos titulo
  html = convertHeadings(html);
  // evaluamos listas
  // evaluamos enlaces

  return html;
}

function applyContrast() {
    const headings = previewSection.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    headings.forEach(heading => {
        if (isContrastActive) {
            heading.style.backgroundColor = '#2d3748';
            heading.style.color = '#ffffff';
            heading.style.padding = '0.5rem';
            heading.style.borderRadius = '0.375rem';
            heading.style.marginBottom = '1rem';
        } else {
            heading.style.backgroundColor = '';
            heading.style.color = '';
            heading.style.padding = '';
            heading.style.borderRadius = '';
            heading.style.marginBottom = '';
        }
    });
}

// Event listener for toggle contrast button
toggleContrastBtn.addEventListener('click', () => {
    isContrastActive = !isContrastActive;
    applyContrast();
});

// Modify the existing renderPreview function to maintain contrast when content changes
function renderPreview(html) {
    previewSection.innerHTML = html;
    if (isContrastActive) {
        applyContrast();
    }
}

// TODO: Cuando hagamos click en el boton generateHtml, tenemos que obtener el texto del textarea y trasnformalo a HTML y eso mostrarlo el preview
generateHtml.addEventListener("click", function () {
  // para obtener el texto de un input usamos el .value
  const text = getTextFromTextArea(); // Obtiene el value del textarea
  const html = convertToHtml(text); // convierte el value a un HTML
  renderPreview(html); // HTML lo muestra en el preview
});