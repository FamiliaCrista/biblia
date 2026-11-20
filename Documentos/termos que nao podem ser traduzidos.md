# Termos que não podem ser traduzidos

Este documento lista termos técnicos de HTML e CSS que **não podem ser traduzidos** nos arquivos do projeto. Eles devem permanecer exatamente como estão, em inglês, para que o código funcione corretamente em todos os navegadores.

---

## 1. Tags HTML

As tags HTML são parte da linguagem de marcação e nunca devem ser traduzidas.

| Tag | O que é | Para que serve |
|-----|---------|----------------|
| `body` | Elemento raiz do conteúdo visível | Define o corpo da página |
| `header` | Cabeçalho da página ou seção | Agrupa conteúdo introdutório ou navegação |
| `nav` | Navegação | Define links de navegação principal |
| `section` | Seção genérica | Agrupa conteúdo relacionado tematicamente |
| `div` | Divisão genérica | Container sem significado semântico específico |
| `button` | Botão | Elemento clicável para ações |
| `a` (âncora) | Hiperlink | Cria links para outras páginas ou âncoras |
| `li` | Item de lista | Item dentro de `<ul>` ou `<ol>` |
| `ul` | Lista não ordenada | Lista com marcadores |
| `h2`, `h3` | Títulos | Cabeçalhos de seção (nível 2 e 3) |
| `footer` | Rodapé | Conteúdo inferior da página ou seção |
| `p` | Parágrafo | Bloco de texto |
| `html` | Elemento raiz do documento | Raiz da página HTML |
| `input` | Campo de entrada | Coleta dados do usuário |
| `select` | Menu suspenso | Lista de opções para seleção |

> **Atenção:** `select` sozinho é uma **tag HTML** e nunca deve ser traduzido. Classes customizadas que usam a palavra "select" no nome (ex: `.select-selected`, `.select-items`, `.select-hide`, `.custom-select`) **não são tags** — são nomes de classes criados pelo projeto e podem ser traduzidas para português, desde que alteradas consistentemente em todos os arquivos vinculados (CSS, HTML e JS).

---

## 2. Pseudo-classes

Pseudo-classes selecionam elementos com base em estado ou posição. Não traduzir.

| Pseudo-classe | O que é | Para que serve |
|---------------|---------|----------------|
| `:hover` | Estado de mouse sobre o elemento | Aplica estilo quando o usuário passa o mouse sobre o elemento |
| `:active` | Elemento ativado (clicado) | Aplica estilo enquanto o elemento está sendo pressionado |
| `:empty` | Elemento sem filhos | Seleciona elementos que não possuem conteúdo interno |
| `:nth-child()` | Filho de índice específico | Seleciona elementos pela posição entre irmãos |
| `:has()` | Elemento que contém | Seleciona um elemento se ele contém outro seletor específico |

---

## 3. Pseudo-elementos

Pseudo-elementos estilizam partes específicas de um elemento. Não traduzir.

| Pseudo-elemento | O que é | Para que serve |
|-----------------|---------|----------------|
| `::before` | Conteúdo antes | Insere conteúdo estilizado antes do elemento |
| `::after` | Conteúdo depois | Insere conteúdo estilizado depois do elemento |
| `::-webkit-scrollbar` | Barra de rolagem (WebKit/Blink) | Estiliza a barra de rolagem em Chrome, Safari, Edge, Opera |
| `::-webkit-scrollbar-track` | Trilha da barra de rolagem | Estiliza o fundo da trilha da barra de rolagem |
| `::-webkit-scrollbar-thumb` | Alça da barra de rolagem | Estiliza a parte arrastável da barra de rolagem |

> **Nota:** `::-webkit-scrollbar-*` é proprietário do WebKit/Blink. Não funciona no Firefox sem `-ms-overflow-style` ou `scrollbar-width`.

---

## 4. Classes técnicas comuns

Classes com nomes genéricos usados no projeto. Não são traduzíveis pois fazem parte da lógica de estado e seleção.

| Classe | Onde é usada | Para que serve |
|--------|--------------|----------------|
| `.active` | `css\versoes.css`, `css\cantor_cristao.css`, `css\harpa_cantor.css` e outros | Marca o item selecionado ou ativo (ex: capítulo atual, botão pressionado) |

---

## 5. Seletores de atributo

| Seletor | Exemplo no projeto | Para que serve |
|---------|-------------------|----------------|
| `[type="text"]` | `.barra-pesquisa input[type="text"]` | Seleciona inputs de tipo texto |

---

## 6. Exemplos do projeto: o que NÃO traduzir

```css
/* CORRETO - tags e pseudo-elementos em inglês */
body {
    overflow-x: hidden;
}

nav .menu-opcoes li a:hover {
    background: rgba(255, 255, 255, 0.2);
}

.conteudo::-webkit-scrollbar {
    width: 16px;
}

.botao-capitulo.active {
    background-color: #4CAF50;
}

#botoes-hinos:empty {
    padding: 0;
}
```

```css
/* ERRADO - não traduzir tags nem pseudo-elementos */
corpo {
    overflow-x: ocultar;
}

navegacao .menu-opcoes item link:hover {
    ...
}

conteudo::-webkit-barra-de-rolagem {
    largura: 16px;
}

botao-capitulo.ativo {
    ...
}
```

---

