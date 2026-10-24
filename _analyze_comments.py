import re
from collections import defaultdict

path = r'E:\biblia\style.css'
rules = defaultdict(list)
with open(path, encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        if '/*' not in line:
            continue
        cm = re.search(r'/\*.*?\*/', line)
        comment = cm.group(0).strip() if cm else '(sem comentario)'
        decl = re.match(r'\s*([\w-]+)\s*:\s*([^;{]*);', line)
        if not decl:
            continue
        decl = f"{decl.group(1)}: {decl.group(2).strip()}"
        rules[decl].append((i, comment))

for decl, entries in rules.items():
    comments = set(c for _, c in entries)
    if len(comments) > 1:
        print('DECL:', decl)
        for i, c in entries:
            print(f'   linha {i}: {c}')
