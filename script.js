/*===============================================================================*/
/*                   CONFIGURAÇÃO INICIAL E VARIÁVEIS GLOBAIS                    */
/*  Lista que guarda todas as versões da Bíblia disponíveis dentro de um array   */
/*===============================================================================*/

// A linha abaixo e o Array que armazena todas as versões da Bíblia
const versoesBiblia = [];

// O BLOCO ABAIXO ADICIONA AS VERSÕES PADRÃO DA BÍBLIA COM SEUS TÍTULOS E IMAGENS
versoesBiblia.push({ tituloVersao: 'Bíblia ACF', img: './img/acf.png' });
versoesBiblia.push({ tituloVersao: 'Bíblia ARA', img: './img/ara.png' });
versoesBiblia.push({ tituloVersao: 'Bíblia ARC', img: './img/arc.png' });
versoesBiblia.push({ tituloVersao: 'Bíblia KJV', img: './img/kjv.png' });
versoesBiblia.push({ tituloVersao: 'Bíblia NAA', img: './img/naa.png' });
versoesBiblia.push({ tituloVersao: 'Bíblia NTLH', img: './img/ntlh.png' });
versoesBiblia.push({ tituloVersao: 'Bíblia NVI', img: './img/nvi.png' });
versoesBiblia.push({ tituloVersao: 'Bíblia NVT', img: './img/nvt.png' });
versoesBiblia.push({ tituloVersao: 'Bíblia Original', img: './img/original.png' });

/*===============================================================================*/
/*                  INICIALIZAÇÃO E CONFIGURAÇÃO DE EVENTOS                      */
/* Esta função é responsável por mostrar todas as versões da Bíblia na tela.     */
/* Ela pega os dados da nossa lista `versoesBiblia` e cria os elementos visuais. */
/*===============================================================================*/

// O BLOCO ABAIXO CRIA A FUNÇÃO PARA MOSTRAR TODAS AS VERSÕES DA BÍBLIA NA TELA
function exibirTodasVersoes() {
    // A linha abaixo Obtém o elemento <ul> com id 'lista' do HTML
    const lista = document.getElementById('lista');
    if (!lista) {
        // A linha abixo informa se não encontrar a lista, mostra um erro no console
        console.error("Elemento <ul id='lista'> não encontrado no index.html");
        // A linha abaixo para a execução da função
        return;
    }

    // A linha a abaixo limpa a lista atual para evitar duplicação    
    lista.innerHTML = '';
    for (let i = 0; i < versoesBiblia.length; i++) {
        // A linha abaixo adiciona o elemento visual de cada versão à lista
        lista.appendChild(criarElementoVersao(versoesBiblia[i]));
    }
}

/*===============================================================================*/
/*                    CRIAÇÃO E MANIPULAÇÃO DE ELEMENTOS HTML                    */
/*               Cria um item de lista para uma versão da Bíblia                 */
/*===============================================================================*/

// Este bloco cria a função para um item da lista para uma versão da Bíblia
function criarElementoVersao(desenho) { 
    // A linha abaixo cria item da lista
    const listaItem = document.createElement('li');
    // A linha abaixo cria elemento de imagem
    const img = document.createElement('img');
    // A linha abaixo cria o elemento de título
    const titulo = document.createElement('h2');

    // A linha abaixo define o caminho da imagem
    img.src = desenho.img;
    // A linha abaixo define o texto alternativo (importante para acessibilidade)
    img.alt = desenho.tituloVersao;
    // A linha abaixo define o texto do título
    titulo.innerHTML = desenho.tituloVersao;
    // A linha abaixo define o evento de clique para abrir o popup e passar o codigo da versão
    listaItem.addEventListener('click', () => {
        let codigoVersao = null;
        
        // O BLOCO ABAIXO CONVERTE O TEXTO PARA MINÚSCULAS
        const tituloMinusculo = desenho.tituloVersao.toLowerCase();
        if (tituloMinusculo.includes('acf')) codigoVersao = 'acf';
        else if (tituloMinusculo.includes('ara')) codigoVersao = 'ara';
        else if (tituloMinusculo.includes('arc')) codigoVersao = 'arc';
        else if (tituloMinusculo.includes('kjv')) codigoVersao = 'kjv';
        else if (tituloMinusculo.includes('naa')) codigoVersao = 'naa';
        else if (tituloMinusculo.includes('ntlh')) codigoVersao = 'ntlh';
        else if (tituloMinusculo.includes('nvi')) codigoVersao = 'nvi';
        else if (tituloMinusculo.includes('nvt')) codigoVersao = 'nvt';
        else if (tituloMinusculo.includes('original')) codigoVersao = 'original';
        
        if (codigoVersao) {
            
            // O BLOCO ABAIXO CRIA URL DE DESTINO
            const urlDestino = `html/versoes.html?versao=${codigoVersao}`;
            // A linha abaixo mostra no console
            console.log(`Redirecionando para: ${urlDestino}`);
            // A linha abaixo muda para a página
            window.location.href = urlDestino;
        } else {
            // A linha abaixo mostra o aviso se não encontrar o código
            console.warn(`Não foi possível determinar o código da versão para: ${desenho.tituloVersao}`);
            // A linha abaixo mostra o alerta para o usuário
            alert("Não foi possível abrir esta versão. Código não identificado.");
        }
    });

    // A linha abaixo adiciona imagem ao item
    listaItem.appendChild(img);
    // A linha abaixo adiciona título ao item
    listaItem.appendChild(titulo);
    // A linha abaixo retorna o item completo
    return listaItem;
}

/*===============================================================================*/
/*                 GERENCIAMENTO DE POP-UPS E UPLOAD DE IMAGENS                  */
/*===============================================================================*/

// A linha abaixo guarda a imagem escolhida temporariamente em base64
let subirImagem = '';

document.addEventListener('DOMContentLoaded', () => {
    // A linha baixo obtém o campo de arquivo
    const botaoArquivoReal = document.getElementById('arquivo-imagem');
    // A linha abaixo obtém o botão personalizado
    const botaoPersonalizado = document.getElementById('novo-botao-imagem'); 
    // A linha abaixo obtém o campo de pré-visualização
    const previsualizacaoImagem = document.getElementById('previsualizacao-imagem');
    
    if (botaoArquivoReal) {
        // A linha abaixo define o evento ao selecionar um arquivo
        botaoArquivoReal.addEventListener('change', () => {
            if (botaoArquivoReal.files && botaoArquivoReal.files.length > 0) {
                // A linha abaixo lê o arquivo
                const leitorArquivo = new FileReader();
    
                leitorArquivo.onloadend = () => {
                    // A linha abaixo guarda a imagem
                    subirImagem = leitorArquivo.result;
                    if (previsualizacaoImagem) {
                        // A linha abaixo mostra a imagem
                        previsualizacaoImagem.src = subirImagem;
                        // A linha abaixo exibe a pré-visualização
                        previsualizacaoImagem.style.display = 'flex';
                    }
                    if (botaoPersonalizado) {
                        // A linha abaixo esconde o botão personalizado
                        botaoPersonalizado.style.display = 'none';
                    }
                }
                // A linha abaixo lê a imagem como base64
                leitorArquivo.readAsDataURL(botaoArquivoReal.files[0]);
            }
        });
    } else {
        // A linha abaixo mostra o aviso se não encontrou o campo de arquivo
        console.warn("Elemento 'arquivo-imagem' não encontrado.");
    }
    if (botaoPersonalizado) {
        // A linha abaixo define o evento ao clicar no botão personalizado
        botaoPersonalizado.addEventListener('click', () => {
            if (botaoArquivoReal) {
// Abre seletor de arquivo
                botaoArquivoReal.click();
            }
        });
    } else {
        // A linha abaixo mostra o aviso se não encontrou o botão personalizado
        console.warn("Elemento 'novo-botao-imagem' não encontrado.");
    }

    // O BLOCO ABAIXO CRIA FUNÇÃO PARA BUSCA OS BOTÕES DA INTERFACE
    
    // A linha abaixo cria o botão abrir popup
    const abreBotaoPopup = document.querySelector('.abrir-popup');
    // A linha abaixo mostra o aviso se não for encontrou o botão abrir popup
    if (!abreBotaoPopup) console.warn("Botão '.abrir-popup' não encontrado.");
    // A linha abaixo cria o botão fechar popup
    const fechaBotaoPopup = document.querySelector('.popup-nova-versao .fechar-popup');
    // A linha abaixo mostra o aviso se não for encontrou o botão fechar popup
    if (!fechaBotaoPopup) console.warn("Botão '.fechar-popup' não encontrado.");
    // A linha abaixo cria o botão fechar boas-vindas
    const fechaBotaoBoasVindas = document.querySelector('.fechar-boas-vindas');
     // A linha abaixo mostra o aviso se não encontrou o botão fechar boas-vindas
    if (!fechaBotaoBoasVindas) console.warn("Botão '.fechar-boas-vindas' não encontrado.");
    // A linha abaixo cria o botão salvar versão
    const botaoSalvar = document.querySelector('.salvar-versao');
    // A linha abaixo mostra o aviso se não encontrou o botão salvar versão
    if (!botaoSalvar) console.warn("Botão '.salvar-versao' não encontrado.");
    // A linha abaixo mostra todas as versões da Bíblia
    exibirTodasVersoes();
});

