import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Star, ShoppingBag, Droplets, Sun, Wind, Umbrella, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";


const sunAnimation = {
  v: "5.5.7",
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: "Sun",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Sun",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 60, s: [360] }], ix: 10 },
        p: { a: 0, k: [50, 50, 0], ix: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: { a: 0, k: [100, 100, 100], ix: 6 }
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { d: 1, ty: "el", s: { a: 0, k: [40, 40], ix: 2 }, p: { a: 0, k: [0, 0], ix: 3 }, nm: "Circle", mn: "ADBE Vector Shape - Ellipse", hd: false },
            { ty: "fl", c: { a: 0, k: [1, 0.55, 0, 1], ix: 4 }, o: { a: 0, k: 100, ix: 5 }, r: 1, nm: "Fill", mn: "ADBE Vector Graphic - Fill", hd: false },
            { ty: "tr", p: { a: 0, k: [0, 0], ix: 2 }, a: { a: 0, k: [0, 0], ix: 1 }, s: { a: 0, k: [100, 100], ix: 3 }, r: { a: 0, k: 0, ix: 6 }, o: { a: 0, k: 100, ix: 7 }, sk: { a: 0, k: 0, ix: 4 }, sa: { a: 0, k: 0, ix: 5 }, nm: "Transform" }
          ]
        }
      ]
    }
  ]
};

