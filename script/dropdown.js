/*===============================================================================*/
/*                    SCRIPT DE MENUS DROPDOWN DA BARRA DE NAVEGAÇÃO              */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*                    - Lógica centralizada para os menus dropdown               */
/*                    - Downloads de bíblias em PDF e recursos externos          */
/*                    - Harpa, hinários e utilitários                           */
/*===============================================================================*/

/* BLOCO: Implementa a funcionalidade de menus suspensos isolando o escopo global através de uma IIFE          */
(function() {                                                                                       /* Inicia a função autoexecutável   */
    'use strict';                                                                                   /* Ativa o modo de escrita rígido   */
    console.log("[dropdown.js] Script iniciado.");                                                  /* Registra o início do script      */
    const basePath = '../';                                                                         /* Define o caminho base do projeto */

    /* BLOCO: Define a lista de documentos e bíblias disponíveis para download em formato digital PDF          */
    const downloads = [
        { texto: 'A Bíblia Católica', link: `${basePath}baixar/A_Biblia_Catolica.pdf` },            /* Link para Bíblia Católica        */
        { texto: 'A Bíblia Sagrada NVT', link: `${basePath}baixar/A_Biblia_Sagrada_NVT.pdf` },      /* Link para Bíblia Sagrada NVT     */
        { texto: 'A Bíblia Viva', link: `${basePath}baixar/A_Biblia_Viva.pdf` },                    /* Link para Bíblia Viva            */
        { texto: 'A vida completa de Jesus', link: `${basePath}baixar/Juanribe_Pagliarin.pdf` },    /* Link para obra de Juanribe       */
        { texto: 'Bíblia de Genebra', link: `${basePath}baixar/Biblia_Genebra_so_estudo.pdf` },     /* Link para Bíblia de Genebra      */
        { texto: 'Bíblia em ordem NVI', link: `${basePath}baixar/Cronologica_NVI.pdf` },            /* Link para Bíblia Cronológica     */
        { texto: 'Bíblia explicada', link: `${basePath}baixar/Biblia_explicada.pdf` },              /* Link para Bíblia Explicada       */
        { texto: 'Bíblia KJA', link: `${basePath}baixar/Biblia_KJA.pdf` },                          /* Link para Bíblia King James      */
        { texto: 'Bíblia Palavra-Chave', link: `${basePath}baixar/Biblia_palavra_chave.pdf` },      /* Link para Bíblia Palavra-Chave   */
        { texto: 'Bíblia Thompson', link: `${basePath}baixar/Biblia_Thompson.pdf` }                 /* Link para Bíblia Thompson        */
    ];

    /* BLOCO: Define a lista de recursos auxiliares como dicionários e concordâncias bíblicas                  */
    const dicionario = [
        { texto: 'Dicionário biblico', link: '../html/dicionario.html' },                           /* Link para o dicionário interno   */
        { texto: 'Concordância (Em breve)', link: '#' }                                             /* Link para futura concordância    */
    ];

    /* BLOCO: Define a lista de hinários tradicionais como a Harpa Cristã e o Cantor Cristão                   */
    const harpaHinario = [
        { texto: 'Harpa Cristã (Em breve)', link: '#' },                                            /* Link para futura Harpa Cristã    */
        { texto: 'Cantor Cristão (Em breve)', link: '#' }                                           /* Link para futuro Cantor Cristão  */
    ];

    /* BLOCO: Define a lista de ferramentas externas e links úteis para o estudo bíblico aprofundado           */
    const utilidades = [
        { texto: 'IA Ajudar a estudar a biblia', link: 'https://bible.ai/pt' },                     /* Link para Inteligência Artificial*/
        { texto: 'Posso conhecer a Deus', link: 'https://caniknowgod.com/' },                       /* Link para site evangelístico     */
        { texto: 'Dicionário e Comentário', link: 'https://www.apologeta.com.br' },                 /* Link para site do Apologeta      */
        { texto: 'BíbliaOn', link: 'https://www.bibliaon.com/' },                                   /* Link para Bíblia Online          */
        { texto: 'Cursos', link: `${basePath}html/cursos.html` }                                    /* Link para seção de cursos        */
    ];

    /* BLOCO: Função responsável por gerar dinamicamente os itens de cada lista suspensa do menu de navegação  */
    function preencherLista(idLista, itens) {
        const elementoLista =
            document.getElementById(idLista) ||
            document.getElementById(String(idLista).replace(/-lista$/, '-list')) ||
            document.getElementById(String(idLista).replace(/-list$/, '-lista'));                   /* Busca a lista no DOM (compat. -lista/-list) */
        if (!elementoLista) {
            console.warn(`[dropdown.js] Lista '${idLista}' nao encontrada.`);                       /* Alerta caso o ID não exista      */
            return;
        }
        elementoLista.innerHTML = '';                                                              /* Limpa o conteúdo atual da lista  */
        itens.forEach(item => {
            const li = document.createElement('li');                                               /* Cria o item da lista             */
            const a = document.createElement('a');                                                 /* Cria o link do item              */
            a.href = item.link;                                                                    /* Define o endereço do link        */
            a.innerHTML = item.texto;                                                              /* Insere o nome do recurso         */
            if (item.link !== '#' && (item.link.startsWith('http') || item.link.endsWith('.pdf'))) {
                a.target = '_blank';                                                               /* Abre links externos em nova aba  */
                a.rel = 'noopener noreferrer';                                                     /* Atribui segurança ao link        */
            }
            li.appendChild(a);                                                                     /* Anexa o link ao marcador         */
            elementoLista.appendChild(li);                                                         /* Anexa o marcador à lista         */
        });
    }

    /* BLOCO: Função que altera o estado visual da lista para visível utilizando a propriedade display         */
    function mostrarLista(idLista) {
        const elementoLista =
            document.getElementById(idLista) ||
            document.getElementById(String(idLista).replace(/-lista$/, '-list')) ||
            document.getElementById(String(idLista).replace(/-list$/, '-lista'));                   /* Localiza a lista pelo ID (compat.) */
        if (elementoLista) {
            elementoLista.style.display = 'block';                                                 /* Torna o menu visível             */
        }
    }

    /* BLOCO: Função que altera o estado visual da lista para oculto utilizando a propriedade display          */
    function ocultarLista(idLista) {
        const elementoLista =
            document.getElementById(idLista) ||
            document.getElementById(String(idLista).replace(/-lista$/, '-list')) ||
            document.getElementById(String(idLista).replace(/-list$/, '-lista'));                   /* Localiza a lista pelo ID (compat.) */
        if (elementoLista) {
            elementoLista.style.display = 'none';                                                  /* Esconde o menu                   */
        }
    }

    /* BLOCO: Configura os escutadores de eventos para gerenciar a abertura e o fechamento dos menus suspensos */
    function setupDropdownEvents() {
        const dropdownTriggers = document.querySelectorAll('nav ul li.menu-suspenso > a');              /* Captura os gatilhos do menu      */
        dropdownTriggers.forEach((trigger, index) => {
            const dropdownContainer = trigger.parentElement;                                       /* Identifica o pai do gatilho      */
            const listContent = dropdownContainer.querySelector('.conteudo-menu-suspenso');        /* Localiza a lista interna         */

            if (!listContent) return;
            if (listContent.id) {
                let hideTimeout;                                                                   /* Buffer para o tempo de fechamento*/
                const show = () => {
                    clearTimeout(hideTimeout);                                                     /* Cancela o agendamento de fechar  */
                    mostrarLista(listContent.id);                                                  /* Exibe o menu suspenso            */
                };
                const startHideTimeout = () => {
                    hideTimeout = setTimeout(() => {                                               /* Agenda o fechamento para 250ms   */
                        const currentContainer = trigger.parentElement;                            /* Pega o contêiner atual           */
                        const currentList = document.getElementById(listContent.id);               /* Pega a lista pelo ID             */

                        if (!currentContainer.matches(':hover') && (!currentList || !currentList.matches(':hover'))) {
                            ocultarLista(listContent.id);                                          /* Oculta se o mouse saiu do menu   */
                        }
                    }, 250);
                };
                dropdownContainer.addEventListener('mouseenter', show);                            /* Evento de entrada no contêiner   */
                dropdownContainer.addEventListener('mouseleave', startHideTimeout);                /* Evento de saída do contêiner     */
                listContent.addEventListener('mouseenter', show);                                  /* Evento de entrada na lista       */
                listContent.addEventListener('mouseleave', startHideTimeout);                      /* Evento de saída da lista         */
            }
        });
    }

    /* BLOCO: Inicializa o preenchimento das listas e configura os eventos de interface após a carga total do DOM */
    document.addEventListener('DOMContentLoaded', () => {
        console.log("[dropdown.js] DOM completamente carregado.");                                 /* Log de carregamento concluído    */
        preencherLista('baixar-lista', downloads);                                                  /* Alimenta lista de downloads      */
        preencherLista('dicionario-lista', dicionario);                                             /* Alimenta lista de dicionário (compat.) */
        preencherLista('lista-harpa-hinario', harpaHinario);                                        /* Alimenta lista de hinários       */
        preencherLista('utilidades-lista', utilidades);                                              /* Alimenta lista de utilitários    */
        setupDropdownEvents();                                                                     /* Ativa o monitoramento do mouse   */
        console.log("[dropdown.js] Configuração dos menus concluída.");                            /* Log de finalização de sistema    */
    });
})();