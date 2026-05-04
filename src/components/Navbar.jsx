import { Link, NavLink } from "react-router-dom";
import { Palmtree, User, LogOut, Menu, X, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Navbar({ user, logout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const res = await fetch("/api/auth/google/url");
      const { url } = await res.json();
      window.open(url, "google_login", "width=500,height=600");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    ...(user ? [{ name: "My Profile", path: "/my-profile" }] : []),
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-xl py-3 shadow-sm" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">      
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
             <Palmtree size={24} />
          </div>
          <span className="text-2xl font-display font-black tracking-tighter uppercase italic leading-none">
            Jack<span className="text-primary italic">fruit </span>
          </span>
        </Link>

    


    
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "text-[10px] font-black uppercase tracking-[0.3em] transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-neutral/50"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          
          <div className="flex items-center gap-4 pl-10 border-l border-neutral/5">
            <button className="p-3 bg-neutral/5 text-neutral/30 rounded-xl hover:bg-neutral/10 hover:text-neutral transition-all relative">
              <ShoppingCart size={20} />
              <span className="absolute top-2 right-2 w-4 h-4 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-black border-2 border-white">
                3
              </span>
            </button>
            
            {user ? (
               <div className="flex items-center gap-4">
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="flex items-center gap-3 pr-2 cursor-pointer">
                       <span className="text-[10px] font-bold text-neutral/60 hidden lg:block uppercase tracking-widest">{user.name}</span>
                       <div className="w-10 h-10 rounded-xl overflow-hidden border border-neutral/10 shadow-sm hover:scale-105 transition-transform">
                          <img src={user.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Summer"} className="w-full h-full object-cover" alt="User" />
                       </div>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] bg-white rounded-[2rem] w-64 mt-6 border border-neutral/5">
                      <li><Link to="/my-profile" className="flex items-center gap-3 py-4 text-[10px] uppercase font-black tracking-widest"><User size={16} className="text-primary"/> Dashboard</Link></li>
                      <li><Link to="/update-profile" className="flex items-center gap-3 py-4 text-[10px] uppercase font-black tracking-widest"><User size={16} className="text-secondary"/> Settings</Link></li>
                      <div className="divider my-0 opacity-10"></div>
                      <li><button onClick={logout} className="flex items-center gap-3 py-4 text-[10px] uppercase font-black tracking-widest text-red-500 hover:text-red-600"><LogOut size={16}/> Logout</button></li>
                    </ul>
                  </div>
               </div>
            ) : (
              <div className="flex items-center gap-4">
                 <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral hover:text-primary transition-colors">
                    Login
                 </Link>
                 <Link to="/register" className="h-12 px-8 bg-neutral text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center hover:bg-neutral/90 transition-all shadow-xl shadow-neutral/10">
                    Join
                 </Link>
              </div>
            )}
          </div>
        </div>

        
        <button 
          className="md:hidden p-3 bg-neutral/5 rounded-xl text-neutral/60"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

     
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-neutral/5 overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-display font-black uppercase italic text-neutral/30 hover:text-primary transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-neutral/5 flex flex-col gap-4">
                 {user ? (
                    <>
                       <div className="flex items-center gap-4 mb-2">
                          <img src={user.image} className="w-14 h-14 rounded-2xl object-cover" alt="User" />
                          <div>
                            <p className="text-lg font-black uppercase italic">{user.name}</p>
                            <p className="text-xs text-neutral/40">{user.email}</p>
                          </div>
                       </div>
                       <Link to="/my-profile" className="w-full py-5 bg-neutral/5 text-center rounded-2xl text-[10px] font-black uppercase tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>My Dashboard</Link>
                       <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full py-5 text-red-500 font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
                         <LogOut size={16}/> Logout
                       </button>
                    </>
                 ) : (
                    <div className="flex flex-col gap-4">
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-5 text-center rounded-2xl bg-neutral/5 text-neutral font-black uppercase text-[10px] tracking-widest">Login</Link>
                      <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-5 text-center rounded-2xl bg-primary text-white font-black uppercase text-[10px] tracking-widest shadow-xl">Join SunCart</Link>
                    </div>
                 )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
