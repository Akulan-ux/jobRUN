import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { useSelector } from 'react-redux';
import { JOB_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: ""
    });

    const { companies } = useSelector(state => state.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (e) => {
        setInput({ ...input, companyId: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                alert(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred while posting the job");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className='w-full max-w-2xl mx-4'>
                    <div className='border border-gray-200 rounded-md p-6 my-10 bg-white'>
                        <h1 className='font-bold text-2xl mb-6 text-center text-[#03f317]'>Job Details</h1>

                        <form onSubmit={submitHandler}>
                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>Job Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter job title"
                                    className='w-full p-2 border border-gray-300 rounded-md text-gray-800'
                                    value={input.title}
                                    name="title"
                                    onChange={changeEventHandler}
                                    required
                                />
                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>Description</label>
                                <textarea
                                    placeholder="Detailed job description"
                                    className='w-full p-2 border border-gray-300 rounded-md text-gray-800 min-h-[100px]'
                                    value={input.description}
                                    name="description"
                                    onChange={changeEventHandler}
                                    required
                                />
                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>Requirements</label>
                                <textarea
                                    placeholder="Job requirements (separate with commas)"
                                    className='w-full p-2 border border-gray-300 rounded-md text-gray-800 min-h-[100px]'
                                    value={input.requirements}
                                    name="requirements"
                                    onChange={changeEventHandler}
                                    required
                                />
                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>Salary</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Rs.50,000 - Rs.70,000"
                                    className='w-full p-2 border border-gray-300 rounded-md text-gray-800'
                                    value={input.salary}
                                    name="salary"
                                    onChange={changeEventHandler}
                                    required
                                />
                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>Location</label>
                                <input
                                    type="text"
                                    placeholder="Job location"
                                    className='w-full p-2 border border-gray-300 rounded-md text-gray-800'
                                    value={input.location}
                                    name="location"
                                    onChange={changeEventHandler}
                                    required
                                />
                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>Job Type</label>
                                <input
                                    className='w-full p-2 border border-gray-300 rounded-md text-gray-800'
                                    value={input.jobType}
                                    name="jobType"
                                    onChange={changeEventHandler}
                                    required
                                />

                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>Experience Level</label>
                                <input
                                    className='w-full p-2 border border-gray-300 rounded-md text-gray-800'
                                    value={input.experience}
                                    name="experience"
                                    onChange={changeEventHandler}
                                    required
                                />
                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>No of Positions</label>
                                <input
                                    type="number"
                                    placeholder="Enter number of positions"
                                    className='w-full p-2 border border-gray-300 rounded-md text-gray-800'
                                    value={input.position}
                                    name="position"
                                    onChange={changeEventHandler}
                                    min="1"
                                    required
                                />
                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 mb-2'>Company</label>
                                {companies && companies.length > 0 ? (
                                    <select
                                        onChange={selectChangeHandler}
                                        value={input.companyId}
                                        name="companyId"
                                        className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                                        required
                                    >
                                        <option value="">Select a Company</option>
                                        {companies.map((company) => (
                                            <option
                                                key={company._id || company.name}
                                                value={company._id || company.name.toLowerCase()}
                                            >
                                                {company.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-red-500 text-sm">
                                        No companies available. Please register a company first.
                                    </p>
                                )}
                            </div>

                            <div className='flex justify-center mb-4'>
                                {loading ? (
                                    <button className="btn btn-primary" disabled>
                                        <span className="loading loading-spinner"></span>
                                        Submitting...
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="btn btn-primary bg-[#10ee10] hover:bg-[#0dd00d] text-white"
                                    >
                                        Post Job
                                    </button>
                                )}
                            </div>
                            <div className='text-center text-red-600 font-light'>
                                <p>Please register a company before posting the job.</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostJob;