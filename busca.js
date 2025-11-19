// --------------------------------------------------------------
// 1. OBJETO QUE DIZ QUAL PRATO ESTÁ EM QUAL PÁGINA
// --------------------------------------------------------------
const mapaPaginas = {
    "carpaccio": "item1.html",
    "nigiri": "item1.html",
    "sashimi": "item1.html",
    "pudim": "item1.html",
    // você só adiciona aqui e pronto!
};

// --------------------------------------------------------------
// 2. PEGAR ELEMENTOS DA PÁGINA INICIAL
// --------------------------------------------------------------
const campo = document.getElementById("campo-busca");
const botao = document.getElementById("btn-buscar");

// --------------------------------------------------------------
// 3. FUNÇÃO DE BUSCA
// --------------------------------------------------------------
botao.addEventListener("click", () => {
    const termo = campo.value.trim().toLowerCase();

    // nada digitado
    if (!termo) {
        alert("Digite algo para buscar");
        return;
    }

    // procurar no mapa
    const pagina = mapaPaginas[termo];

    if (!pagina) {
        alert("Prato não encontrado 😕");
        return;
    }

    // redirecionar para a página do prato
    // mandando também na URL qual prato procurar para scroll automático
    window.location.href = `${pagina}?prato=${termo}`;
});