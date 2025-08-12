import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { setLoading } from '../../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading,user } = useSelector(state => state.auth);

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "student", 
        file: null
    });

    const [error, setError] = useState("");

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        setError("");
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files[0] });
        setError("");
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");

        if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
            setError("Please fill in all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("profilePhoto", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                alert("Success: " + res.data.message);
            }
        } catch (error) {
            console.log(error);
            const errorMsg = error?.response?.data?.message || 
                           error.message || 
                           "An unknown error occurred";
            setError(errorMsg);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])

    return (
        <div className='bg-gray-950 min-h-screen'>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-full md:w-1/2 border border-gray-200 rounded-md p-6 my-10 bg-white'>
                    <h1 className='font-bold text-2xl mb-6 text-center text-[#03f317]'>Sign Up</h1>
                    
                    {error && (
                        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Full Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter your full name"
                            className='w-full p-2 border border-gray-300 rounded-md text-gray-800'
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Email</label>
                        <input 
                            type="email" 
                            placeholder="Enter your email"
                            className='w-full p-2 border border-gray-300 rounded-md text-gray-800'
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Phone Number</label>
                        <input 
                            type="text" 
                            placeholder="Enter your phone number"
                            className='w-full p-2 border border-gray-300 rounded-md text-gray-800'
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Password</label>
                        <input 
                            type="password" 
                            placeholder="Create a password"
                            className='w-full p-2 border border-gray-300 rounded-md text-gray-800'
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2'>Profile Photo</label>
                        <input 
                            type="file" 
                            name="profilePhoto" 
                            className='w-full p-2 border border-gray-300 rounded-md text-gray-800'
                            onChange={changeFileHandler}
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-700 mb-2'>Role</label>
                        <div className='flex items-center gap-4'>
                            <label className='flex items-center gap-2 text-gray-800'>
                                <input 
                                    type="radio" 
                                    name="role" 
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className='radio radio-primary'
                                />
                                <span>Student</span>
                            </label>
                            <label className='flex items-center gap-2 text-gray-800'>
                                <input 
                                    type="radio" 
                                    name="role" 
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className='radio radio-primary'
                                />
                                <span>Recruiter</span>
                            </label>
                        </div>
                    </div>

                    <div className='flex justify-center mb-4'>
                        {loading ? (
                            <button className="btn btn-primary w-full" disabled>
                                <span className="loading loading-spinner"></span>
                                Creating account...
                            </button>
                        ) : (
                            <button 
                                type="submit" 
                                className="btn btn-primary w-full bg-[#10ee10] hover:bg-[#0dd00d] text-white"
                            >
                                Sign Up
                            </button>
                        )}
                    </div>

                    <div className='text-center text-sm text-gray-800'>
                        <span>Already have an account? </span>
                        <Link to="/login" className='text-[#03f317] hover:underline'>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;