import React  from 'react'

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

function EnrolledCourse() {
  const navigate = useNavigate()

  const { userData } = useSelector((state) => state.user);

     
   
 

  return (
    <div className="min-h-screen w-full px-6 py-10 bg-gradient-to-br from-black via-gray-950 to-slate-900 relative">
       
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center mb-10 gap-4">
             <FaArrowLeftLong  className='text-gray-400 w-6 h-6 cursor-pointer hover:text-white transition-colors' onClick={()=>navigate("/")}/>
             <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
                My <span className="text-purple-500">Classroom</span>
             </h1>
          </div>

          {userData.enrolledCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center border-2 border-dashed border-white/10 rounded-3xl bg-white/5">
                <p className="text-gray-400 text-lg mb-4">You haven’t enrolled in any courses yet.</p>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition" onClick={()=>navigate("/allcourses")}>Explore Courses</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {userData.enrolledCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                     <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                      <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs text-white uppercase tracking-wider border border-white/10">
                          {course.category}
                      </div>
                  </div>
                  
                  <div className="p-5 flex flex-col gap-3">
                    <h2 className="text-lg font-bold text-white line-clamp-1 group-hover:text-purple-400 transition-colors">{course.title}</h2>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                         <span>{course.level}</span>
                         <span>Lifetime Access</span>
                    </div>
                    
                    <button 
                        className='w-full py-3 mt-2 bg-white text-black font-semibold rounded-xl hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-95' 
                        onClick={()=>navigate(`/viewlecture/${course._id}`)}
                    >
                        Continue Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}

export default EnrolledCourse
