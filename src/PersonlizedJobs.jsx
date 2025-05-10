import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import ResumeUpload from "./ResumeUpload";
import Pagination from "./Pagination";
import Shimmer from "./Shimmers/JobCardShimmer"

const PersonlizedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  // Calculate the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    axios.get(`https://job-finder-backend-vqg6.onrender.com/jobs`)
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, [filteredJobs]);

  return (
    <div className="p-6">
      <ResumeUpload setFilteredJobs={setFilteredJobs} loading={loading} setLoading={setLoading}/>
      <div className="flex flex-wrap -mx-1 mt-6">
        
      </div>
      {
        loading && <Shimmer></Shimmer>
      }

      {filteredJobs.length > 0 &&
      (
       <> 
        <h2 className="text-green-700 font-semibold text-center text-lg">{filteredJobs.length} Jobs found based on your skills...</h2>
        {currentItems.map((job)=> <JobCard key={job.job_id} job={job} />) }
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        loading={false}
      />
      </>
      )
       }
     

    </div>
  );
};

export default PersonlizedJobs;
