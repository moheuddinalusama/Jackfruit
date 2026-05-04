import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { User, Camera, Save, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

export default function UpdateProfile({ user, update }) {
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) return toast.error("Name and Image are required");

    setIsLoading(true);
    
    setTimeout(() => {
      update({ name, image });
      setIsLoading(false);
      toast.success("Profile updated successfully!");
      navigate("/my-profile");
    }, 1000);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-md mx-auto">
        <header className="mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-neutral/50 hover:text-primary transition-colors mb-6 font-bold text-sm"
          >
            <ArrowLeft size={18} /> Cancel changes
          </button>
          <h1 className="text-4xl font-display font-black leading-tight uppercase italic">Update Information</h1>
          <p className="text-neutral/50 text-sm font-medium mt-2">Refine your summer identity.</p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-neutral/5"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center mb-8">
               <div className="relative group">
                  <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                    <img src={image} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] flex items-center justify-center">
                     <Camera size={32} className="text-white" />
                  </div>
               </div>
               <p className="text-[10px] uppercase font-bold text-neutral/30 mt-4 tracking-widest">Profile Preview</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral/40 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30" size={18} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-neutral/5 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral/40 ml-1">Profile Image URL</label>
              <div className="relative">
                <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30" size={18} />
                <input 
                  type="text" 
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-neutral/5 border-none rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                  placeholder="https://..."
                />
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <Save size={20} /> {isLoading ? "Saving changes..." : "Save Information"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
