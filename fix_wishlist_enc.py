# Fix encoding in Wishlist.html
path = 'html_designs/Wishlist.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix share text - use regex to match the corrupted part
import re
content = re.sub(
    r'text: "Check out my wishlist on GoShopMe! [^"]*"',
    'text: "Check out my wishlist on GoShopMe! \U0001f380\U00002728"',
    content
)

# Fix checkmark - various mojibake forms
for bad in ['\u00e2\u0153\u201c', '\u00e2\u0153"', 'âœ"']:
    content = content.replace(bad, '\u2713')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
