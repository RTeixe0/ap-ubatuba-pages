(() => {
  const initWhatsAppButton = () => {
    const msg = document.body.dataset.whatsappMsg || 'Olá! Gostaria de mais informações.';
    const phone = document.body.dataset.whatsappPhone || '5519997341037';
    const btn = document.createElement('a');
    btn.href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    btn.target = '_blank';
    btn.className = 'whatsapp-btn whatsapp-fixed';
    btn.innerHTML = '<img src="assets/img/whatsapp.svg" alt="WhatsApp" /> Quero reservar agora!';
    document.body.appendChild(btn);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhatsAppButton);
  } else {
    initWhatsAppButton();
  }
})();
