import re
path = 'html_designs/Wishlist.html'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# Fix share text - replace corrupted emoji with proper emoji
c = re.sub(
    r'text: "Check out my wishlist on GoShopMe! [^"]*"',
    'text: "Check out my wishlist on GoShopMe! \U0001f380\U00002728"',
    c
)

# Fix checkmark mojibake
c = c.replace('\u00e2\u0153\u201c', '\u2713')
c = c.replace('\u00e2\u0153"', '\u2713')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print('Encoding fixes applied.')
