#!/usr/bin/env python3
"""Fix encoding issue in QuizStep3 - replace corrupted checkmark with CSS unicode escape."""
path = 'QuizStep3_ColorsLike&Dislike.html'
with open(path, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

# The corrupted 'âœ"' is UTF-8 checkmark (U+2713) misinterpreted. Replace with CSS escape.
old = "content: '\u2713';"  # correct checkmark - in case it's already fixed
# Common mojibake: UTF-8 ✓ (E2 9C 93) read as Latin-1 gives âœ"
import re
# Match content: 'X'; where X is the problematic chars
content = re.sub(r"content: '[^']*';", "content: '\\2713';", content, count=1)
# But that would replace ALL content lines. We need to be more specific.
# Let's target only the one in .color-swatch.selected::after
content = content.replace(
    "content: '\u00e2\u009c\u0093';",  # âœ" as UTF-8 bytes
    "content: '\\2713';"
)
# Try the actual mojibake string
for bad in ["content: 'âœ"';", "content: 'âœ"';"]:
    if bad in content:
        content = content.replace(bad, "content: '\\2713';")
        break

with open(path, 'w', encoding='utf-8', newline='') as f:
    f.write(content)
print('Fixed')
