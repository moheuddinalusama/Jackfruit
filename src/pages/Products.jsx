import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Products load error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);


  const brands = ["All", "Jackfruit Orchard", "HealthyBites", "NutriCore", "SummerFit Fresh", "Jackfruit Fresh", "KitchenPro", "Jackfruit Official"];
  
  const productsList = Array.isArray(products) ? products : [];
  

  const filteredProducts = filter === "All" 
    ? productsList 
    : productsList.filter(p => p.brand === filter);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24">

      <section className="pt-16 pb-12 bg-white border-b border-neutral/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-neutral">
            <div>
              <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Seasonal Catalog</p>
              <h1 className="text-5xl md:text-6xl font-display font-black uppercase italic leading-none">Jackfruit Essentials</h1>
            </div>
            <div className="flex items-center gap-4 text-sm font-bold text-neutral/40 uppercase tracking-widest">
              <span className="text-primary  text-lg">{filteredProducts.length} Products Foun</span> 
            </div>
          </div>
        </div>
      </section>

   
      <section className="py-8 bg-white sticky top-20 z-30 border-b border-neutral/5 shadow-sm overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth">
            <div className="p-3 bg-neutral/5 rounded-2xl flex-shrink-0">
              <SlidersHorizontal size={20} className="text-neutral/40" />
            </div>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setFilter(brand)}
                className={`px-8 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all min-w-max ${
                  filter === brand 
                  ? "bg-neutral text-white shadow-xl shadow-neutral/30 scale-105" 
                  : "bg-neutral/5 text-neutral/40 hover:bg-neutral/10"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </section>

   
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-24">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx % 4) * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col"
              >
                {/* Product Image Card */}
                <Link to={`/products/${product.id}`} className="relative aspect-[3/4] rounded-md overflow-hidden bg-[#e3f9e1] mb-10 border border-neutral/5 shadow-sm group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-1000 ease-out block">
                  <img 
                    src={product.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                    alt={product.name}
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-10 left-10">
                    <div className="px-5 py-2.5 glass rounded-2xl flex items-center gap-2 font-black text-[10px] text-neutral uppercase tracking-widest shadow-xl">
                      <Star size={12} className="text-primary fill-current" />
                      {product.rating}
                    </div>
                  </div>

                  {/* Hover Button */}
                  <div className="absolute bottom-8 left-8 right-8 translate-y-[250%] group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
                     <div className="w-full py-6 bg-white text-neutral rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-neutral hover:text-white transition-all shadow-2xl border border-neutral/5">
                        View Details <ArrowRight size={14} />
                     </div>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="px-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral/20">{product.brand}</span>
                    <span className="text-2xl font-display font-black text-primary">${product.price}</span>
                  </div>
                  <h3 className="text-3xl font-display font-bold group-hover:text-primary transition-colors leading-[0.9] mb-4 uppercase italic">
                    {product.name}
                  </h3>
              
                  <div className="w-16 h-2 bg-primary/10 rounded-full group-hover:w-full transition-all duration-700" />
                </div>
              </motion.div>
            ))}
          </div>

        
          {filteredProducts.length === 0 && (
             <div className="text-center py-20">
                <div className="w-20 h-20 bg-neutral/5 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral/20">
                   <Search size={40} />
                </div>
                <h2 className="text-2xl font-display font-bold text-neutral/80">No items found for this brand</h2>
                <p className="text-neutral/40 mt-2">Try selecting a different brand or exploring all jackfruit products.</p>
                <button 
                  onClick={() => setFilter("All")} 
                  className="mt-8 px-10 py-4 bg-neutral text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-primary transition-colors"
                >
                  Clear Filter
                </button>
             </div>
          )}
        </div>
      </section>
    </div>
  );
}