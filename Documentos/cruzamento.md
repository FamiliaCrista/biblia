# Cruzamento: `E:\biblia` (projeto) × `E:\bibliacomparar` (referência)

Objetivo: listar, **por arquivo**, termos (classes, IDs, variáveis, funções, propriedades, etc.) que aparecem traduzidos/diferentes na referência ou que ainda estão pendentes no projeto, com **linhas/blocos** para conferência.

**Guias considerados**
- `E:\biblia\termos que nao podem ser traduzidos.md` (tags HTML, pseudo-classes/elementos, estados não traduzir; classes/IDs customizados podem ser traduzidos com consistência em CSS/HTML/JS).
- `E:\biblia\sugestao.md` (padronização de comentários em `style.css` — não é tradução de identificadores).

**Escopo ativo**
- Projeto: `E:\biblia\css`, `E:\biblia\html`, `E:\biblia\script`, `E:\biblia\style.css`, `E:\biblia\script.js`, `E:\biblia\index.html`.
- Referência: `E:\bibliacomparar\css`, `E:\bibliacomparar\html`, `E:\bibliacomparar\script`.
- **Fora do escopo ativo (mas podem conter resquícios EN):** `E:\biblia\.kilo\worktrees\*`, pastas `padroniza/`, cópias `*bk*`, `*copy*`.

**Legenda**
- `EN (ref)` = termo na referência (`bibliacomparar`).
- `PT (proj)` = termo no projeto (`biblia`).
- `FALTA/PARCIAL` = ainda há ocorrência EN ou mapeamento incompleto no projeto ativo.

---

## 1. CSS — `css/concordancia.css`

### 1.1 Seletores customizados: mapeamento e linhas

| EN (ref) `bibliacomparar\css\concordancia.css` | Linhas (ref) | PT (proj) `biblia\css\concordancia.css` | Linhas (proj) | Situação |
|---|---:|---|---:|---|
| `.custom-select` | — (ver `concordanciaerro.css` ref.; não listado no ativo) | `.select-personalizado` | 160 | PT no projeto |
| `.select-selected` | — | `.opcao-selecionada` (+ `:after`, `.select-arrow-active:after`, `:hover`) | 168, 187, 201, 208 | PT no projeto (estado `.select-arrow-active` mantido) |
| `.select-items` | — | `.opcoes-seletor` (+ `div`, `:hover`, `:last-child`) | 217, 236, 249, 257 | PT no projeto |
| `.select-hide` | — | `.seletor-oculto` | 264 | PT no projeto |
| `.same-as-selected` | — | `.igual-ao-selecionado` | 271 | PT no projeto |
| `.search-btn` | — | `.botao-busca` | 280, 304, 940 | PT no projeto |
| `.ocorrencias-count`, `.palavra-item` (bloco) | 312,313,329,330,411,439,865 | `.contador-ocorrencias`, `.item-palavra` | 312,313,329,330,411,439,898 | PT no projeto |
| `.palavra-section` | 312,329 | `.palavra-secao` / agrupado com `.item-palavra` | (bloco 312–330) | **Revisar paridade**: ref. tem `.palavra-section`; projeto usa `.item-palavra` — confirmar HTML/JS |
| `.palavra-header` | 339,358,493,494 | `.cabecalho-palavra` | 339,358,493,494 | PT no projeto |
| `.expand-indicator` | 386,402 | `.indicador-expansao` | 386,402 | PT no projeto |
| `.palavra-fonte-info`, `.fonte-info` | 447,448,493,494,503,504,514,516,947,949 | `.info-fonte-palavra-esquerda`, `.info-fonte` | 447,448,493,494,503,504,514,516,980,982 | PT no projeto |
| `.concordancias-content` | 525,539,873 | `.conteudo-concordancias` | 525,539,906 | PT no projeto |
| `.livro-header` | 571 | `.cabecalho-livro` | 604 | PT no projeto (linha difere) |
| `.referenciaConcordancia` | 617 | `.referencia-concordancia` | 650 | PT no projeto (kebab-case) |
| `#busca-status .loading-spinner`, `.loading-spinner` | 822,881 | `#busca-status .carregamento-spinner`, `.carregamento-spinner` | 855,914 | PT no projeto |
| `#busca-progress` | 847 | `#busca-progresso` | 880 | PT no projeto |
| `.btn-paginacao`, `.btn-carregar-mais` | — (na ref. `concordanciaerro.css`: 526,533,577,725,796) | `.botao-paginacao`, `.botao-carregar-mais` | 754,761,805,823,833,973 | PT no projeto |

### 1.2 Blocos para conferir (ref. EN)
- `bibliacomparar\css\concordancia.css:312-313` `.palavra-section, .palavra-item`
- `...:339,358,386,402,447-448,493-494,525,539,571,617,822,847,873,881`

### 1.3 Ação sugerida
- Validar uso de `.palavra-secao` vs `.item-palavra` (HTML/JS) para paridade total com a ref.
- Buscar remanescentes: `.concordancias-content|.palavra-header|.expand-indicator|.loading-spinner|#busca-progress|\.referenciaConcordancia` nos ativos.

---

## 2. CSS — `css/biblia_realizabuscateste.css`

| EN (ref) `bibliacomparar` | Linhas (ref) | PT (proj) `biblia` | Linhas (proj) | Situação |
|---|---:|---|---:|---|
| `#search-overlay-content` | 10 | `#busca-sobreposicao-conteudo` (não apareceu no grep PT; **verificar existência**) | — | **VERIFICAR**: ref. tem bloco; projeto mostrou apenas `#busca-progresso-*`/`#busca-resultados-*`/`.busca-*` |
| `#search-overlay-content.loaded` | 25 | `.carregado` equivalente? | — | **VERIFICAR** |
| `#search-overlay-content h2` | 32 | equivalente PT | — | **VERIFICAR** |
| `#search-overlay-progress-bar-inner` | 44 | `#busca-progresso-barra-interna` | 44 | PT no projeto |
| `#search-overlay-progress-bar-outer` | 55 | `#busca-progresso-barra-externa` | 55 | PT no projeto |
| `#search-overlay-progress-conteiner` | 66 | `#busca-progresso-container` | 66 | PT no projeto (grafia `container` no ID — **diverge** de `-conteiner` usado em outros IDs) |
| `#search-overlay-progress-text` | 74 | `#busca-progresso-texto` | 74 | PT no projeto |
| `#search-overlay-resultados-conteiner p` | 83 | `#busca-resultados-conteiner p` | 83 | PT no projeto |
| `.search-overlay-botao-fechar` | 92 | `.busca-botao-fechar` | 92 | PT no projeto |
| `.search-overlay-resultado-item` (+ `span`, `strong a`, `:hover`) | 108,117,126,140 | `.busca-resultado-item` (+ variantes) | 108,117,126,140 | PT no projeto |

### Ação sugerida
- Confirmar se `#search-overlay-content`/`.loaded` foram renomeados no CSS/HTML/JS ou se o container mudou de implementação.
- Padronizar grafia do ID: `#busca-progresso-container` (proj) vs padrão `*-conteiner` do projeto — decisão de consistência.

---

## 3. CSS — `css/cursos.css`

| EN (ref) | Linhas (ref) | PT (proj) | Linhas (proj) | Situação |
|---|---:|---|---:|---|
| `.content` | 22 | `.conteudo` | 22 | PT no projeto |
| `.watermark` | 99 | `.marca-dagua-cursos` | 99 | PT no projeto |

**Conferir HTML/JS** se ainda referenciam `.content`/`.watermark`.

---

## 4. CSS — `css/harpa_cantor.css`

| EN (ref) | Linhas (ref) | PT (proj) | Linhas (proj) | Situação |
|---|---:|---|---:|---|
| `.overlay` | 79 | `.sobreposicao` | 79 | PT no projeto |

---

## 5. CSS — `css/dicionario.css`

| EN (ref) | Linhas (ref) | PT (proj) | Linhas (proj) | Situação |
|---|---:|---|---:|---|
| `.btn-buscar` | 226,247,257 | `.botao-buscar` | 226,247,257 | PT no projeto |
| `#dicionario-resultados.loading` | 346 | `#dicionario-resultados.loading` | 346 | **Estado `.loading` mantido (EN)** — aceitável como classe de estado; confirmar convenção do projeto |

---

## 6. CSS — `css/menu_dicionarioconcordancia.css`

| EN (ref) | Linhas (ref) | PT (proj) | Linhas (proj) | Situação |
|---|---:|---|---:|---|
| `.loading-spinner` | 370 | `.carregamento-spinner` | 370 | PT no projeto |
| `.loading-conteiner` (+ `p`) | 346,360 | `.loading-conteiner` (+ `p`) | 346,360 | **FALTA/PENDENTE**: nome misto PT+EN ainda no projeto (igual à ref.) — candidato a `.conteiner-carregamento`/`.carregamento-conteiner` |
| `.marca-dagua-imagem` | 412 | `.marca-dagua-imagem-dicionario-concordancia` | 412 | PT/contextualizado no projeto |
| — | — | `.marca-dagua-imagem` | 432 | **Projeto tem regra adicional** (genérica?) — conferir intenção/duplicidade |

---

## 7. CSS — `css/slide_biblia.css` e `css/modo_leitura.css`

| Arquivo (ref) | EN (ref) | Linha (ref) | PT (proj) | Linha (proj) | Situação |
|---|---|---:|---|---:|---|
| `slide_biblia.css` | `#versiculo-conteiner strong.section-title` | 201 | `#versiculo-conteiner strong.titulo-secao` | 201 | PT no projeto |
| `modo_leitura.css` | `.verse-section-title` | 170 | `.titulo-secao-versiculo` | 170 | PT no projeto |

---

## 8. CSS — `css/versoes.css` (diferenças/adições no projeto)

| Seletor (proj) | Linha (proj) | Situação |
|---|---:|---|
| `.cabecalho-inferior` | 55 | Presente no projeto (sem equivalente no diff da ref.) |
| `.meu-suspenso` / `:hover .conteudo-menu-suspenso` | 224,253 | Presente no projeto |
| `.marca-dagua-imagem-versoes` | 423 | Presente no projeto |

**Ação:** verificar se a ref. usa nomes EN diferentes para os mesmos blocos.

---

## 9. JavaScript — `script/concordancia-busca-indexada.js`

| Item | EN (ref) | Linhas (ref) | PT (proj) | Linhas (proj) | Situação |
|---|---|---:|---|---:|---|
| Classe | `class SearchIndex` | 5 | `class SearchIndex` | 5 | **EN mantido** (nome interno) — opcional traduzir |
| Método pronto | `isReady()` | 126 | `pronto()` | 126 | PT no projeto |
| Exposição global | `window.searchIndex = new SearchIndex()` | 131 | `window.indiceBusca = new SearchIndex()` | 131 | PT no projeto; instância usa classe EN |

**Falta (opcional/consistência):** renomear `SearchIndex` → `IndiceBusca` (se adotado) e atualizar refs.

---

## 10. JavaScript — `script/concordancia-optimizada.js`

| Item | EN (ref) | Linhas (ref) | PT (proj) | Linhas (proj) | Situação |
|---|---|---:|---|---:|---|
| Estado | `this.searchTerm` | 16,80,218,314,349,369,756,829,842 | `this.termoBusca` | 16,80,218,314,349,369,756,829,842 | PT no projeto |
| Busca em arquivos | `searchInAllFiles(searchTerm)` | 380,608 | `buscarEmTodosArquivos(searchTerm)` | 380,608 | PT no projeto |
| Param/local `searchTerm` | `searchTerm` | 78,346,608,776-778 | `searchTerm` (ainda usado) | 78,346,608,776-778 | **FALTA** traduzir params/locais → `termoBusca` |
| Local `searchLower` | `searchLower` | 609,610,627,632,637,642,668,677,705,706 | `searchLower` (ainda usado) | 609,610,627,632,637,642,668,677,705,706 | **FALTA** traduzir → `termoMinusculo`/similar |
| Fallback/chamadas | `window.dataManager.searchPriority(...)`, `_fallbackSearch(searchLower)` | 616,627,632,637 | `buscarPrioridade(...)`, `_fallbackSearch(searchLower)` | 616,627,632,637 | Parcial (método PT, local EN) |

**Blocos críticos (projeto, conferir):** 78-80, 346-349, 369, 380, 393, 608-642, 668-706, 776-779, 829, 842.

---

## 11. JavaScript — `script/gerenciador_concordancia.js`

| Item | EN (ref) | Linhas (ref) | PT (proj) | Linhas (proj) | Situação |
|---|---|---:|---|---:|---|
| `itemsPerPage` → `itensPorPagina` | 17,88,89 | 17,88,89 | 17,88,89 | PT no projeto |
| `searchIndex` → `indiceBusca` | 21,150,182,183,205,208 | 21,150,182,183,205,208 | 21,150,182,183,205,208 | PT no projeto |
| `.isReady()` → `.pronto()` | 150,182,205 | 150,182,205 | 150,182,205 | PT no projeto |
| `searchGlobal(searchTerm)` | 146,151,194,253 | 146,151,194,253 | 146,151,194,253 | **FALTA** traduzir método/param |
| `searchUltraFast(searchTerm)` | 151,176 | 151,176 | 151,176 | **FALTA** traduzir método/param |
| `searchPriority` → `buscarPrioridade` | 198 | 198 | 198 | PT no projeto |
| `searchTerm`/`searchLower` params/locais | 146-154,160,176-177,183,194,198-202,208,227,231,234,236,253 | múltiplas | múltiplas | **FALTA** traduzir params/locais |
| `indiceBusca.search(...)` (API do índice) | `searchIndex.search(...)` 183,208 | 183,208 | 183,208 | **Verificar**: método do índice ainda chama `.search()`? alinhar com `concordancia-busca-indexada.js` |

**Blocos críticos (projeto):** 146-161, 176-195, 198-254.

---

## 12. JavaScript — `script/gerenciador_concordancia_novo.js`

| Item | EN (ref) | Linhas (ref) | PT (proj) | Linhas (proj) | Situação |
|---|---|---:|---|---:|---|
| `itemsPerPage` → `itensPorPagina` | 12,69,70 | 12,69,70 | 12,69,70 | PT no projeto |
| `searchCache` → `cacheBusca` | 16,96,97,127 | 16,96,97,127 | 16,96,97,127 | PT no projeto |
| `searchPriority` → `buscarPrioridade` | 92 | 92 | 92 | PT no projeto |
| `searchTerm`/`searchLower`/`_searchFallback(searchLower)` | 92-94,101,111,146-152 | múltiplas | múltiplas | **FALTA** traduzir params/locais |

**Blocos críticos (projeto):** 92-128, 146-160.

---

## 13. JavaScript — `script/dicionario.js`

| Item | EN (ref) | Linhas (ref) | PT (proj) | Linhas (proj) | Situação |
|---|---|---:|---|---:|---|
| `itemsPerPage` → `itensPorPagina` | 14,194-196,247-248 | 14,194-196,247-248 | 14,194-196,247-248 | PT no projeto |
| `handleSearch(searchTerm)` param | 284-285 | 284-285 | 284-285 | **FALTA** traduzir param (`termoBusca`) |

---

## 14. JavaScript — `script/versoes_realizabusca.js`

| Item | EN (ref) | Linhas (ref, amostra) | PT (proj) | Linhas (proj, amostra) | Situação |
|---|---|---:|---|---:|---|
| `window.searchEngine` → `window.mecanismoBusca` | 16,78,83,86,93,165-167,170,172,204-205,239,262,265,303 | múltiplas | 16,78,83,86,93,165-167,170,172,204-205,239,262,265,303 | PT no projeto |
| `invertedIndex` → `indiceInvertido` | 17,158,159,165,262,265 | múltiplas | 17,158,159,165,262,265 | PT no projeto |
| `isReady` → `pronto` | 20,78,83,86,93,172,239 | múltiplas | 20,78,83,86,93,172,239 | PT no projeto |
| `newInvertedIndex` → `newIndiceInvertido` | 99,158,159,165 | 99,158,159,165 | 99,158,159,165 | PT no projeto |
| Chave/cache `searchIndex_` / store `searchIndexes` | 88,188,189,196,197,223,224 | múltiplas | 88,188,189,196,197,223,224 | **EN mantido em chaves/nomes de store** — alterar exige migração/cache bust; avaliar impacto |

**Ação:** se padronizar chaves IndexedDB, incrementar versão de cache e tratar migração.

---

## 15. JavaScript — `script/versoes.js`

| Item | EN (ref) | Linhas (ref) | PT (proj) | Linhas (proj) | Situação |
|---|---|---:|---|---:|---|
| `window.searchEngine` / `.isReady` | 206 | 206 | `window.mecanismoBusca` / `.pronto` | 206 | PT no projeto |

---

## 16. JavaScript — `script/menu_dicionarioconcordancia.js`

| Item | EN (ref) | Linhas (ref) | PT (proj) | Linhas (proj) | Situação |
|---|---|---:|---|---:|---|
| `window.searchIndex` → `window.indiceBusca` | 88,89 | 88,89 | 88,89 | PT no projeto |

---

## 17. Raiz — `style.css`, `script.js`, `index.html`

- Amostra comparativa (classes/IDs/funções/variáveis comuns): **sem divergência relevante** entre `biblia` e `bibliacomparar`.
- `style.css`: ver `sugestao.md` para padronização de comentários (ex.: bug de sintaxe `/*/` citado no guia) — **fora do escopo de tradução de identificadores**.

---

## 18. Resumo — faltando / conferir no projeto (`E:\biblia`)

| Prioridade | Arquivo | O que falta / conferir | Linhas (proj, aprox.) |
|---|---|---|---:|
| Alta | `script/concordancia-optimizada.js` | Traduzir `searchTerm`/`searchLower` (params/locais) para PT | 78,346,608,609,776-778 + usos |
| Alta | `script/gerenciador_concordancia.js` | Traduzir `searchGlobal`, `searchUltraFast`, `searchTerm`/`searchLower`; alinhar `.search()` do índice | 146-161,176-195,198-254 |
| Média | `script/gerenciador_concordancia_novo.js` | Traduzir `searchTerm`/`searchLower` | 92-128,146-160 |
| Média | `script/dicionario.js` | Traduzir param `searchTerm` em `handleSearch` | 284-285 |
| Média | `script/concordancia-busca-indexada.js` | Opcional: `SearchIndex` → PT; garantir consistência do método (`pronto` vs `isReady`, `search` vs `buscar`) | 5,126,131 |
| Média | `css/menu_dicionarioconcordancia.css` (+ HTML/JS) | `.loading-conteiner` → nome 100% PT; revisar `.marca-dagua-imagem` duplicada | 346,360,432 |
| Baixa | `css/dicionario.css` | Decidir se `.loading` (estado) permanece EN por convenção | 346 |
| Baixa | `css/biblia_realizabuscateste.css` | Confirmar renomeio de `#search-overlay-content`/`.loaded`; padronizar `container` vs `conteiner` | 10,25,32,66 (ref) |
| Baixa | `script/versoes_realizabusca.js` | Chaves `searchIndex_`/store `searchIndexes` (EN) — migrar só com plano | 88,188,189,196,197,223,224 |
| Baixa | `.kilo/worktrees/*` | Limpar resquícios EN se essas cópias forem usadas | vários |

---

## 19. Checklist de validação (após ajustes)

1. `git`/busca: `\.search-overlay|searchTerm\b|searchEngine\b|searchIndex\b|\.content\b|\.overlay\b|\.watermark\b|\.loading-spinner\b` em `css,html,script` ativos.
2. Testar: busca bíblia, concordância (indexada/otimizada), dicionário, menus e overlays.
3. Manter **tags HTML, pseudo-classes/elementos e estados** conforme `termos que nao podem ser traduzidos.md`.
4. Atualizar este arquivo após cada rodada de correção.

---

*Gerado em 2026-11-05 com base em comparação por padrões/linhas entre `E:\biblia` e `E:\bibliacomparar`. Linhas podem deslocar após edições.*
---

## 20. Lista consolidada (formato solicitado)

| Arquivo | Termo (E:\bibliacomparar) | Termo (projeto E:\biblia) | Linha (ref / proj) |
|---|---|---|---|
| `css/biblia_realizabuscateste.css` | `#search-overlay-content` | `#busca-sobreposicao-conteudo` | 10 / — *(verificar no proj; proj tem `#busca-progresso-*`)* |
| `css/biblia_realizabuscateste.css` | `#search-overlay-content.loaded` | `.carregado` (equivalente) | 25 / — |
| `css/biblia_realizabuscateste.css` | `#search-overlay-content h2` | equivalente PT | 32 / — |
| `css/biblia_realizabuscateste.css` | `#search-overlay-progress-bar-inner` | `#busca-progresso-barra-interna` | 44 / 44 |
| `css/biblia_realizabuscateste.css` | `#search-overlay-progress-bar-outer` | `#busca-progresso-barra-externa` | 55 / 55 |
| `css/biblia_realizabuscateste.css` | `#search-overlay-progress-conteiner` | `#busca-progresso-container` | 66 / 66 *(grafia difere: conteiner/container)* |
| `css/biblia_realizabuscateste.css` | `#search-overlay-progress-text` | `#busca-progresso-texto` | 74 / 74 |
| `css/biblia_realizabuscateste.css` | `#search-overlay-resultados-conteiner` | `#busca-resultados-conteiner` | 83 / 83 |
| `css/biblia_realizabuscateste.css` | `.search-overlay-botao-fechar` | `.busca-botao-fechar` | 92 / 92 |
| `css/biblia_realizabuscateste.css` | `.search-overlay-resultado-item` (+ `span`, `strong a`, `:hover`) | `.busca-resultado-item` (+ variantes) | 108,117,126,140 / 108,117,126,140 |
| `css/biblia_realizabuscateste.css` | `#marcadagua` | — *(proj usa outros IDs/classes de marca d’água por contexto)* | 148 / — |
| `css/concordancia.css` | `.palavra-section` | `.palavra-secao` / uso de `.item-palavra` (conferir paridade) | 312,329 / 312-330 (bloco) |
| `css/concordancia.css` | `.palavra-item` | `.item-palavra` | 313,330,865 / 313,330,898 |
| `css/concordancia.css` | `.palavra-header` | `.cabecalho-palavra` | 339,358,493,494 / 339,358,493,494 |
| `css/concordancia.css` | `.expand-indicator` | `.indicador-expansao` | 386,402 / 386,402 |
| `css/concordancia.css` | `.ocorrencias-count` | `.contador-ocorrencias` | 411,439 / 411,439 *(proj também 312,329)* |
| `css/concordancia.css` | `.palavra-fonte-info` | `.info-fonte-palavra-esquerda` | 447,493,503,514,947 / 447,493,503,514,980 |
| `css/concordancia.css` | `.fonte-info` | `.info-fonte` | 448,494,504,516,949 / 448,494,504,516,982 |
| `css/concordancia.css` | `.concordancias-content` | `.conteudo-concordancias` | 525,539,873 / 525,539,906 |
| `css/concordancia.css` | `.livro-header` | `.cabecalho-livro` | 571 / 604 |
| `css/concordancia.css` | `.referenciaConcordancia` | `.referencia-concordancia` | 617 / 650 |
| `css/concordancia.css` | `#busca-status .loading-spinner` / `.loading-spinner` | `#busca-status .carregamento-spinner` / `.carregamento-spinner` | 822,881 / 855,914 |
| `css/concordancia.css` | `#busca-progress` | `#busca-progresso` | 847 / 880 |
| `css/cursos.css` | `.content` | `.conteudo` | 22 / 22 |
| `css/cursos.css` | `.watermark` | `.marca-dagua-cursos` | 99 / 99 |
| `css/dicionario.css` | `.btn-buscar` (+ `:hover`, `:active`) | `.botao-buscar` (+ `:hover`, `:active`) | 226,247,257 / 226,247,257 |
| `css/dicionario.css` | `#dicionario-resultados.loading` | `#dicionario-resultados.loading` *(estado mantido)* | 346 / 346 |
| `css/harpa_cantor.css` | `.overlay` | `.sobreposicao` | 79 / 79 |
| `css/menu_dicionarioconcordancia.css` | `.loading-spinner` | `.carregamento-spinner` | 370 / 370 |
| `css/menu_dicionarioconcordancia.css` | `.loading-conteiner` (+ `p`) | `.loading-conteiner` (+ `p`) *(misto, pendente padronização)* | 346,360 / 346,360 |
| `css/menu_dicionarioconcordancia.css` | `.marca-dagua-imagem` | `.marca-dagua-imagem-dicionario-concordancia` / `.marca-dagua-imagem` (genérica) | 412 / 412,432 |
| `css/modo_leitura.css` | `.verse-section-title` | `.titulo-secao-versiculo` | 170 / 170 |
| `css/slide_biblia.css` | `#versiculo-conteiner strong.section-title` | `#versiculo-conteiner strong.titulo-secao` | 201 / 201 |
| `css/slide_biblia.css` | `#marcadagua` | `#marca-dagua-*-slide` (por contexto, ex. harpacantor/slide) | 219 / *(ver CSS/JS de slide no proj)* |
| `css/versoes.css` | `.marca-dagua-imagem` (uso genérico) | `.marca-dagua-imagem-versoes` / `.marca-dagua-imagem` | 397 / 423,443 |
| `html/cursos.html` | `class="content"` | `class="conteudo"` | 613 / *(confirmar no proj)* |
| `html/cursos.html` | `class="watermark"` | `class="marca-dagua-cursos"` | 615 / *(confirmar no proj)* |
| `html/harpa_cantor.html` | `class="overlay"` | `class="sobreposicao"` | 33 / *(confirmar no proj)* |
| `html/menu_dicionarioconcordancia.html` | `class="custom-select"` | `class="select-personalizado"` *(proj ativo usa PT; verificar)* | 155,177 / — |
| `html/menu_dicionarioconcordancia.html` | `id="busca-global"` | `id="busca-global"` *(PT, igual sentido)* | 195 / — |
| `html/menu_dicionarioconcordancia.html` | `class="loading-conteiner"` | `class="loading-conteiner"` *(misto, pendente)* | 211 / — |
| `html/menu_dicionarioconcordancia.html` | `class="loading-spinner"` | `class="carregamento-spinner"` | 213 / — |
| `html/menu_dicionarioconcordancia.html` | `class="btn-carregar-mais"` | `class="botao-carregar-mais"` | 221 / — |
| `script/biblia_realizabusca.js` | `id="marcadagua"`, `../script/marcadagua.js` | injeta `#marca-dagua-busca` / `marcadagua.js` (nome arquivo mantido) | 39,40 / *(ver proj)* |
| `script/concordancia-busca-indexada.js` | `class SearchIndex` | `class SearchIndex` *(EN mantido)* | 5 / 5 |
| `script/concordancia-busca-indexada.js` | `isReady()` | `pronto()` | 126 / 126 |
| `script/concordancia-busca-indexada.js` | `window.searchIndex = new SearchIndex()` | `window.indiceBusca = new SearchIndex()` | 131 / 131 |
| `script/concordancia-optimizada.js` | `this.searchTerm` | `this.termoBusca` | 16,80,218,314,349,369,756,829,842 / 16,80,218,314,349,369,756,829,842 |
| `script/concordancia-optimizada.js` | `searchTerm` (param/local) | `searchTerm` *(pendente traduzir)* | 78,346,608,776-778 / 78,346,608,776-778 |
| `script/concordancia-optimizada.js` | `searchInAllFiles(searchTerm)` | `buscarEmTodosArquivos(searchTerm)` | 380,608 / 380,608 |
| `script/concordancia-optimizada.js` | `searchLower` (local) | `searchLower` *(pendente traduzir)* | 609 (+ usos) / 609 (+ usos) |
| `script/concordancia-optimizada.js` | `window.dataManager.searchPriority(...)` | `window.dataManager.buscarPrioridade(...)` | 616 / 616 |
| `script/dicionario.js` | `this.itemsPerPage` | `this.itensPorPagina` | 14,194-196,247-248 / 14,194-196,247-248 |
| `script/dicionario.js` | `handleSearch(searchTerm)` | `handleSearch(searchTerm)` *(param pendente)* | 284-285 / 284-285 |
| `script/gerenciador_concordancia.js` | `this.itemsPerPage` | `this.itensPorPagina` | 17,88-89 / 17,88-89 |
| `script/gerenciador_concordancia.js` | `this.searchIndex` / `window.searchIndex` | `this.indiceBusca` / `window.indiceBusca` | 21,150,182-183,205,208 / 21,150,182-183,205,208 |
| `script/gerenciador_concordancia.js` | `.isReady()` | `.pronto()` | 150,182,205 / 150,182,205 |
| `script/gerenciador_concordancia.js` | `searchGlobal(searchTerm)` | `searchGlobal(searchTerm)` *(pendente)* | 146,151,194,253 / 146,151,194,253 |
| `script/gerenciador_concordancia.js` | `searchUltraFast(searchTerm)` | `searchUltraFast(searchTerm)` *(pendente)* | 151,176 / 151,176 |
| `script/gerenciador_concordancia.js` | `searchPriority(searchTerm)` | `buscarPrioridade(searchTerm)` | 198 / 198 |
| `script/gerenciador_concordancia.js` | `searchTerm` / `searchLower` | `searchTerm` / `searchLower` *(pendente)* | múltiplas / múltiplas |
| `script/gerenciador_concordancia_novo.js` | `this.itemsPerPage` | `this.itensPorPagina` | 12,69-70 / 12,69-70 |
| `script/gerenciador_concordancia_novo.js` | `this.searchCache` | `this.cacheBusca` | 16,96-97,127 / 16,96-97,127 |
| `script/gerenciador_concordancia_novo.js` | `searchPriority(searchTerm)` | `buscarPrioridade(searchTerm)` | 92 / 92 |
| `script/gerenciador_concordancia_novo.js` | `searchTerm` / `searchLower` | `searchTerm` / `searchLower` *(pendente)* | 92-93,101,111,146-152 / 92-93,101,111,146-152 |
| `script/marcadagua.js` | `marcadaguaConteiner`, `.marcadagua` | `marcaDaguaConteiner`, `.marca-dagua-biblia` | 12-13,18-19 / 12-13,18-19 |
| `script/marcadagua.js` | `img.src = '../img/biblia.png'` | `img.src = '../img/biblia.png'` *(igual)* | 15 / 15 |
| `script/marcadagua.js` | `img.classList.add('marca-dagua-imagem')` | `img.classList.add('marca-dagua-imagem')` *(igual)* | 17 / 17 |
| `script/menu_dicionarioconcordancia.js` | `window.searchIndex` / `buildIndex()` | `window.indiceBusca` / `buildIndex()` | 88-89 / 88-89 |
| `script/sobre.js` | `recriarMarcaDagua()` / `adicionarMarcaDaguaSobre()` | `recriarMarcaDagua()` / `adicionarMarcaDaguaSobre()` *(nomes alinhados; vars internas diferem)* | 9,33 / 9,33 |
| `script/sobre.js` | `marcadagua`, `.marcadagua`, `.marcadagua-sobre` | `marcaDagua`, `.marca-dagua-sobre`, `.marca-dagua-sobre-tela` | 14,17-19,23,26-27,38,41-43,45,47-49,124,129 / *(ver proj: nomes PT)* |
| `script/versoes_realizabusca.js` | `window.searchEngine` | `window.mecanismoBusca` | 16,78,83,86,93,165-167,170,172,204-205,239,262,265,303 / 16,78,83,86,93,165-167,170,172,204-205,239,262,265,303 |
| `script/versoes_realizabusca.js` | `invertedIndex` / `newInvertedIndex` | `indiceInvertido` / `newIndiceInvertido` | 17,99,158-159,165,262,265 / 17,99,158-159,165,262,265 |
| `script/versoes_realizabusca.js` | `isReady` | `pronto` | 20,78,83,86,93,172,239 / 20,78,83,86,93,172,239 |
| `script/versoes_realizabusca.js` | cache/store: `searchIndex_` / `searchIndexes` | cache/store: `searchIndex_` / `searchIndexes` *(EN mantido — impacto migração)* | 88,188-189,196-197,223-224 / 88,188-189,196-197,223-224 |
| `script/versoes.js` | `window.searchEngine` / `.isReady` | `window.mecanismoBusca` / `.pronto` | 206 / 206 |
| `script/versoes.js` | `#search-overlay` (cria/consulta) | `#search-overlay` / fluxo overlay *(alinhar com CSS `#busca-*` se aplicável)* | 160,194,199 / 160,194,199 *(proj usa `#busca-conteudo` em ~240,257,277,388,450 — **mismatch com** `#busca-sobreposicao-conteudo`)* |

