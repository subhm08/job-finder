import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icon library
import logo from "./assets/logo.png"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleResize = () => {
    if (window.innerWidth >= 768) setMenuOpen(false); // auto-close on desktop
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white px-4 py-4 shadow-xl relative z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
        <img src={logo} alt="Job Finder Logo" className="h-14 w-14 object-contain" />
        <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight font-mono">
          Job Finder
        </h1>
      </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 font-semibold text-lg">
          <NavLink to="/" className="text-blue-700 hover:text-blue-400 duration-300 hover:border-b-2 group">
            <span className="group-[.active]:text-blue-400">All Jobs</span>
          </NavLink>
          <NavLink to="/personlized-jobs" className="text-blue-700 hover:text-blue-400 duration-300 hover:border-b-2 group">
            <span className="group-[.active]:text-blue-400">Personalized Jobs</span>
          </NavLink>
          <NavLink to="/favjobs" className="text-blue-700 hover:text-blue-400 duration-300 hover:border-b-2 group relative">
            <span className="group-[.active]:text-blue-400">Favorite Jobs</span>
          </NavLink>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start mt-4 space-y-4 text-lg font-semibold text-blue-700">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">All Jobs</NavLink>
          <NavLink to="/personlized-jobs" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Personalized Jobs</NavLink>
          <NavLink to="/favjobs" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Favorite Jobs</NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
