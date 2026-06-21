const fs = require('fs');
const ts = require('typescript');
const file = 'app/realtime/page.tsx';
const source = fs.readFileSync(file, 'utf8');
const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const diag = sf.parseDiagnostics;
console.log('DIAGNOSTICS', diag.length);
for (const d of diag) {
  const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
  console.log(`${line+1}:${character+1} ${d.messageText}`);
}
