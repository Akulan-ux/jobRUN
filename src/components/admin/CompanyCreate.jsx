import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
    try {
        const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName},{
            headers:{
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        if (res.data.success) {
            alert(res.data.message);
            dispatch(setSingleCompany(res.data.company));
            const companyId = res.data.company._id;
            navigate(`/admin/Companies/${companyId}`);
        }
    } catch (error) {
        console.log(error.response?.data || error.message);  // Modified this line
    }
}

    return (
        <div className="min-h-screen bg-gray-200">
            <Navbar />
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Your Company Profile</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name
                                <h6 className='text-gray-400'>(You can change this later)</h6>
                            </label>
                            <input 
                                type="text" 
                                placeholder="e.g. Microsoft, Google, etc." 
                                className="w-full px-4 py-3 text-gray-950 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                onChange={(e) => setCompanyName(e.target.value)} // Placeholder for handling input
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                This will be displayed on your company profile
                            </p>
                        </div>

                        <div className="flex justify-end space-x-4 pt-6">
                            <button onClick={() => navigate('/admin/Companies')} className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={registerNewCompany}
                                className="px-6 py-2.5 bg-[#10ee10] text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>

               
            </div>
        </div>
    )
}

export default CompanyCreate