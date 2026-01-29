import React, { useEffect, useState, useCallback } from 'react';
import Card from "../components/Card.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import ai from '../assets/SearchAi.png'
import { useSelector } from 'react-redux';
function AllCourses() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate()
  const [category,setCategory] = useState([])
  const [filterCourses,setFilterCourses] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const {courseData} = useSelector(state=>state.course)

 
  
  const toggleCategory = (e) =>{
     if(category.includes(e.target.value)){
       setCategory(prev=> prev.filter(item => item !== e.target.value))
     }else{
      setCategory(prev => [...prev,e.target.value])
     }
  }

  const applyFilter = useCallback(() =>{
    let courseCopy = courseData.slice();

    if(category.length > 0){
      courseCopy = courseCopy.filter(item => category.includes(item.category))
    }

    if(searchQuery){
      courseCopy = courseCopy.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }
   
    setFilterCourses(courseCopy)

  },[category, courseData, searchQuery])

   useEffect(()=>{
setFilterCourses(courseData)
  },[courseData])

  useEffect(()=>{
    applyFilter()
  },[category, applyFilter]) // Added applyFilter to dependency array

  return (
    <div className="flex min-h-screen bg-[#09090b] text-white">
      <Nav/>
      
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsSidebarVisible(prev => !prev)}
        className="fixed bottom-6 right-6 z-50 bg-white text-black p-4 rounded-full shadow-lg md:hidden flex items-center justify-center font-bold"
      >
        {isSidebarVisible ? '✕' : 'Filter'} 
      </button>


      {/* Main Layout Container */}
      <div className="flex w-full max-w-[1600px] mx-auto pt-[70px]">
        
        {/* Sidebar */}
        <aside className={`w-[260px] h-[calc(100vh-70px)] flex-shrink-0 bg-[#09090b] border-r border-gray-800 overflow-y-auto fixed md:sticky top-[70px] left-0 transition-transform duration-300 z-40 
            ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0 p-6`}>
            
            <div className="mb-8 space-y-4">
                 <button className='w-full py-2.5 bg-[#18181b] hover:bg-gray-800 border border-gray-800 rounded-lg text-xs font-semibold uppercase tracking-wide text-gray-300 transition-all flex items-center justify-center gap-2' onClick={()=>navigate("/searchwithai")}>
                    <img src={ai} className='w-4 h-4 rounded-full grayscale opacity-70' alt="AI" />
                    Ask AI Assistant
                </button>
                
                {/* Search Input */}
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search courses..." 
                        className="w-full bg-[#121214] border border-gray-800 text-sm text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                        value={searchQuery}
                        onChange={(e)=>setSearchQuery(e.target.value)}
                    />
                     <div className="absolute right-3 top-2.5 text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                     </div>
                </div>
            </div>

            <div className='space-y-6'>
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Categories</h3>
                    <form className="space-y-2" onSubmit={(e)=>e.preventDefault()}>
                    {[
                        'App Development', 'AI/ML', 'AI Tools', 'Data Science', 
                        'Data Analytics', 'Ethical Hacking', 'UI UX Designing', 
                        'Web Development', 'Others'
                    ].map((cat) => (
                        <label key={cat} className="flex items-center gap-3 cursor-pointer group py-1.5">
                        <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-gray-700 bg-[#121214] text-white focus:ring-0 focus:ring-offset-0 checked:bg-white checked:border-white transition-all" 
                            value={cat} 
                            onChange={toggleCategory}
                        />
                        <span className="text-gray-400 group-hover:text-white transition-colors text-sm">{cat}</span>
                        </label>
                    ))}
                    </form>
                </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 min-h-screen">
             <div className="flex flex-col gap-2 mb-10">
                <h1 className="text-2xl font-semibold text-white tracking-tight">Browse Courses</h1>
                <p className="text-gray-500 text-sm">Found {filterCourses?.length || 0} courses matching your criteria</p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filterCourses?.map((item,index)=>(
                  <div key={index} className="h-full">
                     <Card thumbnail={item.thumbnail} title={item.title} price={item.price} category={item.category} id={item._id} reviews={item.reviews} />
                  </div>
                ))}
            </div>
            
            {filterCourses?.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[400px] text-gray-500 border border-dashed border-gray-800 rounded-xl bg-[#121214]/50">
                    <p className="text-sm font-medium">No courses found</p>
                    <p className="text-xs mt-1 text-gray-600">Try adjusting your filters</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
}

export default AllCourses;
