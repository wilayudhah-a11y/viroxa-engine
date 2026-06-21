const fs = require('fs');
const path = 'app/realtime/page.tsx';
const src = fs.readFileSync(path, 'utf8');
const lines = src.split(/\r?\n/);
const stack = [];
const errors = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    const ch = line[j];
    if (ch === '<' && line[j+1] !== '/') {
      // simple track opening tags without / and ignore self-closing
      const match = line.slice(j).match(/^<([A-Za-z][A-Za-z0-9]*)/);
      if (match) {
        const tag = match[1];
        if (!line.slice(j).startsWith('</')) {
          if (!line.includes('/>', j)) {
            stack.push({type:'tag', tag, line:i+1, col:j+1});
          }
        }
      }
    }
    if (ch === '<' && line.slice(j, j+2) === '</') {
      const match = line.slice(j).match(/^<\/([A-Za-z][A-Za-z0-9]*)/);
      if (match) {
        const tag = match[1];
        let last = stack.pop();
        while (last && last.type !== 'tag') { last = stack.pop(); }
        if (!last || last.tag !== tag) {
          errors.push({line:i+1,col:j+1, expected:last?last.tag:null, found:tag});
        }
      }
    }
  }
}
console.log('stack tail', stack.slice(-5));
console.log('errors', errors.slice(0,10));
console.log('total stack', stack.length);
console.log('lines', lines.length);
fs.writeFileSync('tmp_debug_output.json', JSON.stringify({stackTail: stack.slice(-20), errors, total: stack.length}, null, 2));
