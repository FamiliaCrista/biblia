# MAPA COMPLETO DO SISTEMA DE SLIDE - BÍBLIA

---

## 📁 ESTRUTURA DE ARQUIVOS

```
E:\biblia\
├── css/
│   └── slide_biblia.css                    # Estilos principais do slide (443 linhas)
├── script/
│   ├── slide_biblia.js                     # Módulo principal (legacy - abre janela)
│   ├── slide_biblia_coordenador.js         # Coordenador - listener do botão "Slide"
│   ├── slide_biblia_dados.js               # Dados bíblicos (livros, versículos, ordem)
│   ├── slide_biblia_interface.js           # Gera HTML/JS inline da janela popup
│   ├── slide_biblia_janela.js              # Gerencia abertura/fechamento/validação da janela
│   ├── slide_biblia_preload.js             # Pré-carrega capítulos em cache (RAM)
│   ├── slide_biblia_utils.js               # Utilitários (normalização, validação)
│   └── versoes.css                         # CSS extra para versão "original"
```

---

## 🔄 FLUXO DE EXECUÇÃO

```
1. Usuário clica "Slide" no header
         ↓
2. slide_biblia_coordenador.js: inicializarSlide()
   - Captura estado atual: versão, livro, capítulo, versículo
   - Chama window.abrirJanelaSlide()
         ↓
3. slide_biblia_janela.js: abrirJanelaSlide()
   - Valida dados básicos
   - Verifica janela duplicada
   - Cria janela: window.open() tela cheia
   - Valida dados bíblicos (contagemVersiculosPorVersao)
   - Prepara dados: serializa JSON (contagem, ordem, nomes)
   - Chama window.gerarHtmlJanelaSlide() → slide_biblia_interface.js
   - Chama window.escreverHtmlNaJanela() → injeta HTML na popup
         ↓
4. slide_biblia_interface.js: gerarHtmlJanelaSlide()
   - Retorna template string HTML completo
   - Inclui <script> com TODA a lógica da janela:
     * variáveis de estado (livroAtual, capituloAtual, versiculoAtual, versaoBiblia)
     * funções: normalizarNomeLivro, obterNomeAcentuado
     * carregarCapitulo() - fetch JSON/HTML
     * carregarVersiculo() - extrai texto, injeta no DOM
     * ajustarFonteParaCaber() - AUTO-FIT (binary search)
     * atualizarBotoes() - navegação
     * proximoVersiculo() / voltarVersiculo()
     * listeners: click botões, keydown (setas, Home, End)
     * resize listener → debounced ajustarFonteParaCaber()
     * inicialização: atualizarContagemCapitulosParaLivroAtual() → carregarCapitulo()
         ↓
5. Popup abre → carrega capítulo → exibe versículo → auto-fit ajusta fonte
```

---

## 📦 RESPONSABILIDADES POR ARQUIVO

| Arquivo | Responsabilidade Principal | Exporta (window.) |
|---------|---------------------------|-------------------|
| **slide_biblia_coordenador.js** | Listener do botão "Slide", captura estado, inicia fluxo | `inicializarSlide` |
| **slide_biblia_janela.js** | Abre/fecha janela, valida, prepara dados, injeta HTML | `abrirJanelaSlide`, `fecharJanelaSlide` |
| **slide_biblia_interface.js** | Gera HTML+JS inline da popup (template string) | `gerarHtmlJanelaSlide`, `escreverHtmlNaJanela` |
| **slide_biblia_dados.js** | Dados estáticos: nomes livros, contagem versículos, ordem canônica | `livroAcentuadosParaSemAcentos`, `baseLivros`, `contagemVersiculosPorVersao`, `livrosOrdem` |
| **slide_biblia_preload.js** | Cache antecipado de capítulos em RAM (`window.versiculoCache`) | sobrescreve `gerarHtmlJanelaSlide` e `abrirJanelaSlide` |
| **slide_biblia_utils.js** | Funções utilitárias: normalização, validação, contagem, navegação | `normalizarNomeLivro`, `obterNomeAcentuado`, `validarLivro`, `obterContagemVersiculos`, `obterProximoLivro`, `obterLivroAnterior`, `obterTotalCapitulos` |
| **slide_biblia.js** | **LEGACY** - versão antiga monolítica (mantido p/ compatibilidade) | `inicializarSlide` |

---

## 🎨 CSS - slide_biblia.css (ESTILOS COMPLETOS)

