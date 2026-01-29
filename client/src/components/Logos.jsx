import React from 'react'
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
function Logos() {
  return (
    <div className='w-full py-10 flex items-center justify-center flex-wrap gap-6 md:mb-12'>
        <div className='flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white shadow-md border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group'>
            <MdCastForEducation className='w-6 h-6 fill-purple-600 group-hover:scale-110 transition-transform' />
            <span className='text-gray-700 font-medium group-hover:text-purple-700'>20k+ Online Courses</span>
        </div>
        <div className='flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white shadow-md border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group'>
            <SiOpenaccess className='w-5 h-5 fill-teal-600 group-hover:scale-110 transition-transform' />
            <span className='text-gray-700 font-medium group-hover:text-teal-700'>Lifetime Access</span>
        </div>
        <div className='flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white shadow-md border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group'>
            <FaSackDollar className='w-5 h-5 fill-yellow-600 group-hover:scale-110 transition-transform' />
            <span className='text-gray-700 font-medium group-hover:text-yellow-700'>Value For Money</span>
        </div>
        <div className='flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white shadow-md border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group'>
            <BiSupport className='w-6 h-6 fill-blue-600 group-hover:scale-110 transition-transform' />
            <span className='text-gray-700 font-medium group-hover:text-blue-700'>Lifetime Support</span>
        </div>
        <div className='flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white shadow-md border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group'>
            <FaUsers className='w-6 h-6 fill-indigo-600 group-hover:scale-110 transition-transform' />
            <span className='text-gray-700 font-medium group-hover:text-indigo-700'>Community Support</span>
        </div>
    </div>
  )
}

export default Logos
