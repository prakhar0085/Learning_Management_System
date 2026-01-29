import React from 'react'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { TbBrandOpenai } from "react-icons/tb";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
function ExploreCourses() {
  const navigate = useNavigate()
  return (
    <div className='w-full py-20 px-6 bg-black relative overflow-hidden'>
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            
            <div className='w-full lg:w-1/3 flex flex-col items-start gap-6'>
              <h2 className='text-5xl font-bold text-white leading-tight'>
                 Explore <br />
                 <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'>Our Courses</span>
              </h2>
              <p className='text-lg text-gray-400 leading-relaxed'>
                Go from basics to advanced mastery in today's most popular technologies. Our deep-dive courses on the MERN Stack, Java, Python, and Data Science are designed to make you a confident developer.
              </p>
              <button 
                className='px-8 py-3 mt-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-lg font-medium hover:bg-white/20 transition-all shadow-lg flex items-center gap-3 group' 
                onClick={()=>navigate("/allcourses")}
              >
                Start Exploring <SiViaplay className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </button>
            </div>

            <div className='flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full'>
               {[
                 { Icon: TbDeviceDesktopAnalytics, label: "Web Development", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
                 { Icon: LiaUikit, label: "UI/UX Design", color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" },
                 { Icon: MdAppShortcut, label: "App Development", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
                 { Icon: FaHackerrank, label: "Ethical Hacking", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
                 { Icon: TbBrandOpenai, label: "AI/ML", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                 { Icon: SiGoogledataproc, label: "Data Science", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
                 { Icon: BsClipboardDataFill, label: "Data Analytics", color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
                 { Icon: SiOpenaigym, label: "AI Tools", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
               ].map((item, index) => (
                 <div key={index} className={`flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border ${item.border} hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg shadow-black/50`}>
                    <div className={`w-14 h-14 rounded-full ${item.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <item.Icon className={`w-7 h-7 ${item.color}`} />
                    </div>
                    <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors text-center">{item.label}</span>
                 </div>
               ))}
            </div>
        </div>
    </div>
  )
}

export default ExploreCourses
