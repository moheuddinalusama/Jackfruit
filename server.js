import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "Jackfruit-secret-123";
const APP_URL = process.env.APP_URL || "http://localhost:3000";
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  googleId: String,
});
const ProductSchema = new mongoose.Schema({
  id: String,
  name: String,
  brand: String,
  price: Number,
  rating: Number,
  stock: Number,
  description: String,
  image: String,
  category: String,
});

const User = mongoose.model("User", UserSchema);
const Product = mongoose.model("Product", ProductSchema);

async function startServer() {
  const app = express();
  const PORT = 3000;






  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log("MongoDB connected");
      

      const count = await Product.countDocuments();
      if (count === 0) {
        const productsPath = path.join(process.cwd(), "src", "data", "products.json");
        if (fs.existsSync(productsPath)) {
          const productsData = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
          await Product.insertMany(productsData);
          console.log("Database seeded with products");
        }
      }
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  } else {
    console.warn("MONGODB_URI not found. Running in localized mode.");
  }


  app.use(express.json());
  app.use(cors({ origin: true, credentials: true }));
  app.use(cookieParser());


  app.use((req, res, next) => {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers.host;
    req.fullUrl = `${protocol}://${host}`;
    next();
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "SunCart API is running", detectedUrl: req.fullUrl });
  });









  const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };


  app.get("/api/auth/google/url", (req, res) => {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const clientId = process.env.GOOGLE_CLIENT_ID;
    
    if (!clientId) {
      return res.json({ 
        url: `${req.fullUrl}/auth/google/callback?code=mock_code&state=demo`,
        isMock: true 
      });
    }







    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: `${req.fullUrl}/auth/google/callback`,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
    });
    res.json({ url: `${googleAuthUrl}?${params.toString()}`, isMock: false });
  });

  app.get("/auth/google/callback", async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).send("No code provided");


    let user = await User.findOne({ email: "guest@Jackfruit.com" });
    if (!user) {
      user = await User.create({
        name: "Summer Guest",
        email: "guest@Jackfruit.com",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        googleId: "mock-google-id",
      });
    }







    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              try {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', user: ${JSON.stringify(user)} }, '*');
                setTimeout(() => window.close(), 200);
              } catch (e) {
                console.error("Popup communication error:", e);
                window.location.href = '/';
              }
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentication successful. Window closing...</p>
        </body>
      </html>
    `);
  });

  app.get("/api/me", authenticate, (req, res) => {
    res.json(req.user);
  });

  app.post("/api/logout", (req, res) => {
    res.clearCookie("token", { sameSite: "none", secure: true });
    res.json({ success: true });
  });

  app.get("/api/products", async (req, res) => {
    try {
      let products = [];

      if (mongoose.connection.readyState === 1) {
        products = await Product.find().lean() || [];
      }

      if (products.length > 0) {
        return res.json(products);
      }
      

      const productsPath = path.join(process.cwd(), "src", "data", "products.json");
      if (fs.existsSync(productsPath)) {
        const productsData = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
        return res.json(productsData);
      }
      
      res.json([]);
    } catch (err) {
      console.error("Fetch products error:", err);
   
      try {
        const productsPath = path.join(process.cwd(), "src", "data", "products.json");
        const productsData = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
        res.json(productsData);
      } catch (e) {
        res.status(500).json({ error: "Major system error" });
      }
    }
  });



  

  app.get("/api/products/:id", async (req, res) => {
    try {
      let product = null;


      if (mongoose.connection.readyState === 1) {
        product = await Product.findOne({ id: req.params.id }).lean();
      }

      if (product) return res.json(product);

      const productsPath = path.join(process.cwd(), "src", "data", "products.json");
      if (fs.existsSync(productsPath)) {
        const productsData = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
        const localProduct = productsData.find((p) => p.id === req.params.id || String(p._id) === req.params.id);
        if (localProduct) return res.json(localProduct);
      }
      
      res.status(404).json({ error: "Product not found" });
    } catch (err) {
      console.error("Fetch product by ID error:", err);
      res.status(500).json({ error: "Server error fetching product" });
    }
  });


  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
