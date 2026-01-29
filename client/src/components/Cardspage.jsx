import React, { useEffect, useState } from 'react'
import Card from "./Card.jsx"
import { useSelector } from 'react-redux';
import { SiViaplay } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function Cardspage() {
  const [popularCourses,setPopularCourses] =useState([]);
  const {courseData} = useSelector(state=>state.course)
  const navigate = useNavigate()
  useEffect(()=>{
    if(courseData && courseData.length > 0) {
      setPopularCourses(courseData.slice(0,6));
    }
  },[courseData])
  return (
    <div className='relative w-full py-20 flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900'>
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6 mb-16">
          <h1 className='text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-6 tracking-tight'>
             Our Popular Courses
          </h1>
          <p className='text-lg text-gray-400 font-light leading-relaxed'>
             Explore top-rated courses designed to boost your skills, enhance careers, and unlock opportunities in tech, AI, business, and beyond.
          </p>
      </div>

      <div className='w-full max-w-7xl px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 mb-16'>
            {
                popularCourses.map((item,index)=>(
                    <div key={index} className="transform hover:-translate-y-2 transition-all duration-300">
                      <Card id={item._id} thumbnail={item.thumbnail} title={item.title} price={item.price} category={item.category} reviews={item.reviews}  />
                    </div>
                ))
            }
      </div>
      
      <button 
         className='relative z-10 px-8 py-3 bg-white text-black rounded-full font-medium text-lg hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-3 group' 
         onClick={()=>navigate("/allcourses")}
      >
         View All Courses 
         <SiViaplay className='w-6 h-6 group-hover:scale-110 transition-transform' />
      </button>
    </div>
  )
}

export default Cardspage
