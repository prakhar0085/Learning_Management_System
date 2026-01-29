import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from '../../config';
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
const CreateCourse = () => {
    let navigate = useNavigate()
    let [loading,setLoading]=useState(false)
    const [title,setTitle] = useState("")
    const [category,setCategory] = useState("")

    const CreateCourseHandler = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/course/create" , {title , category} , {withCredentials:true})
            console.log(result.data)
            toast.success("Course Created")
            navigate("/courses")
            setTitle("")
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
        
    }

    return (
        
        <div className="min-h-screen flex items-center justify-center bg-[#09090b] px-4 md:px-0">
             
            <div className="max-w-md w-full mx-auto p-8 bg-[#121214] border border-gray-800 rounded-xl relative">
                <button onClick={()=>navigate("/courses")} className='absolute top-6 left-6 text-gray-400 hover:text-white transition-colors'>
                    <FaArrowLeftLong className='w-4 h-4' />
                </button>
                
                <div className="text-center mb-8 mt-4">
                    <h2 className="text-2xl font-semibold text-white tracking-tight">Create New Course</h2>
                    <p className="text-gray-500 text-sm mt-2">Enter the basics to get started.</p>
                </div>

                <form className="space-y-5" onSubmit={(e)=>e.preventDefault()}>
                    {/* Course Title */}
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                            Course Title
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Advanced System Design"
                            className="w-full bg-[#09090b] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-white focus:ring-0 transition-colors text-sm"
                            onChange={(e)=>setTitle(e.target.value)} value={title}
                        />
                    </div>

                    {/* Category */}
                    <div>
                         <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">
                            Category
                        </label>
                        <select
                            className="w-full bg-[#09090b] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white focus:ring-0 transition-colors appearance-none cursor-pointer text-sm"
                            onChange={(e)=>setCategory(e.target.value)}
                        >
                            <option value="" className="bg-[#09090b] text-gray-500">Select category</option>
                            <option value="App Development" className="bg-[#09090b]">App Development</option>
                             <option value="AI/ML" className="bg-[#09090b]">AI/ML</option>
                            <option value="AI Tools" className="bg-[#09090b]">AI Tools
                            </option>
                             <option value="Data Science" className="bg-[#09090b]">Data Science</option>
                            <option value="Data Analytics" className="bg-[#09090b]">Data Analytics</option>
                            <option value="Ethical Hacking" className="bg-[#09090b]">Ethical Hacking</option>
                            <option value="UI UX Designing" className="bg-[#09090b]">UI UX Designing</option>
                            <option value="Web Development" className="bg-[#09090b]">Web Development</option>
                            <option value="Others" className="bg-[#09090b]">Others</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-white text-black py-3 rounded-lg font-semibold text-sm hover:bg-gray-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2" disabled={loading} onClick={CreateCourseHandler}
                    >
                        {loading?<ClipLoader size={16} color='black' /> : "Create Course"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCourse;
