import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import axios from 'axios'
import { serverUrl } from '../config';
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
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
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    const googleSignUp = async () => {
        try {
            const response = await signInWithPopup(auth,provider)
            let user = response.user
            let name = user.displayName;
            let email = user.email
            const result = await axios.post(serverUrl + "/api/auth/googlesignup" , {name , email , role} , {withCredentials:true})
            dispatch(setUserData(result.data))
            navigate("/")
            toast.success("SignUp Successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-4 font-sans text-zinc-100 selection:bg-purple-500/30">
            {/* Main Card Container */}
            <div className="w-full max-w-[900px] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/5">

                {/* Left Side: Form */}
                <div className="w-full md:w-1/2 bg-[#121214] p-8 md:p-12 flex flex-col justify-center border-r border-white/5 relative z-10">
                    <div className="mb-8 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-white mb-2">Get Started</h1>
                        <p className="text-zinc-400 text-sm">Create your account to start learning</p>
                    </div>

                    <form className="space-y-4" onSubmit={(e)=>e.preventDefault()} autoComplete="off">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-zinc-300">Name</label>
                            <input 
                                id="name"
                                type="text"
                                autoComplete="off"
                                className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all sm:text-sm"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-zinc-300">Email</label>
                            <input 
                                id="signup-email"
                                type="email"
                                autoComplete="off"
                                className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all sm:text-sm"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-zinc-300">Password</label>
                            <div className="relative">
                                <input 
                                    id="signup-password"
                                    type={show?"text":"password"}
                                    autoComplete="new-password"
                                    className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all sm:text-sm pr-10 tracking-widest"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                                <button 
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
                                    onClick={()=>setShow(!show)}
                                >
                                    {show ? <MdOutlineRemoveRedEye size={18} /> : <MdRemoveRedEye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Role Selector */}
                        <div className="flex gap-3 pt-1">
                            <button
                                type="button"
                                className={`flex-1 py-2.5 text-sm font-medium rounded-xl border transition-all ${role === 'student' ? 'border-purple-500 bg-purple-500/15 text-white' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'}`}
                                onClick={()=>setRole("student")}
                            >
                                Student
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2.5 text-sm font-medium rounded-xl border transition-all ${role === 'educator' ? 'border-purple-500 bg-purple-500/15 text-white' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'}`}
                                onClick={()=>setRole("educator")}
                            >
                                Educator
                            </button>
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                            <button 
                                className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium rounded-xl py-3 transition-colors active:scale-[0.98] flex items-center justify-center disabled:opacity-70 disabled:active:scale-100"
                                onClick={handleSignUp}
                                disabled={loading}
                            >
                                {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
                            </button>
                        </div>

                        <p className="text-center text-xs text-zinc-500 pt-1">
                            Already have an account?{' '}
                            <span 
                                onClick={()=>navigate("/login")}
                                className="text-[#a78bfa] hover:text-[#c4b5fd] cursor-pointer font-medium transition-colors"
                            >
                                Log in
                            </span>
                        </p>
                    </form>

                    <div className="my-6 flex items-center gap-3">
                        <div className="flex-1 h-[1px] bg-zinc-800"></div>
                        <span className="text-[10px] text-zinc-600 font-medium tracking-wider uppercase">Or continue with</span>
                        <div className="flex-1 h-[1px] bg-zinc-800"></div>
                    </div>

                    <button 
                        className="w-full bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-zinc-300 font-medium rounded-xl py-3 flex items-center justify-center gap-3 transition-colors active:scale-[0.98] group"
                        onClick={googleSignUp}
                    >
                        <img src={google} className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity" alt="Google" />
                        <span className="text-sm">Google</span>
                    </button>
                </div>

                {/* Right Side: Brand Showcase */}
                <div className="hidden md:flex md:w-1/2 bg-[#09090b] p-12 flex-col items-center justify-center text-center relative overflow-hidden">
                    <img src={logo} alt="SkillsSprint Logo" className="w-32 h-32 rounded-full mb-6 z-10 border border-white/5 shadow-2xl" />
                    
                    <div className="text-white text-3xl font-bold tracking-widest z-10 mb-4 whitespace-nowrap">
                        SKILLS<span className="text-[#a78bfa]">SPRINT</span>
                    </div>
                    
                    <p className="text-zinc-400 text-sm max-w-[280px] leading-relaxed z-10 font-light">
                        Join thousands of learners achieving their goals with expert-led courses.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