## 7. O que PODE ser nomeado em português (classes e IDs customizados)

Nomes de classes e IDs criados pelo projeto podem ser em português, desde que sejam consistentes internamente.

| Exemplo correto (projeto) | Significado |
|---------------------------|-------------|
| `.botao-capitulo` | Botão de capítulo |
| `.texto-versiculo` | Texto do versículo |
| `.menu-suspenso` | Menu suspenso (dropdown) |
| `.conteudo` | Área de conteúdo principal |
| `.botao-versiculo` | Botão de versículo |

> **Nota sobre classes com "select":** Classes como `.select-selected`, `.select-items`, `.select-hide`, `.custom-select` são nomes customizados do projeto (não são a tag `<select>`). Podem ser traduzidas para português (ex: `.opcao-selecionada`, `.opcoes-seletor`, `.seletor-oculto`, `.seletor-personalizado`), desde que alteradas em todos os arquivos vinculados.

---

## Resumo da regra

- **Tags HTML** → nunca traduzir (`body`, `div`, `nav`, `button`, etc.)
- **Pseudo-classes** → nunca traduzir (`:hover`, `:active`, `:empty`, etc.)
- **Pseudo-elementos** → nunca traduzir (`::before`, `::after`, `::-webkit-scrollbar`, etc.)
- **Classes/IDs customizados** → podem ser em português, mas devem ser consistentes em todo o projeto

---

## 8. Termos analisados (varredura completa — todos os arquivos HTML, CSS, JS)

### Resumo da varredura

O `css/concordancia.css` ja esta **totalmente em portugues** para todas as classes customizadas, exceto 3 termos que ainda estao em ingles/misto. O `html/menu_dicionarioconcordancia.html` e o `html/versoes.html` tambem ja estao totalmente em portugues.

### Termos JA EM PORTUGUES (css/concordancia.css)

| Classe | Linhas | Status |
|--------|--------|--------|
| `.filtros-container` | 12, 913 | portugues ✓ |
| `.select-personalizado` | 160 | portugues ✓ |
| `.opcao-selecionada` | 168, 187, 201, 208 | portugues ✓ |
| `.opcoes-seletor` | 217, 236, 249, 257 | portugues ✓ |
| `.seletor-oculto` | 264 | portugues ✓ |
| `.igual-ao-selecionado` | 271 | portugues ✓ |
| `.botao-busca` | 280, 304, 940 | portugues ✓ |
| `.contador-ocorrencias` | 312, 313, 329, 330, 410, 411, 438, 439 | portugues ✓ |
| `.item-palavra` | 313, 330, 865 | portugues ✓ |
| `.cabecalho-palavra` | 339, 358, 493, 494 | portugues ✓ |
| `.indicador-expansao` | 386, 402 | portugues ✓ |
| `.contador` | 410, 438 | portugues ✓ |
| `.info-fonte-palavra-esquerda` | 447, 448, 493, 494, 503, 514, 947 | portugues ✓ |
| `.info-fonte` | 448, 494, 516, 949 | portugues ✓ |
| `.palavra-veja-tambem-info` | 470, 471, 503, 515, 948 | portugues ✓ |
| `.veja-tambem` | 471, 504, 517, 950 | portugues ✓ |
| `.conteudo-concordancias` | 525, 539, 873 | portugues ✓ |
| `.cabecalho-livro` | 571 | portugues ✓ |
| `.referencia-concordancia` | 617 | portugues ✓ |
| `.contador-container` | 689, 708, 959, 975 | portugues ✓ |
| `.botao-paginacao` | 721, 772, 790, 800 | portugues ✓ |
| `.botao-carregar-mais` | 728 | portugues ✓ |
| `.carregamento-spinner` | 822, 881 | portugues ✓ |
| `.erro-busca` | 895 | portugues ✓ |

### Termos AINDA EM INGLES/MISTO (css/concordancia.css)

| Classe/ID | Linhas | Problema | Sugestão |
|-----------|--------|----------|----------|
|* `#busca-progress` | 847 | termo em ingles ("progress") | `#busca-progresso` |

### Termos JA EM PORTUGUES nos scripts

| Classe | Arquivo | Linhas |
|--------|---------|--------|
| `.opcao-selecionada` | script\concordancia.js | 45, 46 |
| `.opcao-selecionada` | script\concordancia-optimizada.js | 123, 172, 248, 258 |
| `.opcoes-seletor` | script\concordancia-optimizada.js | 124, 173, 488, 489 |
| `.indicador-expansao` | script\dicionario.js | 149, 169 |
| `.indicador-expansao` | script\concordancia-optimizada.js | 748, 762 |
| `.palavra-secao` | script\concordancia.js | 180 |
| `.cabecalho-palavra` | script\concordancia.js | 183 |
| `.info-fonte-palavra-esquerda` | script\concordancia.js | 191 |
| `.palavra-veja-tambem-info` | script\concordancia.js | 194 |
| `.carregando` (no innerHTML) | script\concordancia.js | 24 |

### Termos JA EM PORTUGUES nos scripts

