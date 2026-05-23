import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { productBebidas, productExtras, deliveryMethods } from "../data/orderOptions";
import ProductImage from "./ProductImage";

function formatArs(value) {
  return `$${value.toLocaleString("es-AR")}`;
}

export default function ProductDetailModal({ product, onClose, whatsappNumber }) {
  const soldOut = product.inStock === false;
  const [bebidaCounts, setBebidaCounts] = useState(() => ({}));
  const [extraCounts, setExtraCounts] = useState(() => ({}));
  const [productQty, setProductQty] = useState(1);
  const [delivery, setDelivery] = useState("pickup");
  const [tableNumber, setTableNumber] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const ingredients = product.ingredients?.length ? product.ingredients : [product.desc];

  const extrasTotal = useMemo(() => {
    let sum = 0;
    productExtras.forEach((ex) => {
      const count = extraCounts[ex.id] || 0;
      if (count > 0) sum += ex.price * count;
    });
    productBebidas.forEach((b) => {
      const count = bebidaCounts[b.id] || 0;
      if (count > 0) sum += b.price * count;
    });
    return sum;
  }, [extraCounts, bebidaCounts, product, productQty]);

  const shippingCost = 0;

  const grandTotal = product.price * Math.max(1, productQty) + extrasTotal + shippingCost;

  const selectedBebidasLabels = productBebidas.filter((b) => (bebidaCounts[b.id] || 0) > 0);
  const selectedExtrasLabels = productExtras.filter((ex) => (extraCounts[ex.id] || 0) > 0);

  const bebidasLine =
    selectedBebidasLabels.length > 0
      ? selectedBebidasLabels
          .map((b) => `${(bebidaCounts[b.id] || 0)}x ${b.label.trim()} (${formatArs(b.price)})`)
          .join(", ")
      : "Ninguna";

  const extrasLine =
    selectedExtrasLabels.length > 0
      ? selectedExtrasLabels
          .map((e) => `${(extraCounts[e.id] || 0)}x ${e.label.trim()} (${formatArs(e.price)})`)
          .join(", ")
      : "Ninguno";

  const canConfirm = !soldOut && (delivery === "delivery" || tableNumber.trim() !== "") && productQty > 0;

  const confirmWhatsApp = () => {
    if (!canConfirm) return;
    const lines = [
      `*NUEVO PEDIDO — Riko's*`,
      `----------------------------------`,
      `*Producto:* ${productQty}x ${product.name} (${formatArs(product.price)})`,
      `*Ingredientes:* ${ingredients.join(", ")}`,
      `*Bebidas extra:* ${bebidasLine}`,
      `*Papas extra:* ${extrasLine}`,
      delivery === "pickup"
        ? `*Método de Entrega:* Retiro en el local (Mesa N° ${tableNumber.trim()})`
        : `*Método de Entrega:* Envío a domicilio`,
      `----------------------------------`,
      `*TOTAL A PAGAR:* ${formatArs(grandTotal)}`,
    ];
    const text = lines.join("\n");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    onClose();
  };

  const incBebida = (id) => {
    setBebidaCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };
  const decBebida = (id) => {
    setBebidaCounts((prev) => {
      const next = { ...prev };
      next[id] = Math.max(0, (next[id] || 0) - 1);
      return next;
    });
  };

  const incExtra = (id) => {
    setExtraCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };
  const decExtra = (id) => {
    setExtraCounts((prev) => {
      const next = { ...prev };
      next[id] = Math.max(0, (next[id] || 0) - 1);
      return next;
    });
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      className="fixed inset-0 z-[400] flex items-end sm:items-center justify-center p-0 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.button
        type="button"
        aria-label="Cerrar"
        title="Cerrar"
        className="absolute inset-0 bg-black/45 backdrop-blur-md cursor-pointer border-none p-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="relative z-[401] w-full max-w-[min(580px,100vw)] max-h-[min(88vh,720px)] flex flex-col bg-bg rounded-t-[22px] sm:rounded-2xl shadow-[0_-8px_40px_rgba(0,0,0,0.18)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden border border-black/[0.06]"
        initial={{ opacity: 0, scale: 0.9, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", damping: 26, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative shrink-0 aspect-[3/2] sm:aspect-[3/2] md:aspect-[14/9] max-h-[150px] sm:max-h-[190px] md:max-h-[220px] bg-bg-card overflow-hidden">
          <ProductImage src={product.img} alt={product.name} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-11 h-11 rounded-full bg-white/92 backdrop-blur-sm border-none shadow-md text-dark text-xl font-bold cursor-pointer flex items-center justify-center active:scale-95 z-[402]"
            aria-label="Cerrar"
          >
            ×
          </button>
          {soldOut && (
            <span className="pointer-events-none absolute inset-x-4 bottom-4 rounded-xl bg-black/72 backdrop-blur-sm text-white text-center text-[13px] font-black uppercase tracking-wide py-2.5 px-3 shadow-lg">
              Stock agotado
            </span>
          )}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-white/92 backdrop-blur-[4px] rounded-full py-1.5 px-3 text-[12px] font-bold text-dark shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+26px)] sm:px-5 sm:pt-5 sm:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 w-full">
              <h2
                id="product-detail-title"
                className="font-playfair text-[1.05rem] sm:text-[1.25rem] font-extrabold text-dark leading-tight m-0"
              >
                {product.name}
              </h2>
              <div className="ml-3">
                <div className="inline-flex items-center gap-2 bg-white rounded-xl border border-black/[0.06] px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setProductQty((q) => Math.max(1, q - 1))}
                    disabled={soldOut}
                    className="w-7 h-7 flex items-center justify-center rounded text-dark"
                  >
                    −
                  </button>
                  <span className="w-7 text-center font-medium">{productQty}</span>
                  <button
                    type="button"
                    onClick={() => setProductQty((q) => q + 1)}
                    disabled={soldOut}
                    className="w-7 h-7 flex items-center justify-center rounded text-dark"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <p className="m-0 shrink-0 text-[1.05rem] font-extrabold text-brand font-playfair whitespace-nowrap">
              {formatArs(product.price)}
            </p>
          </div>

          <p className="text-[13px] text-[#666] leading-relaxed mb-5">{product.desc}</p>

          {soldOut && (
            <div className="mb-5 rounded-2xl border-2 border-[#ccc] bg-white px-4 py-3 text-center">
              <p className="m-0 text-[15px] font-bold text-dark">Momentáneamente sin stock</p>
              <p className="m-0 mt-1 text-[13px] text-[#777] leading-snug">
                Podés mirar ingredientes del producto. Cuando volvamos a tener unidades, el botón de pedido por WhatsApp se habilitará.
              </p>
            </div>
          )}

          <section className="mb-5">
            <h3 className="text-[13px] font-bold uppercase tracking-wide text-brand mb-2.5">
              Ingredientes
            </h3>
            <ul className="list-disc pl-5 text-[14px] text-dark space-y-1.5 m-0">
                {ingredients.map((item, idx) => (
                  <li key={`${idx}-${item}`}>{item}</li>
                ))}
              </ul>
          </section>

          <fieldset disabled={soldOut} className="border-none min-w-0 p-0 m-0 mb-5">
            <h3 className="text-[13px] font-bold uppercase tracking-wide text-brand mb-2.5">
              Bebidas
            </h3>
            <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1 border border-black/[0.06] rounded-2xl p-2 bg-bg-card animate-scroll">
              {productBebidas.map((b) => {
                const count = bebidaCounts[b.id] || 0;
                return (
                  <div
                    key={b.id}
                    className={`flex items-center justify-between gap-3 min-h-[48px] px-4 py-3 rounded-2xl border-2 transition-colors duration-200 ${
                      soldOut
                        ? "cursor-not-allowed opacity-55 border-black/[0.06] bg-bg-card"
                        : count > 0
                        ? "border-brand bg-brand/[0.08] bg-white"
                        : "border-black/[0.04] bg-white hover:border-brand hover:bg-brand/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decBebida(b.id)}
                          disabled={soldOut || count === 0}
                          className="w-8 h-8 rounded bg-white border text-dark flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-medium">{count}</span>
                        <button
                          type="button"
                          onClick={() => incBebida(b.id)}
                          disabled={soldOut}
                          className="w-8 h-8 rounded bg-white border text-dark flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[13px] font-semibold text-dark truncate">{b.label}</span>
                    </div>
                    <span className="text-[13px] font-bold text-brand shrink-0">{formatArs(b.price)}</span>
                  </div>
                );
              })}
            </div>
          </fieldset>

          <fieldset disabled={soldOut} className="border-none min-w-0 p-0 m-0 mb-5">
            <h3 className="text-[13px] font-bold uppercase tracking-wide text-brand mb-2.5">
              Extras (Papas)
            </h3>
            <div className="flex flex-col gap-2">
              {productExtras.map((ex) => {
                const count = extraCounts[ex.id] || 0;
                return (
                  <div
                    key={ex.id}
                    className={`flex items-center justify-between gap-3 min-h-[48px] px-4 py-3 rounded-2xl border-2 transition-colors duration-200 ${
                      soldOut
                        ? "cursor-not-allowed opacity-55 border-black/[0.06] bg-bg-card"
                        : count > 0
                        ? "border-brand bg-brand/[0.08]"
                        : "border-black/[0.08] bg-white hover:border-brand hover:bg-brand/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decExtra(ex.id)}
                          disabled={soldOut || count === 0}
                          className="w-8 h-8 rounded bg-white border text-dark flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-medium">{count}</span>
                        <button
                          type="button"
                          onClick={() => incExtra(ex.id)}
                          disabled={soldOut}
                          className="w-8 h-8 rounded bg-white border text-dark flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[13px] font-semibold text-dark truncate">{ex.label}</span>
                    </div>
                    <span className="text-[13.5px] font-bold text-brand shrink-0">{formatArs(ex.price)}</span>
                  </div>
                );
              })}
            </div>
          </fieldset>

          <fieldset disabled={soldOut} className="border-none min-w-0 p-0 m-0 mb-6">
            <h3 className="text-[13px] font-bold uppercase tracking-wide text-brand mb-2.5">
              Método de entrega
            </h3>
            <div className="flex gap-2">
              {deliveryMethods.map((m) => (
                <label
                  key={m.id}
                  className={`flex-1 flex items-center gap-3 min-h-[58px] px-4 py-3 rounded-2xl border-2 ${
                    soldOut ? "cursor-not-allowed opacity-55" : "cursor-pointer"
                  } ${
                    delivery === m.id
                      ? "border-brand bg-brand/[0.08]"
                      : "border-black/[0.08] bg-white hover:border-brand hover:bg-brand/[0.04]"
                  }`}
                >
                  <input
                    type="radio"
                    name={`delivery-method-${product.id}`}
                    className="w-5 h-5 accent-brand shrink-0"
                    checked={delivery === m.id}
                    onChange={() => setDelivery(m.id)}
                  />
                  <span className="text-[13px] font-semibold text-dark leading-tight">
                    {m.id === "pickup" ? "🏠" : "🛵"} {m.label}
                  </span>
                </label>
              ))}
            </div>
            {delivery === "delivery" && (
              <p className="mt-2 text-[12px] text-[#888] px-1">
                📍 El costo de envío se coordina por WhatsApp según tu ubicación.
              </p>
            )}
            {delivery === "pickup" && (
              <div className="mt-3">
                <label className="block text-[13px] font-semibold text-[#555] mb-1.5 px-1">
                  Número de Mesa <span className="text-brand">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej: 5 o 12"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-black/[0.12] bg-white text-[14px] focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-medium placeholder:text-[#aaa]"
                  required
                />
                <p className="mt-1.5 text-[11px] text-[#777] px-1">
                  ⚠️ Obligatorio para poder confirmar tu pedido e identificar tu mesa en el local.
                </p>
              </div>
            )}
          </fieldset>

          <div className="sticky bottom-0 -mx-4 px-4 pt-3 pb-2 bg-gradient-to-t from-bg from-85% to-transparent">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[13px] font-bold text-[#555] uppercase tracking-wide">
                {soldOut ? "Precio (referencia)" : "Total"}
              </span>
              <motion.span
                key={soldOut ? "out" : grandTotal}
                className={`text-[1.4rem] font-extrabold font-playfair ${soldOut ? "text-[#777]" : "text-dark"}`}
                initial={{ scale: 0.96 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
              >
                {formatArs(soldOut ? product.price : grandTotal)}
              </motion.span>
            </div>

            <button
              type="button"
              disabled={!canConfirm}
              onClick={confirmWhatsApp}
              className={`w-full min-h-[54px] border-none rounded-2xl text-[15px] font-bold transition-all duration-200 ${
                !canConfirm
                  ? "bg-[#d6d6d6] text-[#888] cursor-not-allowed shadow-none active:scale-100"
                  : "brand-gradient text-white cursor-pointer shadow-[0_8px_24px_rgba(255,75,31,0.4)] active:scale-[0.98]"
              }`}
            >
              {soldOut
                ? "No disponible — sin stock"
                : delivery === "pickup" && tableNumber.trim() === ""
                ? "Ingresa tu número de mesa"
                : "Confirmar Pedido por WhatsApp"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
