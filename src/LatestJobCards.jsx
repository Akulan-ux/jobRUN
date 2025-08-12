import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="w-76 bg-white rounded-xl overflow-hidden shadow-lg   hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-100">
      {/* Company Header */}
      <div className="bg-gradient-to-r  justify-center from-gray-50 to-gray-100 px-5 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
            {job?.company?.name?.charAt(0)}
          </div>
          <div>
            <h2 className="font-bold text-gray-800">{job?.company?.name}</h2>
            <p className="text-sm text-green-600 font-medium">{job?.title}</p>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {job?.description}
        </p>

        {/* Job Details */}
        <div className="flex flex-wrap justify-between gap-1 mb-4">
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
            {job?.position}
          </span>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
            {job?.jobType}
          </span>
          <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
            {job?.salary}
          </span>
        </div>

        {/* Button Row */}
        <div className="flex justify-center items-center pt-1 border-t border-gray-100 mb-1">
          <motion.button
            whileHover={{ scale: 0.90 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/description/${job._id}`)}
            className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            View Details
          </motion.button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
         <span>{job?.jobType || 'Job Type'}</span>
          <span>{job?.createdAt ? `${daysAgoFunction(job.createdAt)} days ago` : 'Recently'}</span>
        </div>
      </div>
    </div>
  )
}

export default LatestJobCards