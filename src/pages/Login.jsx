import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { Mail, Lock, ArrowRight, Github } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Login({ login, user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  const handleGoogleLogin = async () => {
    try {
      const res = await fetch("/api/auth/google/url");
      const { url } = await res.json();
      const popup = window.open(url, "google_login", "width=500,height=600");
      
      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        toast.error("Popup blocked! Please allow popups for this site.");
      } else {
        toast.loading("Waiting for Google...", { id: "google-auth" });
      }
    } catch (err) {
      toast.error("Google Login failed to initialize");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill all fields");

    setIsLoading(true);
   
    setTimeout(() => {
      const mockUser = {
        name: email.split("@")[0],
        email,
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };
      login(mockUser);
      setIsLoading(false);
      toast.success(`Welcome back, ${mockUser.name}!`);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#FDFCFB]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl border border-neutral/5"
      >
        <div className="text-center mb-10">
          <p className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Secure Access</p>
          <h2 className="text-4xl font-display font-black mb-3 uppercase italic leading-none">Welcome Back</h2>
          <p className="text-neutral/40 text-sm font-medium">Re-enter the world of golden sunshine.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral/40 ml-1">Email Account</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-neutral/5 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 transition-all font-medium text-sm"
                placeholder="summer@suncart.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral/40 ml-1">Secure Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-neutral/5 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-primary/20 transition-all font-medium text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex justify-end p-1">
             <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-neutral/30 hover:text-primary transition-colors">Forgot Password?</button>
          </div>

          <button 
            disabled={isLoading}
            className="w-full py-5 bg-neutral text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-neutral/90 transition-all shadow-xl hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 ring-offset-2 focus:ring-2 focus:ring-neutral"
          >
            {isLoading ? "Authenticating..." : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-neutral/5"></span></div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-white px-4 text-neutral/30 font-bold">Quick Access</span></div>
        </div>

        <div className="space-y-4">
          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-4 border border-neutral/10 rounded-2xl hover:bg-neutral/5 transition-all font-bold text-sm bg-white shadow-sm"
          >
             <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" /> Continue with Google
          </button>
        </div>

        <p className="text-center mt-10 text-sm text-neutral/50 font-medium">
          Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Join the family</Link>
        </p>
      </motion.div>
    </div>
  );
}
