import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import ResumeUpload from "./ResumeUpload";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  // const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    axios.get(`http://localhost:5000/jobs`)
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, [filteredJobs]);

  return (
    <div className="p-6">
      <ResumeUpload setFilteredJobs={setFilteredJobs} />
      <div className="flex flex-wrap -mx-1 mt-6">
        
      </div>
      {filteredJobs.length > 0 && 
      (
       <> 
        <h2 className="text-green-700 font-semibold text-center text-lg">{filteredJobs.length} Jobs found based on your skills...</h2>
        {filteredJobs.map((job)=> <JobCard key={job.job_id} job={job} />) }
      </>
  )
       }
    </div>
  );
};

export default JobList;
