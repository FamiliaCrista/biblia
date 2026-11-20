/**
 * Sistema de concordância otimizado com carregamento sob demanda
 */
class ConcordanciaOptimized {
    constructor() {
        if (!window.dataManager) {
            window.dataManager = new DataManager();
        }
        this.dataManager = window.dataManager;
        
        this.currentLetter = 'A';
        this.currentPage = 0;
        this.isLoading = false;
        this.hasMore = true;
        this.currentResults = [];
        this.termoBusca = '';
        this.filters = {
            testamento: 'todos',
            livro: 'todos'
        };
        // Propriedades para o contador
        this.visibleCount = 0;
        this.totalResultsCount = 0;
        this.pageSize = 50; // Define um tamanho de página padrão

        this.initializeElements();
        this.bindEvents();
        this.loadInitialData();
    }

    initializeElements() {
        this.elements = {
            resultadosContainer: document.getElementById('resultados-container') || document.getElementById('resultados-container'),
            carregamentoIndicador: document.getElementById('carregamento-indicador'),
            contadorResultados: document.getElementById('contador-resultados'),
            resultadosVisiveis: document.getElementById('resultados-visiveis'),
            totalResultados: document.getElementById('total-resultados'),
            carregarMais: document.getElementById('carregar-mais'),
            filtroPalavra: document.getElementById('filtro-palavra-input'),
            testamentoSelect: document.getElementById('testamento-select'),
            livroSelect: document.getElementById('livro-select'),
            buscaGlobal: document.getElementById('busca-global'),
            botaoBuscar: document.getElementById('botao-buscar') || document.getElementById('botao-buscar'),
            letrasBtns: document.querySelectorAll('.letra-botao')
        };
    }

