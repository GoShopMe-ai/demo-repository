# Fix encoding in Wishlist.html
with open('Wishlist.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix share text - replace corrupted emoji sequence with proper emoji
content = content.replace(
    'text: "Check out my wishlist on GoShopMe! ðŸ\'€âœ¨",',
    'text: "Check out my wishlist on GoShopMe! 🎀✨",'
)

# Fix checkmark in console.log (âœ" -> ✓)
content = content.replace('âœ"', '✓')

with open('Wishlist.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Encoding fixes applied.')
