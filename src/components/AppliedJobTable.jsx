import React from 'react';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const allAppliedJobs = useSelector((store) => store.job?.allAppliedJobs || []);

  return (
    <div className="px-4">
      <div className='max-w-4xl mx-auto bg-white shadow-xl text-gray-950 rounded-3xl my-10 p-10 transition-transform hover:scale-[1.01]'>
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Applied Jobs</h2>
        <table className="table-auto w-full text-left text-sm text-gray-800">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Company Name</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {allAppliedJobs.length > 0 ? (
              allAppliedJobs.map((appliedJob) => (
                <tr key={appliedJob._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {appliedJob?.createdAt?.split('T')[0] ||
                      appliedJob?.createdAt?.split(' ')[0] || 'N/A'}
                  </td>
                  <td className="px-4 py-3">{appliedJob.job?.title || 'N/A'}</td>
                  <td className="px-4 py-3">{appliedJob.job?.company?.name || 'N/A'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-semibold text-xs ${appliedJob.status?.toLowerCase() === 'accepted'
                          ? 'bg-green-100 text-green-700'
                          : appliedJob.status?.toLowerCase() === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                      {appliedJob.status || 'Pending'}
                    </span>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No applied jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <p className="text-center text-gray-600 mt-6 text-sm">
          A list of your applied jobs
        </p>
      </div>
    </div>
  );
};

export default AppliedJobTable;