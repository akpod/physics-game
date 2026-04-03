const fs = require('fs');
let text = fs.readFileSync('src/i18n.ts', 'utf8');

// remove level4Title, level4Desc, level4Hint lines entirely (handling variations in newlines)
text = text.replace(/.*level4Title:.*?\n/g, '');
text = text.replace(/.*level4Desc:.*?\n/g, '');
text = text.replace(/.*level4Hint:.*?\n/g, '');

for (let i = 5; i <= 12; i++) {
  text = text.replace(new RegExp(`level${i}Title`, 'g'), `level${i-1}Title`);
  text = text.replace(new RegExp(`level${i}Desc`, 'g'), `level${i-1}Desc`);
  text = text.replace(new RegExp(`level${i}Hint`, 'g'), `level${i-1}Hint`);
}

for (let i = 5; i <= 12; i++) {
   text = text.replace(new RegExp(`"${i}\\. `, 'g'), `"${i-1}. `);
}

fs.writeFileSync('src/i18n.ts', text);
