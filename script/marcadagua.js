/*===============================================================================*/
/*                      SCRIPT PARA MARCA D'ÁGUA DA BÍBLIA                       */
/*===============================================================================*/
/*  Este arquivo contém:                                                         */
/*                    - Funções para adicionar marca d'água na página principal  */
/*                    - Criação e inserção do elemento visual de fundo           */
/*===============================================================================*/

/* BLOCO: Configura o gatilho de carregamento total da janela para injetar o elemento visual decorativo no fundo da página  */
function adicionarMarcaDagua() {                                                  /* Inicia a injeção da marca    */
    const content = document.querySelector('.conteudo');                          /* Localiza a seção principal   */
    if (!content) return;                                                        /* Evita erro sem contêiner     */
    if (content.querySelector('.marca-dagua-biblia, .marca-dagua-versoes, .marcadagua, .marca-dagua-imagem-dicionario-concordancia')) return;

    const marcaDaguaContainer = document.createElement('div');                    /* Cria o contêiner do fundo    */
    marcaDaguaContainer.classList.add('marca-dagua-biblia', 'marcadagua');        /* Aplica classes de estilo     */
    const img = document.createElement('img');                                    /* Instancia o objeto imagem    */
    img.src = '../img/biblia.png';                                                /* Define o endereço da imagem  */
    img.alt = "Marca d'água da Bíblia";                                           /* Define texto de segurança    */
    img.classList.add('marca-dagua-versoes', 'marca-dagua-imagem');               /* Define dimensões da imagem   */
    
    marcaDaguaContainer.appendChild(img);                                         /* Une a imagem ao contêiner    */
    content.appendChild(marcaDaguaContainer);                                     /* Publica o conjunto no site   */
}

if (document.readyState === 'loading') {                                          /* Aguarda DOM se necessário    */
    document.addEventListener('DOMContentLoaded', adicionarMarcaDagua);
} else {
    adicionarMarcaDagua();
}
window.addEventListener('load', adicionarMarcaDagua);                             /* Reforço após carga completa  */