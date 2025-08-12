import React, { useEffect } from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllJobs } from './redux/jobSlice';

const LatestJobs = () => {
  const dispatch = useDispatch();
  const { allJobs = [], loading } = useSelector(store => store.job);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='w-full px-6 py-10'>
      <h1 className='text-xl font-bold text-center'>
        <span className='text-[#03f317]'>Latest & Top </span> Job Openings
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {Array.isArray(allJobs) && allJobs.length > 0 ? (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        ) : (
          <span className="col-span-full text-center">No Job Available</span>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
