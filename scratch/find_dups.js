const fs = require('fs');
const content = fs.readFileSync('src/lib/keywordData.ts', 'utf8');
const slugs = [];
const matches = content.match(/createKeyword\("([^"]+)"/g);
if (matches) {
  matches.forEach(m => {
    const label = m.match(/"([^"]+)"/)[1];
    slugs.push(label.replace(/\s+/g, '-'));
  });
}
const seen = new Set();
const dups = [];
slugs.forEach(s => {
  if (seen.has(s)) dups.push(s);
  seen.add(s);
});
console.log('Duplicates:', dups);
console.log('Total Count:', slugs.length);
console.log('Unique Count:', seen.size);
