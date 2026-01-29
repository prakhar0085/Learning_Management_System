import React from 'react'
import home from "../assets/home1.jpg"
import Nav from '../components/Nav'
import { SiViaplay } from "react-icons/si";
import Logos from '../components/Logos';
import Cardspage from '../components/Cardspage';
import ExploreCourses from '../components/ExploreCourses';
import About from '../components/About';
import ai from '../assets/ai.png'
import ai1 from '../assets/SearchAi.png'
import ReviewPage from '../components/ReviewPage';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
function Home() {
      const navigate = useNavigate()

  return (

    
    
    <div className='w-[100%] overflow-hidden bg-[#050505]'>
      
      <div className='w-[100%] lg:h-[100vh] h-[80vh] relative flex flex-col'>
        <Nav/>
        
        {/* Hero Section - Editorial Style */}
        <div className="flex-1 relative flex items-center justify-center">
            {/* Background Image with sophisticated overlay */}
            <div className="absolute inset-0 z-0">
                <img src={home} className='object-cover w-full h-full opacity-40 grayscale-[20%]' alt="Background" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/40 to-[#050505]"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto space-y-8 mt-10">
                <span className='text-xs md:text-sm font-bold tracking-[0.3em] text-gray-400 uppercase border border-gray-700 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-sm'>
                    master your craft
                </span>
                
                <h1 className='text-4xl md:text-7xl lg:text-8xl font-medium text-white tracking-tighter leading-[1.1]'>
                    Skills that <br className="hidden md:block" />
                    <span className="text-gray-400 italic font-serif pr-2">define</span> 
                    your future.
                </h1>
                
                <p className='text-base md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed'>
                    A premium learning environment designed for professionals. Access world-class courses in development, design, and AI.
                </p>

                <div className='flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto'>
                    <button className='w-full sm:w-auto px-8 py-4 bg-white text-black text-sm font-bold tracking-wide uppercase hover:bg-gray-200 transition-colors rounded-none' onClick={()=>navigate("/allcourses")}>
                        Explore Catalog
                    </button>
                    <button className='w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white text-sm font-bold tracking-wide uppercase hover:bg-white/10 transition-colors rounded-none flex items-center justify-center gap-3' onClick={()=>navigate("/searchwithai")}>
                        <span>AI Assistant</span>
                        <img src={ai} className='w-5 h-5 rounded-full grayscale opacity-80' alt="" />
                    </button>
                </div>
            </div>
        </div>
      </div>
      <Logos/>
      
      <Footer/>

      
      
      
    </div>

  ) 
}

export default Home
