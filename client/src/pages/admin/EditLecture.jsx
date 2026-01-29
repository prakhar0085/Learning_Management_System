import axios from 'axios'
import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../../config';
import { setLectureData } from '../../redux/lectureSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
function EditLecture() {
    const [loading,setLoading]= useState(false)
    const [loading1,setLoading1]= useState(false)
    const {courseId , lectureId} = useParams()
    const {lectureData} = useSelector(state=>state.lecture)
    const dispatch = useDispatch()
    const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)
    const [videoUrl,setVideoUrl] = useState(null)
    const [lectureTitle,setLectureTitle] = useState(selectedLecture.lectureTitle)
    const [isPreviewFree,setIsPreviewFree] = useState(selectedLecture.isPreviewFree || false)

    // FormData must be created inside any function that uses it to capture current state
    const editLecture = async () => {
      const formData = new FormData()
      formData.append("lectureTitle",lectureTitle)
      if(videoUrl) formData.append("videoUrl",videoUrl)
      formData.append("isPreviewFree",isPreviewFree)

      setLoading(true)
      try {
        const result = await axios.post(serverUrl + `/api/course/editlecture/${lectureId}` , formData , {withCredentials:true})
        console.log(result.data)
        dispatch(setLectureData([...lectureData,result.data]))
        toast.success("Lecture Updated")
        navigate("/courses")
        setLoading(false)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
        setLoading(false)
      }
    }

    const removeLecture = async () => {
      setLoading1(true)
      try {
        const result = await axios.delete(serverUrl + `/api/course/removelecture/${lectureId}` , {withCredentials:true})
        console.log(result.data)
        toast.success("Lecture Removed")
       navigate(`/createlecture/${courseId}`)
        setLoading1(false)
      } catch (error) {
        console.log(error)
        toast.error("Lecture remove error")
        setLoading1(false)
      }
      
    }






   

    

    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">

      <div className="w-full max-w-xl bg-[#121214] rounded-xl border border-gray-800 shadow-sm p-8 space-y-6">

        {/* Header Inside Box */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
           <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white" onClick={()=>navigate(`/createlecture/${courseId}`)}>
                  <FaArrowLeft className="text-xs" />
              </button>
              <h2 className="text-lg font-semibold text-white">Edit Lecture Content</h2>
           </div>
           
           <button 
             className="px-3 py-1.5 bg-red-900/10 text-red-500 border border-red-500/20 rounded hover:bg-red-900/20 transition-all text-xs font-bold uppercase tracking-wide" 
             disabled={loading1} onClick={removeLecture}
           >
            {loading1?<ClipLoader size={12} color='#F87171'/>:"Delete"}
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Lecture Title</label>
            <input
              type="text"
              className="w-full p-3 bg-[#09090b] border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none placeholder-gray-600 transition-all text-sm"
              placeholder={selectedLecture.lectureTitle}
              onChange={(e)=>setLectureTitle(e.target.value)}
              value={lectureTitle}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Video Content *</label>
            <div className="relative">
                <input
                type="file"
                required
                accept='video/*'
                className="w-full bg-[#09090b] border border-gray-700 rounded-lg p-3 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700 cursor-pointer"
                onChange={(e)=>setVideoUrl(e.target.files[0])}
                />
            </div>
            {videoUrl && <p className="text-xs text-green-500 mt-2 ml-1 flex items-center gap-1">✓ Video selected</p>}
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-3 p-4 bg-[#09090b] rounded-lg border border-gray-800">
            <input
              type="checkbox"
              className="accent-white h-4 w-4 cursor-pointer rounded"
              onChange={() => setIsPreviewFree(prev=>!prev)}
              checked={isPreviewFree} // Bind checked state
            />
            <label className="text-sm font-medium text-white cursor-pointer select-none" onClick={() => setIsPreviewFree(prev=>!prev)}>Set as Free Preview</label>
          </div>
        </div>
         
         {loading && (
             <div className="flex items-center gap-3 p-3 bg-blue-900/10 border border-blue-500/20 rounded-lg">
                 <ClipLoader size={16} color='#60A5FA'/>
                 <p className="text-blue-400 text-xs font-medium animate-pulse">Uploading content...</p>
             </div>
         )}
         
        {/* Submit Button */}
        <div className="pt-2">
          <button className="w-full bg-white text-black py-3 rounded-lg font-semibold shadow-sm hover:bg-gray-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm" disabled={loading} onClick={editLecture}>
            {loading ? "Processing..." :"Update Lecture"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditLecture
