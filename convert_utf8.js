const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'temp_old_page.tsx');
const buffer = fs.readFileSync(filePath);

// Convert buffer from UTF-16LE to UTF-8
const content = buffer.toString('utf16le');

// Write it back as clean UTF-8
fs.writeFileSync('temp_old_page_utf8.tsx', content, 'utf8');

console.log('Successfully converted temp_old_page.tsx to UTF-8.');
