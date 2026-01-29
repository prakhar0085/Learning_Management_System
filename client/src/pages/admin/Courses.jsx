import React, { useEffect } from 'react'

import { FaEdit } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../../config';
import { toast } from 'react-toastify';
import { setCreatorCourseData } from '../../redux/courseSlice';
import img1 from "../../assets/empty.jpg"
import { FaArrowLeftLong } from "react-icons/fa6";
function Courses() {

  let navigate = useNavigate()
  let dispatch = useDispatch()

  const { creatorCourseData } = useSelector(state => state.course)

  useEffect(() => {
    const getCreatorData = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getcreatorcourses", { withCredentials: true })

        await dispatch(setCreatorCourseData(result.data))


        console.log(result.data)

      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }

    }
    getCreatorData()
  }, [dispatch]) // Added dispatch



  return (
    <div className="flex min-h-screen bg-[#09090b] text-white px-4 sm:px-6 py-10">
      
      <div className="w-full max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-b border-gray-800">
          <div className='flex items-center gap-4'>
            <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white" onClick={() => navigate("/dashboard")}>
                <FaArrowLeftLong className='w-5 h-5' />
            </button>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Course Manager</h1>
          </div>

          <button 
            className="bg-white text-black px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors shadow-sm" 
            onClick={() => navigate("/createcourses")}
          >
            + New Course
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-[#121214] rounded-xl border border-gray-800 overflow-hidden">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#18181b] border-b border-gray-800">
              <tr>
                <th className="py-4 px-6 text-gray-400 font-medium uppercase tracking-wider text-xs">Course</th>
                <th className="py-4 px-6 text-gray-400 font-medium uppercase tracking-wider text-xs">Price</th>
                <th className="py-4 px-6 text-gray-400 font-medium uppercase tracking-wider text-xs">Status</th>
                <th className="py-4 px-6 text-gray-400 font-medium uppercase tracking-wider text-xs text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {creatorCourseData?.map((course, index) => (
                <tr key={index} className="hover:bg-[#18181b] transition-colors">
                  <td className="py-4 px-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-gray-800 overflow-hidden border border-gray-700">
                        {course?.thumbnail ? <img
                        src={course?.thumbnail}
                        alt=""
                        className="w-full h-full object-cover"
                        /> : <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">N/A</div>}
                    </div>
                    <span className="font-medium text-white text-sm">{course?.title}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-300 font-mono text-sm">
                      {course?.price ? `₹${course?.price}` : 'Free'}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded text-xs font-medium border ${course?.isPublished ? "bg-green-900/20 text-green-400 border-green-900/30" : "bg-yellow-900/20 text-yellow-400 border-yellow-900/30"}`}>
                      {course?.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors" onClick={() => navigate(`/addcourses/${course?._id}`)}>
                        <FaEdit className="w-4 h-4"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {creatorCourseData?.length === 0 && (
              <div className="p-12 text-center text-gray-500 bg-[#09090b]">
                  <p>No courses found. Create your first course to get started.</p>
              </div>
          )}
        </div>


        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {creatorCourseData?.map((course, index) => (
            <div key={index} className="bg-[#121214] rounded-xl p-5 border border-gray-800 flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <img
                  src={course?.thumbnail || img1}
                  alt=""
                  className="w-16 h-16 rounded overflow-hidden border border-gray-700 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="font-medium text-white truncate text-sm">{course?.title}</h2>
                  <p className="text-gray-500 text-xs mt-1 font-mono">{course?.price ? `₹${course?.price}` : 'Free'}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${course?.isPublished ? "bg-green-900/20 text-green-400 border-green-900/30" : "bg-yellow-900/20 text-yellow-400 border-yellow-900/30"}`}>
                      {course?.isPublished ? "Published" : "Draft"}
                  </span>
                  <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-white font-medium uppercase tracking-wide" onClick={() => navigate(`/addcourses/${course?._id}`)}>
                     <FaEdit /> Edit Details
                  </button>
              </div>
            </div>
          ))}
          {creatorCourseData?.length > 0 && (
            <p className="text-center text-xs text-gray-600 mt-8 uppercase tracking-widest">
                End of list
            </p>
          )}
        </div>
      </div>
    </div>
  );

}

export default Courses
