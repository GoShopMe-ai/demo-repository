# Fix Wishlist.html encoding
path = r'html_designs/Wishlist.html'
with open(path, 'rb') as f:
    d = f.read()
# Fix 1: corrupted emoji (ðŸ'€âœ¨) -> 🎀✨
d = d.replace(b'\xc3\xb0\xc5\xb8\xe2\x80\x99\xe2\x82\xac\xc3\xa2\xc5\x93\xc2\xa8', b'\xf0\x9f\x92\x80\xe2\x9c\xa8')
# Fix 2: checkmark mojibake (âœ") -> ✓
d = d.replace(b'\xc3\xa2\xc5\x93\xe2\x80\x9c', b'\xe2\x9c\x93')
d = d.replace(b'\xc3\xa2\xc5\x93"', b'\xe2\x9c\x93')
with open(path, 'wb') as f:
    f.write(d)
print('Fixed Wishlist encoding')
