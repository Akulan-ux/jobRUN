import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from './redux/jobSlice';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-10">
      <div className="hero min-h-36">
        <div className="hero-content text-center"> 
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-[#03f317]">
             <span>Hello</span>
             <span className='text-4xl font-semibold text-gray-100'>{user?.role === 'student' ? `  ${user.fullname}` : ''}</span>
            </h1>
            <p className="py-6 text-gray-300">
              An online platform that connects job seekers with employers!
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex bg-white rounded-full shadow-md overflow-hidden w-full max-w-md">
          <div className="flex items-center px-4">
            <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
          </div>
          <input 
            type="search" 
            placeholder="Search jobs ..." 
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
          />
          <button onClick={searchJobHandler} className="bg-[#03f317] text-white px-4 py-2 font-semibold hover:bg-[#02d214] transition">
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection