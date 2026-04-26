const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function replaceInFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  content = content.replace(/'Neue Machina', sans-serif/g, "'Darker Grotesque', sans-serif");
  content = content.replace(/"'Neue Machina', sans-serif"/g, "\"'Darker Grotesque', sans-serif\"");
  content = content.replace(/'Neue Machina'/g, "'Darker Grotesque'");
  content = content.replace(/"Neue Machina"/g, "\"Darker Grotesque\"");
  
  content = content.replace(/var\(--font-darker-grotesque\)/g, "'Darker Grotesque'");
  content = content.replace(/font-\[var\(--font-darker-grotesque\)]/g, "font-darker"); // tailwind class mapping
  content = content.replace(/fontFamily:\s*"?var\(--font-darker-grotesque\),?\s*sans-serif"?/g, "fontFamily: \"'Darker Grotesque', sans-serif\"");
  content = content.replace(/fontFamily:\s*'var\(--font-darker-grotesque\),\s*sans-serif'/g, "fontFamily: \"'Darker Grotesque', sans-serif\"");
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

walkDir(path.join(__dirname, 'src'), replaceInFile);
console.log('Done.');
