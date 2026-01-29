import React, { useState } from 'react'
import logo from "../assets/logo.jpg"
import { IoMdPerson } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiSplitCross } from "react-icons/gi";

import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Nav() {
  let [showHam,setShowHam] = useState(false)
  let [showPro,setShowPro] = useState(false)
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let {userData} = useSelector(state=>state.user)

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout" , {withCredentials:true})
      console.log(result.data)
     await dispatch(setUserData(null))
      toast.success("LogOut Successfully")
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
  return (
    <div>
    <div className='w-full h-[70px] fixed top-0 px-6 py-2 flex items-center justify-between glass-nav z-50 transition-all duration-300'>
     <div className='flex items-center gap-2'>
        <img src={logo} className='h-[45px] rounded border-2 border-white/10 cursor-pointer hover:border-white transition-colors' onClick={()=>navigate("/")} alt="Logo" />
        <span className='text-white font-bold text-lg hidden md:block tracking-wide'>SkillSprint</span>
     </div>
     
     {/* Centered Navigation Links */}
     <div className="hidden lg:flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10 mx-auto">
        <span className="text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 px-5 py-2 rounded-full cursor-pointer transition-all" onClick={()=>navigate("/")}>Home</span>
        <span className="text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 px-5 py-2 rounded-full cursor-pointer transition-all" onClick={()=>navigate("/allcourses")}>Courses</span>
        <span className="text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 px-5 py-2 rounded-full cursor-pointer transition-all" onClick={()=>navigate("/reviews")}>Reviews</span>
         <span className="text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 px-5 py-2 rounded-full cursor-pointer transition-all" onClick={()=>navigate("/about")}>About</span>
     </div>

     <div className='flex items-center justify-end gap-4'> 
        
        {userData && (
            <div className='flex items-center gap-4'>
                 {/* Profile Icon */}
                 <div className='relative group' onClick={()=>setShowPro(prev=>!prev)}>
                    <div className='w-[40px] h-[40px] rounded-full border-2 border-purple-500 overflow-hidden cursor-pointer hover:scale-105 transition-transform bg-gray-800 flex items-center justify-center'>
                         {userData.photoUrl ? (
                             <img src={userData.photoUrl} className='w-full h-full object-cover' alt="Profile" />
                         ) : (
                             <div className='text-white font-bold text-lg'>{userData?.name?.charAt(0).toUpperCase() || "U"}</div>
                         )}
                    </div>
                </div>

                {userData?.role === "educator" && (
                    <button className='px-4 py-2 border border-purple-500/30 text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg text-sm font-medium cursor-pointer transition-all' onClick={()=>navigate("/dashboard")}>
                        Dashboard
                    </button>
                )}
                 
                 <button className='px-4 py-2 bg-white text-black rounded-lg shadow-sm text-sm font-bold cursor-pointer hover:bg-gray-200 transition-colors' onClick={handleLogout}>
                    LogOut
                 </button>
            </div>
        )}
        
        {!userData && (
            <div className='flex items-center gap-3'>
                {!userData && <IoMdPerson className='w-10 h-10 text-white bg-white/10 p-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors' onClick={()=>setShowPro(prev=>!prev)}/>}
                 <button className='px-6 py-2 border border-white/20 text-white bg-white/5 hover:bg-white rounded-full text-sm font-medium cursor-pointer hover:text-black transition-all duration-300' onClick={()=>navigate("/login")}>
                    Login
                </button>
            </div>
        )}

     </div>
     {showPro && <div className=' absolute top-[110%] right-[5%] flex items-center flex-col justify-center gap-2 text-[14px] rounded-xl bg-[#09090b] px-[15px] py-[15px] border border-gray-800 shadow-2xl z-50 min-w-[200px]' >
      <span className='w-full text-left text-gray-300 px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors' onClick={()=>navigate("/profile")}>My Profile</span>
      <span className='w-full text-left text-gray-300 px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors' onClick={()=>navigate("/enrolledcourses")}>My Courses</span>
       </div>}
     <GiHamburgerMenu className='w-[30px] h-[30px] lg:hidden fill-white cursor-pointer ' onClick={()=>setShowHam(prev=>!prev)}/>
      
     
    </div>
    <div className={`fixed top-0 w-full h-screen glass-nav flex items-center justify-center flex-col gap-6 z-40 transition-transform duration-500 ease-in-out ${showHam ? "translate-x-0" : "-translate-x-full"}`}>
     <GiSplitCross  className='w-[35px] h-[35px] fill-white absolute top-5 right-[4%]' onClick={()=>setShowHam(prev=>!prev)}/>
      {!userData ? <IoMdPerson className='w-[50px] h-[50px] fill-white cursor-pointer border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-full p-[10px]'/>:
      <div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black  border-white cursor-pointer' onClick={()=>setShowPro(prev=>!prev)}>
         {userData.photoUrl ? <img src={userData.photoUrl} className='w-[100%] h-[100%] rounded-full object-cover ' alt="" />
         :
         <div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black  border-white cursor-pointer' >{userData?.name?.slice(0,1).toUpperCase()}</div>}</div>
      }
      
      <span className='flex items-center justify-center gap-2  text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg px-[65px] py-[20px] text-[18px] ' onClick={()=>navigate("/profile")}>My Profile </span>
      <span className='flex items-center justify-center gap-2  text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg px-[65px] py-[20px] text-[18px] ' onClick={()=>navigate("/enrolledcourses")}>My Courses </span>
      
      {userData?.role == "educator" ? <div className='flex items-center justify-center gap-2 text-[18px] text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg px-[60px] py-[20px]' onClick={()=>navigate("/dashboard")}>Dashboard</div>
           :""}
      {!userData ?<span className='flex items-center justify-center gap-2 text-[18px] text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg px-[80px] py-[20px]' onClick={()=>navigate("/login")}>Login</span>:
      <span className='flex items-center justify-center gap-2 text-[18px] text-white border-[2px] border-[#fdfbfb7a] bg-[#000000d5] rounded-lg px-[75px] py-[20px]' onClick={handleLogout}>LogOut</span>}
    

    </div>
   </div>
      
  )
}

export default Nav