### Reset & Base (linhas 12-35)
```css
body {
    margin: 0; padding: 0;
    background-color: black;           /* FUNDO PRETO */
    color: white;                      /* TEXTO BRANCO PADRÃO */
    font-family: Arial, sans-serif;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    height: 100vh; overflow: hidden;
    opacity: 0; transition: opacity 0.3s ease-in-out;
}
body.loaded { opacity: 1; }            /* FADE-IN ao carregar */
```

### Container Principal (linhas 42-57, 387-411)
```css
#versiculo-container {
    display: flex; flex-direction: column;
    justify-content: center; align-items: center; text-align: center;
    width: 95%; flex-grow: 1; min-height: 0;
    overflow-y: auto;                    /* SCROLL se necessário */
    padding: 1.5rem 1rem 0; box-sizing: border-box;
    position: relative;
    justify-content: safe center;        /* Centraliza sem cortar topo */
    scrollbar-width: none;               /* Esconde scrollbar Firefox */
    -ms-overflow-style: none;            /* Esconde scrollbar IE/Edge */
}
#versiculo-container::-webkit-scrollbar { display: none; width: 0; height: 0; }
```

### Título Topo (linhas 64-79)
```css
#titulo {
    background: rgba(0,0,0,0.6); color: #f1c40f;  /* DOURADO */
    width: 100%; text-align: center;
    padding: 0.75rem 0;
    font: bold italic clamp(1.2rem, 3vw, 2rem) Arial, sans-serif;
    text-transform: uppercase; flex-shrink: 0; z-index: 2;
}
```

### Texto Versículo (versões normais) (linhas 86-97)
```css
.texto-versiculo {
    text-align: center;
    font: bold italic clamp(2rem, 2.82vw, 5rem) "Arial Black", Gadget, sans-serif;
    line-height: 1.3; max-width: 100%; overflow-wrap: break-word;
    z-index: 2; margin-top: 0.5rem;
}
```

### Tradução Completa (versão ORIGINAL) (linhas 104-116)
```css
.traducao-completa {
    text-align: center;
    font: normal italic clamp(1.5rem, 2.5vw, 3rem) Arial, sans-serif;  /* MENOR que .texto-versiculo */
    line-height: 1.4; color: #ffffff;  /* BRANCO */
    margin-bottom: 2rem; z-index: 2;
}
```

### Interlinear - Container Palavras (linhas 123-135)
```css
.palavras-container {
    display: flex; flex-direction: row-reverse;  /* RTL - HEBRAICO */
    flex-wrap: wrap; justify-content: center; align-items: flex-start;
    gap: 2rem; width: 100%; max-width: 95%;
    margin: 0 auto; padding: 1rem; z-index: 2;
}
```

### Item Palavra (linhas 142-151)
```css
.detalhe-palavra {
    display: flex; flex-direction: column; align-items: center;
    gap: 0.5rem; min-width: 100px; max-width: 200px; flex-shrink: 0;
}
```

### Hebraico (linhas 158-165) ← DOBRADO
```css
.detalhe-palavra .hebrew {
    font: bold clamp(4rem, 6vw, 8rem) "Times New Roman", serif;  /* ERA: 2rem/3vw/4rem */
    color: #d4ac0d;        /* DOURADO */
    text-align: center; line-height: 1.2;
}
```

### Transliteração (linhas 172-180)
```css
.detalhe-palavra .transliteration {
    font: normal clamp(0.9rem, 1.5vw, 1.5rem) Arial, sans-serif;
    color: #cccccc;        /* CINZA CLARO */
    text-transform: uppercase; line-height: 1.2;
}
```

### Tradução Palavra (linhas 187-195) ← DOBRADO
```css
.detalhe-palavra .translation {
    font: normal italic clamp(1.8rem, 3vw, 3rem) Arial, sans-serif;  /* ERA: 0.9rem/1.5vw/1.5rem */
    color: #ffffff;        /* BRANCO */
    text-align: center; line-height: 1.2;
}
```

### Título Seção Interna (linhas 202-215)
```css
#versiculo-container > strong.section-title {
    color: #5df565;        /* VERDE CLARO */
    font: bold italic clamp(2.25rem, 4.2vw, 4.5rem) Arial, sans-serif;
    margin-bottom: 1rem; display: block; text-align: center;
    text-transform: uppercase; width: 100%; z-index: 3; line-height: 1.2;
}
```

### Marca d'Água (linhas 221-235)
```css
#marca-dagua-slide-biblia {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: url("../img/biblia.png") center/cover no-repeat;
    opacity: 0.15; pointer-events: none; z-index: 1;
}
```

