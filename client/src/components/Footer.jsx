import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg"; // replace with actual path

const Footer = () => {
  let navigate = useNavigate();
  return (
    <footer className="bg-slate-950 text-gray-400 py-12 px-6 border-t border-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10">

        {/* Logo + Description */}
        <div className="lg:w-1/3">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Logo" className="h-10 rounded-lg shadow-lg border border-white/10" />
            <h2 className="text-2xl font-bold text-white tracking-wide">Skills<span className="text-purple-500">Sprint</span></h2>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            AI-powered learning platform to help you grow smarter. Learn anything, anytime, anywhere with our expert-curated courses.
          </p>
        </div>

        {/* Quick Links */}
        <div className="">
          <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-purple-400 hover:translate-x-1 transition-all cursor-pointer" onClick={() => navigate("/")}>Home</li>
            <li className="hover:text-purple-400 hover:translate-x-1 transition-all cursor-pointer" onClick={() => navigate("/allcourses")}>Courses</li>
            <li className="hover:text-purple-400 hover:translate-x-1 transition-all cursor-pointer" onClick={() => navigate("/login")}>Login</li>
            <li className="hover:text-purple-400 hover:translate-x-1 transition-all cursor-pointer" onClick={() => navigate("/profile")}>My Profile</li>
          </ul>
        </div>

        {/* Explore Categories */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">Explore Categories</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-purple-400 hover:translate-x-1 transition-all cursor-pointer">Web Development</li>
            <li className="hover:text-purple-400 hover:translate-x-1 transition-all cursor-pointer">AI/ML</li>
            <li className="hover:text-purple-400 hover:translate-x-1 transition-all cursor-pointer">Data Science</li>
            <li className="hover:text-purple-400 hover:translate-x-1 transition-all cursor-pointer">UI/UX Design</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 mt-12 pt-8 text-sm text-center text-gray-600 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <span>© {new Date().getFullYear()} SkillsSprint. All rights reserved.</span>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