const slides = [
  {
    title: "Fresh Premium Jackfruits",
    subtitle: "Directly from Orchard 🌳",
    description: "Experience the authentic taste of naturally ripened premium jackfruits delivered straight to your doorstep.",
    image: "https://images.pexels.com/photos/31782674/pexels-photo-31782674.jpeg",
    accent: "text-secondary"
  },
  {
    title: "Organic Tropical Treats",
    subtitle: "100% Pesticide Free",
    description: "Our SunCart special selection ensures every bite is healthy, sweet, and bursting with tropical flavor.",
    image: "https://images.pexels.com/photos/30470806/pexels-photo-30470806.jpeg",
    accent: "text-accent"
  },
  {
    title: "Summer Jackfruit Fest",
    subtitle: "Flat 20% OFF 🏷️",
    description: "Celebrate the season with our special Jackfruit festival deals. High quality fruits at the best prices.",
    image: "https://images.pexels.com/photos/35981283/pexels-photo-35981283.jpeg",
    accent: "text-primary"
  }
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Products error:", err);
      }
    };

    fetchProducts();
      
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="w-full">
  
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent z-10" />
            <img 
              src={slides[currentSlide].image} 
              className="w-full h-full object-cover" 
              alt="Hero Background"
            />
          </motion.div>
        </AnimatePresence>




        <div className="container mx-auto px-6 relative z-20">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest">
                  {slides[currentSlide].subtitle}
                </span>
                <div className="w-10 h-10">
                   <Lottie animationData={sunAnimation} loop={true} />
                </div>
              </div>
              
              <h1 className="font-display text-6xl md:text-8xl font-black text-neutral leading-[0.9] mb-8 uppercase italic">
                {slides[currentSlide].title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 === 1 ? slides[currentSlide].accent : ""}>
                    {word}{" "}
                  </span>
                ))}
              </h1>
              
              <p className="text-xl text-neutral/60 mb-10 max-w-lg">
                {slides[currentSlide].description}
              </p>
              
              <div className="flex flex-wrap gap-5">
                <Link to="/products" className="btn-primary group">
                  Start Shopping <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="btn-outline bg-blue-400 text-white border-none group">
                  Watch Lookbook <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>






  
        <div className="absolute bottom-10 right-6 md:right-10 z-30 flex items-center gap-4">
          <button onClick={prevSlide} className="w-10 h-10 md:w-14 md:h-14 glass rounded-full flex items-center justify-center text-neutral hover:bg-primary hover:text-white transition-all shadow-lg active:scale-90">
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentSlide(i)}
                className={`w-6 h-1 rounded-full transition-all duration-500 ${i === currentSlide ? "bg-primary w-12" : "bg-neutral/20"}`} 
              />
            ))}
          </div>
          <button onClick={nextSlide} className="w-10 h-10 md:w-14 md:h-14 glass rounded-full flex items-center justify-center text-neutral hover:bg-primary hover:text-white transition-all shadow-lg active:scale-90">
            <ChevronRight size={24} />
          </button>
        </div>
      </section>


      <section className="py-32 bg-white relative">
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
               <div>
                  <p className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Trending Now</p>
                  <h2 className="text-5xl md:text-7xl font-display font-black uppercase italic leading-[0.8]">Summer <br />Catalog</h2>
               </div>
               <div className="flex flex-col items-end gap-4">
                  <span className="text-[10px] font-black text-neutral/20 uppercase tracking-[0.5em] hidden md:block">12 Products Found</span>
                  <Link to="/products" className="btn-outline px-10">Explore All</Link>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
               {(Array.isArray(products) ? products : []).slice(0, 12).map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (idx % 4) * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                     <Link to={`/products/${product.id}`} className="relative aspect-[3/4] rounded-[3rem] overflow-hidden bg-[#EFEEED] mb-8 group-hover:shadow-2xl transition-all duration-1000 border border-neutral/5 block">
                        <img 
                          src={product.image} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                          alt={product.name}
                        />
                        <div className="absolute top-8 right-8">
                           <div className="px-5 py-2.5 glass rounded-2xl flex items-center gap-2 font-black text-[10px] text-neutral uppercase tracking-widest shadow-xl">
                              <Star size={12} className="text-primary fill-current" />
                              {product.rating}
                           </div>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 translate-y-[200%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                           <div className="w-full py-5 bg-white text-neutral rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-neutral hover:text-white transition-all shadow-2xl">
                              Explore Now <ArrowRight size={14} />
                           </div>
                        </div>
                     </Link>
                     <div className="px-6 text-neutral">
                        <div className="flex justify-between items-center mb-3">
                           <p className="text-neutral/30 text-[10px] font-black uppercase tracking-[0.4em]">{product.brand}</p>
                           <p className="font-display font-black text-2xl text-primary">${product.price}</p>
                        </div>
                        <h3 className="text-3xl font-display font-bold group-hover:text-primary transition-colors leading-none uppercase italic">{product.name}</h3>
                        <div className="w-12 h-1.5 bg-primary/20 rounded-full group-hover:w-full transition-all duration-700 mt-4" />
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

  
      <section className="py-24 bg-[#FAF9F6] relative overflow-hidden">
         <div className="absolute top-0 right-10 opacity-5">
            <Umbrella size={400} className="text-neutral" />
         </div>
         <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-center text-4xl font-display font-bold mb-16 uppercase italic underline decoration-primary decoration-4 underline-offset-8">SunCare Protocol</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {[
                  { icon: <Droplets className="text-accent" />, title: "Stay Hydrated", desc: "Drink at least 3L of water daily to maintain skin elasticity." },
                  { icon: <Sun className="text-primary" />, title: "SPF 50+ Always", desc: "Reapply every 2 hours, even on cloudy beach days." },
                  { icon: <Wind className="text-secondary" />, title: "Cool Wear", desc: "Opt for breathable linens and light cotton fabrics." },
                  { icon: <Umbrella className="text-primary" />, title: "Avoid Peaks", desc: "Stay in the shade between 12 PM and 4 PM." },
               ].map((tip, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -10 }}
                    className="p-8 bg-white rounded-[2.5rem] border border-neutral/5 shadow-sm hover:shadow-xl transition-all"
                  >
                     <div className="w-14 h-14 bg-neutral/5 rounded-2xl flex items-center justify-center mb-6">
                        {tip.icon}
                     </div>
                     <h4 className="text-xl font-bold mb-3">{tip.title}</h4>
                     <p className="text-sm text-neutral/60 leading-relaxed">{tip.desc}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

  
      <section className="py-20 bg-white">
         <div className="container mx-auto px-6">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.5em] text-neutral/30 mb-12">Official Partners</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-40 hover:grayscale-0 transition-all">
               {["SunShade", "AquaSkin", "SummerFit", "BeachWear Pro"].map((brand) => (
                  <span key={brand} className="text-xl md:text-3xl font-display font-black tracking-tighter hover:opacity-100 opacity-60 transition-opacity cursor-pointer uppercase italic">
                    {brand}
                  </span>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
