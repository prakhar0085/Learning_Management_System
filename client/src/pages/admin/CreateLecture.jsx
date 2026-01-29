import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { serverUrl } from '../../config';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setLectureData } from '../../redux/lectureSlice';

function CreateLecture() {
    const navigate = useNavigate()
    const {courseId} = useParams()
    const [lectureTitle , setLectureTitle] = useState("")
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const {lectureData} = useSelector(state=>state.lecture)
    

    const createLectureHandler = async () => {
      setLoading(true)
      try {
        const result = await axios.post(serverUrl + `/api/course/createlecture/${courseId}` ,{lectureTitle} , {withCredentials:true})
        console.log(result.data)
      dispatch(setLectureData([...lectureData,result.data.lecture]))
        toast.success("Lecture Created")
        setLoading(false)
        setLectureTitle("")
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
        setLoading(false)
      }
    }

    useEffect(()=>{
      const getLecture = async () => {
        try {
          const result = await axios.get(serverUrl + `/api/course/getcourselecture/${courseId}`,{withCredentials:true})
        console.log(result.data)
        dispatch(setLectureData(result.data.lectures || []))
        

          
        } catch (error) {
           console.log(error)
        toast.error(error.response.data.message)
        
        }
        
      }
      getLecture()
    },[courseId, dispatch]) // Added courseId and dispatch

   
  
  return (
     <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-4">
      
      <div className="bg-[#121214] border border-gray-800 shadow-sm rounded-xl w-full max-w-2xl p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-1">Course Curriculum</h1>
          <p className="text-gray-500 text-sm">Add and arrange your course lectures.</p>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-2 mb-8">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">New Lecture Title</label>
            <input
            type="text"
            placeholder="e.g. Introduction to Neural Networks"
            className="w-full bg-[#09090b] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white focus:ring-0 transition-all placeholder-gray-600 text-sm"
            onChange={(e)=>setLectureTitle(e.target.value)}
            value={lectureTitle}
            />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-8 border-b border-gray-800 pb-8">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-700 hover:bg-gray-800 text-gray-300 font-medium transition-colors text-sm" onClick={()=>navigate(`/addcourses/${courseId}`)}>
            <FaArrowLeft className="text-xs" /> Back
          </button>
          <button className="flex-1 px-5 py-2.5 rounded-lg bg-white hover:bg-gray-200 text-black font-semibold shadow-sm transition-all flex items-center justify-center text-sm" disabled={loading} onClick={createLectureHandler}>
           {loading?<ClipLoader size={18} color='black'/>: "+ Add Lecture"}
          </button>
        </div>

        {/* Lecture List */}
         <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Existing Lectures</h3>
          {lectureData && lectureData.length > 0 ? (
            <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
                {lectureData.map((lecture, index) => (
                <div key={lecture._id || index} className="bg-[#09090b] border border-gray-800 hover:border-gray-700 rounded-lg flex justify-between items-center p-3 transition-all group">
                    <span className="text-gray-300 font-medium text-sm flex items-center gap-3">
                        <span className="text-gray-600 text-xs font-mono">{(index + 1).toString().padStart(2, '0')}</span>
                         {lecture.lectureTitle}
                    </span>
                    <button className="p-1.5 text-gray-500 hover:text-white transition-colors" onClick={()=>navigate(`/editlecture/${courseId}/${lecture._id}`)}>
                        <FaEdit />
                    </button>
                </div>
                ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-10 border border-dashed border-gray-800 rounded-lg bg-[#09090b]/50">
                <p className="text-sm">No lectures found.</p>
                <p className="text-xs mt-1 text-gray-600">Enter a title above to create one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    
  )
}

export default CreateLecture
