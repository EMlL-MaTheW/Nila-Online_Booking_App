// Attached <Link> for all navigations.   
import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50 shadow-sm transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-3 group hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-gradient-to-br from-[#247336] to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <i className="fa-solid fa-leaf text-white text-xl"></i>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#247336] to-emerald-600 bg-clip-text text-transparent">
              Nila
            </span>
          </Link>

          {/* Desktop Navigation (Home) */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-[#247336] transition-all duration-300 font-medium hover:underline underline-offset-4 active:scale-95"
            >
              Home
            </Link>
            {/* About Us */}
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-[#247336] transition-all duration-300 font-medium hover:underline underline-offset-4 active:scale-95"
            >
              About Us
            </Link>
            {/* Services */}
            <Link 
              to="/services" 
              className="text-gray-700 hover:text-[#247336] transition-all duration-300 font-medium hover:underline underline-offset-4 active:scale-95"
            >
              Services
            </Link>
            {/* Counselors */}
            <Link 
              to="/experts" 
              className="text-gray-700 hover:text-[#247336] transition-all duration-300 font-medium hover:underline underline-offset-4 active:scale-95"
            >
              Counselors
            </Link>
            {/* Resources */}
            <Link 
              to="/resources" 
              className="text-gray-700 hover:text-[#247336] transition-all duration-300 font-medium hover:underline underline-offset-4 active:scale-95"
            >
              Resources
            </Link>
            {/* Contact */}
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-[#247336] transition-all duration-300 font-medium hover:underline underline-offset-4 active:scale-95"
            >
              Contact
            </Link>
          </nav>
          {/* Sign in */}
          <div className="flex items-center gap-3">

            {user ? (
              <>
                <Link
                  to="/userdashboard"
                  className="text-gray-700 hover:text-[#247336] font-medium transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="bg-gradient-to-r from-[#247336] to-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-md"
              >
                Sign In
              </Link>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