| Classe | Arquivo | Linhas |
|--------|---------|--------|
| `.opcao-selecionada` | script\concordancia.js | 45, 46 |
| `.opcao-selecionada` | script\concordancia-optimizada.js | 123, 172, 248, 258 |
| `.opcoes-seletor` | script\concordancia-optimizada.js | 124, 173, 488, 489 |
| `.indicador-expansao` | script\dicionario.js | 149, 169 |
| `.indicador-expansao` | script\concordancia-optimizada.js | 748, 762 |
| `.palavra-secao` | script\concordancia.js | 180 |
| `.cabecalho-palavra` | script\concordancia.js | 183 |
| `.info-fonte-palavra-esquerda` | script\concordancia.js | 191 |
| `.palavra-veja-tambem-info` | script\concordancia.js | 194 |
| `.carregando` (no innerHTML) | script\concordancia.js | 24 |
| `.select-personalizado` | script\concordancia-optimizada.js | 191, 198, 201 |
| `.select-personalizado` | script\dropdown_concordancia.js | 159, 241, 244 |
| `.input-busca` | script\dicionario_concordancia.js | 118, 144 |

### Termos AINDA EM INGLES nos scripts

Nenhum termo em inglês restante em scripts. Todos foram traduzidos:
- `.custom-select` → `.select-personalizado` (dropdown_concordancia.js:159,241,244; concordancia-optimizada.js:191,198,201)
- `.search-input` → `.input-busca` (dicionario_concordancia.js:118,144)

### Termos JA EM PORTUGUES no HTML

**html\menu_dicionarioconcordancia.html** — todas as classes ja estao em portugues:
- `.cabecalho-superior`, `.titulo-conteiner`, `.nome-extenso`, `.titulo-menu`, `.menu-opcoes`, `.conteiner`, `.menu-alfabetico`, `.alfabeto-conteiner`, `.letra-btn`, `.secao-inativa`, `.filtros-container`, `.filtros-linha`, `.filtro-grupo`, `.select-personalizado`, `.opcao-selecionada`, `.botao-busca`, `.loading-conteiner`, `.carregamento-spinner`, `.contador-container`, `.botao-carregar-mais`, `.mensagem-inicial`, `.dicionario-linha`, `.dicionario-busca-grupo`, `.dicionario-busca`, `.dicionario-btn`, `.dicionario-conteudo-wrapper`, `.dicionario-opcoes-laterais`, `.sobre-conteiner`, `.conteudo`

**html\versoes.html** — todas as classes ja estao em portugues:
- `.cabecalho-superior`, `.titulo-conteiner`, `.nome-extenso-versao`, `.barra-pesquisa`, `.cabecalho-inferior`, `.titulo-menu`, `.menu-opcoes`, `.menu-suspenso`, `.conteudo-menu-suspenso`, `.meu-suspenso`, `.conteiner`, `.menu-livros`, `.conteudo`

### Termos AINDA EM INGLES no HTML

Nenhum termo em inglês restante em HTML. Todos foram traduzidos:
- *`.content` → `.conteudo` (cursos.html:307)
- *`.watermark` → `.marca-dagua-cursos` (cursos.html:308)
- *`.overlay` → `.sobreposicao` (harpa_cantor.html:33)

### Termos AINDA EM INGLES em outros arquivos CSS

Nenhum termo em inglês restante em CSS. Todos foram traduzidos:
- *`.content` → `.conteudo` (cursos.css:22)
- *`.watermark` → `.marca-dagua-cursos` (cursos.css:99)
- *`.overlay` → `.sobreposicao` (harpa_cantor.css:79)
- *`.section-title` → `.titulo-secao` (slide_biblia.css:201)
- *`.verse-section-title` → `.titulo-secao-versiculo` (modo_leitura.css:170)
- *`.search-overlay-*` → `.busca-*` / `#search-overlay-*` → `#busca-*` (biblia_realizabuscateste.css)

### Classes de estado (aceitaveis em ingles)

As classes de estado como `.active`, `.expanded`, `.select-arrow-active`, `.loaded`, `:hover`, `:active`, `:empty`, `:nth-child()`, `:has()`, `::before`, `::after` nao devem ser traduzidas — fazem parte da logica de estado e pseudo-seletores do CSS.

### Tags HTML (nao traduzir)

`body`, `div`, `nav`, `button`, `select`, `a`, `li`, `ul`, `h2`, `h3`, `footer`, `p`, `html`, `input`, `section`, `header`, `aside`, `main`, `footer`, `span`, `strong`, etc.


---

## 9. Lista revisada completa (consolidada — varredura real)

> **Nota:** Todos os itens listados abaixo com status "ingles" ou "ingles+portugues" ja foram traduzidos nos arquivos reais do projeto. Esta seção registra o resultado da varredura inicial; as traduções foram aplicadas consistentemente em CSS, HTML e JS.

