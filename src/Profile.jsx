import React, { useState } from 'react';
import Navbar from './components/shared/Navbar';
import { Contact, Mail, Pen, Upload, X } from 'lucide-react';
import AppliedJobTable from './components/AppliedJobTable';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from './redux/authSlice';
import { USER_API_END_POINT } from './components/utils/constant';
import useGetAppliedJobs from './hooks/useGetAppliedJobs';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    name: user?.fullname || "",
    bio: user?.profile?.bio || "",
    phone: user?.phoneNumber || "",
    email: user?.email || "",
    skills: user?.profile?.skills || [],
    resume: user?.profile?.resume || null,
    resumeOriginalName: user?.profile?.resumeOriginalName || null,
    profilePhoto: user?.profile?.profilePhoto || null
  });

 const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('fullname', profileData.name);
        formData.append('bio', profileData.bio);
        formData.append('phoneNumber', profileData.phone);
        formData.append('skills', profileData.skills.join(','));
        
        if (profileData.profilePhotoFile) {
            formData.append('profilePhoto', profileData.profilePhotoFile);
        }
        if (profileData.resumeFile) {
            formData.append('resume', profileData.resumeFile);
        }

        const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            withCredentials: true
        });

        if (res.data.success) {
            dispatch(setUser(res.data.user));
            setProfileData(prev => ({
                ...prev,
                profilePhoto: res.data.user.profile?.profilePhoto,
                resume: res.data.user.profile?.resume,
                resumeOriginalName: res.data.user.profile?.resumeOriginalName
            }));
            alert("Profile updated successfully!");
            setOpen(false);
        }
    } catch (error) {
        console.error("Update failed:", error);
        alert(error.response?.data?.message || "Failed to update profile");
    }
};

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white shadow-xl text-gray-950 rounded-3xl my-10 p-10 transition-transform hover:scale-[1.01]'>
        <div className='flex flex-col items-center gap-4'>
          <div className="avatar h-28 w-28">
            <div className="ring-primary ring-offset-base-100 w-28 rounded-full ring-2 ring-offset-2">
              <img
                src={profileData.profilePhoto }
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className='text-center'>
            <h1 className='text-3xl font-bold'>{profileData.name || "Your Name"}</h1>
            <p className='text-gray-500'>{profileData.bio || "Add a bio to your profile"}</p>
          </div>
        </div>

        <div className='mt-6 space-y-3 text-lg'>
          <div className='flex items-center gap-2'>
            <Contact />
            <span>{profileData.phone || "Phone number not provided"}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Mail />
            <span>{profileData.email || "Email not provided"}</span>
          </div>
          <div>
            <h1 className='text-xl font-semibold mb-1'>Skills</h1>
            <div className='flex flex-wrap gap-2'>
              {profileData.skills.length === 0 ? (
                <span className="text-gray-400">No skills added</span>
              ) : (
                profileData.skills.map((item, index) => (
                  <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-xl text-sm">{item}</span>
                ))
              )}
            </div>
          </div>
          <div className='mt-4'>
            <span className="font-medium">Resume:</span>
            {profileData.resume ? (
              <div className="flex items-center gap-2 mt-1">
                <a
                  className='text-blue-600 hover:underline'
                  target='_blank'
                  rel='noopener noreferrer'
                  href={profileData.resume}
                >
                  {profileData.resumeOriginalName || "View Resume"}
                </a>
                <button
                  onClick={async () => {
                    try {
                      await axios.delete(`${USER_API_END_POINT}/profile/resume`, {
                        withCredentials: true
                      });
                      setProfileData({
                        ...profileData,
                        resume: null,
                        resumeOriginalName: null
                      });
                    } catch (error) {
                      console.error("Error deleting resume:", error);
                    }
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <span className="text-gray-400">No resume uploaded</span>
            )}
          </div>

          <div className='flex justify-end'>
            <button
              onClick={() => setOpen(true)}
              className="mt-4 bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-700 transition"
            >
              <Pen size={14} className="inline mr-1.5" /> Edit
            </button>
          </div>

        </div>
      </div>

      <div className='max-w-4xl mx-auto py-6 px-4'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-950">Update Profile</h2>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-950">Profile Photo</label>
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img
                        src={profileData.profilePhotoPreview || profileData.profilePhoto || "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"}
                        alt="Profile Preview"
                      />
                    </div>
                  </div>
                  <label className="btn btn-sm">
                    <Upload size={16} className="mr-1" /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setProfileData({
                            ...profileData,
                            profilePhotoFile: file,
                            profilePhotoPreview: URL.createObjectURL(file)
                          });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-950">Name</label>
                <input type="text" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} className="w-full p-2 border rounded text-gray-950" required />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-950">Bio</label>
                <textarea value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} className="w-full p-2 border rounded text-gray-950" rows="3" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-950">Phone</label>
                <input type="tel" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} className="w-full p-2 border rounded text-gray-950" required />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-950">Skills (comma separated)</label>
                <input type="text" value={profileData.skills.join(', ')} onChange={(e) => setProfileData({ ...profileData, skills: e.target.value.split(',').map(skill => skill.trim()) })} className="w-full p-2 border rounded text-gray-950" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-950">Resume (PDF only)</label>
                <div className="flex items-center gap-2">
                  <label className="btn btn-sm">
                    <Upload size={16} className="mr-1" /> Upload Resume
                    <input type="file" accept="application/pdf" className="hidden" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setProfileData({ ...profileData, resumeFile: file, resumeOriginalName: file.name });
                      }
                    }} />
                  </label>
                  {profileData.resumeOriginalName && (
                    <span className="text-sm">{profileData.resumeOriginalName}</span>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 border rounded hover:bg-gray-100 text-gray-950">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
