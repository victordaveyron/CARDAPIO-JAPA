  
  //atribuir um id ao btn (id="enviarwhatsapp")
  document.getElementById("btn-enviar").addEventListener("click", enviarwhatsapp);
  
  function enviarwhatsapp() {
    const nome = document.getElementById('nome').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Verifica se todos os campos estão preenchidos
    if (!nome || !numero || !mensagem) {
      alert('Por favor, preencha todos os campos antes de enviar.');
      return;
    }

    // Remove tudo que não for número
    const numeroLimpo = numero.replace(/\D/g, '');

    // Verifica se o número tem tamanho válido
    if (numeroLimpo.length < 10 || numeroLimpo.length > 13) {
      alert('Digite um número de WhatsApp válido com DDD. Exemplo: 61999999999');
      return;
    }

    // Coloque aqui o SEU número (55 + DDD + número)
    const numeroDestino = '5561995162974';

    // Monta a mensagem
    const texto = `Olá, me chamo ${nome},\n${mensagem}.\nMeu número é ${numeroLimpo}`;

    // Codifica a mensagem corretamente
    const textoCodificado = encodeURIComponent(texto);

    // ✅ Usa o formato correto e garantido
    const url = `https://api.whatsapp.com/send?phone=${numeroDestino}&text=${textoCodificado}`;

    // Abre o WhatsApp Web ou App
    window.open(url, '_blank');
  }
  
    /*script focus*/
  
  const itens = document.querySelectorAll('.item-catalogo');
  
  itens.forEach(item => {
    item.addEventListener('click', () => {
      itens.forEach(i => i.classList.remove('ativo')); // remove dos outros
      item.classList.add('ativo'); // adiciona no clicado
    });
  }); 
