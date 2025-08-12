import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Job from './Job';
import Navbar from './components/shared/Navbar';
import { setSearchedQuery } from './redux/jobSlice';
import useGetAllJobs from './hooks/useGetAllJobs';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';



const BrowseJobs = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
               <button onClick={()=>navigate('/')} className="btn btn-dash text-gray-50 bg-gray-600"><ArrowLeft /> Go Back</button> 
                <h1 className='font-bold text-xl my-5'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default BrowseJobs;