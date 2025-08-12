import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { fetchAllJobs } from './redux/jobSlice';


const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs = [], searchedQuery, loading, error } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  useEffect(() => {
    if (searchedQuery && typeof searchedQuery === 'string') {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      })
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-500 text-lg">Loading jobs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-red-500 text-lg">Error: {error}</span>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-1/5'>
            <FilterCard />
          </div>
          <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
            {Array.isArray(filterJobs) && filterJobs.length > 0 ? (
              filterJobs.map((job) => (
                <div key={job._id}>
                  <Job job={job} />
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-500 text-lg">No jobs available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;