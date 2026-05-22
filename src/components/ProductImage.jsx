import { useState } from "react";

/** Placeholder cuando la URL externa falla (404, CDN, etc.) */
export default function ProductImage({ src, alt, className = "" }) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-bg-card text-[#aaa] ${className}`}
      >
        <span className="text-[clamp(2rem,10vw,3.5rem)] leading-none opacity-55">🍔</span>
        <span className="text-[11px] font-semibold px-3 text-center">Imagen no disponible</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer-when-downgrade"
      className={className}
      onError={() => setBroken(true)}
    />
  );
}