| Classe/ID | Arquivo | Linhas | Status | Sugestao traducao |
|-----------|---------|--------|--------|-------------------|
| `.filtros-conteiner` | — | — | nao encontrado | `.filtros-container` |
| `.contador-conteiner` | — | — | nao encontrado | `.contador-container` |
| `#resultados-conteiner` | — | — | nao encontrado | `#resultados-container` |
| `.search-btn` | — | — | nao encontrado (ja substituido) | `botao-busca` |
| `.btn-paginacao` | — | — | nao encontrado | `botao-paginacao` |
| `.btn-carregar-mais` | html\menu_dicionarioconcordancia.html | 221 | Traduzido | `botao-carregar-mais` |
| `.custom-select` | script\dropdown_concordancia.js | 159, 241, 244 | Traduzido | `select-personalizado` |
| `.custom-select` | script\concordancia-optimizada.js | 191, 198, 201 | Traduzido | `select-personalizado` |
| `.select-selected` | script\concordancia.js | 45, 46 | ja em portugues | `.opcao-selecionada` |
| `.select-selected` | script\concordancia-optimizada.js | 123, 172, 248, 258 | ja em portugues | `.opcao-selecionada` |
| `.select-items` | script\concordancia-optimizada.js | 124, 173, 488, 489 | ja em portugues | `.opcoes-seletor` |
| `.select-hide` | html\menu_dicionarioconcordancia.css: | nao encontrado | — | `.seletor-oculto` |
| `.same-as-selected` | — | — | nao encontrado | `.igual-ao-selecionado` |
| `.expand-indicator` | — | — | ja em portugues | `.indicador-expansao` |
| `.ocorrencias-count` | — | — | ja em portugues | `.contador-ocorrencias` |
| `.palavra-section` | — | — | ja em portugues | `.palavra-secao` |
| `.palavra-item` | — | — | ja em portugues | `.item-palavra` |
| `.palavra-header` | — | — | ja em portugues | `.cabecalho-palavra` |
| `.palavra-fonte-info` | — | — | ja em portugues | `.info-fonte-palavra-esquerda` |
| `.fonte-info` | — | — | ja em portugues | `.info-fonte` |
| `.palavra-veja-tambem-info` | — | — | ja em portugues | `.palavra-veja-tambem-info` / `.veja-tambem` |
| `.concordancias-content` | css\concordancia.css | 525, 539, 873 | Traduzido | `conteudo-concordancias` |
| `.livro-header` | css\concordancia.css | 571 | Traduzido | `cabecalho-livro` |
| `.referenciaConcordancia` | css\concordancia.css | 617 | Traduzido (camelCase) | `referencia-concordancia` |
| `.loading-spinner` | — | — | ja substituido por portugues | `.carregamento-spinner` |
| `.carregamento-spinner` | css\concordancia.css | 822, 881 | ja em portugues | — |
| `.carregamento-spinner` | html\menu_dicionarioconcordancia.html | 213 | ja em portugues | — |
| `#busca-progress` | css\concordancia.css | 847 | Traduzido | `#busca-progresso` |
| `.content` | css\cursos.css | 22 | Traduzido | `conteudo` |
| `.content` | html\cursos.html | 307 | Traduzido | `conteudo` |
| `.watermark` | css\cursos.css | 99 | Traduzido | `marca-dagua-cursos` |
| `.watermark` | html\cursos.html | 308 | Traduzido | `marca-dagua-cursos` |
| `.overlay` | css\harpa_cantor.css | 79 | Traduzido | `sobreposicao` |
| `.overlay` | html\harpa_cantor.html | 33 | Traduzido | `sobreposicao` |
| `.section-title` | css\slide_biblia.css | 201 | Traduzido | `titulo-secao` |
| `.verse-section-title` | css\modo_leitura.css | 170 | Traduzido | `titulo-secao-versiculo` |
| `#search-overlay-content` | css\biblia_realizabuscateste.css | 10 | Traduzido | `#busca-sobreposicao-conteudo` |
| `#search-overlay-content.loaded` | css\biblia_realizabuscateste.css | 25 | Traduzido | `#busca-sobreposicao-conteudo.carregado` |
| `#search-overlay-progress-bar-inner` | css\biblia_realizabuscateste.css | 44 | Traduzido | `#busca-progresso-barra-interna` |
| `#search-overlay-progress-bar-outer` | css\biblia_realizabuscateste.css | 55 | Traduzido | `#busca-progresso-barra-externa` |
| `#search-overlay-progress-conteiner` | css\biblia_realizabuscateste.css | 66 | Traduzido | `#busca-progresso-conteiner` |
| `#search-overlay-progress-text` | css\biblia_realizabuscateste.css | 74 | Traduzido | `#busca-progresso-texto` |
| `#search-overlay-resultados-conteiner` | css\biblia_realizabuscateste.css | 83 | Traduzido | `#busca-resultados-conteiner` |
| `.search-overlay-botao-fechar` | css\biblia_realizabuscateste.css | 92 | Traduzido | `.busca-botao-fechar` |
| `.search-overlay-resultado-item` | css\biblia_realizabuscateste.css | 108, 117, 126, 140 | Traduzido | `.busca-resultado-item` |
| `.search-input` | script\dicionario_concordancia.js | 118, 144 | Traduzido | `input-busca` |

### Classes ja totalmente em portugues (sem acoes necessarias)

css\concordancia.css: `.filtros-container`, `.select-personalizado`, `.opcao-selecionada`, `.opcoes-seletor`, `.seletor-oculto`, `.igual-ao-selecionado`, `.botao-busca`, `.contador-ocorrencias`, `.item-palavra`, `.cabecalho-palavra`, `.indicador-expansao`, `.contador`, `.info-fonte-palavra-esquerda`, `.info-fonte`, `.palavra-veja-tambem-info`, `.veja-tambem`, `.conteudo-concordancias`, `.cabecalho-livro`, `.referencia-concordancia`, `.contador-container`, `.botao-paginacao`, `.botao-carregar-mais`, `.carregamento-spinner`, `.erro-busca`, `.palavra-info`, `.palavra-detalhes`, `.erro-mensagem`

Outros CSS ja traduzidos:
- `css\cursos.css`: `.conteudo` (line 22), `.marca-dagua-cursos` (line 99)
- `css\harpa_cantor.css`: `.sobreposicao` (line 79)
- `css\slide_biblia.css`: `.titulo-secao` (line 201)
- `css\modo_leitura.css`: `.titulo-secao-versiculo` (line 170)
- `css\biblia_realizabuscateste.css`: `.busca-botao-fechar`, `.busca-resultado-item`, `#busca-sobreposicao-conteudo`, `#busca-progresso-barra-interna`, `#busca-progresso-barra-externa`, `#busca-progresso-conteiner`, `#busca-progresso-texto`, `#busca-resultados-conteiner`

html\menu_dicionarioconcordancia.html: todas as classes ja em portugues

html\versoes.html: todas as classes ja em portugues

---

## 10. Sugestão de termos que PODEM ser traduzidos

Classes/IDs customizados criados pelo projeto podem ser nomeados em português, desde que sejam consistentes em CSS, HTML e JS.

### Traduções sugeridas (inglês → português) — TODAS APLICADAS

| Termo em inglês | Tradução aplicada | Exemplo de uso | Status |
|-----------------|-------------------|----------------|--------|
| `.custom-select` | `.select-personalizado` | Seletor customizado de dropdown | **Traduzido** (dropdown_concordancia.js:159,241,244; concordancia-optimizada.js:191,198,201) |
| `.search-input` | `.input-busca` | Campo de entrada de busca | **Traduzido** (dicionario_concordancia.js:118,144) |
| `.btn-carregar-mais` | `.botao-carregar-mais` | Botão carregar mais resultados | **Traduzido** (html\menu_dicionarioconcordancia.html:221) |
| `.search-overlay-progress-bar-inner` | `#busca-progresso-barra-interna` | Barra de progresso interna | **Traduzido** (css\biblia_realizabuscateste.css:44) |
| `.search-overlay-progress-bar-outer` | `#busca-progresso-barra-externa` | Barra de progresso externa | **Traduzido** (css\biblia_realizabuscateste.css:55) |
| `.search-overlay-progress-conteiner` | `#busca-progresso-conteiner` | Container da barra de progresso | **Traduzido** (css\biblia_realizabuscateste.css:66) |
| `.search-overlay-progress-text` | `#busca-progresso-texto` | Texto de progresso da busca | **Traduzido** (css\biblia_realizabuscateste.css:74) |
| `.content` | `.conteudo` | Área de conteúdo principal | **Traduzido** (css\cursos.css:22; html\cursos.html:307) |
| `.watermark` | `.marca-dagua-cursos` | Marca d'água de fundo | **Traduzido** (css\cursos.css:99; html\cursos.html:308) |
| `.overlay` | `.sobreposicao` | Camada de sobreposição | **Traduzido** (css\harpa_cantor.css:79; html\harpa_cantor.html:33) |
| `.section-title` | `.titulo-secao` | Título de seção interna | **Traduzido** (css\slide_biblia.css:201) |
| `.verse-section-title` | `.titulo-secao-versiculo` | Título de seção do versículo | **Traduzido** (css\modo_leitura.css:170) |
| `#search-overlay-content` | `#busca-sobreposicao-conteudo` | Container da sobreposição de busca | **Traduzido** (css\biblia_realizabuscateste.css:10) |
| `#search-overlay-progress-bar-inner` | `#busca-progresso-barra-interna` | Barra de progresso interna | **Traduzido** (css\biblia_realizabuscateste.css:44) |
| `#search-overlay-progress-bar-outer` | `#busca-progresso-barra-externa` | Barra de progresso externa | **Traduzido** (css\biblia_realizabuscateste.css:55) |
| `#search-overlay-progress-conteiner` | `#busca-progresso-container` | Container da barra de progresso | **Traduzido** (css\biblia_realizabuscateste.css:66) |
| `#search-overlay-progress-text` | `#busca-progresso-texto` | Texto de progresso da busca | **Traduzido** (css\biblia_realizabuscateste.css:74) |
| `#search-overlay-resultados-conteiner` | `#busca-resultados-conteiner` | Container de resultados | **Traduzido** (css\biblia_realizabuscateste.css:83) |
| `.search-overlay-botao-fechar` | `.busca-botao-fechar` | Botão fechar sobreposição | **Traduzido** (css\biblia_realizabuscateste.css:92) |
| `.search-overlay-resultado-item` | `.busca-resultado-item` | Item de resultado da busca | **Traduzido** (css\biblia_realizabuscateste.css:108,117,126,140) |

### Ja traduzidos (sem acao necessária)

