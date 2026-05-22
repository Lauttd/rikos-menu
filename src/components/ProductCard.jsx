import { useState, useEffect, useRef } from "react";
import ProductImage from "./ProductImage";

export default function ProductCard({ product, index, onOpenDetail }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const soldOut = product.inStock === false;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), index * 60); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <article
      ref={ref}
      onClick={() => onOpenDetail?.()}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
      }}
      className={`bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex flex-col cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 group ${
        soldOut ? "opacity-[0.92]" : ""
      }`}
    >
      <div className="relative pb-[68%] overflow-hidden bg-bg-card">
        <ProductImage
          src={product.img}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-400 ${
            soldOut ? "grayscale-[0.35] brightness-[0.92]" : "group-hover:scale-[1.07]"
          }`}
        />
        {soldOut && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[2px] pointer-events-none">
            <span className="rounded-full bg-white/95 text-dark font-black text-[11px] sm:text-[12px] tracking-wide px-3 py-2 shadow-lg uppercase">
              Sin stock
            </span>
          </span>
        )}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 bg-white/92 backdrop-blur-[4px] rounded-full py-[3px] px-2.5 text-[11px] font-bold text-dark shadow-[0_2px_6px_rgba(0,0,0,0.12)] tracking-[0.02em]">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col gap-1.5">
        <h3 className="m-0 text-[14px] font-bold text-dark leading-[1.2] font-playfair flex items-start gap-1.5 flex-wrap">
          {product.name}
          {soldOut && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-[#888] px-1.5 py-0.5 rounded-md shrink-0">
              Agotado
            </span>
          )}
        </h3>
        <p className="m-0 text-[11px] text-[#888] leading-[1.5] flex-1">
          {product.desc}
        </p>
        <div className="flex items-center justify-between mt-2 gap-2">
          <span className="text-[17px] font-extrabold text-brand font-playfair">
            ${product.price.toLocaleString("es-AR")}
          </span>
          <button
            type="button"
            disabled={soldOut}
            aria-disabled={soldOut}
            onClick={(e) => {
              e.stopPropagation();
              if (!soldOut) onOpenDetail?.();
            }}
            className={`border-none rounded-[10px] py-[7px] px-3 text-[11px] font-bold whitespace-nowrap transition-all duration-150 min-h-[36px] ${
              soldOut
                ? "bg-[#ddd] text-[#777] cursor-not-allowed"
                : "brand-gradient text-white cursor-pointer shadow-[0_3px_10px_rgba(255,75,31,0.35)] hover:scale-105 hover:shadow-[0_5px_16px_rgba(255,75,31,0.5)] active:scale-95"
            }`}
          >
            {soldOut ? "Agotado" : "Ver detalle →"}
          </button>
        </div>
      </div>
    </article>
  );
}
