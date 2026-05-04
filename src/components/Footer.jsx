import { Palmtree, Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-neutral text-white/70 pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <Palmtree size={20} />
            </div>
            <span className="font-display text-xl font-bold text-white">
             Jackfruit 
            </span>
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            Your destination for premium summer essentials. From high-end sunglasses to vibrant tropical wear, we bring the sunshine to your wardrobe.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Shop</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Summer Apparel</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Swimwear</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Accessories</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Skincare</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
          <ul className="flex flex-col gap-3 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">F.A.Q</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Return Policy</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Newsletter</h4>
          <p className="text-sm mb-4">Get 10% off your first order plus exclusive summer tips.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white/5 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-primary outline-none"
            />
            <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors">
              <Mail size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© 2026 Jackfruit Express Store. All rights reserved.</p>
        <p>Developer Moheuddin alusama</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Use</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
