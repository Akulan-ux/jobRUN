import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from './redux/jobSlice';


const filterData = [
  {
    filterType: "Location",
    options: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    icon: "📍"
  },
  {
    filterType: "Industry",
    options: ["Frontend", "Backend", "FullStack", "DevOps", "Mobile"],
    icon: "💻"
  },
  {
    filterType: "Salary Range",
    options: ["0-40k", "40k-1L", "1L-5L", "5L+"],
    icon: "💰"
  },
  {
    filterType: "Experience",
    options: ["Fresher", "1-3 years", "3-5 years", "5+ years"],
    icon: "📈"
  }
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value
    }));
  };

  useEffect(() => {
  const activeFilters = Object.entries(selectedFilters)
    .filter(([_, value]) => value !== null)
    .map(([_, value]) => value)
    .join(' ');
  
  dispatch(setSearchedQuery(activeFilters || ''));
}, [selectedFilters, dispatch]);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Filter Jobs</h1>
        <p className="text-gray-500 text-sm">Refine your job search</p>
        <div className="w-full h-px bg-gray-200 mt-3"></div>
      </div>

      <div className="space-y-6">
        {filterData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{section.icon}</span>
              <h2 className="text-lg font-semibold text-gray-700">{section.filterType}</h2>
            </div>
            
            <div className="space-y-2 pl-7">
              {section.options.map((option, optionIndex) => (
                <div 
                  key={optionIndex} 
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={() => handleFilterChange(section.filterType, option)}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center 
                    ${selectedFilters[section.filterType] === option ? 
                      'border-blue-500 bg-blue-500' : 'border-gray-300'}`}
                  >
                    {selectedFilters[section.filterType] === option && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className={`text-sm ${
                    selectedFilters[section.filterType] === option ? 
                    'text-blue-600 font-medium' : 'text-gray-600'
                  }`}>
                    {option}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button 
        className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-200"
        onClick={() => setSelectedFilters({})}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterCard;