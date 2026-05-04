import { motion } from "motion/react";
import { User, Settings, ShoppingBag, Heart, MapPin, Edit3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile({ user }) {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row items-center gap-10 mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="w-44 h-44 rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl sun-glow">
              <img src={user.image} className="w-full h-full object-cover" alt={user.name} />
            </div>
            <Link to="/update-profile" className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
              <Edit3 size={20} />
            </Link>
          </motion.div>

          <div className="text-center md:text-left">
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-4xl md:text-5xl font-display font-black mb-2 flex items-center gap-4 justify-center md:justify-start"
            >
              {user.name}
              <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-bold uppercase tracking-widest h-fit">PRO Member</span>
            </motion.h1>
            <p className="text-neutral/50 font-medium mb-6">{user.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
               <div className="flex items-center gap-2 text-sm font-bold text-neutral/70">
                  <MapPin size={16} className="text-secondary" /> Miami, Florida
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-neutral/70">
                  <ShoppingBag size={16} className="text-primary" /> 12 Orders
               </div>
            </div>
          </div>
        </header>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <motion.div 
             whileHover={{ y: -5 }}
             className="p-8 glass rounded-[2.5rem] relative overflow-hidden group"
           >
              <div className="absolute top-0 right-0 p-8 text-neutral/5 group-hover:text-primary/10 transition-colors">
                 <ShoppingBag size={80} />
              </div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><ShoppingBag className="text-primary" /> Recent Orders</h3>
              <div className="space-y-4">
                 {[
                   { id: "#4032", date: "May 12", status: "Delivered", total: "$120.50" },
                   { id: "#3991", date: "April 28", status: "Delivered", total: "$45.00" }
                 ].map(order => (
                   <div key={order.id} className="flex justify-between items-center p-4 bg-white/50 rounded-2xl border border-white/20">
                      <div>
                         <p className="font-bold">{order.id}</p>
                         <p className="text-xs text-neutral/40">{order.date}</p>
                      </div>
                      <div className="text-right">
                         <p className="font-bold">{order.total}</p>
                         <p className="text-[10px] uppercase font-bold text-green-500">{order.status}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 mt-6 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors">View all orders</button>
           </motion.div>

           <motion.div 
             whileHover={{ y: -5 }}
             className="p-8 glass rounded-[2.5rem] relative overflow-hidden group"
           >
              <div className="absolute top-0 right-0 p-8 text-neutral/5 group-hover:text-secondary/10 transition-colors">
                 <Heart size={80} />
              </div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><Heart className="text-secondary" /> Wishlist</h3>
              <div className="grid grid-cols-3 gap-3">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="aspect-square rounded-2xl bg-neutral/5 overflow-hidden">
                      <img src={`https://images.unsplash.com/photo-${i === 1 ? '1511499767350-a1535687384a' : i === 2 ? '1596755094514-f87e34085b2c' : '1526947425960-945c6e72858f'}?q=80&w=200&auto=format&fit=crop`} className="w-full h-full object-cover" alt="Wishlist item" />
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 mt-6 text-sm font-bold text-secondary hover:bg-secondary/5 rounded-xl transition-colors">Manage wishlist</button>
           </motion.div>
        </div>

        <div className="mt-12 p-8 bg-neutral text-white rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 rounded-2xl"><Settings size={32} /></div>
              <div>
                 <h4 className="font-bold text-xl uppercase italic">Account  Setting</h4>
                 <p className="text-white/50 text-sm">Manage your security and preferences.</p>
              </div>
           </div>
           <Link to="/update-profile" className="px-8 py-4 bg-white text-neutral rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all">
              Update Profile
           </Link>
        </div>
      </div>
    </div>
  );
}
