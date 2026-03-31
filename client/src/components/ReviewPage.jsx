import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa6';
import { serverUrl } from '../config';
import axios from 'axios';


function ReviewPage() {
    const { allReview } = useSelector(state => state.review);
    const { courseData } = useSelector(state => state.course);
    const { userData } = useSelector(state => state.user);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Show latest reviews first
    const displayReviews = [...(allReview || [])].reverse(); 

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!userData) {
            alert("Please login to write a review.");
            return;
        }
        if (!selectedCourseId) {
            alert("Please select a course to review.");
            return;
        }
        
        try {
            setIsSubmitting(true);
            const res = await axios.post(`${serverUrl}/api/review/givereview`, {
                courseId: selectedCourseId,
                rating,
                comment
            }, { withCredentials: true });

            if (res.status === 201) {
                alert("Review submitted successfully!");
                setIsModalOpen(false);
                setComment("");
                setRating(5);
                // Ideally, dispatch an action to re-fetch reviews or update state locally
                // For now, reloading page or relying on user refresh
                 window.location.reload(); 
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to submit review");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='flex items-center justify-center flex-col relative min-h-screen bg-[#050505] overflow-hidden selection:bg-purple-500/30'>
            
            {/* Editorial Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            {/* Header Section - Editorial Style */}
            <div className="relative z-10 text-center mt-[100px] mb-[40px] px-[20px] max-w-5xl">
                <span className='inline-block text-[10px] md:text-xs font-bold tracking-[0.4em] text-zinc-500 uppercase border border-white/10 px-5 py-2 rounded-none bg-white/5 backdrop-blur-sm mb-10'>
                    Voice of the community
                </span>
                
                <h1 className='text-4xl md:text-7xl font-medium text-white tracking-tighter leading-[1.1] mb-8'>
                    Real Stories. <br className="hidden md:block" />
                    <span className="text-zinc-500 italic font-serif">measurable</span> growth.
                </h1>
                
                <p className='text-base md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed mb-12'>
                    We take pride in the success of our students. Explore the authentic experiences of professionals who have advanced their careers through our curriculum.
                </p>
                
                {/* Write Review Button - Brutalist Style */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-10 py-5 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-all active:scale-[0.98] rounded-none shadow-[0_10px_30px_-10px_rgba(255,255,255,0.2)]"
                >
                    Share Your Journey
                </button>
            </div>

            {/* Reviews Grid - Clean Layout */}
            <div className='relative z-10 w-full max-w-7xl flex items-stretch justify-center flex-wrap gap-8 lg:p-12 md:p-8 p-6 mb-24'>
                {displayReviews.length > 0 ? (
                    displayReviews.map((item, index) => (
                        <ReviewCard 
                            key={index} 
                            rating={item.rating} 
                            image={item.user?.photoUrl} 
                            text={item.comment} 
                            name={item.user?.name} 
                            role={item.user?.role} 
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center gap-4 py-20">
                        <div className="w-12 h-px bg-zinc-800"></div>
                        <p className="text-zinc-500 font-light italic font-serif text-lg">The story begins with you...</p>
                        <div className="w-12 h-px bg-zinc-800"></div>
                    </div>
                )}
            </div>

            {/* Write Review Modal - Professional Dark */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                    
                    <div className="relative bg-[#121214] border border-white/10 w-full max-w-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        {/* Modal Header */}
                        <div className="bg-[#18181b] p-6 flex justify-between items-center border-b border-white/5">
                            <div className="space-y-1">
                                <h3 className="font-bold text-lg text-white">Write a Review</h3>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Feedback is a gift</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors p-2">
                                <IoClose size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmitReview} className="p-8 space-y-8" autoComplete="off">
                            
                            {/* Course Selection */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">Select Course</label>
                                <select 
                                    value={selectedCourseId}
                                    onChange={(e) => setSelectedCourseId(e.target.value)}
                                    className="w-full bg-[#18181b] border-b border-zinc-800 py-3 text-white focus:outline-none focus:border-white transition-colors rounded-none appearance-none"
                                    required
                                >
                                    <option value="" className="bg-[#121214]">-- Choose a module --</option>
                                    {courseData?.map(course => (
                                        <option key={course._id} value={course._id} className="bg-[#121214]">
                                            {course.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* STAR Rating */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">Experience Rating</label>
                                <div className="flex gap-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className={`text-xl transition-all ${rating >= star ? 'text-white scale-110' : 'text-zinc-800 hover:text-zinc-600'}`}
                                        >
                                            <FaStar />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Comment */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">Your perspective</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={4}
                                    placeholder="Tell the community how this course impacted your journey..."
                                    className="w-full bg-[#18181b] border border-zinc-800 p-4 text-white focus:outline-none focus:border-white transition-colors rounded-none placeholder-zinc-700 resize-none font-light leading-relaxed"
                                    required
                                />
                            </div>

                            {/* Actions */}
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full py-5 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:active:scale-100"
                            >
                                {isSubmitting ? 'Processing...' : 'Post Review'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReviewPage;
