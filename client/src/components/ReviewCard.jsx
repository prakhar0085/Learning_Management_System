import React from "react";
import { FaStar } from "react-icons/fa6";

const ReviewCard = ({ text, name, image, rating, role }) => {
  const numRating = Number(rating) || 5;

  return (
    <div className="group relative bg-[#121214] p-6 rounded-none shadow-2xl border border-white/5 transition-all duration-500 hover:bg-[#18181b] hover:border-white/10 max-w-[320px] w-full h-fit flex flex-col justify-between overflow-hidden">
      
      {/* Decorative Branding Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent group-hover:via-white/20 transition-all duration-700" />

      <div className="relative z-10">
        {/* ⭐ Rating Stars - Professional Monochrome */}
        <div className="flex items-center gap-1 mb-5">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span key={i} className="text-[10px]">
                  {i < numRating ? <FaStar className="text-white" /> : <FaStar className="text-zinc-800" />}
                </span>
              ))}
        </div>

        {/* 💬 Review Text - Editorial Font */}
        <p className="text-zinc-300 text-sm italic font-serif leading-relaxed mb-8 line-clamp-4 group-hover:text-white transition-colors duration-500">
          "{text}"
        </p>
      </div>

      {/* 👤 Reviewer Info - Minimalist & Human Made */}
      <div className="relative z-10 flex items-center gap-3.5 mt-auto pt-6 border-t border-white/5">
        <div className="relative overflow-hidden shrink-0">
          <img
            src={image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt={name}
            className="w-10 h-10 rounded-none object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
          />
        </div>
        
        <div className="min-w-0">
          <h4 className="font-bold text-white text-base tracking-tight leading-none mb-1 truncate">{name}</h4>
          <p className="text-[9px] text-zinc-500 font-bold tracking-[0.2em] uppercase leading-none truncate">{role || 'Alumnus'}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
