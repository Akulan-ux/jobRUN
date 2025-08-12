import React, { useEffect, useState } from 'react';
import Navbar from './components/shared/Navbar';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from './components/utils/constant';
import { setSingleJob } from './redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';

const JobDEscription = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { singleJob } = useSelector(state => state.job);
  const { user } = useSelector(store => store.auth);
  const jobId = params.id;
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Check if user has already applied
  useEffect(() => {
    if (singleJob?.applications && user?._id) {
      const hasApplied = singleJob.applications.some(app => 
        app.applicant === user._id || app.applicant?.$oid === user._id
      );
      setIsApplied(hasApplied);
    }
  }, [singleJob, user]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { 
        withCredentials: true 
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = { 
          ...singleJob, 
          applications: [...singleJob.applications, { applicant: user?._id }] 
        };
        dispatch(setSingleJob(updatedSingleJob));
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to apply');
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        // Validate jobId before making the request
        if (!jobId || jobId === 'undefined' || jobId.length !== 24) {
          setError('Invalid Job ID');
          setLoading(false);
          return;
        }

        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { 
          withCredentials: true 
        });
        
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setError(null);
        } else {
          setError(res.data.message || 'Failed to load job details');
        }
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || 'Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch]);

  // Handle invalid job ID
  if (!jobId || jobId === 'undefined') {
    return (
      <div>
        <Navbar />
        <div className='max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl my-7 p-2 text-center'>
          <h1 className='text-red-500'>Invalid Job ID</h1>
          <p>Please go back and select a valid job.</p>
          <button 
            onClick={() => navigate(-1)}
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className='max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl my-7 p-2 text-center'>
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className='max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl my-7 p-2 text-center'>
          <h1 className='text-red-500'>{error}</h1>
          <button 
            onClick={() => navigate(-1)}
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl my-7 p-2'>
        <div className='text-green-400'>
          <h1 className='font-bold mx-20'>{singleJob?.title}</h1><br></br>
          <div className='flex gap-2 text-gray-950'>
            <div className="badge badge-outline">{singleJob?.position}</div>
            <div className="badge badge-outline">{singleJob?.jobType}</div>
            <div className="badge badge-outline">{singleJob?.salary}</div><br></br>
            <div className='mx-12 my-3 '>
              <h1 className='border-b-3 border-b-gray-300 font-medium py-3 mx-5 text-gray-950'>Job Description</h1>
              <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel}yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length || 0}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>
                  {new Date(singleJob?.createdAt?.$date?.$numberLong || singleJob?.createdAt).toLocaleDateString()}
                </span></h1>
              </div>
            </div>
            <div className='my-0 mx-14'>
              <button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`px-4 py-2 rounded-lg ${isApplied ? ' bg-[#67b1a6] cursor-not-allowed' : 'bg-[#09b717] hover:bg-[#82e987] text-white'}`}
              >
                {isApplied ? 'Already Applied' : 'Apply Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDEscription;