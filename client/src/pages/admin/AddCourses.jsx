import React, { useEffect, useRef, useState, useCallback } from 'react'
import img from "../../assets/empty.jpg"
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../../config';
import { MdEdit } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { setCourseData } from '../../redux/courseSlice';
function AddCourses() {
    const navigate= useNavigate()
    const {courseId} = useParams()
   
    
    const [selectedCourse,setSelectedCourse] = useState(null)
    const [title,setTitle] = useState("")
    const [subTitle,setSubTitle] = useState("")
    const [description,setDescription] = useState("")
    const [category,setCategory] = useState("")
    const [level,setLevel] = useState("")
    const [price,setPrice] = useState("")
    const [isPublished,setIsPublished] = useState(false)
   const thumb=useRef()
   const [frontendImage,setFrontendImage] = useState(null)
   const [backendImage,setBackendImage] = useState(null)
   let [loading,setLoading] = useState(false)
   const dispatch = useDispatch()
   const {courseData} = useSelector(state=>state.course)



    const getCourseById = useCallback(async () => {
      try {
        const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}` , {withCredentials:true})
          setSelectedCourse(result.data)
          console.log(result)
        
      } catch (error) {
        console.log(error)
      }
      
    },[courseId])
    useEffect(() => {
  if (selectedCourse) {
    setTitle(selectedCourse.title || "")
    setSubTitle(selectedCourse.subTitle || "")
    setDescription(selectedCourse.description || "")
    setCategory(selectedCourse.category || "")
    setLevel(selectedCourse.level || "")
    setPrice(selectedCourse.price || "")
    setFrontendImage(selectedCourse.thumbnail || img)
    setIsPublished(selectedCourse?.isPublished)


  }
}, [selectedCourse])

    useEffect(()=>{
      getCourseById()

    },[getCourseById]) // Added getCourseById
  const handleThumbnail = (e)=>{
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }


const editCourseHandler = async () => {
  setLoading(true);
  const formData = new FormData();
  formData.append("title", title);
  formData.append("subTitle", subTitle);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("level", level);
  formData.append("price", price);
  formData.append("thumbnail", backendImage);
  formData.append("isPublished", isPublished);

  try {
    const result = await axios.post(
      `${serverUrl}/api/course/editcourse/${courseId}`,
      formData,
      { withCredentials: true }
    );

    const updatedCourse = result.data;
    if (updatedCourse.isPublished) {
      const updatedCourses = courseData.map(c =>
        c._id === courseId ? updatedCourse : c
      );
      if (!courseData.some(c => c._id === courseId)) {
        updatedCourses.push(updatedCourse);
      }
      dispatch(setCourseData(updatedCourses));
    } else {
      const filteredCourses = courseData.filter(c => c._id !== courseId);
      dispatch(setCourseData(filteredCourses));
    }

    navigate("/courses");
    toast.success("Course Updated");
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  const removeCourse = async () => {
    setLoading(true)
    try {
      const result = await axios.delete(serverUrl + `/api/course/removecourse/${courseId}` , {withCredentials:true})
      toast.success("Course Deleted")
       const filteredCourses = courseData.filter(c => c._id !== courseId);
      dispatch(setCourseData(filteredCourses));
      console.log(result)
      navigate("/courses")
      setLoading(false)

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

    
  return (
     <div className="min-h-screen bg-[#09090b] text-white px-4 py-10 pb-20">
      <div className="max-w-6xl mx-auto">
        
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 border-b border-gray-800 pb-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
             <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white" onClick={()=>navigate("/courses")}>
                 <FaArrowLeftLong className='w-5 h-5'/>
             </button>
             <div>
                <h2 className="text-xl font-semibold text-white tracking-tight">Edit Course</h2>
                <p className="text-sm text-gray-500">Update your course details and content.</p>
             </div>
        </div>
        
        <div className="flex items-center gap-3">
            <button 
                className="flex items-center gap-2 bg-[#18181b] hover:bg-gray-800 text-gray-300 px-4 py-2 rounded-lg border border-gray-800 transition-all text-sm font-medium" 
                onClick={()=>navigate(`/createlecture/${selectedCourse?._id}`)}
            >
                <span>Manage Lectures</span>
                <span className="text-gray-500 text-xs ml-1">→</span>
            </button>
            <div className="h-6 w-px bg-gray-800 mx-1"></div>
            <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${!isPublished ? "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20"}`} 
                onClick={()=>setIsPublished(prev=>!prev)}
            >
                {isPublished ? "Back to Draft" : "Publish Course"}
            </button>
            <button 
                className="px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all" 
                disabled={loading} onClick={removeCourse}
            >
                {loading ? <ClipLoader size={14} color='#ef4444'/> :"Delete"}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#121214] border border-gray-800 rounded-xl p-6 shadow-sm">
                  <h3 className="text-base font-medium text-white mb-6 flex items-center gap-2">
                      <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
                      Basic Details
                  </h3>
                  
                  <div className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Course Title</label>
                        <input type="text" placeholder="e.g. Advanced System Design" className="w-full bg-[#18181b] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-gray-600 focus:outline-none focus:ring-0 transition-colors text-sm" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                    </div>

                    {/* Subtitle */}
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Subtitle</label>
                        <input type="text" placeholder="A short, catchy description for cards." className="w-full bg-[#18181b] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-gray-600 focus:outline-none focus:ring-0 transition-colors text-sm" onChange={(e)=>setSubTitle(e.target.value)} value={subTitle} />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Description</label>
                        <textarea placeholder="Detailed course description..." className="w-full bg-[#18181b] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-gray-600 focus:outline-none resize-y min-h-[200px] text-sm leading-relaxed" onChange={(e)=>setDescription(e.target.value)} value={description}></textarea>
                    </div>
                  </div>
              </div>
          </div>

          {/* Right Column - Metadata & Media */}
          <div className="space-y-6">
             {/* Thumbnail Card */}
             <div className="bg-[#121214] border border-gray-800 rounded-xl p-6 shadow-sm">
                 <h3 className="text-sm font-medium text-white mb-4">Thumbnail</h3>
                 <input type="file" ref={thumb} hidden onChange={handleThumbnail} accept='image/*' />
                 <div className='relative w-full aspect-video rounded-lg overflow-hidden border border-dashed border-gray-700 hover:border-white transition-colors cursor-pointer bg-[#18181b] group' onClick={()=>thumb.current.click()}>
                    <img src={frontendImage} alt="Thumbnail" className='w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity' />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                         <div className="p-2 bg-black/50 backdrop-blur-sm rounded-full mb-2">
                             <MdEdit className='w-4 h-4 text-white'/>
                         </div>
                         <span className="text-xs text-white/80 font-medium">Click to upload</span>
                    </div>
                </div>
             </div>

             {/* Organization Card */}
             <div className="bg-[#121214] border border-gray-800 rounded-xl p-6 shadow-sm">
                 <h3 className="text-sm font-medium text-white mb-4">Course Settings</h3>
                 <div className="space-y-4">
                      {/* Category */}
                     <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Category</label>
                        <select className="w-full bg-[#18181b] border border-gray-800 rounded-lg px-3 py-2.5 text-white focus:border-gray-600 focus:outline-none cursor-pointer text-sm" onChange={(e)=>setCategory(e.target.value)} value={category}>
                            <option value="" className="bg-[#18181b]">Select Category</option>
                            <option value="App Development" className="bg-[#18181b]">App Development</option>
                            <option value="AI/ML" className="bg-[#18181b]">AI/ML</option>
                            <option value="AI Tools" className="bg-[#18181b]">AI Tools</option>
                            <option value="Data Science" className="bg-[#18181b]">Data Science</option>
                            <option value="Data Analytics" className="bg-[#18181b]">Data Analytics</option>
                            <option value="Ethical Hacking" className="bg-[#18181b]">Ethical Hacking</option>
                            <option value="UI UX Designing" className="bg-[#18181b]">UI UX Designing</option>
                            <option value="Web Development" className="bg-[#18181b]">Web Development</option>
                            <option value="Others" className="bg-[#18181b]">Others</option>
                        </select>
                     </div>

                     {/* Level */}
                     <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Level</label>
                        <select className="w-full bg-[#18181b] border border-gray-800 rounded-lg px-3 py-2.5 text-white focus:border-gray-600 focus:outline-none cursor-pointer text-sm" onChange={(e)=>setLevel(e.target.value)} value={level} >
                            <option value="" className="bg-[#18181b]">Select Level</option>
                            <option value="Beginner" className="bg-[#18181b]">Beginner</option>
                            <option value="Intermediate" className="bg-[#18181b]">Intermediate</option>
                            <option value="Advanced" className="bg-[#18181b]">Advanced</option>
                        </select>
                     </div>

                      {/* Price */}
                      <div>
                         <label className="block text-xs font-medium text-gray-500 mb-1.5">Price (INR)</label>
                         <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-500 text-sm">₹</span>
                            <input type="number" placeholder="0" className="w-full bg-[#18181b] border border-gray-800 rounded-lg pl-8 pr-3 py-2.5 text-white focus:border-gray-600 focus:outline-none transition-colors text-sm font-mono" onChange={(e)=>setPrice(e.target.value)} value={price} />
                         </div>
                      </div>
                 </div>
             </div>

              {/* Action Buttons (Mobile/Desktop overlap specific) */}
              <div className="flex flex-col gap-3 pt-2">
                <button className='w-full py-3 rounded-lg bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors shadow-lg' disabled={loading} onClick={editCourseHandler}>
                    {loading ? <ClipLoader size={18} color='black'/> : "Save Changes"}
                </button>
                <button className='w-full py-3 rounded-lg border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-sm font-medium' onClick={()=>navigate("/courses")}>
                    Discard
                </button>
              </div>
          </div>
      </div>
     </div>
    </div>
  )
}

export default AddCourses
