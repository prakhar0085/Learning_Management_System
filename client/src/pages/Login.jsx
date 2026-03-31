import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import axios from 'axios'
import { serverUrl } from '../config';
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Login() {
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const navigate = useNavigate()
    let [show,setShow] = useState(false)
    const [loading,setLoading]= useState(false)
    let dispatch = useDispatch()

    const handleLogin = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/login" , {email , password} ,{withCredentials:true})
            dispatch(setUserData(result.data))
            navigate("/")
            setLoading(false)
            toast.success("Login Successfully")
        } catch (error) {
            console.log(error)
            setLoading(false)
            const errorMessage = error.response?.data?.message || error.message || "Login failed. Please try again."
            toast.error(errorMessage)
        }
    }

    const googleLogin = async () => {
        try {
            const response = await signInWithPopup(auth,provider)
            let user = response.user
            let name = user.displayName;
            let email=user.email
            let role=""
            
            const result = await axios.post(serverUrl + "/api/auth/googlesignup" , {name , email , role}
                , {withCredentials:true}
            )
            dispatch(setUserData(result.data))
            navigate("/")
            toast.success("Login Successfully")
        } catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.message || error.message || "Google login failed. Please try again."
            toast.error(errorMessage)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-4 font-sans text-zinc-100 selection:bg-purple-500/30">
            {/* Main Card Container */}
            <div className="w-full max-w-[900px] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/5">
                
                {/* Left Side: Form */}
                <div className="w-full md:w-1/2 bg-[#121214] p-8 md:p-12 flex flex-col justify-center border-r border-white/5 relative z-10">
                    <div className="mb-8 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-zinc-400 text-sm">Login to continue your journey</p>
                    </div>

                    <form className="space-y-5" onSubmit={(e)=>e.preventDefault()} autoComplete="off">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-zinc-300">Email</label>
                            <input 
                                id="email"
                                type="email"
                                autoComplete="off"
                                className="w-full bg-[#18181b] border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all sm:text-sm"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5 relative">
                            <label className="text-sm font-medium text-zinc-300">Password</label>
                            <div className="relative">
                                <input 
                                    id="password"
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

                        <div className="pt-2">
                            <button 
                                className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium rounded-xl py-3 transition-colors active:scale-[0.98] flex items-center justify-center disabled:opacity-70 disabled:active:scale-100"
                                onClick={handleLogin}
                                disabled={loading}
                            >
                                {loading ? <ClipLoader size={20} color="white" /> : "Login"}
                            </button>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                            <span 
                                onClick={()=>navigate("/forgotpassword")} 
                                className="text-zinc-400 hover:text-white cursor-pointer transition-colors"
                            >
                                Forgot password?
                            </span>
                            <span className="text-zinc-400">
                                Don't have an account?{' '}
                                <span 
                                    onClick={()=>navigate("/signup")}
                                    className="text-[#a78bfa] hover:text-[#c4b5fd] cursor-pointer font-medium transition-colors"
                                >
                                    Sign up
                                </span>
                            </span>
                        </div>
                    </form>

                    <div className="my-8 flex items-center gap-3">
                        <div className="flex-1 h-[1px] bg-zinc-800"></div>
                        <span className="text-[10px] text-zinc-600 font-medium tracking-wider uppercase">Or continue with</span>
                        <div className="flex-1 h-[1px] bg-zinc-800"></div>
                    </div>

                    <button 
                        className="w-full bg-transparent hover:bg-zinc-800/50 border border-zinc-700 text-zinc-300 font-medium rounded-xl py-3 flex items-center justify-center gap-3 transition-colors active:scale-[0.98] group"
                        onClick={googleLogin}
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
                        Unlock your potential with expert-led courses and AI-powered learning tools.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