// ESTE BLOCO CRIA A FUNÇÃO PARA EXIBIR O POPUP DE NOVA VERSÃO
function abrirPopup() {
    // A linha abaixo adiciona a classe para exibir o popup
    document.body.classList.add('visivel');
}

// ESTE BLOCO CRIA A FUNÇÃO PARA FECHA O POPUP DE NOVA VERSÃO
function fecharPopup() {
    // A linha abaixo remove classe para esconder popup    
    document.body.classList.remove('visivel');
    // A linha abaixo cria a área de preview
    const previsualizacaoImagem = document.getElementById('previsualizacao-imagem');
    // A linha abaixo cria o botão personalizado
    const botaoPersonalizado = document.getElementById('novo-botao-imagem');
    // A linha abaixo cria o campo de arquivo
    const botaoArquivoReal = document.getElementById('arquivo-imagem');
    // A linha abaixo cria o campo de título
    const entradaTitulo = document.getElementById('novo-titulo-biblia');
    
    if (previsualizacaoImagem) {
        // A linha abaixo limpa a imagem
        previsualizacaoImagem.src = '';
        // A linha abaixo esconde o elemento
        previsualizacaoImagem.style.display = 'none';
    }
    // A linha abaixo mostra o botão personalizado
    if (botaoPersonalizado) {
        botaoPersonalizado.style.display = 'block';
    }
    // A linha a baixo limpa o campo de arquivo
    if (botaoArquivoReal) {
        botaoArquivoReal.value = '';
    }
    // A linha abaixo limpa o campo de texto    
    if (entradaTitulo) {
        entradaTitulo.value = '';
    }
    // A linha abaixo limpa a variável da imagem
    subirImagem = '';
}

// ESTE BLOCO CRIA A FUNÇÃO PARA FECHAR A JANELA SEJA BEM-VINDO

// A linha abaixo fecha o popup de boas-vindas
function fecharSejaBemVindo() {
    // A linha abaixo obtém o popup de boas-vindas
    const popupBoasVindas = document.getElementById('popup-seja-bem-vindo');
    // A linha abaixo remove a classe que mostra o popup
    if (popupBoasVindas) {
        popupBoasVindas.classList.remove('ativo');
    } else {
        // A linha abaixo exibe um aviso se nao encontrar o popup de boas-vindas
        console.warn("Popup de boas-vindas 'popup-seja-bem-vindo' não encontrado.");
        }
}

// ESTE BLOCO CRIA A FUNÇÃO PARA SALVA UMA NOVA VERSÃO DA BÍBLIA
function salvarVersao() {
    // A linha abaixo cria o campo de título
    const entradaTitulo = document.getElementById('novo-titulo-biblia');
    // A linha abaixo cria o nome da versão
    const tituloVersao = entradaTitulo ? entradaTitulo.value : null;
    // A linha abaixo cria o nome da versão
    const imagemVersao = subirImagem;
    if (!tituloVersao || tituloVersao.trim() === '') {
        // A linha abaixo mostra um alerta se não selecionou imagem
        alert('Por favor, insira um título para a versão.');
        return;
    }
    if (!imagemVersao) {
        // A linha abaixo mostra um alerta se não selecionou imagem
        alert('Por favor, selecione uma imagem para a versão.');
        return;
    }

    // O BLOCO ABAIXO EXECUTA AS AÇÕES FINAIS 

    // A linha abaixo adiciona a nova versão ao array
    versoesBiblia.push({ tituloVersao: tituloVersao, img: imagemVersao });
    // A linha abaixo atualiza a tela
    exibirTodasVersoes();
    // A linha abaixo fecha o popup
    fecharPopup();
    // A linha abaixo mostra um alerta de sucesso
    alert('Versão adicionada com sucesso! (Nota: será perdida ao recarregar a página)');
}