### Botões Navegação (linhas 242-324)
```css
#botao-container {
    width: 100%; background: rgba(0,0,0,0.6);
    display: flex; justify-content: center; align-items: center;
    gap: 1rem; padding: 0.5rem 1.2rem; flex-shrink: 0; z-index: 2;
}
#voltar-botao, #proximo-botao {
    border: none; padding: 0.6rem 1.5rem;
    font: bold clamp(0.9rem, 1.2vw, 1.2rem) Arial, sans-serif;
    border-radius: 6px; cursor: pointer; min-width: 120px;
    transition: background-color 0.2s, color 0.2s, opacity 0.2s;
    background: #f1c40f; color: black;        /* DOURADO / PRETO */
}
#voltar-botao:not(:disabled):hover,
#proximo-botao:not(:disabled):hover {
    background: #d4ac0d; color: white;        /* DOURADO ESCURO / BRANCO */
}
:disabled { background: #333; color: #888; cursor: not-allowed; opacity: 0.6; }
```

### Popup "Sobre" (linhas 330-381)
```css
.popup-sobreposicao { position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    display: flex; justify-content: center; align-items: center; z-index: 1000; }
.popup-conteudo { background: white; padding: 2rem; border-radius: 10px;
    text-align: center; color: black; }
#fechar-popup { background: #f1c40f; color: black; border: none;
    padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; font-size: 1rem; }
#fechar-popup:hover { background: #d4ac0d; }
```

### Overrides por Versão (linhas 413-435)
```css
/* Versões NÃO originais: título e versículo mesmo tamanho */
body:not(:has(.traducao-completa)) #titulo,
body:not(:has(.traducao-completa)) .texto-versiculo {
    font-size: clamp(1.2rem, 3vw, 2rem);
}
/* Título 1.5x nas não-originais */
body:not(.versao-original) #titulo {
    font-size: clamp(1.8rem, 4.5vw, 3rem);
}
/* Versículo 2x nas não-originais */
body:not(.versao-original) .texto-versiculo {
    font-size: clamp(2.4rem, 6vw, 4rem);
}
/* Título seção mesmo tamanho todas exceto Original */
body:not(.versao-original) #versiculo-container > strong.section-title,
body.versao-arc #versiculo-container strong.section-title,
body.versao-arc #versiculo-container strong {
    font-size: clamp(2.25rem, 4.2vw, 4.5rem);
}
```

### Regra REMOVIDA (linhas 439-443)
```css
/* ERA: forçava branco no hebraico com !important - REMOVIDA */
/* body:has(.traducao-completa) #versiculo-container .hebrew { color: #ffffff !important; } */
```

---

## 🎯 AUTO-FIT - ajustarFonteParaCaber()

### Localização
- **slide_biblia.js** (linhas 583-675) - versão inline na popup aberta por `slide_biblia.js`
- **slide_biblia_interface.js** (linhas 217-328) - versão inline na popup aberta por coordenador

### Algoritmo: Busca Binária
```javascript
function ajustarFonteParaCaber() {
    // 1. Seleciona container e elementos alvo
    const container = document.getElementById("versiculo-container");
    const isOriginal = versaoBiblia === "original";
    
    if (isOriginal) {
        textoEl = container.querySelector(".traducao-completa");
        elementosExtras = container.querySelectorAll(
            ".detalhe-palavra .hebrew, .detalhe-palavra .transliteration, .detalhe-palavra .translation"
        );
    } else {
        textoEl = container.querySelector(".texto-versiculo");
    }
    tituloSecaoEl = container.querySelector("strong.section-title") || container.querySelector("strong");

    // 2. Restaura CSS original para medir
    textoEl.style.fontSize = "";
    elementosExtras.forEach(el => el.style.fontSize = "");
    if (tituloSecaoEl) tituloSecaoEl.style.fontSize = "";

    // 3. Função de teste: cabe sem scroll?
    const cabeSemRolar = () => 
        container.scrollHeight <= container.clientHeight &&
        container.scrollWidth <= container.clientWidth;

    // 4. Se já cabe, retorna
    if (cabeSemRolar()) return;

    // 5. Captura tamanhos máximos do CSS (computed)
    const maxTamanho = parseFloat(getComputedStyle(textoEl).fontSize) || 64;
    const minTamanho = 10;

    // 6. Calcula razões proporcionais
    razaoTitulo = tituloSecaoEl ? getComputedStyle(tituloSecaoEl).fontSize / maxTamanho : 1;
    razoesExtras = elementosExtras.map(el => 
        (parseFloat(getComputedStyle(el).fontSize) || maxTamanho) / maxTamanho
    );

    // 7. Busca binária: low=10, high=maxTamanho
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        textoEl.style.fontSize = mid + "px";
        elementosExtras.forEach((el, i) => el.style.fontSize = Math.round(mid * razoesExtras[i]) + "px");
        if (tituloSecaoEl) tituloSecaoEl.style.fontSize = Math.round(mid * razaoTitulo) + "px";
        
        if (cabeSemRolar()) { melhorTamanho = mid; low = mid + 1; }
        else { high = mid - 1; }
    }

    // 8. Aplica melhor tamanho encontrado
    textoEl.style.fontSize = melhorTamanho + "px";
    elementosExtras.forEach((el, i) => el.style.fontSize = Math.round(melhorTamanho * razoesExtras[i]) + "px");
    if (tituloSecaoEl) tituloSecaoEl.style.fontSize = Math.round(melhorTamanho * razaoTitulo) + "px";
}
```

