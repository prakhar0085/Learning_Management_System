import React from 'react'
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import img from "../../assets/empty.jpg"; // fallback photo
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
function Dashboard() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);
  // update based on your store

  // Sample data - Replace with real API/course data
  const courseProgressData = creatorCourseData?.map(course => ({
    name: course.title.slice(0, 10) + "...",
    lectures: course.lectures.length || 0
  })) || [];

  const enrollData = creatorCourseData?.map(course => ({
    name: course.title.slice(0, 10) + "...",
    enrolled: course.enrolledStudents?.length || 0
  })) || [];

  const totalEarnings = creatorCourseData?.reduce((sum, course) => {
    const studentCount = course.enrolledStudents?.length || 0;
    const courseRevenue = course.price ? course.price * studentCount : 0;
    return sum + courseRevenue;
  }, 0) || 0;

  return (
    <div className="flex min-h-screen bg-[#09090b] text-white px-6 py-10">
      
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        {/* Header with Back Button */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-6">
             <div className="flex items-center gap-4">
                <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white">
                        <FaArrowLeftLong className='w-5 h-5'/>
                </button>
                <h1 className="text-2xl font-semibold text-white tracking-tight">Instructor Dashboard</h1>
             </div>
             
             <button className='px-5 py-2.5 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors' onClick={() => navigate("/courses")}>
                Manage Courses
            </button>
        </div>

        {/* Welcome Section - Clean Card */}
        <div className="bg-[#121214] rounded-xl p-8 border border-gray-800 flex flex-col md:flex-row items-center gap-8">
          <img
              src={userData?.photoUrl || img}
              alt="Educator"
              className="w-24 h-24 rounded-full object-cover border border-gray-700"
          />
          
          <div className="text-center md:text-left space-y-2 flex-1">
            <h1 className="text-2xl font-medium text-white">
              Hello, {userData?.name || "Educator"}
            </h1>
            <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
              {userData?.description || "Track your performance and manage your educational content from this central hub."}
            </p>
             <div className="flex items-center justify-center md:justify-start gap-8 mt-6 pt-6 border-t border-gray-800/50">
                <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Total Earnings</span>
                    <span className="text-2xl font-mono text-white">₹{totalEarnings.toLocaleString()}</span>
                </div>
                <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Active Courses</span>
                    <span className="text-2xl font-mono text-white">{creatorCourseData?.length || 0}</span>
                </div>
             </div>
          </div>
        </div>

        {/* Graphs Section - Professional Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Progress Chart */}
          <div className="bg-[#121214] rounded-xl p-6 border border-gray-800">
            <h2 className="text-sm font-medium mb-6 text-gray-400 uppercase tracking-wider">
                Course Content Volume
            </h2>
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="name" stroke="#52525b" tick={{fill: '#71717a', fontSize: 12}} tickLine={false} axisLine={false} />
                    <YAxis stroke="#52525b" tick={{fill: '#71717a', fontSize: 12}} tickLine={false} axisLine={false} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} 
                        itemStyle={{ color: '#fff' }}
                        cursor={{fill: '#27272a'}}
                    />
                    <Bar dataKey="lectures" fill="#e4e4e7" radius={[2, 2, 0, 0]} barSize={30} />
                </BarChart>
                </ResponsiveContainer>
            </div>
          </div>

          {/* Enrolled Students Chart */}
          <div className="bg-[#121214] rounded-xl p-6 border border-gray-800">
            <h2 className="text-sm font-medium mb-6 text-gray-400 uppercase tracking-wider">
                Student Enrollment
            </h2>
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="name" stroke="#52525b" tick={{fill: '#71717a', fontSize: 12}} tickLine={false} axisLine={false} />
                    <YAxis stroke="#52525b" tick={{fill: '#71717a', fontSize: 12}} tickLine={false} axisLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} 
                        itemStyle={{ color: '#fff' }}
                        cursor={{fill: '#27272a'}}
                    />
                    <Bar dataKey="enrolled" fill="#52525b" radius={[2, 2, 0, 0]} barSize={30} />
                </BarChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
