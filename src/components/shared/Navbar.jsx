import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { setUser } from '../../redux/authSlice'
import { LogOut, User2 } from 'lucide-react' 

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Logout failed");
        }
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-17'>
                <div>
                    <Link to="/">
                        <h1 className='text-4xl font-bold text-gray-950'>Job<span className='text-[#50f802]'>RUN</span></h1>
                    </Link>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5 text-gray-950'>
                        {user ? (
                            user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                </>
                            )
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                            </>
                        )}
                    </ul>
                    
                    {user ? (
                        <div className="relative">
                            <button 
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="focus:outline-none"
                            >
                                <div className="avatar">
                                    <div className="w-12 rounded-full ring-2 ring-[#50f802] ring-offset-2">
                                        <img 
                                            src={user?.profile?.profilePhoto || '/default-profile.png'} 
                                            alt="Profile" 
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>
                            </button>
                            
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                                    <div className="p-4">
                                        <div className='flex gap-4 items-center'>
                                            <div className="avatar">
                                                <div className="w-12 rounded-full ring-2 ring-[#50f802] ring-offset-2">
                                                    <img 
                                                        src={user?.profile?.profilePhoto || '/default-profile.png'} 
                                                        alt="Profile" 
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className='font-medium text-[#50f802]'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-600'>{user?.profile?.bio || 'No bio available'}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {user.role === 'student' && (
                                                <Link 
                                                    to="/profile" 
                                                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition-colors"
                                                >
                                                    <User2 size={16} />
                                                    <span>View Profile</span>
                                                </Link>
                                            )}
                                            <button 
                                                onClick={logoutHandler}
                                                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition-colors text-left"
                                            >
                                                <LogOut size={16} />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='flex items-center gap-2'>
                            <Link to="/login">
                                <button className="px-4 py-2 border border-gray-700 text-gray-950 rounded-md hover:bg-[#82ee9d] transition-colors">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="px-4 py-2 bg-[#10ee10] text-white rounded-md hover:bg-[#82ee9d] transition-colors">
                                    Signup
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar