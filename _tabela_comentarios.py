import re

path = r'E:\biblia\style.css'

# mapa de comentarios sugeridos por declaracao exata
SUG = {
 'margin: 0': 'Remove todas as margens externas.',
 'padding: 0': 'Remove todo o preenchimento interno.',
 'box-sizing: border-box': 'Inclui bordas e padding no tamanho total.',
 "font-family: 'Roboto Mono', monospace": 'Define a fonte padrao da pagina.',
 'display: flex': 'Ativa o layout flexivel.',
 'flex-direction: column': 'Organiza os itens em coluna.',
 'overflow: hidden': 'Esconde o conteudo que sai da tela.',
 'overflow: auto': 'Adiciona rolagem se necessario.',
 'z-index: 0': 'Fica na camada 0, abaixo do conteudo.',
 'z-index: 1': 'Fica na camada 1, acima do fundo.',
 'z-index: 2': 'Fica na camada 2, visivel sobre o fundo.',
 'z-index: 3': 'Fica na camada 3, acima da maioria dos elementos.',
 'z-index: 4': 'Fica na camada 4, no topo de tudo.',
 'height: 100vh': 'Altura de 100% da tela.',
 'max-height: 100vh': 'Limita a altura a 100% da tela.',
 'position: absolute': 'Permite posicionar livremente na pagina.',
 'position: fixed': 'Mantem o elemento fixo na tela, mesmo com rolagem.',
 'top: 0': 'Alinha ao topo.', 'right: 0': 'Alinha a direita.',
 'bottom: 0': 'Alinha a base.', 'left: 0': 'Alinha a esquerda.',
 'color: white': 'Cor do texto branca.', 'color: black': 'Cor do texto preta.',
 'color: #000': 'Cor do texto preta.',
 'text-align: center': 'Centraliza o texto.',
 'text-decoration: none': 'Remove o sublinhado dos links.',
 'font-style: italic': 'Texto em italico.', 'font-weight: bold': 'Texto em negrito.',
 'flex-wrap: wrap': 'Permite que os itens quebrem de linha.',
 'justify-content: center': 'Centraliza horizontalmente.',
 'align-items: center': 'Centraliza verticalmente.',
 'background: black': 'Fundo preto.', 'background: #000000': 'Fundo preto.',
 'background: none': 'Sem cor de fundo.', 'background: white': 'Fundo branco.',
 'background: #111': 'Fundo cinza escuro.', 'background: #161616': 'Fundo cinza escuro.',
 'background: rgba(22, 22, 22, 0.8)': 'Fundo preto semi-transparente.',
 'background: rgba(0, 0, 0, 0.8)': 'Fundo preto com 80% de transparencia.',
 'display: none': 'Escondido por padrao.',
 'width: 100%': 'Ocupa 100% da largura.',
 'border: none': 'Sem borda.',
 'cursor: pointer': 'Maozinha ao passar o mouse.',
 'outline: none': 'Remove o contorno do foco.',
}

rows = []
with open(path, encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        cm = re.search(r'/\*.*?\*/', line)
        decl = re.match(r'\s*([\w-]+)\s*:\s*([^;{]*);', line)
        if not cm or not decl:
            continue
        comment = cm.group(0).strip('/* ').rstrip('*/ ').strip()
        d = f"{decl.group(1)}: {decl.group(2).strip()}"
        sug = SUG.get(d, '')
        if sug and sug != comment:
            rows.append((i, d, comment, sug))

print('| Linha | Comando | Comentario atual | Comentario sugerido |')
print('|---|---|---|---|')
for i, d, cur, sug in rows:
    print(f'| {i} | `{d}` | {cur} | {sug} |')
print(f'\nTotal: {len(rows)} linhas com sugestao diferente do atual.')
