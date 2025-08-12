import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../../hooks/useGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });
    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                alert(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
    if (singleCompany) {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        });
    }
}, [singleCompany]);
    return (
        <div className='bg-gray-200 min-h-screen'>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-full md:w-1/2 border border-gray-200 rounded-md p-6 my-10 bg-white'>
                    <button onClick={()=>navigate('/admin/companies')} className="btn btn-dash text-gray-50 bg-gray-600"><ArrowLeft /> Go Back</button>
                    <h1 className='font-bold text-2xl mb-6 text-center text-[#03f317]'>Company Profile</h1>

                    {error && (
                        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Company Name</label>
                        <input
                            type="text"
                            placeholder="Enter company name"
                            className='w-full p-2 border border-gray-300 rounded-md text-gray-800'
                            value={input.name}
                            name="name"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Description</label>
                        <textarea
                            placeholder="Brief description of your company"
                            className='w-full p-2 border border-gray-300 rounded-md text-gray-800 min-h-[100px]'
                            value={input.description}
                            name="description"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Website</label>
                        <input
                            type="url"
                            placeholder="https://yourcompany.com"
                            className='w-full p-2 border border-gray-300 rounded-md text-gray-800'
                            value={input.website}
                            name="website"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Location</label>
                        <input
                            type="text"
                            placeholder="Company location"
                            className='w-full p-2 border border-gray-300 rounded-md text-gray-800'
                            value={input.location}
                            name="location"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Company Logo</label>
                        <input
                            type="file"
                            className='w-full p-2 border border-gray-300 rounded-md text-gray-800'
                            onChange={changeFileHandler}
                            accept="image/*"
                        />
                    </div>

                    <div className='flex justify-center mb-4'>
                        {loading ? (
                            <button className="btn btn-primary " disabled>
                                <span className="loading loading-spinner"></span>
                                Updating...
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="btn btn-primary  bg-[#10ee10] hover:bg-[#0dd00d] text-white"
                            >
                                Update
                            </button>
                        )}
                    </div>


                </form>
            </div>
        </div>
    );
}

export default CompanySetup;