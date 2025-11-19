document.addEventListener("DOMContentLoaded", () => {
    // ---------------------------------------------------------------------
    //  ENVIAR PEDIDO (GERAR MENSAGEM)
    // ---------------------------------------------------------------------
    const btnEnviar = document.getElementById("btn-enviar-pedido");

    if (btnEnviar) {
        btnEnviar.addEventListener("click", (e) => {
            e.preventDefault();

            // validações
            const nomeCliente = document.querySelector(".input-nome").value.trim();
            const tipoEntrega = document.querySelector("input[name='tipoEntrega']:checked")?.value;
            const formaPagamento = document.querySelector("input[name='formaPagamento']:checked")?.value;
            const endereco = document.querySelector(".input-adress").value.trim();
            const obs = document.querySelector(".input-observacoes").value.trim();

            if (!nomeCliente || !tipoEntrega || !formaPagamento || carrinho.length === 0) {
                alert("Preencha tudo e adicione itens ao carrinho para enviar o pedido.");
                return;
            }

            if (tipoEntrega === "entrega" && endereco === "") {
                alert("Digite o endereço para entrega.");
                return;
            }

            let itensTxt = "";
            carrinho.forEach(item => {
                itensTxt += `${item.nome} (${item.quantidade}x) --- R$ ${item.preco}\n`;
            });

            const total = carrinho.reduce((acc, item) => {
                return acc + parseFloat(item.preco.replace(",", ".")) * item.quantidade;
            }, 0).toFixed(2);

            const numeroDestinoPedido = '5561995162974'
            let mensagem = `
-------------------
Pedido: ${nomeCliente}
-------------------
${itensTxt}
Valor total: R$ ${total}
-------------------
Forma de pagamento: ${formaPagamento}
-------------------
${tipoEntrega === "retirada" ? "Retirada" : "Entrega"}
${tipoEntrega === "entrega" ? "\nEndereço: " + endereco : ""}
-------------------
Obs: ${obs}
            `;

            const textoCodificadoPedido = encodeURIComponent(mensagem);
            const url = `https://api.whatsapp.com/send?phone=${numeroDestinoPedido}&text=${textoCodificadoPedido}`;

            window.open(url, '_blank');
        });
    }


    // ---------------------------------------------------------------------
    //  ENVIAR SUGESTÃO WHATS
    // ---------------------------------------------------------------------
    const btnSugestao = document.getElementById("btn-enviar");

    if (btnSugestao) {
        btnSugestao.addEventListener("click", enviarSugestao);

        function enviarSugestao() {
            const nome = document.getElementById('nome').value.trim();
            const sugestao = document.getElementById('sugestao').value.trim();
            const descricao = document.getElementById('descricao').value.trim();

            // Verifica se todos os campos estão preenchidos
            if (!nome || !sugestao || !descricao) {
                alert('Por favor, preencha todos os campos antes de enviar sua sugestão.');
                return;
            }


            // Coloque aqui o SEU número (55 + DDD + número)
            const numeroDestino = '5561995162974';

            // Monta a mensagem
            const texto = `Olá, me chamo ${nome},\n Minha sugestão é sobre: ${sugestao}.\nDescrição: ${descricao}`;

            // Codifica a mensagem corretamente
            const textoCodificado = encodeURIComponent(texto);

            // ✅ Usa o formato correto e garantido
            const url = `https://api.whatsapp.com/send?phone=${numeroDestino}&text=${textoCodificado}`;

            // Abre o WhatsApp Web ou App
            window.open(url, '_blank');
        }

    }

});