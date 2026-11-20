/*===============================================================================*/

/*                     MÓDULO DE GERENCIAMENTO DO MODO LEITURA                   */

/*===============================================================================*/

/*  Este script controla:                                                        */

/*                       - O estado (ativo/inativo) do modo leitura              */

/*                       - O carregamento e a exibição do conteúdo               */

/*                       - A transição da interface ao entrar/sair do modo       */

/*                       - A navegação contínua entre capítulos                  */

/*===============================================================================*/



/* BLOCO: Cria uma função anônima e a executa imediatamente para isolar o código         */

(function() {

    'use strict';                                                                                       /* Ativa o modo rigoroso do sistema  */



    /* BLOCO: Define as variáveis globais que guardam o estado do módulo                 */

    window.modoLeituraAtivo = false;                                                                    /* Estado da tela de leitura         */

    window.ultimoLivroSelecionado = null;                                                               /* Memória do livro anterior         */

    window.ultimoCapituloSelecionado = null;                                                            /* Memória do capítulo anterior      */

    window.ultimoVersiculoSelecionado = null;                                                           /* Memória do versículo anterior     */



    /* BLOCO: Define a função principal que carrega e exibe o conteúdo do capítulo       */

    window.carregarCapituloModoLeitura = async function(livro, capitulo, versaoEspecifica) { 

        const areaConteudoLeitura = document.querySelector('section.conteudo');                         /* Captura área principal do site    */

        if (!areaConteudoLeitura) {                                                                     /* Verifica existência da área       */

            console.error('[Modo Leitura] A área de conteúdo principal não foi encontrada.');           /* Loga erro de interface            */

            return;

        }



        /* BLOCO: Busca e remove elementos da interface antiga para limpar a tela        */

        areaConteudoLeitura.querySelectorAll('.texto-versiculo, .conteudo-versiculos, div.versiculos:not(.conteudo-versiculos)').forEach(el => el.remove());

        

        await window.atualizaBotoesCapitulos(livro, capitulo);                                          /* Atualiza régua de capítulos       */



        /* BLOCO: Verifica se o container de leitura existe e o cria se necessário       */

        let containerLeitura = areaConteudoLeitura.querySelector('.modo-leitura-conteudo');             /* Acha o local de leitura           */

        if (!containerLeitura) {

            containerLeitura = document.createElement('div');                                           /* Cria o novo local de texto        */

            containerLeitura.className = 'modo-leitura-conteudo';                                       /* Define estilo visual exclusivo    */

            

            /* BLOCO: Encontra um ponto de referência para inserir o container           */

            const elementoReferencia = areaConteudoLeitura.querySelector('#dynamic-chapter-buttons-container') || areaConteudoLeitura.querySelector('h2'); 

            if (elementoReferencia) elementoReferencia.insertAdjacentElement('afterend', containerLeitura); 

            else areaConteudoLeitura.appendChild(containerLeitura);                                     /* Fixa no final por segurança       */

        }



        containerLeitura.innerHTML = '<div class="loading-message">Carregando capítulo...</div>';       /* Mostra aviso de carga             */

        containerLeitura.style.display = 'block';                                                       /* Garante visibilidade da caixa     */



        /* BLOCO: Inicia a tentativa de carregar e processar os dados do capítulo        */

        try {

            if (!livro) {

                throw new Error("O nome do livro não pode ser nulo.");                                  /* Interrompe se o nome faltar       */

            }

            

            const versoesQueUsamHtml = ['arc'];                                                         /* Define bíblias em HTML            */

            const versaoAtual = versaoEspecifica || window.BIBLE_VERSION || (window.obterPreferencia && window.obterPreferencia('versaoBiblicaSelecionada', 'ara')) || 'ara';

            

            console.log(`[Modo Leitura] Carregando ${livro} ${capitulo} na versão: ${versaoAtual}`);    /* Loga progresso da carga           */

            

            const ehVersaoHtml = versoesQueUsamHtml.includes(versaoAtual.toLowerCase());                /* Define se é arquivo HTML          */

            const htmlBotoesNavegacao = await window.gerarHtmlNavegacao(livro, capitulo);               /* Gera botões prox/anterior         */

            let htmlParaExibir = '';                                                                    /* Inicia buffer de texto            */

            let dadosCapitulo = window.obterCapítuloDoCache(livro, capitulo);                           /* Tenta ler da memória rápida       */

            

            /* BLOCO: Processa o carregamento de capítulos em formato HTML               */

            if (ehVersaoHtml) {

                if (!dadosCapitulo) {

                    const caminho = `../versao/${versaoAtual.toLowerCase()}/${livro.toLowerCase()}/${capitulo}.html`; 

                    const response = await fetch(caminho);                                              /* Baixa o arquivo do servidor       */

                    if (!response.ok) throw new Error(`Arquivo HTML não encontrado: ${caminho}`);       /* Trata erro de download            */

                    dadosCapitulo = await response.text();                                              /* Converte em texto puro            */

                    window.cacheCapitulo(livro, capitulo, dadosCapitulo);                               /* Salva na memória RAM              */

                }



                /* BLOCO: Converte string HTML em objeto DOM para extrair versos         */

                const doc = new DOMParser().parseFromString(dadosCapitulo, 'text/html');                /* Converte texto em HTML real       */

                let htmlConstruido = '<div class="chapter-verses">';                                    /* Inicia lista de versos            */

                doc.querySelectorAll('div[id^="versiculo-"]').forEach(div => {

                    const match = div.id.match(/(\d+)$/);                                               /* Extrai o número do ID             */

                    

                    /* BLOCO: Processa as tags individuais para construir o verso HTML   */

                    if (match) {

                        const numero = match[1];                                                        /* Define índice numérico            */

                        const titulo = div.querySelector('strong');                                     /* Busca subtítulos internos         */

                        

                        /* BLOCO: Adiciona o título da seção se houver no versículo      */

                        if (titulo) htmlConstruido += `<h3 class="titulo-secao-versiculo">${titulo.textContent.trim()}</h3>`; 

                        const clone = div.cloneNode(true);                                              /* Clona nó para manipulação         */

                        

                        /* BLOCO: Limpa o texto do versículo removendo o título          */

                        if (clone.querySelector('strong')) clone.querySelector('strong').remove();      /* Tira título do texto              */

                        const texto = clone.textContent.trim();                                         /* Isola texto bíblico puro          */

                        

                        if (texto) htmlConstruido += `<div class="verse-container"><sup class="verse-number">${numero}</sup><span class="verse-text">${texto}</span></div>`;

                    }

                });

                

                htmlConstruido += '</div>';

                htmlParaExibir = htmlConstruido;                                                        /* Define HTML final                 */

            

            } else {

                /* BLOCO: Processa o carregamento de capítulos em formato JSON           */

                if (!dadosCapitulo) {

                    const caminho = `../versao/${versaoAtual.toLowerCase()}/${livro.toLowerCase()}/${capitulo}.json`; 

                    const response = await fetch(caminho);                                              /* Baixa os dados do servidor        */

                    

                    /* BLOCO: Valida se o arquivo JSON foi encontrado no servidor        */

                    if (!response.ok) throw new Error(`Arquivo JSON não encontrado: ${caminho}`);       /* Trata falha de conexão            */

                    dadosCapitulo = await response.json();                                              /* Converte em objeto real           */
                    window.cacheCapitulo(livro, capitulo, dadosCapitulo);                               /* Salva na memória RAM              */
                }

                /* BLOCO: Inicializa a montagem da lista de versículos via JSON          */
                const listaVersiculos = dadosCapitulo.versiculos || {};
                const primeiroVersiculo = Object.values(listaVersiculos).find(versiculo => versiculo && typeof versiculo === 'object');
                const ehOriginal = versaoAtual.toLowerCase() === 'original' && Array.isArray(primeiroVersiculo?.palavras);
                const ehHebraicoOriginal = ehOriginal && primeiroVersiculo.palavras.some(palavra => typeof palavra.hebraico === 'string' && palavra.hebraico.trim() !== ''); /* AT: hebraico RTL */
                const ehGregoOriginal   = ehOriginal && !ehHebraicoOriginal && primeiroVersiculo.palavras.some(palavra => typeof palavra.grego   === 'string' && palavra.grego.trim()   !== ''); /* NT: grego LTR  */
                const escaparHtml = valor => String(valor ?? '').replace(/[&<>"']/g, caractere => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[caractere]));
                let titulosDoCapitulo = dadosCapitulo.titulos || {};
                if ((ehHebraicoOriginal || ehGregoOriginal) && Object.keys(titulosDoCapitulo).length === 0) {
                    try {
                        const responseTitulos = await fetch(`../versao/acf/${livro.toLowerCase()}/${capitulo}.json`);
                        if (responseTitulos.ok) {
                            const capituloComTitulos = await responseTitulos.json();
                            titulosDoCapitulo = capituloComTitulos.titulos || {};
                        }
                    } catch (erroTitulos) {
                        console.warn('[Modo Leitura] Não foi possível carregar títulos auxiliares da ACF.', erroTitulos);
                    }
                }
                let htmlVersiculos = `<div class="chapter-verses${ehHebraicoOriginal ? ' hebrew-chapter' : (ehGregoOriginal ? ' greek-chapter' : '')}"${ehHebraicoOriginal ? ' dir="ltr"' : ''}>`; /* Inicia lista de versos */
                if (dadosCapitulo.titulo) htmlVersiculos += `<h3 class="chapter-main-title">${escaparHtml(dadosCapitulo.titulo)}</h3>`;
                const versiculosOrdenados = Object.entries(listaVersiculos).sort(([a], [b]) => Number(a) - Number(b));

                /* BLOCO: Constrói a lista de versículos a partir do objeto JSON         */
                for (const [chave, versiculo] of versiculosOrdenados) {
                    const numero = escaparHtml(chave);
                    if (titulosDoCapitulo[chave]) {
                        htmlVersiculos += `<h3 class="titulo-secao-versiculo">${escaparHtml(titulosDoCapitulo[chave])}</h3>`;
                    }

                    if (ehHebraicoOriginal && versiculo && Array.isArray(versiculo.palavras)) {
                        /* AT — palavras da direita para a esquerda (RTL) */
                        const palavrasComTexto = versiculo.palavras.filter(palavra => palavra && (palavra.hebraico || palavra.transliteral || palavra.traducao_palavra));
                        if (palavrasComTexto.length) {
                            const htmlPalavras = palavrasComTexto.map(palavra => `<span class="hebrew-word" dir="rtl"><span class="hebrew-word-original" lang="he">${escaparHtml(palavra.hebraico)}</span><span class="hebrew-word-transliteral" lang="und" dir="ltr">${escaparHtml(palavra.transliteral)}</span><span class="hebrew-word-translation" lang="pt" dir="ltr">${escaparHtml(palavra.traducao_palavra)}</span></span>`).join('');
                            const traducaoCompleta = versiculo?.traducao_completa ? `<div class="hebrew-verse-translation" dir="ltr">${escaparHtml(versiculo.traducao_completa)}</div>` : "";
                            htmlVersiculos += `<div class="verse-container hebrew-verse" dir="ltr"><sup class="verse-number">${numero}</sup>${traducaoCompleta}<div class="hebrew-words" dir="rtl">${htmlPalavras}</div></div>`;
                        }
                    } else if (ehGregoOriginal && versiculo && Array.isArray(versiculo.palavras)) {
                        /* NT — palavras da esquerda para a direita (LTR) */
                        const palavrasComTexto = versiculo.palavras.filter(palavra => palavra && (palavra.grego || palavra.transliteral || palavra.traducao_palavra));
                        if (palavrasComTexto.length) {
                            const htmlPalavras = palavrasComTexto.map(palavra => `<span class="greek-word"><span class="greek-word-original" lang="el">${escaparHtml(palavra.grego)}</span><span class="greek-word-transliteral" lang="und">${escaparHtml(palavra.transliteral)}</span><span class="greek-word-translation" lang="pt">${escaparHtml(palavra.traducao_palavra)}</span></span>`).join('');
                            const traducaoCompleta = versiculo?.traducao_completa ? `<div class="greek-verse-translation">${escaparHtml(versiculo.traducao_completa)}</div>` : "";
                            htmlVersiculos += `<div class="verse-container greek-verse"><sup class="verse-number">${numero}</sup>${traducaoCompleta}<div class="greek-words">${htmlPalavras}</div></div>`;
                        }
                    } else {
                        const texto = typeof versiculo === 'string' ? versiculo : (versiculo?.traducao_completa || '');
                        htmlVersiculos += `<div class="verse-container"><sup class="verse-number">${numero}</sup><span class="verse-text">${escaparHtml(texto)}</span></div>`;
                    }
                }

                htmlVersiculos += '</div>';
                htmlParaExibir = htmlVersiculos;                                                        /* Finaliza HTML por objeto          */

            }



            /* BLOCO: Sincroniza o conteúdo gerado com a interface principal do site     */

            containerLeitura.innerHTML = htmlBotoesNavegacao + htmlParaExibir;                          /* Injeta conteúdo na página         */

            await window.configurarListenersNavegacao(containerLeitura, livro, capitulo);               /* Ativa setas e botões              */

            const tituloH2 = areaConteudoLeitura.querySelector('h2');                                   /* Seleciona o título da página      */

            

            /* BLOCO: Atualiza o título H2 detalhado com livro e capítulo                */

            if (tituloH2 && typeof window.getLivroDisplayName === 'function') {

                tituloH2.textContent = `${window.getLivroDisplayName(livro)} - CAPÍTULO ${capitulo}`;   /* Atualiza o título H2              */

                Object.assign(tituloH2.style, { color: '#f0ad4e', textAlign: 'center', marginBottom: '20px' }); 

            }

        } catch (erro) {

            

            /* BLOCO: Registra a falha técnica e exibe alerta visual ao usuário          */

            console.error('[Modo Leitura] Erro:', erro);                                                /* Relata falha técnica              */

            containerLeitura.innerHTML = `<div class="error-container" style="text-align:center; padding: 20px; color: red;">    

                                            <p><b>Erro ao carregar o capítulo.</b></p>

                                            <p><small>${erro.message}</small></p>

                                        </div>`;                                                        /* Mostra alerta visual              */

        }

    };



    /* BLOCO: Gerencia a transição entre modo de leitura e o modo padrão                 */

    window.toggleReadingMode = async function(ativar, livro, capitulo) {

        window.modoLeituraAtivo = ativar;                                                               /* Atualiza estado global            */

        const botao = document.getElementById('modo-leitura');

        

        /* BLOCO: Atualiza a aparência visual do botão do modo leitura                   */

        if (botao) {

            botao.classList.toggle('active', ativar);                                                   /* Muda destaque visual              */

            botao.setAttribute('aria-pressed', String(ativar));                                         /* Informa leitores de tela          */

        }



        /* BLOCO: Captura e valida a integridade da seção de conteúdo principal          */

        const areaConteudo = document.querySelector('section.conteudo');                                /* Seleciona contêiner principal     */

        if (!areaConteudo) {

            console.error("toggleReadingMode: section.conteudo não encontrada.");                       /* Relata erro de localização        */

            return;

        }



        const tituloH2 = areaConteudo.querySelector('h2');                                              /* Captura título H2                 */

        

        /* BLOCO: Inicia a configuração visual e lógica do modo de leitura               */

        if (ativar) {

            document.body.classList.add('module-leitura');                                              /* Aplica CSS de leitura             */

            window.ultimoLivroSelecionado = window.activeLivro || livro;                                /* Salva livro atual                 */

            window.ultimoCapituloSelecionado = window.activeCapitulo || capitulo;                       /* Salva capítulo atual              */

            

            /* BLOCO: Preserva o versículo atual e limpa a interface para o modo leitura */

            window.ultimoVersiculoSelecionado = (window.activeVersiculoButton && window.activeVersiculoButton.dataset.versiculo) ? parseInt(window.activeVersiculoButton.dataset.versiculo) : 1;

            areaConteudo.querySelectorAll('.texto-versiculo, .conteudo-versiculos, #dynamic-chapter-buttons-container, #dynamic-verse-buttons-container').forEach(el => el.remove());



            /* BLOCO: Identifica a tradução ativa e inicia a carga do conteúdo           */

            if (window.ultimoLivroSelecionado && window.ultimoCapituloSelecionado) {

                const versaoAtual = window.BIBLE_VERSION || (window.obterPreferencia && window.obterPreferencia('versaoBiblicaSelecionada', 'ara')) || 'ara';

                console.log(`[Modo Leitura] Ativando com versão: ${versaoAtual}`);                      /* Detecta tradução ativa            */

                await window.carregarCapituloModoLeitura(window.ultimoLivroSelecionado, window.ultimoCapituloSelecionado, versaoAtual);

            } else {

                

                /* BLOCO: Cria o contêiner de exibição para mensagens de aviso           */

                let containerLeitura = areaConteudo.querySelector('.modo-leitura-conteudo');            /* Tenta achar caixa de leitura      */

                if (!containerLeitura) {

                    containerLeitura = document.createElement('div');                                   /* Cria nova caixa de conteúdo       */

                    containerLeitura.className = 'modo-leitura-conteudo';                               /* Estiliza a caixa                  */

                    if (tituloH2) tituloH2.insertAdjacentElement('afterend', containerLeitura); 

                    else areaConteudo.appendChild(containerLeitura);                                    /* Fixa no final do site             */

                }



                /* BLOCO: Exibe instrução ao usuário caso não haja seleção prévia        */

                containerLeitura.innerHTML = '<div class="reading-mode-message" style="text-align:center; padding: 20px;"><p>Por favor, selecione um livro e capítulo primeiro.</p></div>';

                containerLeitura.style.display = 'block';                                               /* Exibe aviso de seleção            */

                if (tituloH2) tituloH2.textContent = "Modo Leitura";                                    /* Renomeia título da página         */

            }

        } else {

            

            /* BLOCO: Restaura as classes do corpo e limpa o contêiner de leitura        */

            document.body.classList.remove('module-leitura');                                           /* Remove estilos de leitura         */

            const containerLeitura = areaConteudo.querySelector('.modo-leitura-conteudo');

            if (containerLeitura) containerLeitura.remove();                                            /* Remove caixa de texto longo       */

            

            /* BLOCO: Restaura a visualização padrão e sincroniza o estado da bíblia     */

            if (window.ultimoLivroSelecionado && window.ultimoCapituloSelecionado) {

                await window.atualizaBotoesCapitulos(window.ultimoLivroSelecionado, window.ultimoCapituloSelecionado); 

                if (typeof window.toggleVersiculos === 'function') {

                    await window.toggleVersiculos(window.ultimoLivroSelecionado, window.ultimoCapituloSelecionado); 

                }

                

                /* BLOCO: Identifica qual versículo deve ser focado no retorno           */

                let versiculoParaCarregar = window.ultimoVersiculoSelecionado || 1;                     /* Define versículo de retorno       */

                if (typeof window.loadSpecificVerse === 'function') {

                    await window.loadSpecificVerse(window.ultimoLivroSelecionado, window.ultimoCapituloSelecionado, versiculoParaCarregar); 

                }

                

                /* BLOCO: Restaura o título H2 com livro, capítulo e versículo           */

                if (tituloH2 && typeof window.getLivroDisplayName === 'function') {

                    tituloH2.textContent = `${window.getLivroDisplayName(window.ultimoLivroSelecionado)} - CAPÍTULO ${window.ultimoCapituloSelecionado} - VERSÍCULO ${versiculoParaCarregar}`; 

                    Object.assign(tituloH2.style, { color: '', textAlign: '', marginBottom: '' });      /* Restaura títulos                  */

                }



                /* BLOCO: Sincroniza as variáveis de controle global do livro            */

                window.activeLivro = window.ultimoLivroSelecionado;                                     /* Sincroniza estado global          */

                window.activeCapitulo = window.ultimoCapituloSelecionado;                               /* Sincroniza estado global          */

            } else {

                

                /* BLOCO: Prepara o estado padrão de reset caso não haja dados           */

                const versao = window.obterPreferencia('versaoBiblicaSelecionada', 'ara');

                window.defineTituloPagina(versao);                                                      /* Reseta para o título inicial      */

                

                /* BLOCO: Define o texto de orientação padrão no título da página        */

                if (tituloH2) {

                    tituloH2.textContent = "Selecione um Livro";                                        /* Reseta título inicial             */

                    Object.assign(tituloH2.style, { color: '', textAlign: '', marginBottom: '' }); 

                }

                areaConteudo.querySelectorAll('#dynamic-chapter-buttons-container').forEach(c => c.remove()); 

            }

        }

    };



    console.log('[versoes_modoleitura.js] Módulo carregado e pronto.');                                 /* Loga prontidão do sistema         */

})();
