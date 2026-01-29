import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar, FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ text, name, image, rating, role }) => {
  const numRating = Number(rating) || 5;

  return (
    <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 max-w-sm w-full h-full flex flex-col justify-between overflow-hidden">
      
      {/* Decorative Quote */}
      <div className="absolute top-4 right-6 text-9xl text-indigo-50 dark:text-gray-700/30 font-serif opacity-50 pointer-events-none group-hover:scale-110 transition-transform duration-500">
        ”
      </div>

      <div className="relative z-10">
        {/* ⭐ Rating Stars */}
        <div className="flex items-center gap-1 mb-6">
          <div className="flex p-2 bg-indigo-50 dark:bg-gray-700/50 rounded-full">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span key={i} className="text-sm">
                  {i < numRating ? <FaStar className="text-yellow-400" /> : <FaRegStar className="text-gray-300 dark:text-gray-500" />}
                </span>
              ))}
          </div>
        </div>

        {/* 💬 Review Text */}
        <p className="text-gray-600 dark:text-gray-300 text-base italic leading-relaxed mb-8 line-clamp-4">
          "{text}"
        </p>
      </div>

      {/* 👤 Reviewer Info */}
      <div className="relative z-10 flex items-center gap-4 mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
        <div className="relative">
          <img
            src={image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt={name}
            className="w-14 h-14 rounded-full object-cover ring-4 ring-gray-50 dark:ring-gray-700 group-hover:ring-indigo-100 dark:group-hover:ring-indigo-900 transition-all"
          />
          <div className="absolute -bottom-1 -right-1 bg-indigo-500 text-white rounded-full p-1 border-2 border-white dark:border-gray-800">
             <FaQuoteLeft className="text-[8px]" />
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white text-lg">{name}</h4>
          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium tracking-wide uppercase text-[10px]">{role || 'Student'}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
