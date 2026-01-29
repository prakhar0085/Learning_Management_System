import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import Nav from "../components/Nav";

function Profile() {
  let {userData} = useSelector(state=>state.user)
  let navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-[80px]">
      <Nav/>
      
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-12 items-start justify-center">

        {/* Profile Card */}
        <div className="w-full max-w-md bg-[#121214] border border-gray-800 rounded-2xl p-8 sticky top-24 shadow-xl">
             <div className="flex flex-col items-center text-center">
                 <div className="relative group mb-6">
                    {userData.photoUrl ? <img
                        src={userData?.photoUrl}
                        alt=""
                        className="w-32 h-32 rounded-full object-cover border-4 border-[#18181b] shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    /> : <div className='w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold text-white bg-gradient-to-br from-purple-600 to-blue-600 border-4 border-[#18181b] shadow-2xl'>
                        {userData?.name?.slice(0,1).toUpperCase()}
                    </div>}
                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-[#121214] rounded-full"></div>
                 </div>

                 <h2 className="text-3xl font-bold text-white mb-2">{userData.name}</h2>
                 <p className="text-gray-500 mb-4">{userData.email}</p>
                 
                 <div className="flex gap-2 mb-8">
                     <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold rounded-full border border-purple-500/20 uppercase tracking-wider">{userData.role}</span>
                     {userData.isVerified && <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20 uppercase tracking-wider">Verified</span>}
                 </div>

                 <button 
                  className="w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors mb-4" 
                  onClick={()=>navigate("/editprofile")}
                >
                  Edit Profile
                </button>
             </div>

             <div className="border-t border-gray-800 pt-6 mt-2 space-y-4">
                 <div>
                     <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">About</label>
                     <p className="text-gray-300 text-sm leading-relaxed">
                         {userData.description || "No bio added yet. Click Edit Profile to tell us about yourself."}
                     </p>
                 </div>
                 
                 <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Stats</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#18181b] p-3 rounded-lg border border-gray-800">
                             <span className="block text-2xl font-bold text-white">{userData.enrolledCourses.length}</span>
                             <span className="text-xs text-gray-500">Enrolled Courses</span>
                        </div>
                        <div className="bg-[#18181b] p-3 rounded-lg border border-gray-800">
                             <span className="block text-2xl font-bold text-white">0</span>
                             <span className="text-xs text-gray-500">Completed</span>
                        </div>
                    </div>
                 </div>
             </div>
        </div>

        {/* Right Section (Stats / Activity Placeholder) - can be expanded */}
        <div className="flex-1 w-full max-w-2xl bg-[#121214] border border-gray-800 rounded-2xl p-8 min-h-[500px] flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 bg-[#18181b] rounded-full flex items-center justify-center border border-gray-800">
                <span className="text-4xl">🎓</span>
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-2">My Learning Journey</h3>
                <p className="text-gray-500 max-w-sm">You haven't started any courses yet. Explore our course catalog to begin your journey!</p>
            </div>
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors" onClick={()=>navigate("/allcourses")}>
                Browse Courses
            </button>
        </div>

      </div>
    </div>
  )

}

export default Profile
