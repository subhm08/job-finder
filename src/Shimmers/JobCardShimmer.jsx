import React from "react";

const JobCardShimmer = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow-lg w-full md:w-3/4 mx-auto my-4 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-2">
          <div className="h-6 bg-gray-300 rounded w-48"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
      </div>

      <div className="h-4 bg-gray-300 rounded w-24 mb-4"></div>

      <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>

      <div className="h-20 bg-gray-300 rounded mb-4"></div>

      <div className="mt-2">
        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
        <div className="flex gap-2 flex-wrap mt-1">
          <div className="h-6 bg-gray-300 rounded w-20"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
          <div className="h-6 bg-gray-300 rounded w-24"></div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="h-10 bg-gray-300 rounded w-32"></div>
        <div className="h-10 bg-gray-300 rounded w-40"></div>
      </div>
    </div>
  );
};

export default JobCardShimmer;
