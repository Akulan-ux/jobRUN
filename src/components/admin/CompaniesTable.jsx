import React, { useMemo } from 'react';
import { Edit2, MoreHorizontal, Pen } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const navigate = useNavigate();

  // Memoize filtered companies to prevent unnecessary recalculations
  const filteredCompanies = useMemo(() => {
    return companies.filter(company =>
      !searchCompanyByText ||
      company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    );
  }, [companies, searchCompanyByText]);

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 ">
        <caption className="font-light text-gray-100 mb-2">
          A list of your recent registered companies
        </caption>
        <thead className="bg-gray-500">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#50f802]">Logo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#50f802]">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[#50f802]">Date</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-[#50f802]">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map(company => (
              <tr key={company._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={company.logo || "https://via.placeholder.com/40"}
                      alt={company.name}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/40";
                      }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#000000] font-medium">
                  {company.name || 'No name'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {company.createdAt?.split("T")[0] || 'N/A'}
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
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="btn btn-link p-0 text-gray-900 hover:text-gray-700"
                      >
                        <Pen size={16} className="mr-1 text-gray-900 " /> Edit
                      </button>
                    </div>
                   </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                {companies.length === 0 ? 'No companies available' : 'No matching companies found'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesTable;