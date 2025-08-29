const loremVariants = {
  classic: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt commodo, sapien justo pretium nisi.`,
  hipster: `Paleo disrupt artisan ennui, retro shoreditch fingerstache YOLO brunch dreamcatcher.`,
  corporate: `Leverage synergies to optimize holistic deliverables and enable enterprise-level growth opportunities.`
};

// Elements
const paragraphsInput = document.getElementById('paragraphs');
const variantSelect = document.getElementById('variant');
const markdownCheckbox = document.getElementById('markdownToggle');
const outputDiv = document.getElementById('output');
const countsDiv = document.getElementById('counts');

// Generate ipsum text with optional markdown formatting
function generateIpsum() {
  let count = parseInt(paragraphsInput.value);
  const variant = variantSelect.value;
  const useMarkdown = markdownCheckbox.checked;

  if (isNaN(count) || count < 1) count = 1;
  else if (count > 20) count = 20;

  paragraphsInput.value = count;

  let text = '';
  for (let i = 1; i <= count; i++) {
    let para = loremVariants[variant];
    if (useMarkdown) {
      // Add markdown paragraph formatting - e.g. line breaks between paragraphs
      para = `**Paragraph ${i}**\n\n${para}\n`;
    }
    text += para + '\n';
  }
  outputDiv.textContent = text.trim();

  // Animate fade-in effect
  outputDiv.style.opacity = 0;
  setTimeout(() => outputDiv.style.opacity = 1, 50);

  updateCounts(text);
  savePreferences();
}

// Update character and word counts
function updateCounts(text) {
  const charCount = text.length;
  // Split on whitespace + filter empty strings for word count
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  countsDiv.textContent = `Words: ${wordCount} | Characters: ${charCount}`;
}

// Copy output text to clipboard
function copyText() {
  const text = outputDiv.textContent;
  if (!text) {
    alert("Nothing to copy!");
    return;
  }
  navigator.clipboard.writeText(text)
    .then(() => alert("Copied to clipboard!"))
    .catch(() => alert("Failed to copy."));
}

// Export text as file (txt or md)
function exportText(type) {
  const text = outputDiv.textContent;
  if (!text) {
    alert("Nothing to export!");
    return;
  }

  const mimeType = "text/plain";
  const blob = new Blob([text], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `lorem_ipsum.${type}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Theme toggle with saving preference
function toggleTheme() {
  const current = document.body.getAttribute('data-theme');
  const newTheme = current === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Save user prefs to localStorage
function savePreferences() {
  localStorage.setItem('paragraphs', paragraphsInput.value);
  localStorage.setItem('variant', variantSelect.value);
  localStorage.setItem('markdown', markdownCheckbox.checked ? 'true' : 'false');
}

// Load user prefs from localStorage
function loadPreferences() {
  const savedTheme = localStorage.getItem('theme');
  const savedParagraphs = localStorage.getItem('paragraphs');
  const savedVariant = localStorage.getItem('variant');
  const savedMarkdown = localStorage.getItem('markdown');

  if (savedTheme) document.body.setAttribute('data-theme', savedTheme);
  if (savedParagraphs) paragraphsInput.value = savedParagraphs;
  if (savedVariant) variantSelect.value = savedVariant;
  if (savedMarkdown === 'true') markdownCheckbox.checked = true;
}

// Event listeners for live updates
paragraphsInput.addEventListener('input', generateIpsum);
variantSelect.addEventListener('change', generateIpsum);
markdownCheckbox.addEventListener('change', generateIpsum);

// Initial load
window.onload = () => {
  loadPreferences();
  generateIpsum();
};