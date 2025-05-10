import React from 'react';
import FavJobs from './FavJobs';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
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