### Parâmetros Chave
| Parâmetro | Valor | Descrição |
|-----------|-------|-----------|
| `minTamanho` | **10px** | Mínimo absoluto (era 14) |
| `maxTamanho` | computed CSS | Do clamp() do CSS (ex: 5rem = 80px) |
| `razoesExtras` | array | Proporção hebrew/translit/translation vs texto principal |
| `razaoTitulo` | float | Proporção título seção vs texto principal |

### Debug Logs (Console)
```
[AutoFit] Inicial: { clientHeight, scrollHeight, textoEl, extras, cabe }
[AutoFit] maxTamanho: 80 razoesExtras: [1.5, 0.3, 0.6]
[AutoFit] Melhor tamanho: 42
[AutoFit] Final: { clientHeight, scrollHeight, cabe: true }
```

---

## 🔤 CORES DO SISTEMA

| Elemento | Cor Hex | Descrição |
|----------|---------|-----------|
| **Fundo body** | `#000000` | Preto |
| **Texto padrão** | `#ffffff` | Branco |
| **Dourado principal** | `#f1c40f` | Botões, título topo |
| **Dourado hover/escuro** | `#d4ac0d` | Hebrew, botões hover |
| **Verde seção** | `#5df565` | `strong.section-title` |
| **Cinza transliteração** | `#cccccc` | `.transliteration` |
| **Branco tradução palavra** | `#ffffff` | `.translation` |
| **Branco tradução completa** | `#ffffff` | `.traducao-completa` |
| **Marca d'água** | `opacity: 0.15` | Imagem biblia.png |
| **Overlay popup** | `rgba(0,0,0,0.7)` | Fundo modal "Sobre" |
| **Botão fechar popup** | `#f1c40f` / `#d4ac0d` | Dourado / hover |
| **Botões disabled** | `#333333` / `#888888` | Fundo / texto |

---

## 📏 TAMANHOS DE FONTE (CSS clamp)

### Versão ORIGINAL
| Elemento | clamp(min, vw, max) | Valor aprox (1920px) |
|----------|---------------------|----------------------|
| `#titulo` | `clamp(1.2rem, 3vw, 2rem)` | 57.6px |
| `.traducao-completa` | `clamp(1.5rem, 2.5vw, 3rem)` | 48px |
| `.hebrew` | `clamp(4rem, 6vw, 8rem)` ← **DOBRADO** | 115px |
| `.transliteration` | `clamp(0.9rem, 1.5vw, 1.5rem)` | 28.8px |
| `.translation` | `clamp(1.8rem, 3vw, 3rem)` ← **DOBRADO** | 57.6px |
| `strong.section-title` | `clamp(2.25rem, 4.2vw, 4.5rem)` | 80.6px |

### Versões NORMAIS (arc, acf, nvi, etc.)
| Elemento | clamp(min, vw, max) | Valor aprox (1920px) |
|----------|---------------------|----------------------|
| `#titulo` | `clamp(1.8rem, 4.5vw, 3rem)` | 86.4px |
| `.texto-versiculo` | `clamp(2.4rem, 6vw, 4rem)` | 115px |
| `strong.section-title` | `clamp(2.25rem, 4.2vw, 4.5rem)` | 80.6px |

---

## ⚡ DIFERENÇAS: slide_biblia.js vs slide_biblia_interface.js

Ambos geram HTML inline para a popup, mas **slide_biblia_interface.js** é o **atual/usado pelo coordenador**.

