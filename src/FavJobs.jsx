import { useEffect, useState } from 'react';
import axios from 'axios';
import JobCard from './JobCard';
import JobCardShimmer from './Shimmers/JobCardShimmer';

const FavJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const jobIds = ['1738563928','1738558322','1738556369'];

  useEffect(() => {
    async function fetchJobs() {
      try {
        if (jobIds.length === 0) {
          setJobs([]);
          setLoading(false);
          return;
        }

        const idsString = jobIds.join(','); // "job123,job456,job789"
        const response = await axios.get(`http://localhost:5000/favjobs?ids=${idsString}`);
        setJobs(response.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [jobIds]);

  if (loading) return <JobCardShimmer/>;

  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.job_id} job={job} />
      ))}
    </div>
  );
}

export default FavJobs;
