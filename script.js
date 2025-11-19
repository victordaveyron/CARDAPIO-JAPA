document.addEventListener("DOMContentLoaded", () => {

    // ---------------------------------------------------------------------
    //  ADICIONAR AO CARRINHO
    // ---------------------------------------------------------------------
    const botoesAdicionar = document.querySelectorAll(".btn-pratos button");

    botoesAdicionar.forEach(botao => {
        botao.addEventListener("click", () => {
            const prato = botao.closest(".container-pratos");
            const nome = prato.querySelector(".info h3").innerText;
            const preco = prato.querySelector(".preco p").innerText;
            const imagem = prato.querySelector(".img-pratos img").getAttribute("src");

            const item = { nome, preco, imagem, quantidade: 1 };

            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

            const itemExistente = carrinho.find(i => i.nome === nome);

            if (itemExistente) {
                itemExistente.quantidade += 1;
            } else {
                carrinho.push(item);
            }

            localStorage.setItem("carrinho", JSON.stringify(carrinho));

            alert(`${nome} adicionado ao carrinho!`);
        });
    });

    // ---------------------------------------------------------------------
    //  EXIBIR CARRINHO + SOMAR TOTAL
    // ---------------------------------------------------------------------
    const listaCarrinho = document.getElementById("listaCarrinho");
    const totalSpan = document.getElementById("valorTotal");
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (listaCarrinho) {
        if (carrinho.length === 0) {
            listaCarrinho.innerHTML = ""; // limpa antes

            const img = document.createElement("img");
            img.src = "img/carrinho-vazio.png";
            img.alt = "Carrinho vazio";
            img.classList.add("img-carrinho-vazio");

            listaCarrinho.appendChild(img);
            if (totalSpan) totalSpan.innerText = "0.00";
        } else {
            carrinho.forEach(item => {
                const section = document.createElement("section");
                section.classList.add("container-pratos");

                section.innerHTML = `
                    <div class="img-pratos">
                      <img src="${item.imagem}" alt="${item.nome}">
                      <h2>${item.nome}</h2>
                    </div>

                    <div class="preco">
                      <p>R$ <span>${item.preco}</span></p>
                    </div>

                    <div class="btn-mais">
                      <button class="menos">-</button>
                      <p><strong>${item.quantidade}</strong></p>
                      <button class="mais">+</button>
                    </div>
                `;

                listaCarrinho.appendChild(section);
            });

            function calcularTotal() {
                let total = 0;

                carrinho.forEach(item => {
                    const preco = parseFloat(item.preco.replace(",", "."));
                    total += preco * item.quantidade;
                });

                return total.toFixed(2);
            }

            if (totalSpan) totalSpan.innerText = calcularTotal();
        }

        // Botões + e -
        listaCarrinho.addEventListener("click", (e) => {
            if (!e.target.classList.contains("mais") &&
                !e.target.classList.contains("menos")) return;

            const nome = e.target.closest(".container-pratos").querySelector("h2").innerText;
            const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];

            const item = carrinhoAtual.find(i => i.nome === nome);
            if (!item) return;

            if (e.target.classList.contains("mais")) {
                item.quantidade++;
            } else if (e.target.classList.contains("menos") && item.quantidade > 1) {
                item.quantidade--;
            } else if (e.target.classList.contains("menos")) {
                const index = carrinhoAtual.findIndex(i => i.nome === nome);
                carrinhoAtual.splice(index, 1);
            }

            localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
            location.reload();
        });
    }

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

});


