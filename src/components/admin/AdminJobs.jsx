import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '../../redux/jobSlice';

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input,setInput]= useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input])
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-14">
                <div className='flex items-center justify-between mb-5'>
                    <label className="input bg-gray-500 ">
                        <svg className="h-[1em] opacity-1000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input className='text-white' type="search" required placeholder="Filter by name & role" onChange={(e) => setInput(e.target.value)} />
                    </label>
                    <button onClick={()=>navigate('/admin/jobs/create')} className="btn btn-dash btn-success ">Post New Job</button>
                </div><br></br>
                <AdminJobsTable />
            </div>

        </div>

    )
}

export default AdminJobs