`.select-selected` → `.opcao-selecionada` | `.select-items` → `.opcoes-seletor` | `.expand-indicator` → `.indicador-expansao` | `.ocorrencias-count` → `.contador-ocorrencias` | `.palavra-section` → `.palavra-secao` | `.palavra-item` → `.item-palavra` | `.palavra-header` → `.cabecalho-palavra` | `.palavra-fonte-info` → `.info-fonte-palavra-esquerda` | `.fonte-info` → `.info-fonte` | `.palavra-veja-tambem-info` → `.palavra-veja-tambem-info` / `.veja-tambem` | `.concordancias-content` → `.conteudo-concordancias` | `.livro-header` → `.cabecalho-livro` | `.referenciaConcordancia` → `.referencia-concordancia` | `.loading-spinner` → `.carregamento-spinner` | `.search-btn` → `.botao-busca` | `.custom-select` → `.select-personalizado` | `.search-input` → `.input-busca` | `.content` → `.conteudo` | `.watermark` → `.marca-dagua-cursos` | `.overlay` → `.sobreposicao` | `.section-title` → `.titulo-secao` | `.verse-section-title` → `.titulo-secao-versiculo` | `.search-overlay-*` → `.busca-*` / `#search-overlay-*` → `#busca-*`

### Observação sobre `.info-fonte-palavra-esquerda`

O nome `.info-fonte-palavra-esquerda` e mais adequado que `.palavra-fonte-info` porque:
- Descreve o conteudo: **info** (informação) da **fonte**
- Descreve o escopo: da **palavra**
- Descreve a posicao: **esquerda** (posicionado à esquerda do cabeçalho)

### Regras de tradução

1. **Tags HTML** nunca traduzir (`body`, `div`, `nav`, `button`, `select`, `a`, `li`, `ul`, etc.)
2. **Pseudo-classes** nunca traduzir (`:hover`, `:active`, `:empty`, `:nth-child()`, `:has()`, etc.)
3. **Pseudo-elementos** nunca traduzir (`::before`, `::after`, `::-webkit-scrollbar`, etc.)
4. **Classes de estado** (`.active`, `.expanded`, `.loaded`, `.select-arrow-active`) nao traduzir — fazem parte da logica de estado
5. **Classes/IDs customizados** podem ser em português, mas devem ser alterados consistente em CSS, HTML e JS
6. **Nomes de variáveis JS** que referenciam classes CSS devem ser atualizados junto com as classes
7. **IDs** (ex: `#busca-progress`) podem ser traduzidos mas afetam `getElementById` no JS — atualizar ambos

### concordancia.css — totalmente em português (sem ação)

Todas as classes customizadas em `css/concordancia.css` ja estao em portugues. Nao ha termos em ingles pendentes neste arquivo.

Classes ja confirmadas em portugues:
- `.select-items` → `.opcoes-seletor`
- `.select-hide` → `.seletor-oculto`
- `.same-as-selected` → `.igual-ao-selecionado`
- `.search-btn` → `.botao-busca`
- `.btn-paginacao` → `.botao-paginacao`
- `.btn-carregar-mais` → `.botao-carregar-mais`
- `.loading-spinner` → `.spinner-carregamento`
- `#busca-progress` → `#busca-progresso`
- `.expand-indicator` → `.indicador-expansao`
- `.ocorrencias-count` → `.contador-ocorrencias`
- `.palavra-section` → `.palavra-secao`
- `.palavra-item` → `.item-palavra`
- `.palavra-header` → `.cabecalho-palavra`
- `.palavra-fonte-info` → `.info-fonte-palavra-esquerda`
- `.fonte-info` → `.info-fonte`
- `.palavra-veja-tambem-info` → `.palavra-veja-tambem-info` / `.veja-tambem`
- `.concordancias-content` → `.conteudo-concordancias`
- `.livro-header` → `.cabecalho-livro`
- `.referenciaConcordancia` → `.referencia-concordancia`

### Observação sobre `.info-fonte-palavra-esquerda`

O nome `.info-fonte-palavra-esquerda` e mais adequado que `.palavra-fonte-info` porque:
- Descreve o conteudo: **info** (informação) da **fonte**
- Descreve o escopo: da **palavra**
- Descreve a posicao: **esquerda** (posicionado à esquerda do cabeçalho)

---

## Seção 11 — HTML: Termos em inglês encontrados (precisam tradução)

| Arquivo | Linha | Termo atual | Sugestão | Status |
|---------|-------|-------------|----------|--------|
| `html/cursos.html` | 307 | `.content` | `.conteudo` | **Traduzido** |
| `html/harpa_cantor.html` | 33 | `.overlay` | `.sobreposicao` | **Traduzido** |

### HTML já em português (sem ação)
- `html/menu_dicionarioconcordancia.html` — todas classes/IDs em português
- `html/versoes.html` — todas classes/IDs em português
- `html/index.html` — sem classes customizadas em inglês detectadas
- `html/cursos.html` linha 308 — `.watermark` já renomeado para `.marca-dagua-cursos`

---

## Seção 12 — CSS: Termos em inglês encontrados (precisam tradução)

