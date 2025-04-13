import React, { useState } from "react";
import { Link } from "react-router-dom";


const JobCard = ({ job }) => {
  const [ isFavorite, setIsFavorite] = useState(false);
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const changeFavoriteState = () =>{
    if(!isFavorite){
      setFavoriteJobs([...favoriteJobs, job.id])
      setIsFavorite(true);
      }
      else{
        setFavoriteJobs(favoriteJobs.filter(id => id !== job.id))
        setIsFavorite(false);
        }
  }
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
      {
        job.post_type==="internship"?
        <p className=" font-semibold bg-blue-200 text-sm border-2 rounded-xl px-2 py-1 text-green-600"><strong>Duration: </strong>{job.duration}</p>:
        <span className="text-gray-600">{job.duration}</span>
      }
      <p className="text-gray-700">{job.description}</p>
      <div className="mt-2">
        <strong>Skills Required:</strong>
        <div className="flex flex-wrap gap-2 mt-1">
          {job.skills.map((skill, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm">{skill}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center  mt-4 justify-between">
      <Link to={`/job/${job.job_id}`} target="blank" className=" inline-block bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">View More</Link>
      <button className={`bi  rounded px-2 py-1 ${isFavorite ? "bg-red-600 text-white bi-x-lg": "bg-blue-100 text-blue-800 bi-heart"}`} onClick={changeFavoriteState}> {isFavorite ? "Remove from Favorites" : "Add to Favorites"}</button>
      </div>
    </div>
  );
};

export default JobCard;
