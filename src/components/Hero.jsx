export default function Hero({ catalogRef }) {
  return (
    <section className="min-h-[92vh] flex items-center justify-center relative overflow-hidden hero-gradient pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${180 + i * 60}px`, height: `${180 + i * 60}px`,
              top: `${20 + i * 8}%`, right: `${-5 + i * 3}%`,
            }} />
        ))}
        <div className="absolute -right-[5%] top-1/2 -translate-y-1/2 text-[clamp(200px,35vw,420px)] opacity-5 select-none leading-none">
          🌶️
        </div>
      </div>

      <div className="text-center py-10 px-6 max-w-[700px] relative z-10">
        <p className="hero-sub text-[13px] tracking-[0.18em] uppercase text-brand-light font-semibold mb-5">
          Riko's · Burgers & más
        </p>
        <h1 className="hero-title font-playfair text-[clamp(2.4rem,6vw,4.2rem)] font-black text-white leading-[1.1] mb-6">
          El sabor que<br />
          <span className="text-brand-light">estabas buscando</span>,<br />
          directo a tu mesa
        </h1>
        <p className="hero-sub text-base text-white/70 mb-10 leading-[1.7]">
          Ingredientes frescos, recetas artesanales y la rapidez que mereces. Pedí por WhatsApp y recibí en la puerta.
        </p>
        <button
          className="hero-cta bg-brand text-white border-none rounded-2xl py-4 px-10 text-[17px] font-bold cursor-pointer shadow-[0_8px_30px_rgba(255,75,31,0.5)] transition-transform transition-shadow duration-200 hover:scale-105 hover:shadow-[0_12px_36px_rgba(255,75,31,0.65)]"
          onClick={() => catalogRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          Ver Menú 🍽️
        </button>
      </div>

      <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path d="M0 60 L0 30 Q300 0 600 30 Q900 60 1200 30 L1200 60 Z" fill="#faf9f7" />
      </svg>
    </section>
  );
}
