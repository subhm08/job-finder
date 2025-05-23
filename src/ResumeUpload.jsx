import React, { useState, useEffect } from "react";
import axios from "axios";

const ResumeUpload = ({ setFilteredJobs, loading, setLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [resumeFileName, setResumeFileName] = useState("");

  useEffect(() => {
    const savedSkills = JSON.parse(localStorage.getItem("UserSkills"));
    const savedJobs = JSON.parse(localStorage.getItem("userJobs"));
    const savedFileName = localStorage.getItem("uploadedResumeFileName");

    if (savedSkills?.length > 0) setSkills(savedSkills);
    if (savedJobs?.length > 0) setFilteredJobs(savedJobs);
    if (savedFileName) setResumeFileName(savedFileName);
  }, [setFilteredJobs]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResumeFileName(e.target.files[0]?.name || "");
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file.");
    setLoading(true);

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await axios.post(
        "https://job-finder-backend-vqg6.onrender.com/upload-resume",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const { skills: parsedSkills, jobs: matchedJobs } = response.data;

      setSkills(parsedSkills);
      setFilteredJobs(matchedJobs);

      localStorage.setItem("UserSkills", JSON.stringify(parsedSkills));
      localStorage.setItem("userJobs", JSON.stringify(matchedJobs));
      localStorage.setItem("uploadedResumeFileName", selectedFile.name);
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Resume upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full ma-w-2xl mx-auto p-6 bg-blue-500 shadow-lg rounded-2xl">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
        Upload Your Resume
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="bg-white text-blue-600 px-4 py-2 rounded cursor-pointer w-full md:w-auto"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-100 text-blue-700 px-6 py-2 rounded-lg hover:bg-blue-200 font-semibold font-mono tracking-wide w-full md:w-auto"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {resumeFileName && (
        <p className="text-sm text-blue-100 mt-3 text-center md:text-left">
          Uploaded: {resumeFileName}
        </p>
      )}

      {skills.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-blue-50 text-lg">Extracted Skills:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
