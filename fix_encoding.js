const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/app/page.tsx');
const buffer = fs.readFileSync(filePath);

// Convert buffer to string, replacing invalid characters with the replacement character
const content = buffer.toString('utf8');

// Write it back as clean UTF-8
fs.writeFileSync(filePath, content, 'utf8');

console.log('Successfully cleaned up src/app/page.tsx encoding issues.');
