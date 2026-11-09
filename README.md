# Bíblia Sagrada Online

**Início do Projeto:** Agosto de 2024  
**Autor e Mantenedor:** Gênesis Informatica ([genesisservicosti@gmail.com](mailto:genesisservicosti@gmail.com))  
**Repositório:** [https://github.com/familiacrista/biblia](https://github.com/familiacrista/biblia)  

**Tecnologias:** HTML5 semântico, CSS3 moderno (arquitetura Outside-In), JavaScript Vanilla (ES6+, modular, sem frameworks)

---

## Sumário

1. [Visão Geral e Propósito](#1-visão-geral-e-propósito)
2. [Diferenciais de Arquitetura e Engenharia](#2-diferenciais-de-arquitetura-e-engenharia)
3. [Estrutura Completa de Diretórios e Arquivos](#3-estrutura-completa-de-diretórios-e-arquivos)
4. [Manual Detalhado de Módulos e Recursos](#4-manual-detalhado-de-módulos-e-recursos)
5. [Modelos e Schemas de Dados (JSON / HTML)](#5-modelos-e-schemas-de-dados-json--html)
6. [Tabela de Atalhos Rápidos do Teclado](#6-tabela-de-atalhos-rápidos-do-teclado)
7. [Guia de Instalação, Configuração e Execução](#7-guia-de-instalação-configuração-e-execução)
8. [Convenções de Código e Padronização do Projeto](#8-convenções-de-código-e-padronização-do-projeto)
9. [Contribuição e Licença](#9-contribuição-e-licença)

---

## 1. Visão Geral e Propósito

A **Bíblia Sagrada Online** é uma plataforma web completa para leitura, pesquisa exegética, estudo teológico e apresentação litúrgica. Criada como um projeto ambicioso e rigorosamente estruturado, a aplicação foi projetada para operar em alta performance exclusivamente no front-end, eliminando qualquer dependência de backend pesado, frameworks opinativos ou bancos de dados relacionais em servidor.

O projeto atende quatro perfis de uso principais:

- **Leitor Devocional:** Interface despoluída, modo de leitura contínua, tipografia confortável e alternância rápida entre 9 versões bíblicas.
- **Estudioso e Seminarista:** Módulo interlinear com texto original hebraico e grego (transliteração e análise morfológica palavra por palavra), concordância exaustiva com números de Strong e dicionário bíblico.
- **Ministério de Louvor e Mídia Litúrgica:** Sistema de projeção em tela secundária (slides para Datashow/TV) tanto para versículos bíblicos quanto para os dois maiores hinários evangélicos do Brasil (**Harpa Cristã** e **Cantor Cristão**).
- **Autoformação e Capacitação:** Biblioteca com 10 clássicas bíblias de estudo em PDF para download e uma curadoria com centenas de cursos gratuitos (teologia, exatas, Linux e programação).

---

## 2. Diferenciais de Arquitetura e Engenharia

- **100% Vanilla (Zero Dependências de Build):** Não requer Node.js, Webpack, Vite, React ou npm para rodar. Todo o código é interpretado nativamente pelos navegadores modernos.
- **Arquitetura de Dados Particionada:** Em vez de arquivos gigantescos monolíticos, os textos bíblicos, hinários, concordâncias e dicionários são fragmentados em milhares de arquivos JSON e HTML organizados por pastas. Isso garante carregamento instantâneo sob demanda (lazy loading) e baixo consumo de memória.
- **Cache Multinível:**
  - *Cache em Memória RAM (`versoes_cache.js` / `Map`):* Capítulos lidos recentemente são retidos para transição instantânea sem refazer requisições HTTP.
  - *IndexedDB Persistente (`searchIndex_{versao}_v10`):* O índice invertido de busca bíblica é construído em paralelo (`Promise.all`) e gravado no IndexedDB local do navegador, viabilizando buscas subsequentes instantâneas mesmo offline.
- **Isolamento via Shadow DOM:** A janela de busca bíblica sobreposta utiliza `attachShadow({ mode: 'open' })` para encapsular completamente seu CSS, garantindo que nenhum estilo global interfira na legibilidade dos resultados.
- **Janela de Projeção em Pop-up Desacoplada:** Os modos de slide da Bíblia e dos Hinários abrem uma nova instância do navegador configurada para tela secundária/datashow, com sincronismo de estado e atalhos globais de teclado.
- **Suporte Multidirecional e Tipográfico para Línguas Originais:**
  - Antigo Testamento em Hebraico Bíblico com alinhamento RTL (*Right-to-Left*) e renderização da fonte *Noto Sans Hebrew*.
  - Novo Testamento em Grego Koiné com alinhamento LTR (*Left-to-Right*).

---

## 3. Estrutura Completa de Diretórios e Arquivos

```
biblia/
├── index.html                           # Portal de entrada e vitrine de versões bíblicas
├── style.css                            # Estilos globais e da página inicial
├── script.js                            # Lógica da vitrine, pop-ups e inclusão de versões
├── README.md                            # Documentação técnica do projeto
├── manual.md                            # Manual de uso orientado ao usuário final
│
├── html/                                # Páginas centrais dos subsistemas
│   ├── versoes.html                     # Leitor bíblico, modo leitura, busca e slides
│   ├── menu_dicionarioconcordancia.html # Concordância bíblica e dicionário
│   ├── harpa_cantor.html                # Hinários Harpa Cristã e Cantor Cristão
│   └── cursos.html                      # Catálogo de cursos bíblicos e profissionalizantes
│
├── css/                                 # Folhas de estilo modulares
│   ├── biblia_realizabuscateste.css
│   ├── cantor_cristao.css
│   ├── concordancia.css
│   ├── cursos.css
│   ├── dicionario.css
│   ├── harpa_cantor.css
│   ├── harpa_crista.css
│   ├── menu_dicionarioconcordancia.css
│   ├── modo_leitura.css
│   ├── slide_biblia.css
│   ├── slide_harpacantor.css
│   └── versoes.css
│
├── script/                              # Lógica modular da aplicação
│   ├── acf.js, ara.js, arc.js
│   ├── kjv.js, naa.js, ntlh.js
│   ├── nvi.js, nvt.js, original.js
│   ├── biblia-navegacao.js
│   ├── biblia_realizabusca.js
│   ├── concordancia.js
│   ├── concordancia-busca-indexada.js
│   ├── concordancia-optimizada.js
│   ├── dicionario.js
│   ├── dicionario_concordancia.js
│   ├── dropdown.js
│   ├── dropdown_concordancia.js
│   ├── gerenciador_concordancia_novo.js
│   ├── harpa_cantor.js
│   ├── livros_capitulos.js
│   ├── marcadagua.js
│   ├── menu_dicionarioconcordancia.js
│   ├── slide_biblia*.js
│   ├── slide_harpacantor*.js
│   ├── sobre.js
│   ├── versoes.js
│   ├── versoes_cache.js
│   ├── versoes_capitulos.js
│   ├── versoes_interface.js
│   ├── versoes_modoleitura.js
│   ├── versoes_navegacao_modoleitura.js
│   ├── versoes_navegacao.js
│   ├── versoes_realizabusca.js
│   └── versoes_versiculos.js
│
├── versao/                              # Banco de dados das 9 traduções bíblicas
│   ├── acf/
│   ├── ara/
│   ├── arc/
│   ├── kjv/
│   ├── naa/
│   ├── ntlh/
│   ├── nvi/
│   ├── nvt/
│   └── original/
│
├── concordancia/                        # Dados da Concordância Bíblica
│   ├── [a-y]/
│   └── lista_letras.json
│
├── dicionario/                          # Dados do Dicionário Bíblico
│   ├── [a-z]/
│   └── lista_letras.json
│
├── harpacrista/                         # 640 hinos da Harpa Cristã
│   └── harpacrista_index.json
│
├── cantorcristao/                       # 581 hinos do Cantor Cristão
│   └── cantorcristao_index.json
│
├── baixar/                              # 10 Bíblias de estudo em PDF
├── img/                                 # Imagens das versões, vídeos e marcas d'água
└── json/                                # Cópias consolidadas auxiliares
```

---

## 4. Manual Detalhado de Módulos e Recursos

### 4.1. Página Inicial e Hub de Versões (`index.html`)

A página de entrada funciona como um catálogo visual elegante com efeito de gradiente e fundo estilizado.

- **Grid de Cards de Versões:** Exibe cada tradução bíblica disponível com sua capa gráfica.
- **Redirecionamento Inteligente:** Ao clicar em qualquer card, a aplicação direciona automaticamente para `html/versoes.html?versao={codigo}`.
- **Pop-up de Boas-Vindas:** Apresenta uma saudação amigável ao usuário.
- **Cadastro Dinâmico de Nova Versão:** Botão `+` permite adicionar novas versões com upload de imagem convertida em Base64.

### 4.2. Leitor Bíblico Multi-Versões (`html/versoes.html`)

O leitor é o núcleo da aplicação, composto por três níveis de navegação:

1. Menu Lateral (66 Livros)
2. Régua Superior (Capítulos)
3. Grade Central (Versículos)

#### As 9 Traduções Disponíveis

1. **ACF** — Almeida Corrigida Fiel
2. **ARA** — Almeida Revista e Atualizada
3. **ARC** — Almeida Revista e Corrigida
4. **KJV** — King James Version
5. **NAA** — Nova Almeida Atualizada
6. **NTLH** — Nova Tradução na Linguagem de Hoje
7. **NVI** — Nova Versão Internacional
8. **NVT** — Nova Versão Transformadora
9. **ORIGINAL** — Texto Interlinear Hebraico e Grego

A versão ativa é salva automaticamente no `localStorage` (`versaoBiblicaSelecionada`).

### 4.3. Estudo Interlinear do Texto Original (Hebraico e Grego)

Implementado no script `script/original.js`:

- **Antigo Testamento (Hebraico Bíblico):** Fluxo RTL + fonte *Noto Sans Hebrew*.
- **Novo Testamento (Grego Koiné):** Fluxo LTR.
- Cada versículo é desmembrado em cartões com:
  1. Termo no idioma original
  2. Pronúncia fonética (SBL)
  3. Tradução morfológica literal
  4. Tradução fluida do versículo

### 4.4. Modo Leitura Focada

- Substitui a grade de versículos pelo fluxo contínuo do capítulo.
- Tipografia otimizada para imersão (`css/modo_leitura.css`).
- Barra de navegação inferior com **Capítulo Anterior** e **Próximo Capítulo**.
- Integração com cache em memória para transições instantâneas.

### 4.5. Motor de Busca Ultra-Rápido

Arquitetado em `script/versoes_realizabusca.js`:

1. Varredura paralela via `Promise.all`
2. Construção de índice invertido
3. Persistência no IndexedDB (`searchIndex_{versao}_v10`)
4. Isolamento em Shadow DOM
5. Navegação direta ao versículo encontrado

### 4.6. Sistema de Projeção (Slide Bíblico)

- Abertura em janela pop-up dedicada
- Pré-carregamento dinâmico dos versículos adjacentes
- Controles de zoom e navegação
- Atalhos de teclado globais

### 4.7. Concordância Bíblica Exaustiva (Léxico Strong)

- Navegação alfabética A–Z
- Carregamento fracionado via DataManager
- Filtros por Testamento e Livro
- Números de Strong com termo original

### 4.8. Dicionário Teológico e Enciclopédico Bíblico

- Busca por termo ou letra
- Definição principal + definição espiritual/cristocêntrica
- Referências bíblicas relacionadas

### 4.9. Hinários Cristãos

- **Harpa Cristã:** 640 hinos
- **Cantor Cristão:** 581 hinos
- Temas visuais dinâmicos (bordô/dourado e azul marinho)
- Navegação por faixas de 50 hinos

### 4.10. Sistema de Projeção para Hinários

- Segmentação automática por estrofe e refrão
- Tipografia de alto contraste
- Controle total via teclado

### 4.11. Biblioteca Digital de Bíblias de Estudo em PDF

Disponíveis no menu **Baixar**:

| Obra | Foco |
|------|------|
| A Bíblia Católica | Texto com deuterocanônicos |
| A Bíblia Sagrada NVT | Leitura contemporânea |
| A Bíblia Viva | Paráfrase acessível |
| A vida completa de Jesus | Evangelhos em ordem cronológica |
| Bíblia de Genebra | Notas da Reforma |
| Bíblia em ordem cronológica NVI | Narrativas históricas |
| Bíblia explicada | Explicações concisas |
| Bíblia KJA | King James Atualizada |
| Bíblia palavra-chave | Foco em hebraico/grego |
| Bíblia Thompson | Referências em cadeia |

### 4.12. Portal de Cursos (`html/cursos.html`)

Curadoria de cursos gratuitos em:

- Teologia e Bíblia
- Universitários e gerais
- Linux e infraestrutura
- Programação e bancos de dados

---

## 5. Modelos e Schemas de Dados

### Schema de Versão Bíblica Padrão

```json
{
  "livro": "1 João",
  "capitulo": 1,
  "titulos": {
    "1": "A Palavra da Vida",
    "5": "Andar na Luz"
  },
  "versiculos": {
    "1": "O que era desde o princípio...",
    "2": "A vida se manifestou..."
  }
}
```

### Schema de Versão Interlinear Original

```json
{
  "livro": "Gênesis - בְּרֵאשִׁית - Bereshit",
  "capítulo": 1,
  "versiculos": {
    "1": {
      "traducao_completa": "No princípio, criou Deus os céus e a terra.",
      "palavras": [
        {
          "hebraico": "בְּרֵאשִׁית",
          "transliteral": "bərēʾšîṯ",
          "traducao_palavra": "No princípio"
        }
      ]
    }
  }
}
```

### Schema de Concordância

```json
{
  "a": [
    {
      "palavra": "aarel",
      "veja tambem": ["Harum", "genealogia"],
      "ocorrencias": 1,
      "fonte": "Strong's H169 (אַהַרְחֵל/Acharchel)",
      "concordancias": [
        {
          "referencia": "1 Crônicas 4.8",
          "texto": "e a Zobeba; e as famílias de A., filho de Harum."
        }
      ]
    }
  ]
}
```

### Schema de Dicionário

```json
{
  "A": [
    {
      "termo": "aará",
      "definicao": "Terceiro filho de Benjamim (1 Cr 8.1).",
      "definicaoAdicional": "A verdadeira definição espiritual começa com Cristo.",
      "referencias": ["João 14:6", "Efésios 4:24"]
    }
  ]
}
```

### Schema de Hinário

```json
{
  "numero": "1",
  "titulo": "Chuvas de Graça",
  "letra": "Deus prometeu com certeza\nChuvas de graça mandar..."
}
```

---

## 6. Tabela de Atalhos Rápidos do Teclado

### Modo Slide Bíblico

| Tecla              | Ação                          |
|--------------------|-------------------------------|
| → ou Page Down     | Próximo versículo             |
| ← ou Page Up       | Versículo anterior            |
| Home               | Vai para o versículo 1        |
| End                | Vai para o último versículo   |

### Modo Slide de Hinários

| Tecla                    | Ação                    |
|--------------------------|-------------------------|
| → , Page Down ou Espaço  | Próxima estrofe         |
| ← ou Page Up             | Estrofe anterior        |

---

## 7. Guia de Instalação, Configuração e Execução

### Requisitos Mínimos

- Navegador web atualizado (Chrome, Edge, Firefox, Opera, Brave ou Safari)
- Resolução recomendada: a partir de 1280×720

### Por que Usar um Servidor Estático Local?

Navegadores modernos bloqueiam requisições `fetch()` via protocolo `file:///`. Por isso, é necessário servir os arquivos por HTTP.

### Opções de Execução

#### Opção A: Live Server (VS Code) — Recomendada

1. Abra a pasta do projeto no Visual Studio Code.
2. Instale a extensão **Live Server** (Ritwick Dey).
3. Clique com o botão direito em `index.html` → **Open with Live Server**.

#### Opção B: Python HTTP Server

```bash
python -m http.server 8000
```

Acesse: `http://localhost:8000/index.html`

#### Opção C: Node.js (NPX)

```bash
npx serve .
```

---

## 8. Convenções de Código e Padronização do Projeto

### 1. Termos Técnicos Protegidos

- Tags HTML nativas (`body`, `header`, `nav`, `section`, `div`, `button`, etc.) **nunca devem ser traduzidas**.
- Pseudo-classes e pseudo-elementos permanecem em inglês.
- O identificador `container` não deve ser traduzido.

### 2. Arquitetura de CSS Outside-In

Ordem obrigatória das propriedades:

1. **Posicionamento:** `position`, `top`, `right`, `bottom`, `left`, `z-index`, `transform`
2. **Estrutura e Dimensões:** `display`, `flex`, `grid`, `width`, `height`, `margin`, `padding`, `gap`, `overflow`
3. **Visual e Pintura:** `background`, `border`, `border-radius`, `box-shadow`, `backdrop-filter`
4. **Tipografia:** `font-family`, `font-size`, `font-style`, `font-weight`, `color`, `text-align`
5. **Interação:** `cursor`, `transition`

### 3. Padrão de Comentários

- Comentários de linha começam com **verbo de ação no presente**.
- Todas as sentenças terminam com ponto final.
- Alinhamento em formato de coluna à direita.

---

## 9. Manutenção, Debugging e Expansão

### Manutenção e Debugging

- **Console do navegador:** Use `console.log()` nos scripts para inspecionar dados carregados (especialmente nos módulos de busca e cache).
- **Validação de JSON:** Todos os arquivos de dados devem ser JSON válidos. Ferramentas como [jsonlint.com](https://jsonlint.com) ajudam a identificar erros de sintaxe.
- **Performance:** Os arquivos de versões e concordância são particionados propositalmente. Evite consolidar em arquivos monolíticos grandes.
- **Cross-browser:** Teste em Chrome, Edge, Firefox e Safari. O uso de Shadow DOM e IndexedDB exige navegadores modernos.
- **Fetch e CORS:** Sempre sirva o projeto por HTTP local. Abrir via `file:///` bloqueia o carregamento de JSON.

### Expansão Sugerida

- **Áudio:** Integrar Web Audio API ou elementos `<audio>` para leitura de versículos e hinos.
- **PWA:** Adicionar `manifest.json` e service worker para instalação como aplicativo e funcionamento offline mais robusto.
- **Novas versões bíblicas:** Seguir o schema existente em `versao/` e registrar a versão no adaptador correspondente em `script/`.
- **Novos hinos:** Criar arquivos JSON numerados em `harpacrista/` ou `cantorcristao/` e atualizar o respectivo arquivo de índice.
- **Idiomas:** Duplicar estrutura de dados e adicionar seletor de idioma na interface.
- **Backend opcional:** Caso o volume de dados cresça muito, considerar Node.js apenas para busca server-side, mantendo o front-end vanilla.

### Observações de Estrutura

- A pasta `ver/` existe em algumas análises do repositório, porém encontra-se vazia ou sem arquivos públicos. Não é utilizada pelo fluxo principal da aplicação.
- O projeto possui arquivo `LICENSE` (MIT) no repositório.
- Existem arquivos auxiliares de desenvolvimento e cópias de CSS/JS na raiz e subpastas (ex.: arquivos com sufixo `copy`). Antes de remover, verificar se há referências ativas.

---

## 10. Contribuição e Licença

### Como Contribuir

1. Faça um **Fork** do repositório.
2. Crie uma branch:
   ```bash
   git checkout -b feature/minha-melhoria
   ```
3. Realize os commits com mensagens claras.
4. Envie as alterações:
   ```bash
   git push origin feature/minha-melhoria
   ```
5. Abra um **Pull Request**.

### Licença

Este projeto é distribuído sob licença **MIT**, para fins educacionais, devocionais e de edificação da fé. Consulte o arquivo `LICENSE` no repositório e o autor para termos de distribuição em massa.

---

### Contato

- **E-mail:** [genesisservicosti@gmail.com](mailto:genesisservicosti@gmail.com)
- **GitHub:** [https://github.com/familiacrista](https://github.com/familiacrista)

---

*Documentação técnica atualizada em novembro de 2026.*
