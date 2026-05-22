export default function Footer({ businessName, whatsappNumber }) {
  const openWhatsAppStatus = () => {
    const msg = "¡Hola! Quiero consultar el estado de mi pedido.";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <footer className="bg-dark-footer text-white/60 text-center py-10 px-6">
      <div className="font-pacifico text-[24px] text-white mb-2">
        🌶️ {businessName}
      </div>
      <p className="text-[13px] mb-6">Todos los pedidos se gestionan por WhatsApp</p>
      <button
        onClick={openWhatsAppStatus}
        className="bg-[#25D366] text-white border-none rounded-xl py-3 px-7 text-[14px] font-bold cursor-pointer transition-transform hover:scale-105"
      >
        💬 Contactarnos por WhatsApp
      </button>
      <p className="text-[11px] mt-8 opacity-40">© {new Date().getFullYear()} {businessName}. Hecho con ❤️</p>
    </footer>
  );
}
