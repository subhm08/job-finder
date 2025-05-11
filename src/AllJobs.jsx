import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import JobCard from './JobCard';
import Pagination from './Pagination';
import JobCardShimmer from './Shimmers/JobCardShimmer';

const useQuery = () => new URLSearchParams(useLocation().search);

const AllJobs = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const page = parseInt(query.get('page')) || 1;

  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favoriteJobs")) || [];
    setFavoriteIds(stored);
  }, []);

  // Fetch jobs
  useEffect(() => {
    setLoading(true);
    axios.get(`https://job-finder-backend-vqg6.onrender.com/allJobs?page=${page}`)
      .then((res) => {
        setJobs(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage !== page) navigate(`?page=${newPage}`);
  };

  // Toggle favorite
  const handleFavoriteToggle = (jobId, isNowFavorite) => {
    const updated = isNowFavorite
      ? [...favoriteIds, jobId]
      : favoriteIds.filter(id => id !== jobId);

    localStorage.setItem("favoriteJobs", JSON.stringify(updated));
    setFavoriteIds(updated);
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-blue-600 font-semibold text-2xl font-mono mb-4">
          {jobs.length * totalPages} Jobs found
        </h2>

        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <JobCardShimmer key={i} />)
        ) : (
          jobs.map((job) => (
              <JobCard
                key={job.job_id}
                job={job}
                onFavoriteToggle={handleFavoriteToggle}
              />
          ))
        )}
      </div> 
      <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                loading={loading}
              />
    </>
  );
};

export default AllJobs;
