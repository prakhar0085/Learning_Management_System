import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';
import { serverUrl } from '../config';

function ViewLecture() {
  const { courseId } = useParams();
  // We still use Redux for initial state, but we'll fetch fresh data
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user)
  
  const [selectedCourse, setSelectedCourse] = useState(
      courseData?.find((course) => course._id === courseId) || null
  );

  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null
  );
  
  const navigate = useNavigate();

  // Fetch latest lecture data on mount to handle stale Redux state
  useEffect(() => {
    const fetchFreshData = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/course/getcourselecture/${courseId}`, {
                withCredentials: true
            });
            console.log("Fresh Course Data:", res.data);
            if (res.data) {
                setSelectedCourse(res.data);
                
                // Update currently selected lecture with fresh data (videoUrl)
                if (selectedLecture) {
                     const freshLecture = res.data.lectures?.find(l => l._id === selectedLecture._id);
                     if (freshLecture) setSelectedLecture(freshLecture);
                } else if (res.data.lectures?.length > 0) {
                    // Initial selection if none
                    setSelectedLecture(res.data.lectures[0]);
                }
            }
        } catch (err) {
            console.error("Failed to fetch lecture data:", err);
        }
    };
    fetchFreshData();
  }, [courseId, selectedLecture?._id]); // Add selectedLecture._id to dependencies to retry if selection changes before fetch completes (optional but safer)

  const courseCreator = userData?._id === selectedCourse?.creator ? userData : null;


  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6 flex flex-col md:flex-row gap-6">
     
      {/* Left - Video & Course Info */}
      <div className="w-full md:w-3/4 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-center gap-4">
             <button onClick={()=>navigate("/")} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <FaArrowLeftLong className='text-white w-5 h-5'/>
             </button>
             <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-100 line-clamp-1">{selectedCourse?.title}</h1>
                <div className="flex gap-3 text-xs md:text-sm text-gray-400 font-medium mt-1">
                   <span className="bg-purple-900/40 px-2 py-0.5 rounded text-purple-300 border border-purple-500/20">{selectedCourse?.category}</span>
                   <span className="bg-gray-800 px-2 py-0.5 rounded border border-white/10">{selectedCourse?.level}</span>
                </div>
             </div>
        </div>

        {/* Video Player */}
        <div className="w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
          {selectedLecture?.videoUrl ? (
            <video
              key={selectedLecture.videoUrl} // Force re-render when URL changes
              controls
              className="w-full h-full object-contain"
            >
              <source src={selectedLecture.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
              <FaPlayCircle className="w-16 h-16 opacity-30"/>
              <p>Select a lecture from the sidebar to start learning</p>
              <p className="text-xs text-gray-600">Video URL: {selectedLecture ? "Loading..." : "None"}</p>
            </div>
          )}
        </div>

        {/* Selected Lecture Info */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
          <h2 className="text-xl font-bold text-white mb-2">{selectedLecture?.lectureTitle}</h2>
          <p className="text-gray-400 text-sm">Now playing • {selectedCourse?.title}</p>
          
          {/* TEMP DEBUG PANEL */}
          <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded text-xs font-mono text-red-200 overflow-x-auto">
              <p className="font-bold mb-2">DEBUG INFO (Share this if video fails):</p>
              <pre>{JSON.stringify(selectedLecture, null, 2)}</pre>
          </div>
        </div>
      </div>

      {/* Right - All Lectures + Creator Info */}
      <div className="w-full md:w-1/4 flex flex-col gap-6 h-[calc(100vh-40px)] sticky top-6">
        <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5 bg-white/5">
             <h2 className="text-lg font-bold text-white">Course Content</h2>
             <p className="text-xs text-gray-400">{selectedCourse?.lectures?.length} lectures</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {selectedCourse?.lectures?.length > 0 ? (
              selectedCourse.lectures.map((lecture, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedLecture(lecture)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left group ${
                    selectedLecture?._id === lecture._id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'hover:bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono w-5 h-5 flex items-center justify-center rounded ${selectedLecture?._id === lecture._id ? 'bg-white/20' : 'bg-white/5'}`}>{index + 1}</span>
                    <h4 className="text-sm font-medium line-clamp-1">{lecture.lectureTitle}</h4>
                  </div>
                  {selectedLecture?._id === lecture._id && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                </button>
              ))
            ) : (
              <p className="text-gray-500 text-center py-10">No lectures available.</p>
            )}
          </div>
        </div>

        {/* Creator Info - Mini Card */}
        {courseCreator && (
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center gap-4">
            <img
              src={courseCreator.photoUrl || '/default-avatar.png'}
              alt="Instructor"
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50"
            />
            <div>
              <h4 className="text-sm font-bold text-white">{courseCreator.name}</h4>
              <p className="text-xs text-gray-500 line-clamp-1">{courseCreator.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewLecture;
