path = "html_designs/Picks.html"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()
import re
content = re.sub("\u00e2\u20ac\u201c", "&mdash;", content)
content = re.sub("\u00e2\u20ac\u201d", "&mdash;", content)
with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Done")
