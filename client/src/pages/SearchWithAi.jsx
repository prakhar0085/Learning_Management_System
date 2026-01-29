import React, { useState } from 'react'
import ai from "../assets/ai.png"

import { RiMicAiFill } from "react-icons/ri";
import axios from 'axios';
import { serverUrl } from '../config';
import { useNavigate } from 'react-router-dom';
import start from "../assets/start.mp3"
import { FaArrowLeftLong } from "react-icons/fa6";
function SearchWithAi() {
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [listening,setListening] = useState(false)
  const navigate = useNavigate();
  const startSound = new Audio(start)
  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  if (!recognition) {
    console.log("Speech recognition not supported");
  }

  const handleSearch = async () => {

    if (!recognition) return;
    setListening(true)
    startSound.play()
    recognition.start();
    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setInput(transcript);
      await handleRecommendation(transcript);
    };
  
      
    
  };

  const [error, setError] = useState(null);

  const handleRecommendation = async (query) => {
    setListening(false) // Stop listening immediately when processing starts
    setError(null);
    try {
      const result = await axios.post(`${serverUrl}/api/ai/search`, { input: query }, { withCredentials: true });
      setRecommendations(result.data);
      if(result.data.length>0){
         speak("These are the top courses I found for you")
      }else{
         speak("No courses found")
      }
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message || "AI Service Unavailable";
      setError(msg);
      speak("Sorry, I encountered an error.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-16 relative overflow-hidden">
      
       {/* Neon blurred spots */}
       <div className="absolute top-[-100px] left-[20%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[150px] pointer-events-none"></div>
       <div className="absolute bottom-[-100px] right-[20%] w-[500px] h-[500px] bg-teal-900/20 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Search Container */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 w-full max-w-3xl text-center relative z-10">
        <FaArrowLeftLong  className='text-gray-400 hover:text-white transition-colors w-6 h-6 cursor-pointer absolute top-8 left-8' onClick={()=>navigate("/")}/>
        
        <h1 className="text-4xl font-bold mb-8 flex flex-col md:flex-row items-center justify-center gap-3 tracking-tight">
          <div className="p-3 bg-purple-500/20 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)]">
             <img src={ai} className='w-8 h-8' alt="AI" />
          </div>
          <span>Search with <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'>GenAI</span></span>
        </h1>

        <div className="relative w-full group">
          <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 ${listening ? 'opacity-100 animate-pulse' : ''}`}></div>
          <div className="relative flex items-center bg-gray-900 rounded-full overflow-hidden shadow-inner border border-white/10">
            
            <input
              type="text"
              className="flex-grow px-8 py-5 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg font-light"
              placeholder="What do you want to learn today?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRecommendation(input)}
            />
            
            {input && (
              <button
                onClick={() => handleRecommendation(input)}
                className="absolute right-16 p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:scale-110 transition-transform"
              >
                <img src={ai} className='w-6 h-6' alt="Search" />
              </button>
            )}

            <button
              className={`absolute right-3 w-12 h-12 rounded-full flex items-center justify-center transition-all ${listening ? 'bg-red-500/20 text-red-400' : 'bg-white/10 hover:bg-white/20 text-purple-400'}`}
              onClick={handleSearch}
            >
              <RiMicAiFill className={`w-6 h-6 ${listening ? 'animate-ping' : ''}`} />
            </button>
          </div>
        </div>
        
        {error ? (
             <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
                 <p className="font-bold">Error</p>
                 <p>{error}</p>
                 <p className="text-xs mt-2 text-gray-400">Please try the manual search in "All Courses" instead.</p>
             </div>
        ) : (
             <p className="mt-4 text-gray-500 text-sm">Try saying "Find me some advanced Python courses"</p>
        )}
        
      </div>

      {/* Recommendations */}
      <div className="w-full max-w-7xl mt-16 px-4 z-10">
      {recommendations.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-8 text-white text-center flex items-center justify-center gap-3">
             <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
             AI Recommendations
          </h2>
       
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((course, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group flex flex-col gap-3"
                onClick={() => navigate(`/viewcourse/${course._id}`)}
              >
                <div className="flex items-start justify-between">
                     <span className="text-xs font-bold text-purple-400 uppercase tracking-widest border border-purple-500/30 px-2 py-1 rounded">{course.category}</span>
                     <span className="text-gray-400 group-hover:text-white transition-colors">↗</span>
                </div>
                <h3 className="text-xl font-bold text-white leading-tight group-hover:text-purple-300 transition-colors">{course.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">Click to view course details and modules.</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        listening ? (
             <div className="mt-20 flex flex-col items-center gap-4">
                 <div className="flex gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                 </div>
                 <h1 className='text-2xl font-light text-gray-300'>Listening...</h1>
             </div>
        ) : (
             <div className="mt-20 text-center">
                 <h1 className='text-2xl font-light text-gray-600'>No results yet. Try searching for something!</h1>
             </div>
        )
      )}
      </div>
    </div>
  );
}

export default SearchWithAi;
