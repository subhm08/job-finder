import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Profile = () => {
  const {user, setUser, setShowLoginModal} = useAuth();
  return (
    <div className="fixed top-0 right-0 bg-white shadow-2xl rounded-2xl w-80 p-6 z-50 h-screen">

      <div className="flex justify-end">
        <button onClick={()=>setShowLoginModal(false)} className="text-gray-500 hover:text-gray-800 text-2xl">
          X
        </button>
      </div>
      <div className="flex flex-col justify-between h-full bg-green-300">
      <div className="flex flex-col items-center mt-2 ">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
          {(user.name.trim().split(" ").map(word => word[0]).slice(0,2).join(""))}
        </div>
        <h2 className="text-xl font-semibold mt-3">{user?.name || "User Name"}</h2>
        <p className="text-gray-600 text-sm">{user?.email || "user@example.com"}</p>
        <p className="text-gray-600 text-sm">{user?.phone || "+91 9876543210"}</p>
        <NavLink
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition text-center my-4"
          to={'/dashboard'}
        >
          Favorite Jobs
        </NavLink>
      </div>
      <button
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition self-end"
        >
          Logout
        </button>
      </div>

       
      
      

      {/* Buttons */}
     
    </div>
  );
};

export default Profile;
