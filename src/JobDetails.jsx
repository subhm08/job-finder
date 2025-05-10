import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get(`https://job-finder-backend-vqg6.onrender.com/job/${jobId}`)
      .then((response) => setJob(response.data))
      .catch(() => setJob(null));
  }, [jobId]);

  if (!job) return <div className="p-6 text-center text-gray-700">Job not found</div>;

  return (
    <div className="p-6 md:w-3/4 mx-auto bg-white shadow-lg rounded-2xl border border-gray-200">
      <div className="bg-blue-500 text-white p-6 rounded-t-2xl">
        <h1 className="text-3xl font-bold">{job.job_title}</h1>
        <p className="text-lg">{job.company_name} - {job.location}</p>
      </div>
      <div className="p-6">
        <p className="text-xl font-semibold text-gray-800">💰 {job.salary}</p>
        <p className="my-4 text-gray-700/90 text-2xl"><strong>Description:</strong></p>
        <div className="text-gray-700 space-y-1">
        {job.job_description.split("\n").map((line, index) => {
          if (/key responsibilities?/i.test(line) || /About Us?/i.test(line)  || /Requirements?/i.test(line) || /What We Offer?/i.test(line) || /Why Join Us??/i.test(line)) {
            return <p key={index} className="text-xl  text-gray-700 my-4"><strong>{line}</strong></p>;
          }
          return <p key={index}>{line}</p>;
        })}
      </div>

        <div className="my-4">
          <h2 className="text-lg font-semibold text-gray-800">Skills Required:</h2>
          <div className="flex flex-wrap gap-2 my-2">
            {job.skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">{skill}</span>
            ))}
          </div>
        </div>

        {/* <p className="mt-4 text-gray-500">📅 Posted on: {new Date(job.posted_date).toLocaleDateString()}</p> */}
        
        <div className="mt-6 text-center">
          <a href={job.job_url} className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 text-lg font-medium inline-block mr-4">🚀 Apply Now</a>
          <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 text-lg font-medium inline-block">🔙 Back to Jobs</Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
