import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-white px-4 py-4 flex items-center gap-6 shadow-xl relative">
     
      <div className="logo font-mono tracking-wide text-3xl font-semibold text-blue-500 ">
        <p className="border-2 border-double py-1 px-4 rounded-lg">JOB FINDER</p>
      </div>

      <div className="links flex items-center gap-6 font-semibold text-lg justify-center">
        <NavLink to="/" className="text-blue-700 hover:text-blue-400 duration-300 hover:border-b-2 group"><span className="group-[.active]:text-blue-400">All Jobs</span></NavLink>
        <NavLink to="/personlized-jobs" className="text-blue-700 hover:text-blue-400 duration-300 hover:border-b-2 group"><span className="group-[.active]:text-blue-400">Personlized Jobs</span></NavLink>
        <NavLink to="/favjobs" className="text-blue-700 hover:text-blue-400 duration-300 hover:border-b-2 group"><span className="group-[.active]:text-blue-400">Favorite Jobs</span></NavLink>
      </div>

    </div>
  );
};

export default Navbar;