| Arquivo | Linha | Termo atual | Sugestão | Status |
|---------|-------|-------------|----------|--------|
| `css/cursos.css` | 22 | `.content` | `.conteudo` | **Traduzido** |
| `css/harpa_cantor.css` | 79 | `.overlay` | `.sobreposicao` | **Traduzido** |
| `css/slide_biblia.css` | 201 | `.section-title` | `.titulo-secao` | **Traduzido** |
| `css/modo_leitura.css` | 170 | `.verse-section-title` | `.titulo-secao-versiculo` | **Traduzido** |
| `css/biblia_realizabuscateste.css` | 10 | `#search-overlay-content` | `#busca-sobreposicao-conteudo` | **Traduzido** |
| `css/biblia_realizabuscateste.css` | 25 | `#search-overlay-content.loaded` | `#busca-sobreposicao-conteudo.carregado` | **Traduzido** |
| `css/biblia_realizabuscateste.css` | 32 | `#search-overlay-content h2` | `#busca-sobreposicao-conteudo h2` | **Traduzido** |
| `css/biblia_realizabuscateste.css` | 44 | `#search-overlay-progress-bar-inner` | `#busca-progresso-barra-interna` | **Traduzido** |
| `css/biblia_realizabuscateste.css` | 55 | `#search-overlay-progress-bar-outer` | `#busca-progresso-barra-externa` | **Traduzido** |
| `css/biblia_realizabuscateste.css` | 66 | `#search-overlay-progress-conteiner` | `#busca-progresso-conteiner` | **Traduzido** |
| `css/biblia_realizabuscateste.css` | 74 | `#search-overlay-progress-text` | `#busca-progresso-texto` | **Traduzido** |
| `css/biblia_realizabuscateste.css` | 83 | `#search-overlay-resultados-conteiner p` | `#busca-resultados-conteiner p` | **Traduzido** |
| `css/biblia_realizabuscateste.css` | 92 | `.search-overlay-botao-fechar` | `.busca-botao-fechar` | **Traduzido** |
| `css/biblia_realizabuscateste.css` | 108 | `.search-overlay-resultado-item` | `.busca-resultado-item` | **Traduzido** |
| `css/biblia_realizabuscateste.css` | 117 | `.search-overlay-resultado-item span` | `.busca-resultado-item span` | **Traduzido** |
| `css/biblia_realizabuscateste.css` | 126 | `.search-overlay-resultado-item strong a` | `.busca-resultado-item strong a` | **Traduzido** |
| `css/biblia_realizabuscateste.css` | 140 | `.search-overlay-resultado-item strong a:hover` | `.busca-resultado-item strong a:hover` | **Traduzido** |
| `css/dicionario.css` | 226 | `.btn-buscar` | `.botao-buscar` | **Traduzido** |
| `css/dicionario.css` | 247 | `.btn-buscar:hover` | `.botao-buscar:hover` | **Traduzido** |
| `css/dicionario.css` | 257 | `.btn-buscar:active` | `.botao-buscar:active` | **Traduzido** |

### CSS já em português (sem ação)
- `css/concordancia.css` — totalmente em português
- `css/versoes.css` — sem classes em inglês detectadas
- `css/slide_harpacantor.css` — sem classes em inglês detectadas
- `css/cursos.css` linha 99 — `.watermark` já renomeado para `.marca-dagua-cursos`

---

## Seção 13 — JavaScript: Classes CSS em inglês referenciadas (precisam tradução)

| Arquivo | Linha | Termo atual | Sugestão | Afeta |
|---------|-------|-------------|----------|-------|
| — | — | Nenhuma classe CSS em inglês referenciada em JS | — | — |

### JS classes já em português (sem ação)
- `script/dropdown_concordancia.js` — `.custom-select` já está como `.select-personalizado`
- `script/dicionario_concordancia.js` — `.search-input` já está como `.input-busca`

---

## Seção 14 — JavaScript: Variáveis, funções e propriedades em inglês

| Arquivo | Linha | Termo atual | Sugestão | Tipo |
|---------|-------|-------------|----------|------|
| `script/versoes_realizabusca.js` | 16, 78-83, 86-93, 165-172, 204-205, 239, 262-265, 303 | `window.searchEngine` | `window.mecanismoBusca` | **Traduzido** |
| `script/versoes_realizabusca.js` | 17, 165, 262-265 | `invertedIndex` | `indiceInvertido` | **Traduzido** |
| `script/versoes_realizabusca.js` | 20, 78, 83, 86, 93, 172, 239 | `isReady` | `pronto` | **Traduzido** |
| `script/versoes.js` | 206 | `window.searchEngine` | `window.mecanismoBusca` | **Traduzido** |
| `script/versoes.js` | 206 | `.isReady` | `.pronto` | **Traduzido** |
| `script/gerenciador_concordancia.js` | 17 | `this.itemsPerPage` | `this.itensPorPagina` | **Traduzido** |
| `script/gerenciador_concordancia.js` | 21 | `this.searchIndex` | `this.indiceBusca` | **Traduzido** |
| `script/gerenciador_concordancia.js` | 150, 182, 205 | `this.searchIndex.isReady()` | `this.indiceBusca.pronto()` | **Traduzido** |
| `script/gerenciador_concordancia.js` | 198 | `searchPriority()` | `buscarPrioridade()` | **Traduzido** |
| `script/gerenciador_concordancia_novo.js` | 12, 69-70 | `this.itemsPerPage` | `this.itensPorPagina` | **Traduzido** |
| `script/gerenciador_concordancia_novo.js` | 16, 96-97, 127 | `this.searchCache` | `this.cacheBusca` | **Traduzido** |
| `script/gerenciador_concordancia_novo.js` | 92 | `searchPriority()` | `buscarPrioridade()` | **Traduzido** |
| `script/dicionario.js` | 14, 194-196, 247-248 | `this.itemsPerPage` | `this.itensPorPagina` | **Traduzido** |
| `script/concordancia-optimizada.js` | 16, 78-80, 218, 314, 346-349, 369, 393, 756-778, 829, 842 | `this.searchTerm` | `this.termoBusca` | **Traduzido** |
| `script/concordancia-optimizada.js` | 380, 608 | `this.searchInAllFiles()` | `this.buscarEmTodosArquivos()` | **Traduzido** |
| `script/concordancia-optimizada.js` | 616 | `window.dataManager.searchPriority()` | `window.dataManager.buscarPrioridade()` | **Traduzido** |
| `script/concordancia-busca-indexada.js` | 126 | `isReady()` | `pronto()` | **Traduzido** |
| `script/concordancia-busca-indexada.js` | 131 | `window.searchIndex` | `window.indiceBusca` | **Traduzido** |
| `script/gerenciador_concordancia.js` | 21 | `window.searchIndex` | `window.indiceBusca` | **Traduzido** |
| `script/menu_dicionarioconcordancia.js` | 88-89 | `window.searchIndex` | `window.indiceBusca` | **Traduzido** |

