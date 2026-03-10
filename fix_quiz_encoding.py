import os
import re
path = os.path.join(os.path.dirname(__file__), 'html_designs', 'QuizStep3_ColorsLike&Dislike.html')
with open(path, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()
pattern = r"(\.color-swatch\.selected::after \{\s+content: )'[^']*'(;)"
replacement = r"\1'\\2713'\2"
content = re.sub(pattern, replacement, content)
with open(path, 'w', encoding='utf-8', newline='') as f:
    f.write(content)
print('Fixed')
