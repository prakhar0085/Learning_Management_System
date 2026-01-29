import React from 'react'
import about from "../assets/about.jpg"
import VideoPlayer from './VideoPlayer'
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BiSolidBadgeCheck } from "react-icons/bi";
function About() {
  return (
    <div className='w-full lg:min-h-[70vh] flex flex-col-reverse lg:flex-row items-center justify-center gap-10 px-6 py-10'>
        <div className='lg:w-1/2 w-full flex items-center justify-center relative p-4 group'>
            <div className="absolute inset-0 bg-purple-600/10 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-all duration-300"></div>
            <img src={about} className='w-[90%] rounded-2xl shadow-xl relative z-10' alt="About Us" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
               <VideoPlayer />
            </div>
        </div>
        <div className='lg:w-1/2 w-full flex flex-col start justify-center px-4 lg:pr-20'>
          <div className='flex items-center gap-4 text-purple-600 font-semibold mb-2'>
            <span className="w-10 h-[2px] bg-purple-600"></span> 
            ABOUT US 
          </div>
          <h2 className='text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight'>
            Maximize Your <span className="text-purple-600">Learning Growth</span>
          </h2>
          <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
            We provide a modern Learning Management System to simplify online education, track progress, and enhance student-instructor collaboration efficiently. Experience a new way of learning that adapts to your needs.
          </p>
          
          <div className='grid grid-cols-2 gap-6 w-full'>
            <div className='flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-purple-50 transition-colors'>
                <BiSolidBadgeCheck className='w-6 h-6 text-purple-600 flex-shrink-0'/>
                <span className="font-medium text-gray-700">Simplified Learning</span>
            </div>
            <div className='flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-purple-50 transition-colors'>
                <BiSolidBadgeCheck className='w-6 h-6 text-purple-600 flex-shrink-0'/>
                <span className="font-medium text-gray-700">Expert Trainers</span>
            </div>
             <div className='flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-purple-50 transition-colors'>
                <BiSolidBadgeCheck className='w-6 h-6 text-purple-600 flex-shrink-0'/>
                <span className="font-medium text-gray-700">Interactive Courses</span>
            </div>
            <div className='flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-purple-50 transition-colors'>
                <BiSolidBadgeCheck className='w-6 h-6 text-purple-600 flex-shrink-0'/>
                <span className="font-medium text-gray-700">Lifetime Access</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default About