| Aspecto | slide_biblia.js (legacy) | slide_biblia_interface.js (atual) |
|---------|-------------------------|-----------------------------------|
| Popup orientação F11 | ❌ | ✅ (div #orientacao-fullscreen) |
| Auto-fit original | ❌ (return early) | ✅ (suporte completo) |
| Wrapper `.texto-versiculo` original | ❌ (embrulhava) | ✅ (não embrulha) |
| requestAnimationFrame duplo | ✅ | ✅ |
| minTamanho auto-fit | 14 | **10** |
| Debug logs | ❌ | ✅ |
| Cache preload | Via preload.js | Via preload.js |

---

## 🔧 VERSÕES SUPORTADAS

| Código | Nome | Formato Arquivo | CSS Extra |
|--------|------|-----------------|-----------|
| `arc` | Almeida Revista e Corrigida | HTML | ❌ |
| `acf` | Almeida Corrigida Fiel | JSON | ❌ |
| `ara` | Almeida Revista Atualizada | JSON | ❌ |
| `nvi` | Nova Versão Internacional | JSON | ❌ |
| `kjv` | King James Version | JSON | ❌ |
| `ntlh` | Nova Tradução Linguagem de Hoje | JSON | ❌ |
| `naa` | Nova Almeida Atualizada | JSON | ❌ |
| **`original`** | **Texto Original (Hebraico/Grego)** | **JSON** | ✅ `versoes.css` |

---

## 📋 ESTRUTURA JSON VERSÃO ORIGINAL

```json
{
  "versiculos": {
    "1": {
      "traducao_completa": "No princípio criou Deus...",
      "palavras": [
        { "hebraico": "בְּרֵאשִׁית", "transliteracao": "BERESHIT", "traducao_palavra": "No princípio" },
        { "hebraico": "בָּרָא", "transliteracao": "BARA", "traducao_palavra": "criou" }
      ]
    }
  },
  "titulos": { "1": "A Criação" }
}
```

---

## 🎮 CONTROLES DE TECLADO (na popup)

| Tecla | Ação |
|-------|------|
| `→` / `PageDown` | Próximo versículo |
| `←` / `PageUp` | Versículo anterior |
| `Home` | Primeiro versículo do capítulo |
| `End` | Último versículo do capítulo |
| `F11` | Tela cheia (browser) |
| `ESC` | Sai tela cheia |

---

## 🐛 PROBLEMAS CONHECIDOS / CORREÇÕES RECENTES

| Problema | Correção | Arquivo |
|----------|----------|---------|
| Hebraico branco (invisível no fundo preto) | Removido `!important` que forçava `#ffffff`; agora usa `#d4ac0d` do `.hebrew` | slide_biblia.css:439-443 |
| Auto-fit não funcionava na versão original | Removido `return early`; adicionado seletores `.traducao-completa` + interlinear | slide_biblia_interface.js:217-328 |
| Original embrulhado em `.texto-versiculo` (quebrava layout) | Condicional: `if (versaoBiblia === "original")` não embrulha | slide_biblia_interface.js:198-203 |
| Fonte muito grande em versículos longos (15") | `minTamanho: 10` (era 14); busca binária escala tudo proporcionalmente | slide_biblia_interface.js:270 |
| Popup abria branco (about:blank) | Fechar e reabrir - HTML é gerado inline no template string | slide_biblia_interface.js |

---

## 📝 COMO TESTAR

1. Abra página principal → selecione livro/capítulo/versículo
2. Clique **"Slide"** → abre popup
3. No popup: **F12 → Console**
4. Navegue para versículo longo: **Ester 8:9** ou **Salmo 119:1-176**
5. **F11** (tela cheia) → verifica se cabe sem scroll vertical
6. Console deve mostrar:
   ```
   [AutoFit] Inicial: { clientHeight: 800, scrollHeight: 1200, ..., cabe: false }
   [AutoFit] maxTamanho: 80, razoesExtras: [1.5, 0.3, 0.6]
   [AutoFit] Melhor tamanho: 42
   [AutoFit] Final: { clientHeight: 800, scrollHeight: 780, cabe: true }
   ```
7. Hebraico deve aparecer **dourado (#d4ac0d)**, não branco
8. Transliteração **cinza (#ccc)**, tradução palavra **branco**

---

## 🔄 PRÓXIMOS PASSOS SUGERIDOS

- [ ] Unificar `slide_biblia.js` (legacy) com arquitetura modular (remover duplicação)
- [ ] Adicionar teste automatizado do auto-fit com Puppeteer/Playwright
- [ ] Cache `versiculoCache` persistir entre sessões (localStorage/IndexedDB)
- [ ] Suporte a versículos com notas de rodapé / referências cruzadas
- [ ] Modo "apresentador" com preview do próximo versículo