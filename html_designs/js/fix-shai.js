const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'shai-chat.js');
let s = fs.readFileSync(file, 'utf8');
s = s.replace(/[\x80-\xff]/g, '-');
s = s.replace('bottom:var(--shai-nav-h,64px)', 'bottom:var(--shai-nav-h,72px)');
s = s.replace(/fixed bottom-16 left-1\/2 -translate-x-1\/2 w-full max-w-\[390px\]/g, 'fixed left-1/2 -translate-x-1/2 w-full max-w-[390px]');
fs.writeFileSync(file, s);
console.log('Fixed');
