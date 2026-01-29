import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import axios from 'axios'
import { serverUrl } from '../config';
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
function SignUp() {
    const [name,setName]= useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [role,setRole]= useState("student")
    const navigate = useNavigate()
    let [show,setShow] = useState(false)
    const [loading,setLoading]= useState(false)
    let dispatch = useDispatch()

    const handleSignUp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/signup" , {name , email , password , role} , {withCredentials:true} )
            dispatch(setUserData(result.data))

            navigate("/")
            toast.success("SignUp Successfully")
            setLoading(false)
        } 
        catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
        
    }
    const googleSignUp = async () => {
        try {
            const response = await signInWithPopup(auth,provider)
            console.log(response)
            let user = response.user
            let name = user.displayName;
            let email=user.email
            
            
            const result = await axios.post(serverUrl + "/api/auth/googlesignup" , {name , email ,role}
                , {withCredentials:true}
            )
            dispatch(setUserData(result.data))
            navigate("/")
            toast.success("SignUp Successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        
    }
  return (

    <div className='w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-slate-900 to-black relative overflow-hidden'>
       {/* Background decoration */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-teal-600 rounded-full blur-[150px] opacity-20 animate-pulse delay-700"></div>

        <div className='w-[90%] md:w-[800px] h-auto min-h-[550px] glass-effect rounded-2xl flex shadow-2xl overflow-hidden z-10'>
            <div className='md:w-[50%] w-full flex flex-col items-center justify-center gap-6 p-8 relative'>
                <div className="text-center">
                  <h1 className='font-bold text-white text-3xl mb-1'>Get Started</h1>
                  <h2 className='text-gray-400 text-sm'>Create your account to start learning</h2>
                </div>

                <form className='flex flex-col gap-3 w-full px-4' onSubmit={(e)=>e.preventDefault()}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="name" className='text-sm text-gray-300 font-medium'>Name</label>
                        <input 
                          id='name' 
                          type="text" 
                          className='w-full h-10 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:outline-none focus:border-purple-500 transition-all font-light' 
                          placeholder='John Doe' 
                          onChange={(e)=>setName(e.target.value)} 
                          value={name} 
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='text-sm text-gray-300 font-medium'>Email</label>
                        <input 
                          id='email' 
                          type="text" 
                          className='w-full h-10 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:outline-none focus:border-purple-500 transition-all font-light' 
                          placeholder='name@example.com' 
                          onChange={(e)=>setEmail(e.target.value)} 
                          value={email} 
                        />
                    </div>
                    <div className='flex flex-col gap-1 relative'>
                        <label htmlFor="password" className='text-sm text-gray-300 font-medium'>Password</label>
                        <input 
                          id='password' 
                          type={show?"text":"password"} 
                          className='w-full h-10 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:outline-none focus:border-purple-500 transition-all font-light' 
                          placeholder='••••••••' 
                          onChange={(e)=>setPassword(e.target.value)} 
                          value={password}
                        />
                         <div className="absolute right-4 top-[32px] text-gray-400 cursor-pointer hover:text-white transition-colors">
                           {!show && <MdOutlineRemoveRedEye onClick={()=>setShow(prev => !prev)}/>}
                           {show && <MdRemoveRedEye onClick={()=>setShow(prev => !prev)} />}
                        </div>
                    </div>
                    
                    <div className='flex w-full items-center justify-between gap-4 mt-1'>
                      <span 
                        className={`flex-1 text-center py-2 text-sm border rounded-full cursor-pointer transition-all ${role === 'student' ? "border-purple-500 bg-purple-500/20 text-white" : "border-white/20 text-gray-400 hover:border-white/50"}`} 
                        onClick={()=>setRole("student")}
                      >
                        Student
                      </span>
                      <span 
                        className={`flex-1 text-center py-2 text-sm border rounded-full cursor-pointer transition-all ${role === 'educator' ? "border-purple-500 bg-purple-500/20 text-white" : "border-white/20 text-gray-400 hover:border-white/50"}`}  
                        onClick={()=>setRole("educator")}
                      >
                        Educator
                      </span>
                    </div>

                    <button 
                      className='w-full h-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center mt-2' 
                      disabled={loading} 
                      onClick={handleSignUp}
                    >
                      {loading?<ClipLoader size={24} color='white' /> : "Sign Up"}
                    </button>
                    
                     <div className='text-center text-xs text-gray-400'>
                         Already have an account? <span className='text-purple-400 underline cursor-pointer hover:text-purple-300 ml-1' onClick={()=>navigate("/login")}>Login</span>
                     </div>
                </form>

                 <div className='w-full px-4'>
                    <div className='flex items-center gap-3 my-2'>
                        <div className='flex-1 h-[1px] bg-white/10'></div>
                        <div className='text-xs text-gray-500 uppercase'>Or</div>
                         <div className='flex-1 h-[1px] bg-white/10'></div>
                    </div>

                    <div 
                      className='w-full h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center cursor-pointer transition-all gap-3 group' 
                      onClick={googleSignUp} 
                    >
                      <img src={google} alt="" className='w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity' />
                      <span className='text-sm text-gray-300 group-hover:text-white font-medium'>Google</span> 
                    </div>
                </div>

            </div>
             <div className='w-[50%] h-auto bg-black/40 hidden md:flex items-center justify-center flex-col relative'>
              <div className="absolute inset-0 bg-gradient-to-bl from-purple-900/40 to-black/40"></div>
              <img src={logo} className='w-32 rounded-full shadow-2xl z-10 mb-6' alt="" />
              <div className='text-white text-3xl font-bold tracking-widest z-10 text-center'>
                SKILLS<span className="text-purple-400">SPRINT</span>
              </div>
               <p className="text-gray-400 text-sm mt-4 z-10 max-w-xs text-center leading-relaxed">
                 Join thousands of learners achieving their goals with us.
               </p>
            </div>
           
        </div>
     
    </div>
  )

}

export default SignUp
