import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import Footer from "./components/Footer";
import { products, categories } from "./data/products";

const WHATSAPP_NUMBER = "5493704690447";
const BUSINESS_NAME = "Riko's";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const catalogRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = activeCategory === "all" ? products : products.filter(p => p.category === activeCategory);

  return (
    <>
      <Header scrolled={scrolled} categories={categories} setActiveCategory={setActiveCategory} catalogRef={catalogRef} businessName={BUSINESS_NAME} whatsappNumber={WHATSAPP_NUMBER} />
      <Hero catalogRef={catalogRef} />

      <section ref={catalogRef} className="max-w-[1280px] mx-auto pt-[60px] pb-[100px] px-5">
        <div className="text-center mb-10">
          <h2 className="font-playfair text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-dark">
            Nuestro Menú
          </h2>
          <p className="text-[#888] mt-2.5 text-[15px]">Seleccioná una categoría y hacé tu pedido al instante</p>
        </div>

        <CategoryFilter categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onOpenDetail={() => setDetailProduct(p)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 px-5 text-[#aaa]">
            <div className="text-[60px] mb-4">🍽️</div>
            <p className="text-lg">No hay productos en esta categoría todavía.</p>
          </div>
        )}
      </section>

      <Footer businessName={BUSINESS_NAME} whatsappNumber={WHATSAPP_NUMBER} />

      <AnimatePresence>
        {detailProduct && (
          <ProductDetailModal
            key={detailProduct.id}
            product={detailProduct}
            onClose={() => setDetailProduct(null)}
            whatsappNumber={WHATSAPP_NUMBER}
          />
        )}
      </AnimatePresence>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("¡Hola! Quiero hacer un pedido.")}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-[200] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.5)] no-underline wa-pulse"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </>
  );
}
