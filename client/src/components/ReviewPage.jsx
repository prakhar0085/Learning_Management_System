import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa6';
import axios from 'axios';
import { toast } from 'react-toastify';

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
            const res = await axios.post('http://localhost:8000/api/review/givereview', {
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
        <div className='flex items-center justify-center flex-col relative min-h-screen bg-[#050505] overflow-hidden'>
            
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px]" />
            </div>

            {/* Header Section */}
            <div className="relative z-10 text-center mt-[50px] px-[20px] max-w-4xl">
                <h1 className='md:text-6xl text-4xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6'>
                    Real Stories, Real Growth
                </h1>
                <p className='text-lg text-gray-400 mb-10 leading-relaxed'>
                    Join thousands of learners who are transforming their careers with our courses. Here's what they have to say about their journey.
                </p>
                
                {/* Write Review Button */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="group relative px-8 py-4 bg-indigo-600 text-white font-bold rounded-full overflow-hidden shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 hover:shadow-indigo-500/50"
                >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shine" />
                    <span className="relative flex items-center gap-2">
                        <FaStar className="text-yellow-300" /> Write a Review
                    </span>
                </button>
            </div>

            {/* Reviews Grid */}
            <div className='w-full min-h-[50vh] flex items-stretch justify-center flex-wrap gap-[30px] lg:p-[50px] md:p-[30px] p-[20px] mb-[40px]'>
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
                    <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
                )}
            </div>

            {/* Write Review Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        {/* Modal Header */}
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-lg dark:text-white">Write a Review</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <IoClose size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmitReview} className="p-6 space-y-4">
                            
                            {/* Course Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Course</label>
                                <select 
                                    value={selectedCourseId}
                                    onChange={(e) => setSelectedCourseId(e.target.value)}
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                >
                                    <option value="">-- Choose a course --</option>
                                    {courseData?.map(course => (
                                        <option key={course._id} value={course._id}>
                                            {course.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* STAR Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className={`text-2xl transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                        >
                                            <FaStar />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Comment */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Review</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={4}
                                    placeholder="Tell us what you liked..."
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                                    required
                                />
                            </div>

                            {/* Actions */}
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Submitting...' : 'Post Review'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReviewPage;
