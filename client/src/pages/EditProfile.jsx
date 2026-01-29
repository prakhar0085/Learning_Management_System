import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../config';
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

function EditProfile() {
     let {userData} = useSelector(state=>state.user)
     let [name,setName] = useState(userData.name || "")
     let [description,setDescription] = useState(userData.description || "")
     let [photoUrl,setPhotoUrl] = useState(null)
     let dispatch = useDispatch()
     let [loading,setLoading] = useState(false)
     let navigate = useNavigate()

      const formData = new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("photoUrl",photoUrl)



     const updateProfile = async () => {
      setLoading(true)
      try {
        const result = await axios.post(serverUrl + "/api/user/updateprofile" ,formData , {withCredentials:true} )
        console.log(result.data)
        dispatch(setUserData(result.data))
        navigate("/")
        setLoading(false)
      
        toast.success("Profile Update Successfully")
        

        
      } catch (error) {
        console.log(error)
        toast.error("Profile Update Error")
        setLoading(false)
      }
      
     }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-slate-900 px-4 py-10 relative overflow-hidden">
      
       {/* Ambient Background */}
       <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>
       </div>

      <div className="glass-effect rounded-3xl shadow-2xl p-8 max-w-lg w-full relative z-10 border border-white/10">
        <FaArrowLeftLong  className='absolute top-6 left-6 w-5 h-5 cursor-pointer text-gray-400 hover:text-white transition-colors' onClick={()=>navigate("/profile")}/>
        
        <h2 className="text-3xl font-bold text-center text-white mb-2">Edit Profile</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">Update your personal information</p>

        <form className="space-y-6" onSubmit={(e)=>e.preventDefault()}>
          
          {/* Avatar Section */}
           <div className="flex flex-col items-center gap-4">
              <div className="relative">
                {userData.photoUrl ? <img
                  src={userData?.photoUrl}
                  alt=""
                  className="w-28 h-28 rounded-full object-cover border-4 border-white/10 shadow-xl"
                /> : <div className='w-28 h-28 rounded-full bg-white/5 border-4 border-white/10 flex items-center justify-center text-4xl text-white font-bold'>
                  {userData?.name?.slice(0,1).toUpperCase()}
                </div>}
                <div className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-500 transition shadow-lg">
                    {/* Tiny edit icon concept */}
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="w-full">
                <label className="block text-xs font-medium text-gray-400 mb-2 text-center uppercase tracking-wider">Change Avatar</label>
                <input
                  type="file"
                  name="photoUrl"
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer bg-white/5 rounded-lg border border-white/10"
                  onChange={(e)=>setPhotoUrl(e.target.files[0])}
                />
              </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-light"
              placeholder={userData.name}
              onChange={(e)=>setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Email (read-only) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              readOnly
              className="w-full px-4 py-3 bg-black/20 border border-white/5 rounded-xl text-gray-500 cursor-not-allowed font-light"
              placeholder={userData.email}
              value={userData.email} // Explicitly set value for read-only
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Bio</label>
            <textarea
              name="description"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-light resize-none"
              rows={4}
              placeholder="Tell us a bit about yourself..."
              onChange={(e)=>setDescription(e.target.value)}
              value={description}
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-purple-500/30 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4" disabled={loading} onClick={updateProfile}
          >
            {loading ? <ClipLoader size={24} color='white'/> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  )

}

export default EditProfile
