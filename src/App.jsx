import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PersonlizedJobs from "./PersonlizedJobs";
import JobDetails from "./JobDetails";
import Navbar from "./Navbar";
import AllJobs from "./AllJobs";
import Dashboard from "./Dashboard";
import FavJobs from "./FavJobs";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("UserSkills");
      localStorage.removeItem("userJobs");
      localStorage.removeItem("uploadedResumeFileName");
      localStorage.removeItem("favoriteJobs")
    };
  
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);
  

  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllJobs />} />
        <Route path="/job/:jobId" element={<JobDetails />} />
        <Route path="/personlized-jobs" element={<PersonlizedJobs />} />
        <Route path="/favjobs" element={<FavJobs />} />
      </Routes>
    </Router>

  );
};

export default App;
