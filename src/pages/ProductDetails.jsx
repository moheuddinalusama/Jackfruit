import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(data => {
        if (data.error) {
          toast.error("Product not found");
          navigate("/products");
        } else {
          setProduct(data);
        }
      })
      .catch(err => {
        console.error("Product fetch error:", err);
        toast.error("Could not load product details");
        navigate("/products");
      })
      .finally(() => setIsLoading(false));
  }, [id, navigate]);

  if (isLoading) return <div className="h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  if (!product) return null;

  return (
    <div className="container mx-auto px-6 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-neutral/50 hover:text-primary transition-colors mb-8 font-bold text-sm"
      >
        <ArrowLeft size={18} /> Back to explore
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
     
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative rounded-[3rem] overflow-hidden bg-neutral/5 aspect-square shadow-2xl group"
        >
          <img 
            src={product.image} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
            alt={product.name}
          />
          <div className="absolute top-8 right-8">
             <div className="px-4 py-2 glass rounded-2xl flex items-center gap-2 font-bold text-sm">
                <Star size={16} className="text-primary fill-current" />
                {product.rating}
             </div>
          </div>
        </motion.div>

   
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-full"
        >
          <div className="mb-8">
            <p className="text-primary font-bold uppercase tracking-widest text-xs mb-4">{product.brand} • {product.category}</p>
            <h1 className="text-5xl md:text-6xl font-display font-black mb-6 leading-tight uppercase italic">{product.name}</h1>
            <p className="text-3xl font-display font-bold text-neutral/80">${product.price}</p>
          </div>

          <p className="text-neutral/60 leading-relaxed mb-10 text-lg">
            {product.description}
          </p>

          <div className="mb-10 space-y-4">
            <div className="flex items-center gap-3 text-sm font-medium">
               <div className={product.stock > 0 ? "w-3 h-3 bg-green-500 rounded-full animate-pulse" : "w-3 h-3 bg-red-500 rounded-full"} />
               {product.stock > 0 ? `${product.stock} units available in stock` : "Out of stock"}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-4 rounded-2xl bg-neutral/5 border border-neutral/5 flex items-center gap-3">
                  <Truck size={20} className="text-primary" />
                  <span className="text-xs font-bold">EXPRESS DELIVERY</span>
               </div>
               <div className="p-4 rounded-2xl bg-neutral/5 border border-neutral/5 flex items-center gap-3">
                  <RefreshCw size={20} className="text-secondary" />
                  <span className="text-xs font-bold">14-DAY RETURNS</span>
               </div>
            </div>
          </div>

          <div className="mt-auto pt-6 flex flex-col md:flex-row gap-4">
            <button 
              onClick={() => toast.success("Added to cart!")}
              className="flex-grow py-5 bg-neutral text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-neutral/90 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingCart size={22} /> Add to Cart
            </button>
            <button 
              onClick={() => toast.success("Redirecting to checkout...")}
              className="flex-grow py-5 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] sun-glow"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase font-bold text-neutral/30 tracking-widest">
            <ShieldCheck size={14} /> SECURE TRANSACTION • VERIFIED QUALITY
          </div>
        </motion.div>
      </div>
    </div>
  );
}