---

## 21. Marca d'água — arquivos carregados por html/versoes.html (ref. E:\bibliacomparar → proj. E:\biblia)

Arquivos considerados: ../css/versoes.css, ../css/modo_leitura.css, ../script/marcadagua.js, ../script/livros_capitulos.js, ../script/sobre.js, ../script/dropdown.js, ../script/biblia-navegacao.js, ../script/versoes_realizabusca.js, ../script/versoes.js.

| Arquivo | Termo (E:\bibliacomparar) | Termo (projeto E:\biblia) | Linha (ref / proj) |
|---|---|---|---:|
| `css/versoes.css` | `.marca-dagua-imagem` | `.marca-dagua-imagem-versoes` *(específico)* e `.marca-dagua-imagem` *(genérico mantido)* | 397 / 423, 443 |
| `css/modo_leitura.css` | — | — | — |
| `script/marcadagua.js` | `marcadaguaConteiner` | `marcaDaguaConteiner` | 12 / 12 |
| `script/marcadagua.js` | `.marcadagua` (container) | `.marca-dagua-biblia` | 13 / 13 |
| `script/marcadagua.js` | uso da var `marcadaguaConteiner` (append/publish) | uso da var `marcaDaguaConteiner` | 18, 19 / 19, 20 *(linhas deslocadas)* |
| `script/marcadagua.js` | `.marca-dagua-imagem` (classe da `<img>`) | `.marca-dagua-imagem` *(sem alteração)* | 17 / 17 |
| `script/marcadagua.js` | `../img/biblia.png` | `../img/biblia.png` *(sem alteração)* | 15 / 15 |
| `script/livros_capitulos.js` | — | — | — |
| `script/sobre.js` | `marcadagua` (var, conteúdo principal) | `marcaDagua` | 14,17,18,19,26,27 / 14,17,18,19,26,27 |
| `script/sobre.js` | `.marcadagua` (container) | `.marca-dagua-sobre` | 14,19,124 / 14,19,124 |
| `script/sobre.js` | `marcadagua` (var, seção "Sobre") | `marcaDaguaSobre` | 38,41,42,43,48,49 / 38,41,42,43,48,49 |
| `script/sobre.js` | `.marcadagua-sobre` | `.marca-dagua-sobre-tela` | 38,43 / 38,43 |
| `script/sobre.js` | `.marca-dagua-imagem` (classe da `<img>`) | `.marca-dagua-imagem` *(sem alteração)* | 23,47 / 23,47 |
| `script/sobre.js` | `recriarMarcaDagua()` / `adicionarMarcaDaguaSobre()` | `recriarMarcaDagua()` / `adicionarMarcaDaguaSobre()` *(nomes mantidos)* | 9,33,83,129 / 9,33,83,129 |
| `script/sobre.js` | `../img/biblia.png` | `../img/biblia.png` *(sem alteração)* | 21,45 / 21,45 |
| `script/dropdown.js` | — | — | — |
| `script/biblia-navegacao.js` | — | — | — |
| `script/versoes_realizabusca.js` | — | — | — |
| `script/versoes.js` | — *(nenhum termo de marca d’água; há `#search-overlay`/`biblia.png` em outros contextos)* | — | — |

**Nota:** o nome do arquivo `script/marcadagua.js` **não foi alterado**. Verificar em `css/versoes.css` se existe regra para o container `.marca-dagua-biblia` (o JS aplica essa classe em `.conteudo`); o projeto define `.marca-dagua-imagem-versoes`/`.marca-dagua-imagem`, mas a presença de `.marca-dagua-biblia` deve ser confirmada.

---

## 22. Comparação .conteudo e marca d'água — ersoes.html, ersoes.css, ersoes.js, marcadagua.js (ref. vs proj.)

### 22.1 Seletor .conteudo / section.conteudo / classes relacionadas

| Arquivo | E:\bibliacomparar (termo / contexto) | Linha (ref) | E:\biblia (projeto) | Linha (proj) | Diferença |
|---|---|---:|---|---:|---|
| `html/versoes.html` | `<ul class="conteudo-menu-suspenso" ...>` | 66, 70 | `<ul class="conteudo-menu-suspenso" ...>` | 65, 69 | Igual (linhas deslocadas) |
| `html/versoes.html` | `<section class="conteudo">` | 154 | `<section class="conteudo">` | 153 | Igual |
| `html/versoes.html` | *(marca d’água comentada)* `<div class="marcadagua">` | 156 | `<div class="marca-dagua-imagem-versoes">` (comentado) | 155 | Termo de marca d’água mudou |
| `html/versoes.html` | `<script src="../script/marcadagua.js">` | 167 | `<script src="../script/marcadagua.js">` | 166 | Igual |
| `css/versoes.css` | `.conteudo-menu-suspenso` (+ hover em `.meu-suspenso`, `li a`, `:hover`) | 224,240,248,259 | `.conteudo-menu-suspenso` (+ hover em `.menu-suspenso` e `.meu-suspenso`, `li a`, `:hover`) | 233,249,253,261,272 | Projeto adiciona regra para `.menu-suspenso:hover .conteudo-menu-suspenso` |
| `css/versoes.css` | `.conteudo {` | 338 | `.conteudo {` | 364 | Igual (linhas deslocadas) |
| `css/versoes.css` | `.conteudo::-webkit-scrollbar/-track/-thumb` | 352,356,360 | `.conteudo::-webkit-scrollbar/-track/-thumb` | 378,382,386 | Igual |
| `css/versoes.css` | `.conteudo-sobre` | 595 | `.conteudo-sobre` | 635 | Igual |
| `css/versoes.css` | `.conteudo-versiculos` | 749 | `.conteudo-versiculos` | 789 | Igual |
| `css/versoes.css` | `.conteudo` (regra responsiva/bloco final) | 991 | `.conteudo` | 1031 | Igual |
| `script/versoes.js` | `document.querySelector('.conteudo-versiculos')` | 64 | `document.querySelector('.conteudo-versiculos')` | 64 | Igual |
| `script/marcadagua.js` | `document.querySelector('.conteudo')` (alvo da marca d’água) | 11 | `document.querySelector('.conteudo')` | 11 | Igual |

### 22.2 Termos de marca d’água nesses arquivos (impacto dentro de .conteudo)

| Arquivo | E:\bibliacomparar | Linha (ref) | E:\biblia | Linha (proj) |
|---|---|---:|---|---:|
| `css/versoes.css` | `.marca-dagua-imagem` | 397 | `.marca-dagua-versoes` *(definido 2x)* | 423, 443 |
| `script/marcadagua.js` | `marcadaguaConteiner` / `classList.add('marcadagua')` | 12, 13 | `marcaDaguaContainer` / `classList.add('marca-dagua-biblia')` | 12, 13 |
| `script/marcadagua.js` | `img.classList.add('marca-dagua-imagem')` | 17 | `img.classList.add('marca-dagua-versoes')` | 17 |
| `script/marcadagua.js` | `appendChild/publish` | 18, 19 | `appendChild/publish` | 19, 20 |

