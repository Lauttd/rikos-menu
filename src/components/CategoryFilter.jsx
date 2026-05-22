export default function CategoryFilter({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="flex flex-wrap gap-2.5 justify-center mb-10">
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => setActiveCategory(cat.id)}
          className={`py-[9px] px-5 rounded-[50px] text-[13px] font-semibold cursor-pointer transition-all duration-200 ${
            activeCategory === cat.id
              ? 'brand-gradient text-white border-none shadow-[0_4px_14px_rgba(255,75,31,0.35)]'
              : 'bg-white text-[#555] border-[1.5px] border-solid border-[#e8e6e0] hover:bg-brand hover:text-white hover:border-brand'
          }`}
        >
          {cat.emoji} {cat.label}
        </button>
      ))}
    </div>
  );
}