    bindEvents() {
        // Eventos dos botões de letras
        this.elements.letrasBtns.forEach(botao => {
            botao.addEventListener('click', (e) => {
                const letra = e.target.dataset.letra;
                this.selectLetter(letra);
            });
        });

        // Evento do botão carregar mais
        if (this.elements.carregarMais) {
            this.elements.carregarMais.addEventListener('click', () => {
                this.loadMoreResults();
            });
        }

        // Eventos de busca
        if (this.elements.botaoBuscar) {
            this.elements.botaoBuscar.addEventListener('click', () => {
                this.performGlobalSearch();
            });
        }

        if (this.elements.buscaGlobal) {
            this.elements.buscaGlobal.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performGlobalSearch();
                }
            });
        }

        // Evento input para busca global com debounce
        let debounceTimeout;
        if (this.elements.buscaGlobal) {
            this.elements.buscaGlobal.addEventListener('input', (e) => {
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(() => {
                    const searchTerm = e.target.value.trim();
                    if (!searchTerm) {
                        this.termoBusca = '';
                        this.filters.testamento = 'todos';
                        this.filters.livro = 'todos';
                        if (this.elements.filtroPalavra) {
                            this.elements.filtroPalavra.value = '';
                            this.elements.filtroPalavra.disabled = false; // Reabilita o filtro de palavra
                        }
                        this.resetDropdowns();
                        this.selectLetter(this.currentLetter); // Recarrega a lista da letra atual
                    } else {
                        // Limpa imediatamente a área de resultados quando começar a digitar
                        if (this.elements.resultadosContainer) this.elements.resultadosContainer.innerHTML = '';
                        if (this.elements.contadorResultados) this.elements.contadorResultados.style.display = 'none';
                        if (this.elements.carregarMais) this.elements.carregarMais.style.display = 'none';
                        
                        if (this.elements.filtroPalavra) {
                            this.elements.filtroPalavra.disabled = true; // Desabilita o filtro de palavra
                        }
                    }
                }, 300); // Aguarda 300ms após a última digitação
            });
        }

        // Filtro de palavra em tempo real (só será acionado se o campo não estiver desabilitado)
        if (this.elements.filtroPalavra) {
            this.elements.filtroPalavra.addEventListener('input', (e) => {
                if (!this.elements.filtroPalavra.disabled) {
                    this.filterCurrentResults(e.target.value);
                }
            });
        }

        // Eventos para dropdowns customizados
        this.setupCustomDropdownEvents();
    }

    setupCustomDropdownEvents() {
        this.setupTestamentoDropdown();
        this.setupLivroDropdown();
        this.setupDropdownToggleEvents();
    }

    setupTestamentoDropdown() {
        const testamentoSelect = document.getElementById('custom-testamento-select');
        if (!testamentoSelect) return;

        const selectedDisplay = testamentoSelect.querySelector('.opcao-selecionada');
        const itemsContainer = testamentoSelect.querySelector('.opcoes-seletor');
        
        if (!selectedDisplay || !itemsContainer) return;

        // Evento para abrir/fechar dropdown
        selectedDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeAllDropdowns();
            itemsContainer.classList.toggle('seletor-oculto');
            itemsContainer.classList.toggle('select-hide');
            selectedDisplay.classList.toggle('select-arrow-active');
            selectedDisplay.classList.toggle('seta-ativa');
        });

        // Eventos para os itens do dropdown
        itemsContainer.querySelectorAll('div').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const valor = item.getAttribute('data-value') || 'todos';
                const texto = item.textContent;
                
                // Atualiza display
                selectedDisplay.textContent = texto;
                selectedDisplay.setAttribute('data-value', valor);
                
                // Remove seleção anterior e marca nova
                itemsContainer.querySelectorAll('div').forEach(div => {
                    div.classList.remove('same-as-selected', 'selecionado-igual', 'mesmo-que-selecionado');
                });
                item.classList.add('same-as-selected', 'selecionado-igual', 'mesmo-que-selecionado');
                
                // Atualiza filtro
                this.filters.testamento = valor;
                
                // Atualiza dropdown de livros
                this.updateLivroDropdown(valor);
                
                // Aplica filtros
                this.renderFilteredResults();
                
                // Fecha dropdown
                this.closeAllDropdowns();
                
                console.log(`[FILTRO] Testamento selecionado: ${valor}`);
            });
        });
    }

    setupLivroDropdown() {
        const livroSelect = document.getElementById('custom-livro-select');
        if (!livroSelect) return;

        const selectedDisplay = livroSelect.querySelector('.opcao-selecionada');
        const itemsContainer = livroSelect.querySelector('.opcoes-seletor');
        
        if (!selectedDisplay || !itemsContainer) return;

        // Evento para abrir/fechar dropdown
        selectedDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeAllDropdowns();
            itemsContainer.classList.toggle('seletor-oculto');
            itemsContainer.classList.toggle('select-hide');
            selectedDisplay.classList.toggle('select-arrow-active');
            selectedDisplay.classList.toggle('seta-ativa');
        });

        // Eventos para os itens serão configurados dinamicamente em updateLivroDropdown
    }

    setupDropdownToggleEvents() {
        // Fecha dropdowns ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.select-personalizado')) {
                this.closeAllDropdowns();
            }
        });
    }

    closeAllDropdowns() {
        document.querySelectorAll('.select-personalizado .opcoes-seletor, .custom-select .select-items').forEach(container => {
            container.classList.add('seletor-oculto', 'select-hide');
        });
        document.querySelectorAll('.select-personalizado .opcao-selecionada, .custom-select .select-selected').forEach(display => {
            display.classList.remove('select-arrow-active', 'seta-ativa');
        });
    }

    async loadInitialData() {
        await this.selectLetter('A');
    }

    async selectLetter(letra) {
        if (this.isLoading) return;

        // Atualiza UI
        this.updateActiveLetterButton(letra);
        this.currentLetter = letra;
        this.currentPage = 0;
        this.currentResults = [];
        this.termoBusca = '';
        // Reseta contadores e pageSize
        this.visibleCount = 0;
        this.totalResultsCount = 0;
        this.pageSize = 50; // Reseta para o padrão
        
        // Reset filtros
        this.filters = {
            testamento: 'todos',
            livro: 'todos'
        };
        
        this.elements.buscaGlobal.value = '';
        this.elements.filtroPalavra.value = '';
        this.elements.filtroPalavra.disabled = false; // Garante que o filtro de palavra esteja habilitado
        
        // Reset dropdowns visuais
        this.resetDropdowns();

        // Carrega dados
        await this.loadLetterData(letra, 0, true);
        
        // Atualiza dropdown de livros baseado no testamento padrão
        this.updateLivroDropdown('todos');
    }
    
    resetDropdowns() {
        // Reset dropdown de testamento
        const testamentoSelect = document.getElementById('custom-testamento-select');
        if (testamentoSelect) {
            const selected = testamentoSelect.querySelector('.opcao-selecionada');
            if (selected) {
                selected.textContent = 'Todos';
                selected.dataset.value = 'todos';
            }
        }
        
        // Reset dropdown de livro
        const livroSelect = document.getElementById('custom-livro-select');
        if (livroSelect) {
            const selected = livroSelect.querySelector('.opcao-selecionada');
            if (selected) {
                selected.textContent = 'Todos os livros';
                selected.dataset.value = 'todos';
            }
        }
    }

    async loadLetterData(letra, page = 0, clearResults = false) {
        if (this.isLoading) return;

        if (clearResults) {
            this.elements.resultadosContainer.innerHTML = '';
            this.elements.contadorResultados.style.display = 'none';
            this.elements.carregarMais.style.display = 'none';
        }

        this.showLoading(true);
        this.isLoading = true;

        try {
            const result = await this.dataManager.loadLetterData(letra, page);
            
            // Define o tamanho da página na primeira carga de uma letra
            if (page === 0) {
                this.pageSize = result.data.length || 50;
            }

            // Calcula a contagem cumulativa de resultados visíveis
            this.visibleCount = (page * this.pageSize) + result.data.length;
            // Garante que a contagem não exceda o total (para a última página)
            if (this.visibleCount > result.total) {
                this.visibleCount = result.total;
            }
            this.totalResultsCount = result.total;

            this.currentResults = result.data; // Substitui os resultados pela página atual
            this.hasMore = result.hasMore;
            this.currentPage = page;

            this.renderResults(this.currentResults, false); // Renderiza a página inteira
            this.updateResultsCounter(this.visibleCount, this.totalResultsCount);
            this.updateLoadMoreButton();

        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            this.showError('Erro ao carregar dados. Tente novamente.');
        } finally {
            this.showLoading(false);
            this.isLoading = false;
        }
    }

    async loadMoreResults() {
        if (!this.hasMore || this.isLoading) return;

        if (this.termoBusca) {
            return;
        }
        
        const nextPage = this.currentPage + 1;
        this.showLoading(true);
        this.isLoading = true;
        
        try {
            const result = await window.dataManager.loadLetterData(this.currentLetter, nextPage);
            
            this.currentResults = [...this.currentResults, ...result.data];
            this.hasMore = result.hasMore;
            this.currentPage = nextPage;
            
            this.renderResults(result.data, true);
            
            const novoMostrandoValor = this.currentResults.length;
            this.elements.resultadosVisiveis.textContent = novoMostrandoValor;
            
            this.updateLoadMoreButton();
            
        } catch (error) {
            console.error('Erro ao carregar mais dados:', error);
            this.showError('Erro ao carregar dados. Tente novamente.');
        } finally {
            this.showLoading(false);
            this.isLoading = false;
        }
    }

    async performGlobalSearch() {
        const searchTerm = this.elements.buscaGlobal ? this.elements.buscaGlobal.value.trim() : '';

        if (!searchTerm || searchTerm.length === 0) {
            this.termoBusca = '';
            this.filters.testamento = 'todos';
            this.filters.livro = 'todos';
            if (this.elements.filtroPalavra) {
                this.elements.filtroPalavra.value = '';
                this.elements.filtroPalavra.disabled = false;
            }
            this.resetDropdowns();
            this.selectLetter(this.currentLetter);
            return;
        }

        if (this.isLoading) return;

        if (this.elements.resultadosContainer) this.elements.resultadosContainer.innerHTML = '';
        if (this.elements.contadorResultados) this.elements.contadorResultados.style.display = 'none';
        if (this.elements.carregarMais) this.elements.carregarMais.style.display = 'none';
        
        this.showLoading(true);
        this.isLoading = true;
        this.termoBusca = searchTerm;

        this.filters.testamento = 'todos';
        this.filters.livro = 'todos';
        if (this.elements.filtroPalavra) {
            this.elements.filtroPalavra.value = '';
            this.elements.filtroPalavra.disabled = true;
        }
        this.resetDropdowns();

        try {
            const result = await this.buscarEmTodosArquivos(searchTerm);

            this.currentResults = result.data;
            this.hasMore = false; 

            this.visibleCount = result.data.length;
            this.totalResultsCount = result.total;

            this.renderResults(result.data, false);
            this.updateResultsCounter(this.visibleCount, this.totalResultsCount);
            this.updateLoadMoreButton();

            if (result.data.length === 0) {
                this.showNoResults(`Nenhum resultado encontrado para "${searchTerm}".`);
            }

        } catch (error) {
            console.error('Erro na busca global:', error);
            this.showError('Erro ao realizar busca. Tente novamente.');
        } finally {
            this.showLoading(false);
            this.isLoading = false;
        }
    }

    filterCurrentResults(filterTerm) {
        this.renderFilteredResults();
    }

    applyFilters() {
        this.renderFilteredResults();
    }

    // ===== FUNÇÃO REVISADA E CORRIGIDA =====
    renderFilteredResults() {
        // 1. Cria uma cópia profunda dos resultados originais
        const originalDataCopy = JSON.parse(JSON.stringify(this.currentResults));
        const filterTerm = this.elements.filtroPalavra?.value?.trim().toLowerCase() || '';

        // 2. Normaliza o filtro de testamento
        let testamentoFiltro = this.filters.testamento;
        if (testamentoFiltro === 'Velho Testamento') {
            testamentoFiltro = 'Antigo Testamento';
        }

        // 3. Filtra a lista principal de palavras
        const finalResults = originalDataCopy.map(item => {
            // Filtra os versículos por testamento/livro
            const filteredConcordancias = item.concordancias.filter(concordancia => {
                const referenciaNome = this.extractBookName(concordancia.referencia);
                const livroTestamento = this.getBookTestament(referenciaNome);
                
                // Verifica o testamento
                const testamentoMatch = testamentoFiltro === 'todos' || 
                                      livroTestamento === testamentoFiltro;
                
                // Verifica o livro específico
                const livroConfig = this.findBookById(this.filters.livro);
                let livroMatch = true;
                
                if (this.filters.livro !== 'todos' && livroConfig) {
                    // Comparação mais flexível para nomes de livros
                    const livroRef = referenciaNome.toLowerCase().replace(/\d/g, '').trim();
                    const livroFiltro = livroConfig.nome.toLowerCase().replace(/\d/g, '').trim();
                    livroMatch = livroRef.includes(livroFiltro) || livroFiltro.includes(livroRef);
                }
                
                return testamentoMatch && livroMatch;
            });

            // 4. Aplica o filtro de palavra
            let finalConcordancias = filteredConcordancias;
            if (filterTerm) {
                finalConcordancias = filteredConcordancias.filter(c => {
                    const textoMatch = c.texto.toLowerCase().includes(filterTerm);
                    const palavraMatch = item.palavra.toLowerCase().includes(filterTerm);
                    const sinonimosMatch = item['veja tambem'] && item['veja tambem'].some(
                        sinonimo => sinonimo.toLowerCase().includes(filterTerm)
                    );
                    return textoMatch || palavraMatch || sinonimosMatch;
                });
            }

            // 5. Mantém o item se ainda houver versículos
            if (finalConcordancias.length > 0) {
                item.concordancias = finalConcordancias;
                item.ocorrencias = finalConcordancias.length;
                return item;
            }
            return null;
        }).filter(Boolean);

        // 6. Renderiza e atualiza contador
        this.elements.resultadosContainer.innerHTML = '';
        this.renderResults(finalResults, false);
        this.updateResultsCounter(finalResults.length, this.totalResultsCount);
    }

    updateLivroDropdown(testamentoSelecionado) {
        // Normalização do testamento
        let normalizedTestamento = testamentoSelecionado;
        if (testamentoSelecionado === 'Velho Testamento') {
            normalizedTestamento = 'Antigo Testamento';
        }
        
        const livroSelect = document.getElementById('custom-livro-select');
        if (!livroSelect) return;
        
        const itemsContainer = livroSelect.querySelector('.opcoes-seletor, .select-items');
        const selectedDisplay = livroSelect.querySelector('.opcao-selecionada, .select-selected');
        
        if (!itemsContainer || !selectedDisplay) return;
        
        itemsContainer.innerHTML = '';
        
        const todosOption = document.createElement('div');
        todosOption.textContent = 'Todos os livros';
        todosOption.setAttribute('data-value', 'todos');
        todosOption.classList.add('same-as-selected', 'selecionado-igual', 'mesmo-que-selecionado');
        itemsContainer.appendChild(todosOption);
        
        const livros = this.getLivrosPorTestamento(normalizedTestamento);
        livros.forEach(livro => {
            const option = document.createElement('div');
            option.textContent = livro.nome;
            option.setAttribute('data-value', livro.id);
            itemsContainer.appendChild(option);
        });
        
        selectedDisplay.textContent = 'Todos os livros';
        selectedDisplay.setAttribute('data-value', 'todos');
        this.filters.livro = 'todos';
        
        itemsContainer.querySelectorAll('div').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const valor = item.getAttribute('data-value') || 'todos';
                const texto = item.textContent;
                
                selectedDisplay.textContent = texto;
                selectedDisplay.setAttribute('data-value', valor);
                
                itemsContainer.querySelectorAll('div').forEach(div => div.classList.remove('same-as-selected', 'selecionado-igual', 'mesmo-que-selecionado'));
                item.classList.add('same-as-selected', 'selecionado-igual', 'mesmo-que-selecionado');
                
                this.filters.livro = valor;
                
                this.renderFilteredResults();
                
                this.closeAllDropdowns();
                
                console.log(`[FILTRO] Livro selecionado: ${valor}`);
            });
        });
    }
    
    getLivrosPorTestamento(testamento) {
        const todosLivros = [
            // Antigo Testamento
            { id: 'gn', nome: 'Gênesis', testamento: 'Antigo Testamento' }, { id: 'ex', nome: 'Êxodo', testamento: 'Antigo Testamento' }, { id: 'lv', nome: 'Levítico', testamento: 'Antigo Testamento' }, { id: 'nm', nome: 'Números', testamento: 'Antigo Testamento' }, { id: 'dt', nome: 'Deuteronômio', testamento: 'Antigo Testamento' }, { id: 'js', nome: 'Josué', testamento: 'Antigo Testamento' }, { id: 'jz', nome: 'Juízes', testamento: 'Antigo Testamento' }, { id: 'rt', nome: 'Rute', testamento: 'Antigo Testamento' }, { id: '1sm', nome: '1 Samuel', testamento: 'Antigo Testamento' }, { id: '2sm', nome: '2 Samuel', testamento: 'Antigo Testamento' }, { id: '1rs', nome: '1 Reis', testamento: 'Antigo Testamento' }, { id: '2rs', nome: '2 Reis', testamento: 'Antigo Testamento' }, { id: '1cr', nome: '1 Crônicas', testamento: 'Antigo Testamento' }, { id: '2cr', nome: '2 Crônicas', testamento: 'Antigo Testamento' }, { id: 'ed', nome: 'Esdras', testamento: 'Antigo Testamento' }, { id: 'ne', nome: 'Neemias', testamento: 'Antigo Testamento' }, { id: 'et', nome: 'Ester', testamento: 'Antigo Testamento' }, { id: 'jo', nome: 'Jó', testamento: 'Antigo Testamento' }, { id: 'sl', nome: 'Salmos', testamento: 'Antigo Testamento' }, { id: 'pv', nome: 'Provérbios', testamento: 'Antigo Testamento' }, { id: 'ec', nome: 'Eclesiastes', testamento: 'Antigo Testamento' }, { id: 'ct', nome: 'Cantares', testamento: 'Antigo Testamento' }, { id: 'is', nome: 'Isaías', testamento: 'Antigo Testamento' }, { id: 'jr', nome: 'Jeremias', testamento: 'Antigo Testamento' }, { id: 'lm', nome: 'Lamentações', testamento: 'Antigo Testamento' }, { id: 'ez', nome: 'Ezequiel', testamento: 'Antigo Testamento' }, { id: 'dn', nome: 'Daniel', testamento: 'Antigo Testamento' }, { id: 'os', nome: 'Oséias', testamento: 'Antigo Testamento' }, { id: 'jl', nome: 'Joel', testamento: 'Antigo Testamento' }, { id: 'am', nome: 'Amós', testamento: 'Antigo Testamento' }, { id: 'ob', nome: 'Obadias', testamento: 'Antigo Testamento' }, { id: 'jn', nome: 'Jonas', testamento: 'Antigo Testamento' }, { id: 'mq', nome: 'Miquéias', testamento: 'Antigo Testamento' }, { id: 'na', nome: 'Naum', testamento: 'Antigo Testamento' }, { id: 'hc', nome: 'Habacuque', testamento: 'Antigo Testamento' }, { id: 'sf', nome: 'Sofonias', testamento: 'Antigo Testamento' }, { id: 'ag', nome: 'Ageu', testamento: 'Antigo Testamento' }, { id: 'zc', nome: 'Zacarias', testamento: 'Antigo Testamento' }, { id: 'ml', nome: 'Malaquias', testamento: 'Antigo Testamento' },
            // Novo Testamento
            { id: 'mt', nome: 'Mateus', testamento: 'Novo Testamento' }, { id: 'mc', nome: 'Marcos', testamento: 'Novo Testamento' }, { id: 'lc', nome: 'Lucas', testamento: 'Novo Testamento' }, { id: 'joa', nome: 'João', testamento: 'Novo Testamento' }, { id: 'at', nome: 'Atos', testamento: 'Novo Testamento' }, { id: 'rm', nome: 'Romanos', testamento: 'Novo Testamento' }, { id: '1co', nome: '1 Coríntios', testamento: 'Novo Testamento' }, { id: '2co', nome: '2 Coríntios', testamento: 'Novo Testamento' }, { id: 'gl', nome: 'Gálatas', testamento: 'Novo Testamento' }, { id: 'ef', nome: 'Efésios', testamento: 'Novo Testamento' }, { id: 'fp', nome: 'Filipenses', testamento: 'Novo Testamento' }, { id: 'cl', nome: 'Colossenses', testamento: 'Novo Testamento' }, { id: '1ts', nome: '1 Tessalonicenses', testamento: 'Novo Testamento' }, { id: '2ts', nome: '2 Tessalonicenses', testamento: 'Novo Testamento' }, { id: '1tm', nome: '1 Timóteo', testamento: 'Novo Testamento' }, { id: '2tm', nome: '2 Timóteo', testamento: 'Novo Testamento' }, { id: 'tt', nome: 'Tito', testamento: 'Novo Testamento' }, { id: 'fm', nome: 'Filemom', testamento: 'Novo Testamento' }, { id: 'hb', nome: 'Hebreus', testamento: 'Novo Testamento' }, { id: 'tg', nome: 'Tiago', testamento: 'Novo Testamento' }, { id: '1pe', nome: '1 Pedro', testamento: 'Novo Testamento' }, { id: '2pe', nome: '2 Pedro', testamento: 'Novo Testamento' }, { id: '1jo', nome: '1 João', testamento: 'Novo Testamento' }, { id: '2jo', nome: '2 João', testamento: 'Novo Testamento' }, { id: '3jo', nome: '3 João', testamento: 'Novo Testamento' }, { id: 'jd', nome: 'Judas', testamento: 'Novo Testamento' }, { id: 'ap', nome: 'Apocalipse', testamento: 'Novo Testamento' }
        ];
        
        if (testamento === 'todos') {
            return todosLivros;
        }
        
        return todosLivros.filter(livro => livro.testamento === testamento);
    }

    extractBookName(referencia) {
        if (!referencia) return '';
        // Remove números e pontuações
        const nomeLivro = referencia.replace(/[0-9:.,;]/g, '').trim();
        // Remove espaços extras
        return nomeLivro.replace(/\s\s+/g, ' ');
    }

    getBookTestament(nomeLivro) {
        // Lista de livros do Antigo Testamento
        const antigoTestamento = [
            'Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio', 'Josué', 
            'Juízes', 'Rute', 'Samuel', 'Reis', 'Crônicas', 'Esdras', 'Neemias', 
            'Ester', 'Jó', 'Salmos', 'Provérbios', 'Eclesiastes', 'Cantares', 
            'Isaías', 'Jeremias', 'Lamentações', 'Ezequiel', 'Daniel', 'Oséias', 
            'Joel', 'Amós', 'Obadias', 'Jonas', 'Miquéias', 'Naum', 'Habacuque', 
            'Sofonias', 'Ageu', 'Zacarias', 'Malaquias'
        ];
        
        // Lista de livros do Novo Testamento
        const novoTestamento = [
            'Mateus', 'Marcos', 'Lucas', 'João', 'Atos', 'Romanos', 'Coríntios', 
            'Gálatas', 'Efésios', 'Filipenses', 'Colossenses', 'Tessalonicenses', 
            'Timóteo', 'Tito', 'Filemom', 'Hebreus', 'Tiago', 'Pedro', 'João', 
            'Judas', 'Apocalipse'
        ];
        
        // Normaliza o nome do livro para minúsculas
        const livroLower = nomeLivro.toLowerCase();
        
        // Verifica se é do Antigo Testamento
        const isAntigoTestamento = antigoTestamento.some(livro => 
            livroLower.includes(livro.toLowerCase())
        );
        
        // Verifica se é do Novo Testamento
        const isNovoTestamento = novoTestamento.some(livro => 
            livroLower.includes(livro.toLowerCase())
        );
        
        // Caso especial para "Crônicas" sem número
        if (livroLower.includes('crônicas') && !isAntigoTestamento) {
            return 'Antigo Testamento';
        }
        
        if (isAntigoTestamento) return 'Antigo Testamento';
        if (isNovoTestamento) return 'Novo Testamento';
        
        return null;
    }

    findBookById(bookId) {
        const livros = [ { id: 'gn', nome: 'Gênesis' }, { id: 'ex', nome: 'Êxodo' }, { id: 'lv', nome: 'Levítico' }, { id: 'nm', nome: 'Números' }, { id: 'dt', nome: 'Deuteronômio' }, { id: 'js', nome: 'Josué' }, { id: 'jz', nome: 'Juízes' }, { id: 'rt', nome: 'Rute' }, { id: '1sm', nome: '1 Samuel' }, { id: '2sm', nome: '2 Samuel' }, { id: '1rs', nome: '1 Reis' }, { id: '2rs', nome: '2 Reis' }, { id: '1cr', nome: '1 Crônicas' }, { id: '2cr', nome: '2 Crônicas' }, { id: 'ed', nome: 'Esdras' }, { id: 'ne', nome: 'Neemias' }, { id: 'et', nome: 'Ester' }, { id: 'jo', nome: 'Jó' }, { id: 'sl', nome: 'Salmos' }, { id: 'pv', nome: 'Provérbios' }, { id: 'ec', nome: 'Eclesiastes' }, { id: 'ct', nome: 'Cantares' }, { id: 'is', nome: 'Isaías' }, { id: 'jr', nome: 'Jeremias' }, { id: 'lm', nome: 'Lamentações' }, { id: 'ez', nome: 'Ezequiel' }, { id: 'dn', nome: 'Daniel' }, { id: 'os', nome: 'Oséias' }, { id: 'jl', nome: 'Joel' }, { id: 'am', nome: 'Amós' }, { id: 'ob', nome: 'Obadias' }, { id: 'jn', nome: 'Jonas' }, { id: 'mq', nome: 'Miquéias' }, { id: 'na', nome: 'Naum' }, { id: 'hc', nome: 'Habacuque' }, { id: 'sf', nome: 'Sofonias' }, { id: 'ag', nome: 'Ageu' }, { id: 'zc', nome: 'Zacarias' }, { id: 'ml', nome: 'Malaquias' }, { id: 'mt', nome: 'Mateus' }, { id: 'mc', nome: 'Marcos' }, { id: 'lc', nome: 'Lucas' }, { id: 'joa', nome: 'João' }, { id: 'at', nome: 'Atos' }, { id: 'rm', nome: 'Romanos' }, { id: '1co', nome: '1 Coríntios' }, { id: '2co', nome: '2 Coríntios' }, { id: 'gl', nome: 'Gálatas' }, { id: 'ef', nome: 'Efésios' }, { id: 'fp', nome: 'Filipenses' }, { id: 'cl', nome: 'Colossenses' }, { id: '1ts', nome: '1 Tessalonicenses' }, { id: '2ts', nome: '2 Tessalonicenses' }, { id: '1tm', nome: '1 Timóteo' }, { id: '2tm', nome: '2 Timóteo' }, { id: 'tt', nome: 'Tito' }, { id: 'fm', nome: 'Filemom' }, { id: 'hb', nome: 'Hebreus' }, { id: 'tg', nome: 'Tiago' }, { id: '1pe', nome: '1 Pedro' }, { id: '2pe', nome: '2 Pedro' }, { id: '1jo', nome: '1 João' }, { id: '2jo', nome: '2 João' }, { id: '3jo', nome: '3 João' }, { id: 'jd', nome: 'Judas' }, { id: 'ap', nome: 'Apocalipse' } ];
        
        return livros.find(l => l.id === bookId);
    }

    async buscarEmTodosArquivos(searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    console.log('🚀 Iniciando busca otimizada para:', searchLower);
    
    this._showSearchStatus(10);
    
    // Usa o novo método de busca prioritária
    try {
        const result = await window.dataManager.buscarPrioridade(searchTerm, this.filters);
        
        this._hideSearchStatus();
        
        if (result && result.data && result.data.length > 0) {
            console.log('✅ Busca concluída com sucesso. Resultados:', result.data.length);
            return result;
        }
        
        // Se não encontrou resultados, tenta busca mais ampla
        console.log('🔍 Nenhum resultado encontrado, tentando busca ampla...');
        return await this._fallbackSearch(searchLower);
        
    } catch (error) {
        console.error('Erro na busca prioritária:', error);
        this._hideSearchStatus();
        return await this._fallbackSearch(searchLower);
    }
}

