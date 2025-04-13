import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import Navbar from "./Navbar";
import AllJobs from "./AllJobs";
import { AuthProvider } from "./context/AuthContext";
import LoginModal from "./LoginModal";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard";

const App = () => {
 
  const user = {
    
    "name": "shubham kumar",
    "email": "krsubam4u@gmail.com",
    "phone": "7254050024",
    "password": "$2b$10$ujmwY1ibPInXANRhyCdlfujzAb7x.9yp2Cb6tyn21HHj8.nRFeZYu",
    "favorites":  ['1738563928','1738558322', '1738556369' ] 
  }
  return (
    <AuthProvider>
      <Router>
     <Navbar/>
     <LoginModal/>
      <Routes>

        <Route path="/" element={<AllJobs />} />

        <Route path="/job/:jobId" element={
          <ProtectedRoute>
            <JobDetails />
          </ProtectedRoute>} />

        <Route path="/jobs" element={
          <ProtectedRoute>
            <JobList />
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={ 
          <ProtectedRoute>
            <Dashboard user = {user}/>
          </ProtectedRoute>} />

      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
