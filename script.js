document.addEventListener('DOMContentLoaded', function() {
    // 1. Defina o número de telefone e a mensagem
    const numeroWhatsapp = '5521973585882'; 
    const mensagemPadrao = 'Olá! Gostaria de saber mais informações sobre os artistas e shows.';

    // 2. Codifica a mensagem para o formato URL
    const mensagemCodificada = encodeURIComponent(mensagemPadrao);

    // 3. Constrói o URL completo do WhatsApp
    const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${mensagemCodificada}`;

    // 4. Pega o botão pelo ID
    const whatsappBtn = document.getElementById('whatsappBtn');

    // 5. Adiciona o evento de clique ao botão
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            // Abre o link em uma nova aba
            window.open(urlWhatsapp, '_blank');
        });
    } else {
        console.error("Botão com ID 'whatsappBtn' não encontrado.");
    }
});