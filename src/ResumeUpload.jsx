import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = ({ setFilteredJobs, loading, setLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [skills, setSkills] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file.");
    setLoading(true);

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await axios.post("https://job-finder-backend-vqg6.onrender.com/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSkills(response.data.skills);
      setFilteredJobs(response.data.jobs);
    } catch (error) {
      console.error("Error uploading resume:", error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-blue-500 shadow-lg rounded-2xl">
      <h2 className="text-lg font-bold text-white mb-4">Upload Your Resume</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} className="bg-white text-blue-600 px-4 py-2 rounded cursor-pointer" />
      <button onClick={handleUpload} className="mx-4 bg-blue-100 text-blue-700 px-6 py-2 rounded-lg hover:bg-blue-200 font-semibold font-mono tracking-wide">
        Upload 
      </button>
    {console.log(skills)
    }
      {skills.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-blue-50">Extracted Skills:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm">{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
