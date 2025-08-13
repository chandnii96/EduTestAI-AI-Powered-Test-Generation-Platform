import React, { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function Navbar({ isMenuOpen, setIsMenuOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = location.pathname === "/signup";
  const isLogin = location.pathname === "/login";
  const isCreate = location.pathname === "/create";


  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || decoded.username || "User"); // fallback
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Invalid token:", err);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-black/60 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <button
              className="text-1xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              onClick={() => navigate("/")}
            >
              TestGenius
            </button>
            <a
  href=""
  className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 ml-6"
  onClick={(e) => {
    e.preventDefault(); // ⛔ prevents reload
    navigate('/');
  }}
>
              Home
            </a>
        
          </div>

          {/* Only show nav tags if not on signup/login */}
          {!isSignup && !isLogin && !isCreate && (
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                Process
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                Reviews
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">
                Pricing
              </a>
            </div>
          )}

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-blue-400 px-4 py-2 rounded-lg bg-white/5">
                  {userName}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* <button
                  className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button> */}
                <button
                  className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </button>
              </>
            )}
            <button className="group bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25" onClick={()=>navigate('/signup')}>
              <span className="flex items-center gap-2">
                create account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen && setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
