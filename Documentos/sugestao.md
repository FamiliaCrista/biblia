# Sugestões de padronização de comentários — style.css

Coluna "Sugestão" propõe um comentário único por declaração, repetido em todas as linhas onde ela aparece. Casos marcados com ⚠️ são contextuais — manter o comentário atual (ou o já sugerido) em vez de padronizar.

| Linha | Comando | Comentário atual | Comentário sugerido |
|---|---|---|---|
*| 8 | `margin: 0` | Remove margens externas | Remove todas as margens externas. |
*| 9 | `padding: 0` | Remove preenchimento interno | Remove todo o preenchimento interno. |
*| 10 | `box-sizing: border-box` | Faz com que o tamanho total inclua bordas e padding. | Inclui bordas e padding no tamanho total. |
*| 11, 32 | `font-family: 'Roboto Mono', monospace` | Define uma fonte padrão para toda a página. / Define a fonte específica para o corpo. | Define a fonte padrão da página. |
*| 20, 76, 129, 200, 226, 282 | `display: flex` | Ativa o layout flexível. | Ativa o layout flexível. ✅ |
*| 21, 115, 227, 270 | `flex-direction: column` | Organiza os itens em coluna. / Organiza itens internos em coluna. | Organiza os itens em coluna. |
*| 22 | `overflow: hidden` | Esconde conteúdo que sai da tela. | Esconde o conteúdo que sai da tela. |
*| 23, 157, 171, 230, 250 | `z-index: 1` | Define a ordem de empilhamento. (variações) | Fica na camada 1, acima do fundo. |
*| 24 | `height: 100vh` | Define a altura para ser 100% da tela. | Altura de 100% da tela. |
*| 25 | `max-height: 100vh` | Limita a altura máxima a 100% da tela. | Limita a altura a 100% da tela. |
*| 26 | `background-color: #f5f5f5` | Cor de fundo caso a imagem não carregue. | Cor de fundo caso a imagem não carregue. ✅ |
*| 27 | `background-image` | Define a imagem de fundo da página. | Define a imagem de fundo da página. ✅ |
*| 28 | `background-size: cover` | Faz a imagem de fundo cobrir toda a área. | Faz a imagem de fundo cobrir toda a área. ✅ |
*| 29 | `background-position: center` | Centraliza a imagem de fundo. | Centraliza a imagem de fundo. ✅ |
*| 30 | `background-attachment: fixed` | Mantém a imagem fixa durante a rolagem. | Mantém a imagem fixa durante a rolagem. ✅ |
*| 31 | `backdrop-filter: blur(2px)` | Aplica desfoque no fundo. | Aplica desfoque no fundo. ✅ |
*| 33 | `font-style: italic` | Deixa o texto em itálico. | Texto em itálico. |
*| 34 | `font-weight: bold` | Deixa o texto em negrito. | Texto em negrito. |
*| 43, 265 | `position: absolute` | Posicionamento livre na tela. / Permite posicionar livremente sobre a página. | Permite posicionar livremente na página. |
*| 44, 293 | `top: 0` | Alinha no topo. | Alinha ao topo. |
*| 45, 94, 295 | `right: 0` | Alinha à direita. | Alinha à direita. ✅ |
*| 46, 296 | `bottom: 0` | Alinha na base. | Alinha à base. |
*| 47, 93, 294 | `left: 0` | Alinha à esquerda. | Alinha à esquerda. ✅ |
*| 48 | `z-index: 0` | Fica na camada 0, abaixo do conteúdo. | Fica na camada 0, abaixo do conteúdo. ✅ |
*| 50–54 | `background: linear-gradient(...)` | Cria efeito de escurecimento gradual. / Adiciona múltiplas camadas de sombra. | Cria um efeito de escurecimento gradual. |
*| 63, 90, 199 | `z-index: 2` | acima do fundo e gradiente. / visível sobre o conteúdo. / acima do fundo. | Fica na camada 2, visível sobre o fundo. |
*| 297 | `z-index: 2` | Fica entre o pop-up e o conteúdo da página. | ⚠️ Manter (contexto do overlay) |
*| 308 | `z-index: 2` | Fica na camada 2, mantendo os botões clicáveis sobre o fundo. | ⚠️ Manter (contexto dos botões) |
*| 64, 98, 120, 146, 160, 255, 311, 341, 393 | `color: white` | Define a cor do texto como branco(a). / Texto branco. / etc. | Cor do texto branca. |
*| 65, 99, 162, 256 | `text-align: center` | Centraliza o texto. | Centraliza o texto. ✅ |
*| 409 | `text-align: center` | Centraliza o texto digitado. | ⚠️ Manter (campo de input) |
*| 66, 100, 161 | `font-size` (vários) | Define o tamanho da fonte. | Define o tamanho da fonte. ✅ |
*| 342, 408 | `font-size: 18px` | Tamanho do texto. / Tamanho do texto digitado. | Define o tamanho da fonte. |
*| 67 | `text-decoration: none` | Remove o sublinhado padrão dos links. | Remove o sublinhado dos links. |
*| 76, 129, 200, 226, 282 | (ver `display: flex`) | | |
*| 77, 202 | `flex-wrap: wrap` | quebrem para a próxima linha / quebrem a linha | Permite que os itens quebrem de linha. |
*| 78, 130, 203, 228 | `justify-content: center` | Centraliza horizontalmente. | Centraliza horizontalmente. ✅ |
*| 79, 131, 204, 229 | `align-items: center` | Centraliza verticalmente. | Centraliza verticalmente. ✅ |
*| 80, 96 | `padding: 15px` | Adiciona um espaçamento interno. / Adiciona um pequeno espaçamento interno. | Adiciona espaçamento interno. |
*| 81, 97, 253 | `background: black` / `#000000` | Define a cor de fundo como preta. / Fundo preto. | Fundo preto. |
*| 91 | `position: fixed` (rodapé) | Mantém o rodapé fixo na tela. | ⚠️ Manter |
*| 109 | `position: fixed` (pop-up boas-vindas) | Mantém a janela pop-up fixa na tela, mesmo com rolagem. | ⚠️ Manter (sugerido anteriormente) |
*| 292 | `position: fixed` (overlay escurecido) | Fixa o fundo escurecido, acompanhando a tela durante a rolagem. | ⚠️ Manter (sugerido anteriormente) |
*| 92 | `bottom: 0` (rodapé) | Alinha o rodapé na parte de baixo. | Alinha à base. |
| 95, 159, 205 | `width: 100%` | Faz o rodapé ocupar 100% da largura. / Faz o título ocupar toda a largura. / Ocupa 100% da largura. | Ocupa 100% da largura. |
| 110 | `top: 310px` | Define a distância do topo. | Define a distância do topo. ✅ |
| 111 | `left: calc(50% - 1px)` | Centraliza na horizontal. | Centraliza na horizontal. ✅ |
| 112 | `z-index: 4` | Fica na camada 4, acima de quase tudo. | Fica na camada 4, no topo de tudo. |
| 113 | `transform: translateX(-50%)` | Ajusta o centro horizontal perfeitamente. | Ajusta o centro horizontal perfeitamente. ✅ |
| 114, 269, 364 | `display: none` | Esconde o elemento / a janela por padrão. / Escondida por padrão. | Escondido por padrão. |
| 217 | `display: none` (scrollbar) | Esconde a barra de rolagem. | ⚠️ Manter (contexto da scrollbar) |
| 116, 271 | `width: 320px` | Define uma largura fixa. / Largura fixa. | Largura fixa. |
| 117 | `height: 200px` | Define uma altura fixa. | Altura fixa. |
| 366, 377 | `height: 200px` | Altura da imagem. / Altura da área clicável. | Altura fixa. ⚠️ (contexto) |
| 118 | `background: rgba(22,22,22,0.8)` | Fundo preto semi-transparente. | Fundo preto semi-transparente. ✅ |
| 119, 339, 407 | `border-radius` (vários) | Deixa os cantos arredondados. / Cantos arredondados. | Cantos arredondados. |
| 132 | `height: auto` | Deixa a altura se ajustar ao conteúdo. | Deixa a altura se ajustar ao conteúdo. ✅ |
| 141, 322 | `margin-left: 200px / 250px` | Empurra o botão para a direita. | Empurra o botão para a direita. ✅ |
| 142, 323 | `padding-top: 10px` | Espaçamento interno no topo. | Espaçamento interno no topo. ✅ |
| 143, 324 | `padding-bottom: 10px` | Espaçamento interno na base. | Espaçamento interno na base. ✅ |
| 144, 309, 380 | `background: none` | Remove a cor de fundo. / Sem cor de fundo. | Sem cor de fundo. |
| 145, 310, 338, 406 | `border: none` | Remove a borda. / Sem borda. | Sem borda. |
| 147, 240, 312, 343, 382 | `cursor: pointer` | Mostra uma mãozinha ao passar o mouse. / Mãozinha ao passar o mouse. | Mãozinha ao passar o mouse. |
| 148, 313, 410 | `outline: none` | Remove a borda de foco ao clicar. / Remove contorno ao clicar. / Remove o contorno ao focar. | Remove o contorno do foco. |
| 158 | `margin-bottom: 32px` | Adiciona uma margem abaixo do título. | Adiciona uma margem abaixo do título. ✅ |
| 173, 252 | `width: 233px` | Define uma largura fixa. / Mesma largura da imagem da capa. | ✅ Manter (contexto correto) |
| 174 | `height: 350px` | Define uma altura fixa. | Altura fixa. |
| 176–178 | `box-shadow` (img) | Adiciona múltiplas camadas de sombra. | Adiciona múltiplas camadas de sombra. ✅ |
| 179 | `transition: box-shadow 0.3s ease` | Anima a mudança da sombra suavemente. | Anima a mudança da sombra suavemente. ✅ |
| 190 | `box-shadow` (hover) | Sombra mais intensa ao passar o mouse. | Sombra mais intensa ao passar o mouse. ✅ |
| 201 | `flex-grow: 1` | Faz a lista ocupar o espaço vertical disponível. | Faz a lista ocupar o espaço vertical disponível. ✅ |
| 206 | `overflow: auto` | Adiciona barra de rolagem se necessário. | Adiciona rolagem se necessário. |
| 207 | `list-style-type: none` | Remove os marcadores de lista (bolinhas). | Remove os marcadores de lista. |
| 208 | `scrollbar-width: none` | Esconde a barra de rolagem no Firefox. | Esconde a barra de rolagem no Firefox. ✅ |
| 209 | `padding-bottom: 50px` | Espaço extra na base para não cobrir o rodapé. | Espaço extra na base para não cobrir o rodapé. ✅ |
| 210, 211 | `padding-left/right: 20px` | Adiciona preenchimento à esquerda/direita. | Adiciona preenchimento à esquerda/direita. ✅ |
| 212 | `gap: 20px` | Adiciona espaçamento entre os itens. | Adiciona espaçamento entre os itens. ✅ |
| 172 | `margin: 10px` | Espaçamento ao redor da imagem. | Espaçamento ao redor da imagem. ✅ |
| 231 | `transition: 100ms ease-in-out` | Anima qualquer mudança de forma suave. | Animação suave das mudanças. |
| 241 | `transform: scale(1.05)` | Aumenta um pouco o tamanho do item. | Aumenta um pouco ao passar o mouse. |
| 252 | ver acima | | |
| 254 | `border-top: 1.7px solid white` | Adiciona uma linha branca no topo. | Adiciona uma linha branca no topo. ✅ |
| 266, 267 | `top/left: calc(...)` | Centraliza verticalmente/horizontalmente. | Centraliza verticalmente/horizontalmente. ✅ |
| 268 | `z-index: 3` | Camada 3, acima da maioria dos elementos. | Fica na camada 3, acima da maioria dos elementos. |
| 272 | `height: 400px` | Altura fixa. | Altura fixa. ✅ |
| 273 | `background: #161616` | Cor de fundo escura. | Fundo cinza escuro. |
| 291 | `content: ""` | Necessário para o pseudo-elemento funcionar. | Necessário para o pseudo-elemento funcionar. ✅ |
| 298 | `background: rgba(0,0,0,0.8)` | Cor preta com 80% de transparência. | Fundo preto com 80% de transparência. |
| 333 | `width: 150px` | Largura do botão. | Largura do botão. ⚠️ (contexto) |
| 365 | `width: 150px` | Largura da imagem. | Largura da imagem. ⚠️ (contexto) |
| 376 | `width: 150px` | Largura da área clicável. | Largura da área clicável. ⚠️ (contexto) |
| 334 | `height: 40px` | Altura do botão. | Altura do botão. ✅ |
| 335, 404 | `margin-top` | Margem no topo. | Espaço acima do botão/campo. |
| 336, 367, 378 | `margin-left: 85px` | Margem à esquerda para centralizar. / Margem para centralizar. | Margem à esquerda para centralizar. |
| 337 | `padding: 4px` | Espaçamento interno. | Espaçamento interno. ✅ |
| 340 | `background: #111` | Fundo cinza escuro. `/*/` | Fundo cinza escuro. 🐛 corrigir sintaxe |
| 353 | `background: white` | Fundo fica branco. | Fundo branco ao passar o mouse. |
| 354 | `color: black` | Texto fica preto. | Texto preto ao passar o mouse. |
| 355 | `box-shadow: 0 0 6px white` | Adiciona um brilho branco ao redor. | Adiciona um brilho branco ao redor. ✅ |
| 379 | `border: 3px dashed #000` | Borda preta tracejada. | Borda preta tracejada. ✅ |
| 381 | `color: #000` | Cor do texto (ícone) preta. | Cor do texto (ícone) preta. ✅ |
| 383 | ver `transition: 0.5s` | | Animação suave das mudanças. |
| 392 | `border-color: white` | Borda fica branca. | Borda branca ao passar o mouse. |
| 393, 354 | (hover color) | | |
| 402, 403 | `width/height` (input) | Largura/Altura do campo. | Largura/Altura do campo. ✅ |
| 405 | `margin-left: 34px` | Margem à esquerda. | Margem à esquerda. ✅ |
| 420 | `background-size: 100% auto` | Fundo cobre 100% da largura, altura automática. | ✅ Manter |
| 431 | `background-size: auto 100%` | Fundo cobre 100% da altura, largura automática. | ✅ Manter |

## Pontos de decisão

1. **Linha 340 (bug):** o comentário está com `/*/` no final — precisa ser corrigido independentemente da padronização.
2. **Linhas contextuais:** manter comentários que citam o elemento (rodapé, pop-up, botões, barra de rolagem, input) em vez de padronizar.
3. **Padronização dos demais:** aplicar o comentário da coluna "Sugestão" para simplificar e uniformizar.
