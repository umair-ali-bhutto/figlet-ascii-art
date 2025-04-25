/**
* @author umair.ali
* @since 25-APR-2025
*/

// IMPORTS
const figlet = require('figlet');
const fs = require('fs');
const path = require('path');

/**
 * Convert text to ASCII art using a specific font.
 * @param {string} text 
 * @param {string} font 
 * @returns {Promise<string>}
 */
function convertToAscii(text, font = 'Standard') {
  return new Promise((resolve, reject) => {
    figlet.text(text, { font }, (err, data) => {
      if (err) reject('Figlet Error: ' + err);
      else resolve(data);
    });
  });
}

/**
 * List all available figlet fonts.
 * @returns {Promise<string[]>}
 */
function getFonts() {
  return new Promise((resolve, reject) => {
    figlet.fonts((err, fonts) => {
      if (err) reject('Could not load fonts: ' + err);
      else resolve(fonts);
    });
  });
}

/**
 * Write ASCII art to a text file.
 * @param {string} text 
 * @param {string} font 
 * @param {string} filename 
 * @returns {Promise<void>}
 */
async function writeAsciiToFile(text, font, filename = 'ascii-art.txt') {
  const ascii = await convertToAscii(text, font);
  const filepath = path.join(__dirname, filename);
  fs.writeFileSync(filepath, ascii);
  console.log(`✅ Saved to ${filepath}`);
}

/**
 * Preview ASCII art with random fonts.
 * @param {string} text 
 * @param {number} limit - how many previews to show
 */
async function previewAsciiArt(text, limit = 3) {
  const fonts = await getFonts();
  for (let i = 0; i < limit; i++) {
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    const art = await convertToAscii(text, randomFont);
    console.log(`\n🎨 Font: ${randomFont}\n${art}\n`);
  }
}

/**
 * Convert text with layout customization
 * @param {string} text 
 * @param {string} font 
 * @param {string} horizontalLayout 
 * @param {string} verticalLayout 
 * @returns {Promise<string>}
 */
function asciiWithLayout(text, font = 'Standard', horizontalLayout = 'default', verticalLayout = 'default') {
  return new Promise((resolve, reject) => {
    figlet.text(text, {
      font,
      horizontalLayout,
      verticalLayout
    }, (err, data) => {
      if (err) reject('Layout Error: ' + err);
      else resolve(data);
    });
  });
}

module.exports = {
  convertToAscii,
  getFonts,
  writeAsciiToFile,
  previewAsciiArt,
  asciiWithLayout
};
