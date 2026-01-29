import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../config';
import { FaArrowLeftLong } from "react-icons/fa6";
import Nav from "../components/Nav";
import img from "../assets/empty.jpg"
import Card from "../components/Card.jsx"
import { setSelectedCourseData } from '../redux/courseSlice';
import { FaLock, FaPlayCircle, FaCheck, FaVideo, FaFileDownload, FaInfinity, FaMobileAlt, FaTrophy } from "react-icons/fa";
import { toast } from 'react-toastify';
import { FaStar } from "react-icons/fa6";


function ViewCourse() {

      const { courseId } = useParams();
      const navigate = useNavigate()
    const {courseData} = useSelector(state=>state.course)
    const {userData} = useSelector(state=>state.user)
    const [creatorData , setCreatorData] = useState(null)
    const dispatch = useDispatch()
    const [selectedLecture, setSelectedLecture] = useState(null);
    const {lectureData} = useSelector(state=>state.lecture)
    const {selectedCourseData} = useSelector(state=>state.course)

   const [isEnrolled, setIsEnrolled] = useState(false);
   
   
  



  

  const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / reviews.length).toFixed(1); // rounded to 1 decimal
};

// Usage:
const avgRating = calculateAverageRating(selectedCourseData?.reviews);
console.log("Average Rating:", avgRating);

  

  const fetchCourseData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/course/getcourselecture/${courseId}`, { withCredentials: true });
      dispatch(setSelectedCourseData(data));
      console.log("Fetched fresh course data:", data);
    } catch (error) {
       console.error("Failed to fetch course data:", error);
       // Fallback to Redux if API fails, though API is preferred for freshness
       const localCourse = courseData.find(c => c._id === courseId);
       if(localCourse) dispatch(setSelectedCourseData(localCourse));
    }
  },[courseId, dispatch, courseData])

    const checkEnrollment = useCallback(() => {
  const verify = userData?.enrolledCourses?.some(c => {
    const enrolledId = typeof c === 'string' ? c : c._id;
    return enrolledId?.toString() === courseId?.toString();
  });

  console.log("Enrollment verified:", verify);
  if (verify) {
    setIsEnrolled(true);
  }
},[courseId, userData])
  useEffect(() => {
    fetchCourseData()
    checkEnrollment()
  }, [courseId,courseData,lectureData, checkEnrollment, fetchCourseData]) // Added missing dependencies


    // Fetch creator info once course data is available
  useEffect(() => {
    const getCreator = async () => {
      if (selectedCourseData?.creator) {
        try {
          const result = await axios.post(
            `${serverUrl}/api/course/getcreator`,
            { userId: selectedCourseData.creator },
            { withCredentials: true }
          );
          setCreatorData(result.data);
          console.log(result.data)
        } catch (error) {
          console.error("Error fetching creator:", error);
        }
      }
    };

    getCreator();

    
  }, [selectedCourseData]);


   




 
const handleEnroll = async (courseId, userId) => {
  try {
    // 1. Create Order
    const orderData = await axios.post(serverUrl + "/api/payment/create-order", {
      courseId,
      userId
    } , {withCredentials:true});
    console.log("Order Data:", orderData);
    
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    console.log("Order Data:", orderData);
    
    // Ensure script is loaded
    if (!window.Razorpay) {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
            toast.error("Razorpay SDK failed to load. Check connection.");
            return;
        }
    }

    console.log("Full Order Response:", orderData);
    const { id: order_id, amount, currency } = orderData.data;

    if (!order_id || !amount) {
        toast.error("Invalid order data received from server.");
        console.error("Missing order_id or amount", orderData.data);
        return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
        toast.error("Razorpay Key is missing configuration");
        console.error("VITE_RAZORPAY_KEY_ID is undefined");
        return;
    }

    const options = {
      key: razorpayKey, 
      amount: amount,
      currency: currency || "INR",
      name: "Virtual Courses",
      description: "Course Enrollment Payment",
      order_id: order_id,
      handler: async function (response) {
        console.log("Razorpay Success Handler Triggered:", response);
        try {
          const verifyRes = await axios.post(serverUrl + "/api/payment/verify-payment",{
            ...response,       
            courseId,
            userId
          }, { withCredentials: true });
          
          setIsEnrolled(true)
          toast.success(verifyRes.data.message);
        } catch (verifyError) {
          toast.error("Payment verification failed.");
          console.error("Verification Error:", verifyError);
        }
      },
      prefill: {
        name: userData?.name,
        email: userData?.email,
        contact: "" // Add contact if available
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };
    
    console.log("Razorpay Options:", options);
    
    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', function (response){
        console.error("Payment Failed:", response.error);
        toast.error(`Payment Failed: ${response.error.description}`);
    });
    rzp.open()

  } catch (err) {
    toast.error("Something went wrong while enrolling.");
    console.error("Enroll Error:", err);
  }
};

  return (

    <div className="min-h-screen bg-[#09090b] text-white pt-[70px]">
      <Nav/>
      
      {/* Top Breadcrumb / Back Navigation */}
      <div className="bg-[#09090b] border-b border-gray-800 sticky top-[70px] z-40">
           <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
               <button onClick={()=>navigate("/allcourses")} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                   <FaArrowLeftLong className='group-hover:-translate-x-1 transition-transform'/> Back to Courses
               </button>
               {/* Optional: Brand or simple logo here if Nav is not present */}
               <div className="text-sm font-semibold text-gray-500">
                  {selectedCourseData?.category} &gt; {selectedCourseData?.title}
               </div>
           </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* LEFT COLUMN - Main Content */}
            <div className="lg:col-span-2 space-y-12">
                
                {/* Course Header Info */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white">
                        {selectedCourseData?.title}
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                        {selectedCourseData?.subTitle}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm pt-2">
                        <div className="flex items-center gap-1.5 bg-yellow-500/10 px-2 py-1 rounded text-yellow-500 border border-yellow-500/20">
                            <span className="font-bold">{avgRating}</span>
                            <FaStar className="w-3.5 h-3.5"/>
                            <span className="underline cursor-pointer">({selectedCourseData?.reviews?.length || 0} ratings)</span>
                        </div>
                        <span className="text-gray-400">Created by <span className="text-purple-400 font-medium hover:underline cursor-pointer">{creatorData?.name || "Instructor"}</span></span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 flex items-center gap-1">
                             Last updated {new Date().toLocaleDateString()}
                        </span>
                         <span className="text-gray-500">•</span>
                         <span className="flex items-center gap-1 text-white">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> English
                         </span>
                    </div>
                </div>

                {/* Video Preview / Texture */}
                <div className="rounded-2xl overflow-hidden border border-gray-800 bg-[#121214] aspect-video relative group shadow-2xl">
                     {selectedLecture?.videoUrl ? (
                         <video src={selectedLecture.videoUrl} controls className="w-full h-full" />
                     ) : (
                         <div className="w-full h-full relative">
                             {selectedCourseData?.thumbnail ? 
                                <img src={selectedCourseData.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" alt="Preview"/>
                                : 
                                <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-black"></div>
                             }
                             
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 cursor-pointer hover:scale-110 transition-transform shadow-2xl shadow-purple-500/20 group-hover:bg-purple-600 group-hover:border-purple-500">
                                     <FaPlayCircle className="w-8 h-8 text-white ml-1"/>
                                 </div>
                             </div>
                             <div className="absolute bottom-6 left-6 right-6">
                                 <p className="text-sm font-medium text-gray-300 mb-2">Wait! Watch this pre-view.</p>
                                 <h3 className="text-xl font-bold text-white">Course Introduction</h3>
                             </div>
                         </div>
                     )}
                </div>

                {/* What you'll learn */}
                <div className="border border-gray-800 rounded-2xl p-8 bg-[#121214]/50">
                    <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            `Master ${selectedCourseData?.category || "concepts"} from scratch`,
                            "Build 5+ Real World Projects",
                            "Become job-ready with portfolio guidance",
                            "Understand advanced patterns and best practices"
                        ].map((item, i)=>(
                            <div key={i} className="flex gap-3 items-start">
                                <span className="text-gray-500 mt-1"><FaCheck className="w-3.5 h-3.5"/></span>
                                <span className="text-gray-300 text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Expansion: Description */}
                 <div className="space-y-4">
                     <h2 className="text-2xl font-bold">Description</h2>
                     <div className="prose prose-invert prose-sm max-w-none text-gray-400">
                         <p>{selectedCourseData?.description || "No description available."}</p>
                     </div>
                 </div>

                {/* Curriculum */}
                <div id="curriculum" className="space-y-6">
                     <h2 className="text-2xl font-bold">Course Content</h2>
                     <div className="bg-[#121214] border border-gray-800 rounded-xl overflow-hidden divide-y divide-gray-800">
                        {selectedCourseData?.lectures?.map((lecture, index) => (
                          <div 
                             key={index} 
                             onClick={() => { if (lecture.isPreviewFree || isEnrolled) setSelectedLecture(lecture); }}
                             className={`flex items-center justify-between p-4 hover:bg-[#18181b] transition-colors cursor-pointer group ${selectedLecture === lecture ? "bg-[#18181b]" : ""}`}
                          >
                             <div className="flex items-center gap-4">
                               <div className="text-gray-500 group-hover:text-white transition-colors">
                                   {(lecture.isPreviewFree || isEnrolled) ? <FaPlayCircle/> : <FaLock className="w-3.5 h-3.5"/>}
                               </div>
                               <span className="text-gray-300 group-hover:text-white font-medium text-sm transition-colors">{lecture.lectureTitle}</span>
                             </div>
                             <span className="text-xs text-gray-600">
                               {lecture.duration 
                                 ? `${Math.floor(lecture.duration / 60)}:${Math.floor(lecture.duration % 60).toString().padStart(2, '0')}`
                                 : "Video"
                               }
                             </span> 
                          </div>
                        ))}
                     </div>
                </div>

                {/* Instructor */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Instructor</h2>
                    <div className="flex gap-4">
                        <img src={creatorData?.photoUrl || img} className="w-24 h-24 rounded-full object-cover border-2 border-gray-800" alt="Instructor"/>
                        <div>
                             <h3 className="text-xl font-bold text-purple-400 hover:underline cursor-pointer">{creatorData?.name || "Instructor Name"}</h3>
                             <p className="text-gray-500 text-sm mb-3">{creatorData?.email || "Top Rated Instructor"}</p>
                             <p className="text-gray-400 text-sm leading-relaxed max-w-xl">{creatorData?.description || "Passionate about code and teaching the next generation of developers."}</p>
                        </div>
                    </div>
                </div>

                 {/* Reviews */}
                 <div className="pt-8 border-t border-gray-800">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <FaStar className="text-yellow-500 w-6 h-6"/> {avgRating} Course Rating • {selectedCourseData?.reviews?.length || 0} Reviews
                    </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {selectedCourseData?.reviews?.slice(0,4).map((rev, i)=>(
                             <div key={i} className="bg-[#121214] p-5 rounded-xl border border-gray-800 space-y-3">
                                 <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold">{rev?.user?.name?.[0] || "U"}</div>
                                     <span className="font-bold text-sm">{rev?.user?.name || "Student"}</span>
                                 </div>
                                 <div className="flex text-yellow-500 text-xs">
                                     {[...Array(5)].map((_,starI)=>(
                                         <FaStar key={starI} className={starI < rev.rating ? "" : "text-gray-700"}/>
                                     ))}
                                 </div>
                                 <p className="text-gray-400 text-sm italic">"{rev.comment}"</p>
                             </div>
                         ))}
                     </div>
                 </div>

            </div>

            {/* RIGHT COLUMN - Sticky Sidebar */}
            <div className="lg:col-span-1 relative">
                <div className="sticky top-24 space-y-4">
                    
                    {/* Enrollment Card */}
                    <div className="bg-[#121214] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                         {/* Optional Video Header for Card if scrolled past main video - keeping simplified for now */}
                         <div className="p-6 space-y-6">
                             <div className="flex items-end gap-3">
                                 <span className="text-4xl font-bold text-white">₹{selectedCourseData?.price}</span>
                                 <span className="text-lg text-gray-500 line-through mb-1">₹3,999</span>
                                 <span className="text-sm font-medium text-green-500 mb-1.5 ml-auto">84% off</span>
                             </div>

                             <div className="space-y-3">
                                {!isEnrolled ? (
                                    <>
                                        <button className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-lg transition-all shadow-lg shadow-purple-900/20" onClick={()=>handleEnroll(courseId , userData?._id)}>
                                            Add to Cart
                                        </button>
                                        <button className="w-full py-3.5 bg-[#18181b] hover:bg-white hover:text-black border border-gray-700 text-white font-bold text-lg rounded-lg transition-all" onClick={()=>handleEnroll(courseId , userData?._id)}>
                                            Buy Now
                                        </button>
                                    </>
                                ) : (
                                    <button className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-lg transition-all" onClick={() => document.getElementById('curriculum').scrollIntoView({behavior:'smooth'})}>
                                        Go to Course
                                    </button>
                                )}
                                <p className="text-xs text-gray-500 text-center">30-Day Money-Back Guarantee</p>
                             </div>
                             
                             <div className="space-y-2 pt-4 border-t border-gray-800">
                                 <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">This course includes:</h4>
                                 {[
                                     {icon: FaVideo, text: "40 hours on-demand video"},
                                     {icon: FaFileDownload, text: "5 downloadable resources"},
                                     {icon: FaInfinity, text: "Full lifetime access"},
                                     {icon: FaMobileAlt, text: "Access on mobile and TV"},
                                     {icon: FaTrophy, text: "Certificate of completion"}
                                 ].map((feat, i)=>(
                                     <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                                         <feat.icon className="w-4 h-4 text-gray-500"/>
                                         <span>{feat.text}</span>
                                     </div>
                                 ))}
                             </div>
                             
                             <div className="flex justify-between items-center pt-2 text-sm font-medium underline text-purple-400 cursor-pointer">
                                 <span>Share</span>
                                 <span>Gift this course</span>
                                 <span>Apply Coupon</span>
                             </div>
                         </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default ViewCourse
