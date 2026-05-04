/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";


const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const update = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  return { user, loading, login, logout, update, fetchUser };
};

const ProtectedRoute = ({ children, user, loading }) => {
  if (loading) return <div className="h-screen w-screen flex items-center justify-center tropical-gradient text-white text-2xl font-display animate-pulse">SunCart...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  const { user, loading, login, logout, update, fetchUser } = useAuth();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        toast.dismiss("google-auth");
        toast.success("Signed in successfully!");
        fetchUser();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [fetchUser]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col overflow-x-hidden text-neutral">
        <Navbar user={user} logout={logout} />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login login={login} user={user} />} />
            <Route path="/register" element={<Register login={login} user={user} />} />
            <Route 
              path="/products/:id" 
              element={<ProductDetails />} 
            />
            <Route 
              path="/my-profile" 
              element={
                <ProtectedRoute user={user} loading={loading}>
                  <Profile user={user} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/update-profile" 
              element={
                <ProtectedRoute user={user} loading={loading}>
                  <UpdateProfile user={user} update={update} />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </Router>
  );
}
