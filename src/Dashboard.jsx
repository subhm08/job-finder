import React from 'react';
import FavJobs from './FavJobs';

const Dashboard = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
            {(user.name.trim().split(" ").map(word => word[0]).slice(0,2).join(""))}

            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500">{user.phone}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <a
              href={user.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              View Resume
            </a>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-items-start items-start" >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Favorite Jobs</h3>
          {user.favorites.length > 0 ? (
            <FavJobs jobs={user.favorites} />
          ) : (
            <p className="text-gray-500">No favorite jobs saved yet.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