// Busca de fallback mais ampla
async _fallbackSearch(searchLower) {
    this._showSearchStatus(50);
    
    const allResults = [];
    const letrasPrioritarias = [
        searchLower.charAt(0), // Letra inicial
        'a', 'e', 'o', 's', 'c', 'p', 'm' // Letras mais comuns
    ];
    
    const letrasUnicas = [...new Set(letrasPrioritarias)];
    
    let letrasProcessadas = 0;
    
    for (const letra of letrasUnicas) {
        if (allResults.length > 50) break; // Limite de resultados
        
        try {
            await window.dataManager.loadLetterList();
            const letterFiles = window.dataManager.listaLetras[letra] || [];
            
            // Limita a 5 arquivos por letra
            for (const fileName of letterFiles.slice(0, 5)) {
                try {
                    const response = await fetch(`../concordancia/${letra}/${fileName}.json`);
                    if (!response.ok) continue;
                    
                    const jsonData = await response.json();
                    const wordEntries = jsonData[letra] || [];
                    
                    for (const item of wordEntries) {
                        // Verifica correspondência na palavra
                        if (item.palavra && item.palavra.toLowerCase().includes(searchLower)) {
                            allResults.push({
                                ...item,
                                ocorrencias: item.ocorrencias || 1
                            });
                        }
                        // Verifica correspondência no texto das concordâncias
                        else if (item.concordancias) {
                            const concordanciasCorrespondentes = item.concordancias.filter(concordancia => 
                                concordancia.texto && concordancia.texto.toLowerCase().includes(searchLower)
                            );
                            
                            if (concordanciasCorrespondentes.length > 0) {
                                allResults.push({
                                    ...item,
                                    concordancias: concordanciasCorrespondentes,
                                    ocorrencias: concordanciasCorrespondentes.length
                                });
                            }
                        }
                    }
                    
                } catch (fileError) {
                    console.warn(`Erro no arquivo ${fileName}:`, fileError);
                }
            }
            
        } catch (error) {
            console.warn(`Erro ao processar letra ${letra}:`, error);
        }
        
        letrasProcessadas++;
        this._showSearchStatus(50 + Math.floor(letrasProcessadas / letrasUnicas.length * 40));
    }
    
    // Ordena por relevância
    allResults.sort((a, b) => {
        const aExact = a.palavra && a.palavra.toLowerCase() === searchLower;
        const bExact = b.palavra && b.palavra.toLowerCase() === searchLower;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        return (b.ocorrencias || 0) - (a.ocorrencias || 0);
    });
    
    return {
        data: allResults.slice(0, 100),
        total: allResults.length
    };
}

    renderResults(data, append = false) {
        if (!append) { this.elements.resultadosContainer.innerHTML = ''; }
        if (data.length === 0 && !append) { this.showNoResults(); return; }

        const fragment = document.createDocumentFragment();
        data.forEach(item => {
            const palavraElement = this.createPalavraElement(item);
            fragment.appendChild(palavraElement);
        });
        this.elements.resultadosContainer.appendChild(fragment);

        this.elements.resultadosContainer.style.display = 'none';
        this.elements.resultadosContainer.offsetHeight;
        this.elements.resultadosContainer.style.display = '';
    }

    createPalavraElement(item) {
        const palavraDiv = document.createElement('div');
        palavraDiv.className = 'item-palavra';
        const header = document.createElement('div');
        header.className = 'cabecalho-palavra';
        header.innerHTML = `
            <div class="palavra-titulo">${item.palavra.toUpperCase()}</div>
            <div class="palavra-info">
                <div class="palavra-detalhes">
                    ${item.fonte ? `<div class="info-fonte">Fonte: ${item.fonte}</div>` : ''}
                    ${item['veja tambem'] && item['veja tambem'].length > 0 ? `<div class="veja-tambem"><strong>Veja também:</strong> ${item['veja tambem'].join(', ')}</div>` : ''}
                </div>
                <div class="contador-ocorrencias">${item.ocorrencias} ocorrência${item.ocorrencias !== 1 ? 's' : ''}</div>
            </div>
            <div class="indicador-expansao">▼</div>
        `;
        const content = document.createElement('div');
        content.className = 'conteudo-concordancias';
        if (item.concordancias && item.concordancias.length > 0) {
            content.innerHTML = item.concordancias.map(concordancia => `
                <div class="concordancia-item">
                    <div class="referencia">${concordancia.referencia}</div>
                    <div class="texto-versiculo">${this.highlightSearchTerm(concordancia.texto, this.termoBusca || this.elements.filtroPalavra.value || item.palavra)}</div>
                </div>
            `).join('');
        }
        header.addEventListener('click', () => {
            const isExpanded = content.classList.contains('expanded');
            const indicator = header.querySelector('.indicador-expansao');
            if (isExpanded) {
                content.classList.remove('expanded');
                indicator.classList.remove('expanded');
            } else {
                content.classList.add('expanded');
                indicator.classList.add('expanded');
            }
        });
        palavraDiv.appendChild(header);
        palavraDiv.appendChild(content);
        return palavraDiv;
    }

    highlightSearchTerm(text, searchTerm) {
        if (!searchTerm || !text) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, `<span class="palavra-destacada">$1</span>`);
    }

    updateActiveLetterButton(letra) {
        this.elements.letrasBtns.forEach(botao => {
            botao.classList.remove('active');
            if (botao.dataset.letra === letra) {
                botao.classList.add('active');
            }
        });
    }

    updateResultsCounter(visible, total) {
        if (this.elements.resultadosVisiveis) this.elements.resultadosVisiveis.textContent = visible;
        if (this.elements.totalResultados) this.elements.totalResultados.textContent = total;
        
        if (this.elements.contadorResultados) {
            this.elements.contadorResultados.style.display = visible > 0 ? 'flex' : 'none';
        }
    }

    _showSearchStatus(progress) {
        if (this.elements.carregamentoIndicador) {
            this.elements.carregamentoIndicador.style.display = 'flex';
        }
    }

    _hideSearchStatus() {
        if (this.elements.carregamentoIndicador) {
            this.elements.carregamentoIndicador.style.display = 'none';
        }
    }

    updateLoadMoreButton() {
        const contadorContainer = this.elements.contadorResultados;
        if (!contadorContainer) return;

        contadorContainer.innerHTML = '';
        if (this.totalResultsCount === 0 && this.currentResults.length === 0) {
            contadorContainer.style.display = 'none';
            return;
        }

        const botaoAnterior = document.createElement('button');
        botaoAnterior.id = 'botao-anterior';
        botaoAnterior.className = 'botao-paginacao';
        botaoAnterior.textContent = 'ANTERIOR';
        botaoAnterior.onclick = () => this.loadPreviousPage();
        botaoAnterior.disabled = this.currentPage === 0 || !!this.termoBusca;
        contadorContainer.appendChild(botaoAnterior);

        const carregarMaisText = document.createElement('span');
        carregarMaisText.className = 'botao-carregar-mais';
        carregarMaisText.textContent = 'CARREGAR MAIS RESULTADOS';
        contadorContainer.appendChild(carregarMaisText);

        const botaoProximo = document.createElement('button');
        botaoProximo.id = 'botao-proximo';
        botaoProximo.className = 'botao-paginacao';
        botaoProximo.textContent = 'PRÓXIMO';
        botaoProximo.onclick = () => this.loadNextPage();
        botaoProximo.disabled = !this.hasMore || !!this.termoBusca;
        contadorContainer.appendChild(botaoProximo);

        const contador = document.createElement('p');
        // Usa `this.visibleCount` para o valor "mostrando" e `this.totalResultsCount` para o total
        contador.textContent = `Mostrando ${this.visibleCount} de ${this.totalResultsCount} resultados`;
        contadorContainer.appendChild(contador);

        contadorContainer.style.display = 'flex';
    }

    async loadPreviousPage() {
        if (this.currentPage > 0 && !this.isLoading) {
            await this.loadLetterData(this.currentLetter, this.currentPage - 1, true);
        }
    }

    async loadNextPage() {
        if (this.hasMore && !this.isLoading) {
            await this.loadLetterData(this.currentLetter, this.currentPage + 1, true);
        }
    }

    showLoading(show) {
        if (show) {
            if (this.elements.carregamentoIndicador) this.elements.carregamentoIndicador.style.display = 'block';
            if (this.elements.resultadosContainer) this.elements.resultadosContainer.style.visibility = 'hidden';
            if (this.elements.contadorResultados) this.elements.contadorResultados.style.display = 'none';
            if (this.elements.carregarMais) this.elements.carregarMais.style.display = 'none';
        } else {
            if (this.elements.carregamentoIndicador) this.elements.carregamentoIndicador.style.display = 'none';
            if (this.elements.resultadosContainer) this.elements.resultadosContainer.style.visibility = 'visible';
        }
    }

    showError(message) {
        if (!this.elements.resultadosContainer) return;
        this.elements.resultadosContainer.innerHTML = `
            <div class="sem-resultados">
                <h3>Erro</h3>
                <p>${message}</p>
            </div>
        `;
    }

    showNoResults(message = 'Nenhum resultado encontrado.') {
        if (!this.elements.resultadosContainer) return;
        this.elements.resultadosContainer.innerHTML = `
            <div class="sem-resultados">
                <h3>Sem resultados</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.concordanciaOptimized = new ConcordanciaOptimized();
});