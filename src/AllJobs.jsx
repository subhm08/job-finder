import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import JobCard from './JobCard'
import Pagination from './Pagination'
import JobCardShimmer from './Shimmers/JobCardShimmer'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const AllJobs = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const page = parseInt(query.get('page')) || 1;

  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/alljobs?page=${page}`)
      .then((res) => {
        setJobs(res.data.data);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      navigate(`?page=${newPage}`);
    }
  };

  return (
    <>
    
      <div className="p-4">
        <h2 className="text-blue-600 font-semibold text-2xl font-mono mb-4">
          {jobs.length * totalPages} Jobs found
        </h2>

        {loading ? (
           <>
           {[...Array(5)].map((_, index) => (
             <JobCardShimmer key={index} />
           ))}
         </>
        ) : (
          jobs.map((job) => <JobCard key={job.job_id} job={job} />)
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
