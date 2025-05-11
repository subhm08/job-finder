import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorite state from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteJobs")) || [];
    setIsFavorite(storedFavorites.includes(job.job_id));
  }, [job.job_id]);

  const handleFavoriteClick = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteJobs")) || [];

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = storedFavorites.filter((id) => id !== job.job_id);
    } else {
      updatedFavorites = [...storedFavorites, job.job_id];
    }

    localStorage.setItem("favoriteJobs", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);

    if (onFavoriteToggle) onFavoriteToggle(job.job_id, !isFavorite); // notify parent
  };

  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow-lg w-full md:w-3/4 mx-auto my-4">
      <div className="title flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-gray-800">{job.job_title}</h2>
          <p className="text-gray-600">{job.company_name} - {job.location}</p>
        </div>
        <div className="logo">
          <img src={job.logo} alt={job.company_name} />
        </div>
      </div>
      <p className="text-gray-700 font-semibold">{job.salary}</p>
      {job.post_type === "internship" ? (
        <p><strong>Duration: </strong>{job.duration}</p>
      ) : (
        <p><strong>Experience: </strong>{job.duration}</p>
      )}
      <p className="text-gray-700">{job.description}</p>
      <div className="mt-2">
        <strong>Skills Required:</strong>
        <div className="flex flex-wrap gap-2 mt-1">
          {job.skills.map((skill, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm">{skill}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center mt-4 justify-between">
        <Link to={`/job/${job.job_id}`} target="_self" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">View More</Link>
        <button
          onClick={handleFavoriteClick}
          className={`rounded px-3 py-1 font-semibold ${
            isFavorite ? "bg-red-500 text-white" : "bg-blue-100 text-blue-800"
          }`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
