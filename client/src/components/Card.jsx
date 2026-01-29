import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const CourseCard = ({ thumbnail, title, category, price ,id , reviews }) => {
  const navigate = useNavigate()
   const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / reviews.length).toFixed(1); // rounded to 1 decimal
};

// Usage:
const avgRating = calculateAverageRating(reviews);

  return (
    <div className="group bg-[#18181b] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full" onClick={()=>navigate(`/viewcourse/${id}`)}>
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-900 border-b border-gray-800">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[10px] font-medium text-white uppercase tracking-wide">
             {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start gap-4">
             <h2 className="text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-gray-200 transition-colors">
                {title}
            </h2>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-800 flex items-center justify-between">
             <span className="flex items-center gap-1.5 text-yellow-500 text-xs font-bold">
               <FaStar className="w-3 h-3" /> {avgRating}
               <span className="ml-1 text-gray-500 font-normal">({reviews?.length || 0})</span>
             </span>
             <span className="text-sm font-semibold text-white">₹{price}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
