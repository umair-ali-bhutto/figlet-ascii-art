#!/usr/bin/env node

/**
 * CLI entry point for figlet utility
 * @author umair
 * @since 25-APR-2025
 */

const {
  convertToAscii,
  getFonts,
  writeAsciiToFile,
  previewAsciiArt,
  asciiWithLayout
} = require('../index'); // or './ascii-lib' if that's your file

const { version } = require('../package.json');
const copy = require('copy-paste').copy;

const args = process.argv.slice(2);
console.log('args: ', args);



const showHelp = () => {
  console.log(`
Usage: figlet-ascii-art-cli <text> [options]

Options:
  -h, --help              Show help
  -v, --version           Show version
  --font <font>           Use a specific figlet font
  --save <file>           Save output to a file
  --preview [num]         Preview random fonts (default 3)
  --layout                Use full layout mode
  --list-fonts            Print all available fonts
  --copy                  Copy output to clipboard
`);
};

(async () => {
  if (!args.length || args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log(`Version: ${version}`);
    return;
  }

  if (args.includes('--list-fonts')) {
    const fonts = await getFonts();
    console.log(fonts.join(', \n'));
    return;
  }

  const text = args.filter(arg => !arg.startsWith('--') && !args.includes('--preview'))[0];
  const fontIdx = args.indexOf('--font');
  const font = fontIdx !== -1 && args[fontIdx + 1] ? args[fontIdx + 1] : 'Standard';

  const useLayout = args.includes('--layout');
  const useClipboard = args.includes('--copy');

  if (args.includes('--preview')) {
    const previewCount = parseInt(args[args.indexOf('--preview') + 1]) || 3;
    await previewAsciiArt(text || 'Preview', previewCount);
    return;
  }

  if (!text) {
    console.error('❗ Please provide text to convert.');
    process.exit(1);
  }

  let art;
  if (useLayout) {
    art = await asciiWithLayout(text, font, 'full', 'full');
  } else {
    art = await convertToAscii(text, font);
  }

  console.log(`\n🎨 Font: ${font}\n`);
  console.log(art);

  if (args.includes('--save')) {
    const filename = args[args.indexOf('--save') + 1] || 'ascii-output.txt';
    await writeAsciiToFile(text, font, filename);
  }

  if (useClipboard) {
    copy(art, () => {
      console.log('📋 Copied to clipboard!');
    });
  }
})();
