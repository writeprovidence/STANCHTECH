const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Swap Manrope to Darker Grotesque (Body/Underneath text)
  content = content.replace(/'Manrope', sans-serif/g, "'Darker Grotesque', sans-serif");
  content = content.replace(/"'Manrope', sans-serif"/g, "\"'Darker Grotesque', sans-serif\"");
  content = content.replace(/'Manrope'/g, "'Darker Grotesque'");
  content = content.replace(/"Manrope"/g, "\"Darker Grotesque\"");

  // 2. Identify Headers that are currently using Darker Grotesque and change them to Neue Machina
  // This is tricky with regex, but we can look for h1-h6 tags or classes that imply headers
  
  // Replace Darker Grotesque with Neue Machina in places that look like headers
  // Patterns like h1 style={{ ... fontFamily: "'Darker Grotesque', sans-serif" ... }}
  
  // Broadly replace Darker Grotesque with Neue Machina in styles that appear inside <h1... <h6...
  content = content.replace(/(<(h[1-6]|h2|h3)[^>]*fontFamily:\s*")'Darker Grotesque', sans-serif(")/g, "$1'Neue Machina', sans-serif$3");
  content = content.replace(/(<(h[1-6]|h2|h3)[^>]*fontFamily:\s*')[Darker Grotesque', sans-serif](')/g, "$1'Neue Machina', sans-serif$3");

  // Specific common patterns in this app
  content = content.replace(/fontFamily:\s*"'Darker Grotesque', sans-serif"(?=[^}]*fontSize:\s*["']?clamp\(28|60|38|48|42)/g, 'fontFamily: "\'Neue Machina\', sans-serif"');
  content = content.replace(/fontFamily:\s*"'Darker Grotesque', sans-serif"(?=[^}]*fontWeight:\s*(900|800|extrabold))/g, 'fontFamily: "\'Neue Machina\', sans-serif"');

  // Hero Headline specific
  content = content.replace(/className="hero-headline"\s*style=\{\{\s*([^}]*)fontFamily:\s*"'Darker Grotesque', sans-serif"/g, 'className="hero-headline" style={{ $1fontFamily: "\'Neue Machina\', sans-serif"');
  
  // Responsive Title specific
  content = content.replace(/className="responsive-title[^"]*"\s*style=\{\{\s*([^}]*)fontFamily:\s*"'Darker Grotesque', sans-serif"/g, 'className="responsive-title" style={{ $1fontFamily: "\'Neue Machina\', sans-serif"');

  // Featured Products title
  content = content.replace(/Featured products<\/h2>\s*<p[^>]*fontFamily:\s*"'Manrope', sans-serif"/g, 'Featured products</h2><p style={{ ... fontFamily: "\'Darker Grotesque\', sans-serif"'); // This is a bit too specific

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

walkDir(path.join(__dirname, 'src'), processFile);
console.log('Reversion complete.');
