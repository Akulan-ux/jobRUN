import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }

  if (!job) {
    return <div>Loading job data...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="max-w-2xl mx-auto mb-6"
    >
      <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 hover:border-green-200 transition-all duration-300">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-400 to-emerald-600"></div>

        <div className="p-6 pl-8">
          <div className="flex items-center-safe space-x-3 mb-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                {job?.company?.name?.charAt(0) || 'J'}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{job?.company?.name || 'Company Name'}</h2>
              <p className="text-emerald-600 font-medium">{job?.title || 'Job Title'}</p>
            </div>
          </div>

          <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
            {job?.description || 'No description available'}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              {job?.position || 'Position'}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              {job?.jobType || 'Job Type'}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              {job?.salary ? `$${job.salary}` : 'Salary'}
            </span>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/description/${job._id}`)}
                className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                View Details
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 bg-white border border-amber-400 text-amber-600 rounded-lg hover:bg-amber-50 transition-all"
              >
                Save
              </motion.button>
            </div>
            <div className="text-sm text-gray-400 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {job?.createdAt ? `${daysAgoFunction(job.createdAt)} days ago` : 'Recently'}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Job;