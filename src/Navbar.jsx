import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { NavLink } from "react-router-dom";
import Sidebar from "./Profile"; // Import Sidebar component

const Navbar = () => {
  const { isAuthenticated, logout, setShowLoginModal, user } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="bg-white px-4 py-4 flex items-center gap-6 justify-between shadow-xl relative">
      <div className="logo font-mono tracking-wide text-3xl font-semibold text-blue-500">
        <p className="border-2 border-double py-1 px-4 rounded-lg">JOB FINDER</p>
      </div>

      <div className="links flex items-center gap-6 font-semibold text-lg">
        <NavLink to="/" className="text-blue-700 hover:text-blue-400 duration-300 hover:border-b-2">All Jobs</NavLink>
        <NavLink to="/jobs" className="text-blue-700 hover:text-blue-400 duration-300 hover:border-b-2">Personalized Jobs</NavLink>
        <NavLink to="/dashboard" className="text-blue-700 hover:text-blue-400 duration-300 hover:border-b-2">Dashboard</NavLink>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <button onClick={toggleSidebar} className="bg-blue-500 px-4 py-2 rounded text-white font-semibold">Profile</button>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded text-white font-semibold">Logout</button>
          </>
        ) : (
          <button onClick={() => setShowLoginModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded font-semibold">Login</button>
        )}
      </div>

      {showSidebar && <Sidebar user={user} closeSidebar={toggleSidebar} />}
    </div>
  );
};

export default Navbar;
