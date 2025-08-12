import React, { useEffect, useMemo } from 'react';
import { Edit2, Eye, MoreHorizontal, Pen } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const navigate = useNavigate();

  // Memoize filtered jobs to prevent unnecessary recalculations
  const filteredJobs = useMemo(() => {
    return allAdminJobs.filter(job =>
      !searchJobByText ||
      job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
    );
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 ">
        <caption className="font-light text-gray-100 mb-2">
          A list of your recently posted jobs
        </caption>
        <thead className="bg-gray-500">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#50f802]">Company Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#50f802]">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#50f802]">Date</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-[#50f802]">Action</th>
            <th className="px-2 py-3 text-right text-xs font-medium text-[#50f802]">Applicants</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <tr key={job._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#000000] font-medium">
                  {job?.company?.name || 'No name'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#000000] font-medium">
                  {job?.title || 'No name'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {job.createdAt.split("T")[0] || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-normal">
                  <div className="relative inline-block text-left">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md hover:bg-gray-100 p-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    <div className="my-1">
                      <button
                        onClick={() => navigate(`/admin/companies/${job.company._id}`)}
                        className="btn btn-link p-0 text-gray-900 hover:text-gray-700"
                      >
                        <Pen size={16} className="mr-1 text-gray-900 " /> Edit
                      </button>
                    </div>
                  </div>
                </td>
                <td className="text-right pr-4"> {/* Add right padding */}
                  <div
                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                    className="inline-flex items-center justify-end gap-4 cursor-pointer mt-1 text-gray-900"
                  >
                    <Eye />
                  </div>
                </td>


              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                {allAdminJobs.length === 0 ? 'No jobs available' : 'No matching jobs found'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobsTable;