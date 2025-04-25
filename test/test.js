
let args =  [ 'TEST', '--font', 'Ghost' ];
const fontIdx = args.indexOf('--font');
console.log('fontIdx: ', fontIdx);

const font = fontIdx !== -1 && args[fontIdx + 1] ? args[fontIdx + 1] : 'Standard';
console.log('font: ', font);