**Conclusão:** o seletor `.conteudo` está consistente entre referência e projeto nesses 4 arquivos. Mudanças relevantes estão nos **termos de marca d’água** (container/imagem); confirmar se `css/versoes.css` estiliza `.marca-dagua-biblia` e revisar duplicidade/escopo de `.marca-dagua-versoes`.





Comparação do seletor .conteudo (e usos diretos) — E:\bibliacomparar vs E:\biblia
Arquivo	E:\bibliacomparar (termo / contexto)	Linha (ref)	E:\biblia (projeto)	Linha (proj)	Diferença
html/versoes.html	<ul class="conteudo-menu-suspenso" ...>	66, 70	<ul class="conteudo-menu-suspenso" ...>	65, 69	Igual (linhas deslocadas)
html/versoes.html	<section class="conteudo">	154	<section class="conteudo">	153	Igual
html/versoes.html	(marca d’água comentada) <div class="marcadagua">	156	<div class="marca-dagua-imagem-versoes"> (comentado)	155	Termo de marca d’água mudou
html/versoes.html	<script src="../script/marcadagua.js">	167	<script src="../script/marcadagua.js">	166	Igual
css/versoes.css	.conteudo-menu-suspenso (+ hover em .meu-suspenso, li a, :hover)	224,240,248,259	.conteudo-menu-suspenso (+ hover em .menu-suspenso e .meu-suspenso, li a, :hover)	233,249,253,261,272	Projeto adiciona regra para .menu-suspenso:hover .conteudo-menu-suspenso (253); ref. só .meu-suspenso no trecho equivalente
css/versoes.css	.conteudo {	338	.conteudo {	364	Igual (linhas deslocadas)
css/versoes.css	.conteudo::-webkit-scrollbar/-track/-thumb	352,356,360	.conteudo::-webkit-scrollbar/-track/-thumb	378,382,386	Igual
css/versoes.css	.conteudo-sobre	595	.conteudo-sobre	635	Igual
css/versoes.css	.conteudo-versiculos	749	.conteudo-versiculos	789	Igual
css/versoes.css	.conteudo (regra responsiva/bloco final)	991	.conteudo	1031	Igual
script/versoes.js	document.querySelector('.conteudo-versiculos')	64	document.querySelector('.conteudo-versiculos')	64	Igual
script/marcadagua.js	document.querySelector('.conteudo') (alvo da marca d’água)	11	document.querySelector('.conteudo')	11	Igual
Termos de marca d’água nesses mesmos arquivos (afetam renderização dentro de .conteudo)
Arquivo	E:\bibliacomparar	Linha (ref)	E:\biblia	Linha (proj)
css/versoes.css	.marca-dagua-imagem	397	.marca-dagua-versoes (definido 2x)	423, 443
script/marcadagua.js	marcadaguaConteiner / classList.add('marcadagua')	12, 13	marcaDaguaContainer / classList.add('marca-dagua-biblia')	12, 13
script/marcadagua.js	img.classList.add('marca-dagua-imagem')	17	img.classList.add('marca-dagua-versoes')	17
script/marcadagua.js	appendChild/publish	18, 19	appendChild/publish	19, 20
Conclusão sobre .conteudo: o seletor .conteudo (e o alvo section.conteudo / querySelector('.conteudo')) está consistente entre bibliacomparar e o projeto nesses 4 arquivos. O que mudou foi o conteúdo injetado da marca d’água (nomes de container/classe da imagem) — se css/versoes.css não tiver estilo para o container .marca-dagua-biblia (ou se houver conflito/duplicidade em .marca-dagua-versoes), isso pode afetar o layout/visual dentro de .conteudo, sem ser conflito do seletor .conteudo em si.
---

## 23. Análise — Dicionário e Concordância (menu_dicionarioconcordancia.html e arquivos carregados)

**Página:** html/menu_dicionarioconcordancia.html  
**CSS carregados:** ../css/menu_dicionarioconcordancia.css, ../css/concordancia.css, ../css/dicionario.css  
**Scripts carregados (proj.):** ../script/gerenciador_concordancia_novo.js, ../script/concordancia-optimizada.js, ../script/dicionario.js, ../script/marcadagua.js, ../script/menu_dicionarioconcordancia.js

### 23.1 html/menu_dicionarioconcordancia.html (diff ref. → proj.)

| Elemento / termo | E:\bibliacomparar | Linha (ref) | E:\biblia | Linha (proj) | Situação |
|---|---|---:|---|---:|---|
| Container de filtros | class="filtros-conteiner" | 139 | class="filtros-container" | 139 | Traduzido/grafia ajustada no proj. |
| Select custom (testamento) | class="custom-select" / id="custom-testamento-select" | 155 | class="select-personalizado" | 155 | Traduzido |
| Opção selecionada | class="select-selected" | 157 | class="opcao-selecionada" | 157 | Traduzido |
| Lista de opções | class="select-items select-hide" | 159 | class="opcoes-seletor seletor-oculto" | 159 | Traduzido |
| Select custom (livro) | class="custom-select" | 177 | class="select-personalizado" | 177 | Traduzido |
| Opção selecionada (livro) | class="select-selected" | 179 | class="opcao-selecionada" | 179 | Traduzido |
| Lista (livro) | class="select-items select-hide" | 181 | class="opcoes-seletor seletor-oculto" | 181 | Traduzido |
| Botão consultar | id="btn-buscar" class="search-btn" | 203 | id="botao-buscar" class="botao-busca" | 203 | Traduzido (**validar JS que referencie ID/classe antigos**) |
| Spinner | class="loading-spinner" | 213 | class="carregamento-spinner" | 213 | Traduzido |
| Container contador | class="contador-conteiner" | 219 | class="contador-container" | 219 | Traduzido/grafia ajustada |
| Botão carregar mais | class="btn-carregar-mais" | 221 | class="botao-carregar-mais" | 221 | Traduzido |
| Container resultados | id="resultados-conteiner" | 227 | id="resultados-container" | 227 | Traduzido/grafia ajustada (**validar JS/CSS**) |
| Marca d’água (comentada) | class="marcadagua" | 311 | class="marca-dagua-imagem-dicionario-concordancia" | 311 | Contextualizado no proj. |
| Loading container | class="loading-conteiner" | 211 | class="loading-conteiner" | 211 | **Pendente padronização PT** (misto) |

### 23.2 css/menu_dicionarioconcordancia.css

| Termo | E:\bibliacomparar | Linha (ref) | E:\biblia | Linha (proj) | Situação |
|---|---|---:|---|---:|---|
| .loading-conteiner (+ p) | .loading-conteiner | 346, 360 | .loading-conteiner | 346, 360 | **Misto PT/EN — pendente** |
| .loading-spinner | .loading-spinner | 370 | .carregamento-spinner *(ref. usa spinner; proj. mostra regra PT em outro ponto? ver arquivo — ausência de .loading-spinner no trecho listado)* | 370 (ref) | **Conferir no proj.:** há .carregamento-spinner estilizado? ref. define .loading-spinner aqui. |
| Marca d’água | .marca-dagua-imagem | 412 | .marca-dagua-imagem-dicionario-concordancia e .marca-dagua-imagem | 412, 432 | Proj. contextualiza + mantém genérica |
| Container/área comum | .conteiner, #conteudo-principal, .menu-*, .secao-*, .sobre-conteiner | múltiplas | similares | múltiplas | Maioria estável; revisar seções/linhas deslocadas |

**⚠️ Crítico (marca d’água nesta página):** script/marcadagua.js (carregado pelo menu) aplica classList.add('marca-dagua-biblia') no container e img.classList.add('marca-dagua-versoes') (proj., ver §22). menu_dicionarioconcordancia.css **não** define .marca-dagua-biblia nem .marca-dagua-versoes (define .marca-dagua-imagem-dicionario-concordancia e .marca-dagua-imagem). Isso pode causar **imagem/overlay da marca d’água sem estilo correto** na página de dicionário/concordância. **Ação:** alinhar classes aplicadas pelo JS com as regras do CSS desta página (ou tornar o CSS compatível com as classes atuais do JS, mantendo consistência entre páginas).

### 23.3 css/concordancia.css

| Termo (ref. EN/legado → proj. PT) | E:\bibliacomparar | Linha (ref) | E:\biblia | Linha (proj) | Situação |
|---|---|---:|---|---:|---|
| Filtros | .filtros-conteiner | 12, 913 | .filtros-container | 12, 946 | Traduzido/grafia |
| Select | .custom-select, .select-selected*, .select-items*, .select-hide | 160,168,187,201,208,217,236,249,257,264 | .select-personalizado, .opcao-selecionada*, .opcoes-seletor*, .seletor-oculto | 160,168,187,201,208,217,236,249,257,264 | Traduzido |
| Botão busca | .search-btn | 280,304,725? (ref. varia) | .botao-busca | 280,304,973 | Traduzido |
| Itens/palavras | .palavra-section, .palavra-item, .palavra-header, .expand-indicator, .ocorrencias-count, .palavra-fonte-info, .fonte-info | 312,313,329,330,339,358,386,402,411,439,447,448,493,494,503,504,514,516,865,947,949 | .cabecalho-palavra, .indicador-expansao, .contador-ocorrencias, .item-palavra, .info-fonte-palavra-esquerda, .info-fonte, .conteudo-concordancias etc. | 312,313,329,330,339,358,386,402,411,439,447,448,493,494,503,504,514,516,898,906,980,982 | Traduzido (estrutura parcialmente diferente — conferir .palavra-secao vs .item-palavra) |
| Conteúdo/refs | .concordancias-content, .livro-header, .referenciaConcordancia | 525,539,571,617,873 | .conteudo-concordancias, .cabecalho-livro, .referencia-concordancia | 525,539,604,650,906 | Traduzido |
| Paginação/contador | .btn-paginacao, .btn-carregar-mais, .contador-conteiner | (ref. concordanciaerro.css mostra 526,533,577; ref. ativo varia) | .botao-paginacao, .botao-carregar-mais, .contador-container | 754,761,805,823,833,722,741,992,1008 | Traduzido |
| Loading/progresso | #busca-status .loading-spinner, .loading-spinner, #busca-progress | 822,847,881 | #busca-status .carregamento-spinner, .carregamento-spinner, #busca-progresso | 855,880,914 | Traduzido |

**Ação:** varrer ativos por .concordancias-content|.palavra-header|.expand-indicator|\.referenciaConcordancia\b|#busca-progress\b|\.loading-spinner\b|\.search-btn\b|\.custom-select\b|\.select-selected\b|\.select-items\b para garantir que HTML/JS da concordância não usem nomes antigos.

### 23.4 css/dicionario.css

| Termo | E:\bibliacomparar | Linha (ref) | E:\biblia | Linha (proj) | Situação |
|---|---|---:|---|---:|---|
| Busca | .btn-buscar (+ :hover, :active) | 226,247,257 | .botao-buscar | 226,247,257 | Traduzido |
| Estado loading | #dicionario-resultados.loading | 346 | #dicionario-resultados.loading | 346 | Estado mantido (aceitável) |
| Demais | .dicionario-*, #sugestoes-conteiner, #btn-anterior/proximo-dicionario, .definicao-*, .termo-* | múltiplas | iguais/similares | múltiplas | Estável (grafia conteiner mantida em partes) |

### 23.5 Scripts carregados — estado ref. vs proj. (foco dicionário/concordância)

| Arquivo | Item | E:\bibliacomparar | Linha (ref) | E:\biblia | Linha (proj) | Situação |
|---|---|---|---:|---|---:|---|
| script/marcadagua.js | Alvo | .conteudo | 11 | .conteudo | 11 | Igual |
| script/marcadagua.js | Container/var | marcadaguaConteiner / .marcadagua | 12,13 | marcaDaguaContainer / .marca-dagua-biblia | 12,13 | Traduzido |
| script/marcadagua.js | Classe <img> | .marca-dagua-imagem | 17 | .marca-dagua-versoes | 17 | **Mudou; conflita com expectativa de CSS por página** (ver 23.2) |
| script/gerenciador_concordancia_novo.js | Paginação/cache | itemsPerPage, searchCache | 12,16,69,70,96,97,127 | itensPorPagina, cacheBusca | 12,16,69,70,96,97,127 | Traduzido |
| script/gerenciador_concordancia_novo.js | Busca | searchPriority(searchTerm), searchLower, _searchFallback(searchLower) | 92,93,146,148 | uscarPrioridade(searchTerm), searchLower/params EN em partes | 92,93,146,148 | **Parcial** (params/locais EN) |
| script/concordancia-optimizada.js | Estado/método | 	his.searchTerm, searchInAllFiles, searchPriority | 16,380,608,616 | 	his.termoBusca, uscarEmTodosArquivos, uscarPrioridade | 16,380,608,616 | Traduzido (core) |
| script/concordancia-optimizada.js | Params/locais | searchTerm, searchLower | 78,346,608,609,776-778 | searchTerm, searchLower | 78,346,608,609,776-778 | **Pendente** |
| script/concordancia-optimizada.js | Dropdown selectors | .select-selected, .select-items, .custom-select | 123,124,172,173,191,198,201,248,258,488,489 | .opcao-selecionada, .opcoes-seletor, .select-personalizado | 123,124,172,173,191,198,201,248,258,488,489 | Traduzido (alinhado ao HTML do proj.) |
| script/dicionario.js | Paginação | itemsPerPage | 14,194-196,247-248 | itensPorPagina | 14,194-196,247-248 | Traduzido |
| script/dicionario.js | Busca | handleSearch(searchTerm) | 284-285 | handleSearch(searchTerm) | 284-285 | **Param pendente** |
| script/dicionario.js | UI loading | HTML injeta .loading-conteiner + .loading-spinner (ref.) | 88,266 | injeta .loading-conteiner + .loading-spinner? *(conferir)* / CSS do menu tem .loading-conteiner + .carregamento-spinner no HTML do menu | 88,266 / 211,213 (menu) | **Possível mismatch** spinner/container entre JS injetado e CSS/HTML atual |
| script/menu_dicionarioconcordancia.js | Índice global | window.searchIndex | 88-89 | window.indiceBusca | 88-89 | Traduzido |

### 23.6 Scripts relacionados (não carregados pelo menu, mas existem no projeto)

| Arquivo | Observação (ref. → proj.) | Situação |
|---|---|---|
| script/concordancia.js | .select-selected na ref.; proj. usa termos/fluxo PT em partes (ver arquivo). IDs de UI concordância (#btn-buscar, #resultados-conteiner etc.) divergem do HTML atual se usados. | Revisar se ainda é usado; alinhar IDs/seletores ao HTML atual. |
| script/dropdown_concordancia.js | Ref. usa .custom-select/.select-selected/.select-items; proj. deve estar alinhado ao PT se ativo. | Validar uso real. |
| script/dicionario_concordancia.js | Usa 	ermoBusca (PT) em ambos nos trechos vistos; depende de .filtros-conteiner .search-* em ref.? | Validar seletores contra HTML/CSS atuais. |
| script/gerenciador_concordancia.js | itemsPerPage/searchIndex/isReady/searchGlobal/searchUltraFast (ref.) vs itensPorPagina/indiceBusca/pronto/buscarPrioridade parcial (proj.). | **Parcial; não carregado pelo menu** — alinhar se usado por outra página/fluxo. |
| script/concordancia-busca-indexada.js | SearchIndex/isReady/window.searchIndex → SearchIndex/pronto/window.indiceBusca. | **Parcial; não carregado pelo menu** — contrato pronto/search vs isReady conforme consumidores. |

### 23.7 Checklist prioritário (dicionário/concordância)

1. **Marca d’água (menu):** alinhar marcadagua.js (.marca-dagua-biblia, .marca-dagua-versoes) com menu_dicionarioconcordancia.css (ou vice-versa) para a página menu_dicionarioconcordancia.html.
2. **IDs/seletores do HTML atual:** confirmar que JS ativos usam #botao-buscar/.botao-busca, #resultados-container, .filtros-container, .select-personalizado/.opcao-selecionada/.opcoes-seletor, .botao-carregar-mais, #loading-indicator/spinner.
3. **Loading:** padronizar .loading-conteiner → PT (HTML/CSS/JS injetado em dicionario.js) e spinner (.carregamento-spinner vs .loading-spinner).
4. **Concluir tradução de params/locais:** searchTerm/searchLower em concordancia-optimizada.js, gerenciador_concordancia_novo.js, dicionario.js (e módulos relacionados, se usados).
5. **Revalidar:** busca global, filtro por letra, expansão de concordâncias, paginação/carregar mais, dicionário (letra, busca, paginação), e marca d’água em .conteudo.

*Adicionado em 2026-11-05 (análise dicionário/concordância). Linhas podem deslocar após edições.*

---

## 24. Lista consolidada — Dicionário e Concordância (E:\bibliacomparar vs E:\biblia)

Formato: Arquivo | Termo (E:\bibliacomparar) | Termo (projeto E:\biblia) | Linha (ref / proj). Inclui termos diferentes, pendências e pontos críticos (HTML, CSS e JS da página menu_dicionarioconcordancia + scripts relacionados).

### 24.1 html/menu_dicionarioconcordancia.html

| Arquivo | Termo (E:\bibliacomparar) | Termo (projeto E:\biblia) | Linha (ref / proj) |
|---|---|---|---|
| html/menu_dicionarioconcordancia.html | class="filtros-conteiner" | class="filtros-container" | 139 / 139 |
| html/menu_dicionarioconcordancia.html | class="custom-select" (#custom-testamento-select) | class="select-personalizado" | 155 / 155 |
| html/menu_dicionarioconcordancia.html | class="select-selected" data-value="todos" | class="opcao-selecionada" data-value="todos" | 157 / 157 |
| html/menu_dicionarioconcordancia.html | class="select-items select-hide" | class="opcoes-seletor seletor-oculto" | 159 / 159 |
| html/menu_dicionarioconcordancia.html | class="custom-select" (#custom-livro-select) | class="select-personalizado" | 177 / 177 |
| html/menu_dicionarioconcordancia.html | class="select-selected" data-value="todos" (livro) | class="opcao-selecionada" data-value="todos" | 179 / 179 |
| html/menu_dicionarioconcordancia.html | class="select-items select-hide" (livro) | class="opcoes-seletor seletor-oculto" | 181 / 181 |
| html/menu_dicionarioconcordancia.html | id="btn-buscar" class="search-btn" | id="botao-buscar" class="botao-busca" | 203 / 203 |
| html/menu_dicionarioconcordancia.html | class="loading-conteiner" (indicador) | class="loading-conteiner" *(misto, pendente)* | 211 / 211 |
| html/menu_dicionarioconcordancia.html | class="loading-spinner" | class="carregamento-spinner" | 213 / 213 |
| html/menu_dicionarioconcordancia.html | class="contador-conteiner" | class="contador-container" | 219 / 219 |
| html/menu_dicionarioconcordancia.html | class="btn-carregar-mais" | class="botao-carregar-mais" | 221 / 221 |
| html/menu_dicionarioconcordancia.html | id="resultados-conteiner" | id="resultados-container" | 227 / 227 |
| html/menu_dicionarioconcordancia.html | class="marcadagua" (comentado) | class="marca-dagua-imagem-dicionario-concordancia" (comentado) | 311 / 311 |

### 24.2 css/concordancia.css

| Arquivo | Termo (E:\bibliacomparar) | Termo (projeto E:\biblia) | Linha (ref / proj) |
|---|---|---|---|
| css/concordancia.css | .filtros-conteiner | .filtros-container | 12,913 / 12,946 |
| css/concordancia.css | .custom-select | .select-personalizado | 160 / 160 |
| css/concordancia.css | .select-selected (+ :after, .select-arrow-active:after, :hover) | .opcao-selecionada (+ estados) | 168,187,201,208 / 168,187,201,208 |
| css/concordancia.css | .select-items (+ div, :hover, :last-child) | .opcoes-seletor (+ div, :hover, :last-child) | 217,236,249,257 / 217,236,249,257 |
| css/concordancia.css | .select-hide | .seletor-oculto | 264 / 264 |
| css/concordancia.css | .same-as-selected | .igual-ao-selecionado | 271 / 271 |
| css/concordancia.css | .search-btn | .botao-busca | 280,304,940 / 280,304,973 |
| css/concordancia.css | .palavra-section | *(estrutura alterada; proj. usa .item-palavra/blocos PT — conferir paridade)* | 312,329 / — |
| css/concordancia.css | .palavra-item | .item-palavra | 313,330,865 / 313,330,898 |
| css/concordancia.css | .palavra-header | .cabecalho-palavra | 339,358,493,494 / 339,358,493,494 |
| css/concordancia.css | .expand-indicator | .indicador-expansao | 386,402 / 386,402 |
| css/concordancia.css | .ocorrencias-count | .contador-ocorrencias | 411,439 / 411,439 (+312,329) |
| css/concordancia.css | .palavra-fonte-info | .info-fonte-palavra-esquerda | 447,493,503,514,947 / 447,493,503,514,980 |
| css/concordancia.css | .fonte-info | .info-fonte | 448,494,504,516,949 / 448,494,504,516,982 |
| css/concordancia.css | .concordancias-content | .conteudo-concordancias | 525,539,873 / 525,539,906 |
| css/concordancia.css | .livro-header | .cabecalho-livro | 571 / 604 |
| css/concordancia.css | .referenciaConcordancia | .referencia-concordancia | 617 / 650 |
| css/concordancia.css | .contador-conteiner | .contador-container | 689,708,959,975 / 722,741,992,1008 |
| css/concordancia.css | .btn-paginacao | .botao-paginacao | 721,772,790,800 / 754,805,823,833 |
| css/concordancia.css | .btn-carregar-mais | .botao-carregar-mais | 728 / 761 |
| css/concordancia.css | #busca-status .loading-spinner | #busca-status .carregamento-spinner | 822 / 855 |
| css/concordancia.css | #busca-progress | #busca-progresso | 847 / 880 |
| css/concordancia.css | .loading-spinner | .carregamento-spinner | 881 / 914 |
| css/concordancia.css | #resultados-conteiner | #resultados-container | 984 / 1017 |
| css/concordancia.css | .loader / .loader-global-busca (ref.) | .carregando / .carregando-busca-global (proj.) | 760,761 / 793,794 |
| css/concordancia.css | — | .palavra-info, .palavra-detalhes, .erro-mensagem (presentes no proj.) | — / 572,579,591 |

### 24.3 css/dicionario.css

| Arquivo | Termo (E:\bibliacomparar) | Termo (projeto E:\biblia) | Linha (ref / proj) |
|---|---|---|---|
| css/dicionario.css | .btn-buscar | .botao-buscar | 226,247,257 / 226,247,257 |
| css/dicionario.css | #dicionario-resultados.loading | #dicionario-resultados.loading *(estado mantido)* | 346 / 346 |
| css/dicionario.css | .dicionario-conteiner / #sugestoes-conteiner *(grafia conteiner)* | .dicionario-conteiner / #sugestoes-conteiner *(igual, grafia mantida)* | 45,265,285 / 45,265,285 |

### 24.4 css/menu_dicionarioconcordancia.css

| Arquivo | Termo (E:\bibliacomparar) | Termo (projeto E:\biblia) | Linha (ref / proj) |
|---|---|---|---|
| css/menu_dicionarioconcordancia.css | .loading-conteiner (+ p) | .loading-conteiner (+ p) *(misto, pendente)* | 346,360 / 346,360 |
| css/menu_dicionarioconcordancia.css | .loading-spinner | .carregamento-spinner | 370 / 370 |
| css/menu_dicionarioconcordancia.css | .marca-dagua-imagem | .marca-dagua-imagem-dicionario-concordancia | 412 / 412 |
| css/menu_dicionarioconcordancia.css | — | .marca-dagua-imagem *(regra genérica adicional no proj.)* | — / 432 |

### 24.5 script/marcadagua.js (carregado pelo menu)

| Arquivo | Termo (E:\bibliacomparar) | Termo (projeto E:\biblia) | Linha (ref / proj) |
|---|---|---|---|
| script/marcadagua.js | document.querySelector('.conteudo') | document.querySelector('.conteudo') | 11 / 11 |
| script/marcadagua.js | marcadaguaConteiner | marcaDaguaContainer | 12,18,19 / 12,19,20 |
| script/marcadagua.js | classList.add('marcadagua') | classList.add('marca-dagua-biblia') | 13 / 13 |
| script/marcadagua.js | img.classList.add('marca-dagua-imagem') | img.classList.add('marca-dagua-versoes') | 17 / 17 |
| script/marcadagua.js | ../img/biblia.png | ../img/biblia.png | 15 / 15 |

**⚠️** Para a página menu_dicionarioconcordancia.html, o CSS ativo **não** estiliza .marca-dagua-biblia / .marca-dagua-versoes (proj. define .marca-dagua-imagem-dicionario-concordancia, .marca-dagua-imagem). Alinhar JS↔CSS da marca d’água nesta página.

### 24.6 script/gerenciador_concordancia_novo.js (carregado)

| Arquivo | Termo (E:\bibliacomparar) | Termo (projeto E:\biblia) | Linha (ref / proj) |
|---|---|---|---|
| script/gerenciador_concordancia_novo.js | 	his.itemsPerPage | 	his.itensPorPagina | 12,69,70 / 12,69,70 |
| script/gerenciador_concordancia_novo.js | 	his.searchCache / has/get/set | 	his.cacheBusca / has/get/set | 16,96,97,127 / 16,96,97,127 |
| script/gerenciador_concordancia_novo.js | sync searchPriority(searchTerm, filters) | sync buscarPrioridade(searchTerm, filters) | 92 / 92 |
| script/gerenciador_concordancia_novo.js | searchTerm / searchLower (params/locais) | searchTerm / searchLower *(pendente PT)* | 92,93,94,101,111,146,148,152 / 92,93,94,101,111,146,148,152 |

### 24.7 script/concordancia-optimizada.js (carregado)

| Arquivo | Termo (E:\bibliacomparar) | Termo (projeto E:\biblia) | Linha (ref / proj) |
|---|---|---|---|
| script/concordancia-optimizada.js | tnBuscar: document.getElementById('btn-buscar') | tnBuscar: document.getElementById('btn-buscar') *(⚠️ HTML proj. usa id="botao-buscar" — validar binding)* | 43 / 43 |
| script/concordancia-optimizada.js | 	his.searchTerm | 	his.termoBusca | 16,80,218,314,349,369,756,829,842 / 16,80,218,314,349,369,756,829,842 |
| script/concordancia-optimizada.js | searchInAllFiles(searchTerm) | uscarEmTodosArquivos(searchTerm) | 380,608 / 380,608 |
| script/concordancia-optimizada.js | .select-selected / .select-items / .custom-select | .opcao-selecionada / .opcoes-seletor / .select-personalizado | 123,124,172,173,191,198,201,248,258,488,489 / 123,124,172,173,191,198,201,248,258,488,489 |
| script/concordancia-optimizada.js | window.dataManager.searchPriority(...) | window.dataManager.buscarPrioridade(...) | 616 / 616 |
| script/concordancia-optimizada.js | searchTerm / searchLower (params/locais) | searchTerm / searchLower *(pendente PT)* | 78,346,348,608,609,776-778 + usos / 78,346,348,608,609,776-778 + usos |
| script/concordancia-optimizada.js | className = 'btn-carregar-mais' | className = 'botao-carregar-mais' | 833 / 833 |

### 24.8 script/dicionario.js (carregado)

| Arquivo | Termo (E:\bibliacomparar) | Termo (projeto E:\biblia) | Linha (ref / proj) |
|---|---|---|---|
| script/dicionario.js | 	his.itemsPerPage | 	his.itensPorPagina | 14,194,195,196,247,248 / 14,194,195,196,247,248 |
| script/dicionario.js | handleSearch(searchTerm) / 	erm = searchTerm... | handleSearch(searchTerm) / 	erm = searchTerm... *(param pendente)* | 284,285 / 284,285 |
| script/dicionario.js | HTML injeta <div class="loading-conteiner"><div class="loading-spinner"> | HTML injeta <div class="loading-conteiner"><div class="loading-spinner"> *(proj. menu usa .carregamento-spinner; **mismatch** com CSS/HTML atual)* | 88,266 / 88,266 |

### 24.9 script/menu_dicionarioconcordancia.js (carregado)

| Arquivo | Termo (E:\bibliacomparar) | Termo (projeto E:\biblia) | Linha (ref / proj) |
|---|---|---|---|
| script/menu_dicionarioconcordancia.js | window.searchIndex / uildIndex() | window.indiceBusca / uildIndex() | 88,89 / 88,89 |

### 24.10 Scripts relacionados (dicionário/concordância, não carregados pelo menu)

| Arquivo | Termo (E:\bibliacomparar) | Termo (projeto E:\biblia) | Linha (ref / proj) |
|---|---|---|---|
| script/concordancia.js | querySelector('.select-selected') | querySelector('.opcao-selecionada') | 45,46 / 45,46 |
| script/dropdown_concordancia.js | .select-selected / .select-items / .custom-select | .opcao-selecionada / .opcoes-seletor / .select-personalizado | 154,159,167,168,198,199,241,244 / 154,159,167,168,198,199,241,244 |
| script/dicionario_concordancia.js | .filtros-conteiner .search-btn | .filtros-container .botao-busca | 146 / 146 |
| script/gerenciador_concordancia.js | itemsPerPage, searchIndex, isReady, searchGlobal, searchUltraFast, searchPriority | itensPorPagina, indiceBusca, pronto, searchGlobal*, searchUltraFast*, uscarPrioridade (*métodos/params EN parciais) | 17,21,146,150,151,176,182,183,194,198,205,208,253 / 17,21,146,150,151,176,182,183,194,198,205,208,253 |
| script/concordancia-busca-indexada.js | SearchIndex, isReady(), window.searchIndex | SearchIndex, pronto(), window.indiceBusca | 5,126,131 / 5,126,131 |

### 24.11 Prioridades (ação)

1. **Corrigir binding de botão (se aplicável):** concordancia-optimizada.js proj. usa getElementById('btn-buscar') (L43) mas HTML proj. define id="botao-buscar" (L203) — validar e alinhar.
2. **Marca d’água no menu:** alinhar marcadagua.js (.marca-dagua-biblia, .marca-dagua-versoes) com menu_dicionarioconcordancia.css / contexto do dicionário-concordância.
3. **Loading padronizado:** .loading-conteiner → PT em HTML/CSS/JS injetado; unificar .loading-spinner vs .carregamento-spinner (ver dicionario.js L88,266 e HTML L211-213).
4. **Completar tradução JS:** searchTerm/searchLower em concordancia-optimizada.js, gerenciador_concordancia_novo.js, dicionario.js; searchGlobal/searchUltraFast/params em gerenciador_concordancia.js se usado.
5. **Varredura final ativos:** tn-buscar\b, search-btn, esultados-conteiner\b, iltros-conteiner\b, custom-select|select-selected|select-items|select-hide, \.marcadagua\b, loading-spinner em HTML/CSS/JS da página.

---
## 25. Verificação (somente projeto `E:\biblia`): `index.html`, `style.css`, `script.js` e vinculados em `html/versoes.html` (2026-11-07)

**Regra aplicada:** a palavra **`container` não deve ser traduzida** (manter `container` em identificadores; onde houver `conteiner` e for padronizar, preferir `container` somente se atualizar HTML/CSS/JS juntos).

### 25.1 Escopo
- Raiz: `index.html` (L12 → `./style.css`, L60 → `./script.js`), `style.css`, `script.js`.
- Vinculados em `html/versoes.html`: `css/versoes.css`, `css/modo_leitura.css`, `script/marcadagua.js`, `script/livros_capitulos.js`, `script/sobre.js`, `script/dropdown.js`, `script/biblia-navegacao.js`, `script/versoes_realizabusca.js`, `script/versoes.js`.
- Validação: `node --check` OK para `script.js` e scripts vinculados verificados.

### 25.2 `index.html` + `style.css` + `script.js` — inconsistências

| Arquivo | Linha | Atual | Sugestão | Motivo |
|---|---:|---|---|---|
| `style.css` | 260 | `.visible:after` | `.visivel:after` (ou alinhar JS/CSS para o mesmo nome) | `script.js` alterna `visivel` (L187,193); overlay/estado não casa. |
| `style.css` | 293 | `.visible .popup-nova-versao` | `.visivel .popup-nova-versao` | Mesmo estado de `script.js:187,193`. |
| `script.js` | 173 | `document.querySelector('.fechar-boas-vindas')` | `document.querySelector('.fechar-seja-bem-vindo')` | HTML/CSS usam `fechar-seja-bem-vindo` (`index.html:31`, `style.css:230`). |
| `script.js` | 175 | `console.warn("Botão '.fechar-boas-vindas' não encontrado.")` | `console.warn("Botão '.fechar-seja-bem-vindo' não encontrado.")` | Alinhar seletor/mensagem. |

**OK (principais):** IDs/classes batem entre os três (`cabecalho`, `lista-versoes`/`#lista`, `popup-seja-bem-vindo`, `popup-nova-versao`, `abrir-popup`, `fechar-popup`, `arquivo-imagem`, `previsualizacao-imagem`, `novo-botao-imagem`, `novo-titulo-biblia`, `salvar-versao`, `gradiente`). Funções globais usadas no HTML existem (`abrirPopup`, `fecharPopup`, `fecharSejaBemVindo`, `salvarVersao`).

### 25.3 Vinculados em `html/versoes.html` — inconsistências

#### 25.3.1 Dropdown (`script/dropdown.js` × `html/versoes.html`)
| Arquivo | Linha | Atual | Sugestão | Motivo |
|---|---:|---|---|---|
| `script/dropdown.js` | 91 | `querySelectorAll('nav ul li.dropdown > a')` | `querySelectorAll('nav ul li.menu-suspenso > a, nav ul li.meu-suspenso > a')` (ou incluir `.dropdown` como fallback) | `versoes.html` usa `menu-suspenso`/`meu-suspenso` (L63,67), não `dropdown`; eventos podem não anexar. |
| `script/dropdown.js` | 94 | `.conteudo-menu-suspenso` / var `dropdownConteiner` | Seletor OK; **manter `container` não traduzido** em nomes de variáveis. | Conferência. |

#### 25.3.2 “Sobre” / marca d’água (`script/sobre.js` × `css/versoes.css`)
| Arquivo | Linha | Atual | Sugestão | Motivo |
|---|---:|---|---|---|
| `script/sobre.js` | 14,19,124 | `.marca-dagua-sobre` / `add('marca-dagua-sobre')` / `contains('marca-dagua-sobre')` | Criar regras correspondentes em `css/versoes.css` **ou** alinhar com classes já estilizadas/usadas por `marcadagua.js`. | `css/versoes.css` não define `.marca-dagua-sobre*` (define `.conteudo-sobre` L595, `body.sobre-ativo::after` L646). |
| `script/sobre.js` | 38,43 | `.marca-dagua-sobre-tela` / `add('marca-dagua-sobre-tela')` | Idem: alinhar CSS/JS. | Marca d’água da tela “Sobre” pode não estilizar. |
| `script/sobre.js` | 23,47 | `img.classList.add('marca-dagua-imagem')` | Conferir cobertura em `css/versoes.css` (há `.marca-dagua-versoes, .marca-dagua-imagem` após ajustes). | Alinhamento parcial. |
| `script/sobre.js` | 34,58,65,100 | `.conteudo-sobre` | OK | Casa com `css/versoes.css:595`. |
| `script/sobre.js` | 89 | `body.sobre-ativo` | OK | Casa com `css/versoes.css:646`. |
| `script/sobre.js` | 178,181 | `.botao-menu`, `.menu-livros` | `.menu-livros` existe; `.botao-menu` não aparece em `versoes.html`. | Funcionalidade do botão inativa (não quebra). |
| `script/sobre.js` | 153 | `#seletor-versao-principal` | OK | Existe em `versoes.html:35`. |

#### 25.3.3 Navegação/capítulos (`script/biblia-navegacao.js` × `css/versoes.css`)
*(padronizar para **`container`**, não traduzir)*
| Arquivo | Linha | Atual | Sugestão | Motivo |
|---|---:|---|---|---|
| `script/biblia-navegacao.js` | 167,292,332 | `.capitulos-container` / `'capitulos-container'` | Manter **`capitulos-container`** | JS já usa `container`. |
| `script/biblia-navegacao.js` | 235 | aviso `.capitulos-container` | Manter/alinhado ao padrão final. | Mensagem. |
| `css/versoes.css` | 745 | `.capitulos-conteiner` | Trocar para `.capitulos-container`. Se houver legado, usar seletor duplo temporário: `.capitulos-container, .capitulos-conteiner { ... }` | **Regra:** `container` não deve ser traduzido; mismatch com JS. |

#### 25.3.4 Busca/overlay (verificar consistência)
| Arquivo | Linha | Atual | Observação |
|---|---:|---|---|
| `script/versoes.js` | 160,162–165,194,199,208–390,403,411,450 | IDs/classes do overlay: `busca-sobreposicao`, `progresso-*`, `#resultados-busca-conteiner`, `busca-conteudo` (Shadow DOM com estilos inline) | Seletores internos devem casar com o template inline; compatibilização parcial já aplicada. Ao padronizar nomes, **não traduzir `container`**. |
| `css/biblia_realizabuscateste.css` | 10,25,37,46,68,79,131,152 | `#busca-conteudo`, `#busca-progresso-*`, `#busca-resultados-conteiner` | Conferir se JS externo (fora Shadow DOM) referencia esses IDs. |

### 25.4 Ajustes já aplicados nesta sessão (alinhamento parcial)
- `script/marcadagua.js`: sem `window.onload`; classes compatíveis (`marca-dagua-biblia/marcadagua`, `marca-dagua-versoes/marca-dagua-imagem`).
- `script/menu_dicionarioconcordancia.js`: init resiliente; `indiceBusca || searchIndex`.
- `script/concordancia-optimizada.js`: bindings/guards para IDs traduzidos/legado; dropdown compatível.
- `script/versoes.js`: overlay tolera IDs traduzidos/legado de progresso/resultados.
- `css/concordancia.css`, `css/menu_dicionarioconcordancia.css`, `css/versoes.css`: aliases/ajustes para dropdown/spinner/contador/marca d’água.

### 25.5 Conclusão
- **Não está 100% consistente.** Pendências objetivas no escopo: `visible`×`visivel` e `fechar-boas-vindas`×`fechar-seja-bem-vindo` (`index/style/script`); `dropdown`×`menu-suspenso/meu-suspenso` (`dropdown.js`); classes de marca d’água “Sobre” sem CSS correspondente; `capitulos-container` (JS) × `capitulos-conteiner` (CSS) — padronizar com **`container`**. `node --check` OK nos scripts verificados.
