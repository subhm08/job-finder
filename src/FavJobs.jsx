import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import JobCardShimmer from "./Shimmers/JobCardShimmer";

const FavJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favoriteJobs")) || [];
    setFavoriteIds(stored);
  }, []);

  useEffect(() => {
    async function fetchFavJobs() {
      if (favoriteIds.length === 0) {
        setJobs([]);
        setLoading(false);
        return;
      }

      try {
        const idsString = favoriteIds.join(",");
        const response = await axios.get(`https://job-finder-backend-vqg6.onrender.com/favjobs?ids=${idsString}`);
        setJobs(response.data);
      } catch (error) {
        console.error("Failed to fetch favorite jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFavJobs();
  }, [favoriteIds]);

  const handleFavoriteToggle = (jobId, isNowFavorite) => {
    const updated = isNowFavorite
      ? [...favoriteIds, jobId]
      : favoriteIds.filter((id) => id !== jobId);

    localStorage.setItem("favoriteJobs", JSON.stringify(updated));
    setFavoriteIds(updated);
  };

  if (loading) return <JobCardShimmer />;

  return (
   
    <div className="p-4">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Favorite Jobs</h3>
              {
                jobs.length > 0 ?
                  (
                    jobs.map((job) => (
                      <JobCard key={job.job_id} job={job} onFavoriteToggle={handleFavoriteToggle} />
                    ))
                  ) :
                  (
                    <p className="text-gray-500 text-center">No favorite jobs saved yet.</p>
                  )
              }
          </div>
  );
};

export default FavJobs;