### JS variáveis/funções já em português (sem ação)
- Nenhuma variável/função/propriedade em inglês restante em JS

---

## Seção 15 — Erros de escrita incorreta encontrados

Nenhum termo com escrita incorreta foi detectado na varredura atual.

---

## Resumo executivo

- **0 arquivos HTML** com classes em inglês pendentes (todos traduzidos: `cursos.html`, `harpa_cantor.html`, `menu_dicionarioconcordancia.html`)
- **0 arquivos CSS** com classes/IDs em inglês pendentes (todos traduzidos: `cursos.css`, `harpa_cantor.css`, `slide_biblia.css`, `modo_leitura.css`, `biblia_realizabuscateste.css`, `dicionario.css`)
- **0 arquivos JS** com classes CSS em inglês referenciadas pendentes (todos traduzidos)
- **0 arquivos JS** com variáveis/funções/propriedades em inglês pendentes (todos traduzidos)
- **0 erros de escrita incorreta** detectados
- **Todas as marcas d'água** renomeadas com nomes específicos por contexto; `.marca-dagua-imagem` CSS resolvido

---

## Seção 16 — Marcas d'água: renomeação organizada por contexto

Cada marca d'água recebeu um nome único que reflete seu contexto de uso, evitando conflitos de ID/classe entre arquivos diferentes. Todas as referências CSS, HTML e JS foram atualizadas consistente.

| Nome novo | Contexto | Imagem | Opacidade | Arquivos atualizados |
|-----------|----------|--------|-----------|---------------------|
| `.marca-dagua-cursos` | Cursos | `cursos.jpg` | 0.2 | `cursos.css:22`, `cursos.html:307-308` |
| `#marca-dagua-harpacantor-slide` | Slide Harpa Cantor | `biblia.png` | 0.15 | `slide_harpacantor.css:246`, `slide_harpacantor_interface.js:30`, `slide_harpacantor.js:89` |
*| `#marca-dagua-slide-biblia` | Slide Bíblia | `biblia.png` | 0.15 | `slide_biblia.css:219`, `slide_biblia_interface.js:41`, `slide_biblia.js:395` |
| `#marca-dagua-busca` | Busca | (sem CSS) | 0.08 | `biblia_realizabuscateste.css:148`, `biblia_realizabusca.js:39` |
| `.marca-dagua-imagem-versoes` | Versões | (sem CSS) | 0.3 | `versoes.css:397`, `versoes.html:156` (comentado) |
| `.marca-dagua-imagem-dicionario-concordancia` | Dicionário/Concordância | (sem CSS) | 0.3 | `menu_dicionarioconcordancia.css:412`, `menu_dicionarioconcordancia.html:311` (comentado) |
| `.marca-dagua-sobre` | Sobre (geral) | (sem CSS) | — | `sobre.js:14,19,24,26,27` |
| `.marca-dagua-sobre-tela` | Sobre (tela Sobre) | (sem CSS) | — | `sobre.js:38,43,47,48,49`, `sobre.js:124` |
| `.marca-dagua-biblia` | Geral via JS | `biblia.png` (via JS inline) | — | `marcadagua.js:13` |
| `.marca-dagua-imagem` | Imagem dentro de qualquer marca d'água | (sem CSS) | — | `sobre.js:23,47`, `marcadagua.js:17` — **RESOLVIDO: CSS adicionado em versoes.css e menu_dicionarioconcordancia.css** |

### Nomes anteriores (para referência)
- `.watermark` → `.marca-dagua-cursos`
- `#marcadagua` → `#marca-dagua-harpacantor-slide`, `#marca-dagua-slide-biblia`, `#marca-dagua-busca`
- `.marcadagua` → `.marca-dagua-sobre`
- `.marcadagua-sobre` → `.marca-dagua-sobre-tela`
- `.marcadagua` (em `marcadagua.js`) → `.marca-dagua-biblia`
- `.marca-dagua-imagem` → `.marca-dagua-imagem-versoes`, `.marca-dagua-imagem-dicionario-concordancia`

### Arquivo script/marcadagua.js
- Nome do arquivo: mantido como `marcadagua.js` (não renomeado para evitar quebrar referências de `<script src>`)
- Classe aplicada: `.marca-dagua-biblia`
- Imagem carregada: `../img/biblia.png`
- Carregado por: `versoes.html:167`, `menu_dicionarioconcordancia.html:339`, `biblia_realizabusca.js:40`, `versoes_capitulos.js:20`


