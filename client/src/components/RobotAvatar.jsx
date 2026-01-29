import React from 'react';

const RobotAvatar = ({ isListening, isSpeaking }) => {
  return (
    <div className="relative group w-20 h-20 flex items-center justify-center">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes pulse-talk {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        
        .robot-container {
          animation: float 3s ease-in-out infinite;
        }
        .robot-eyes {
          transform-origin: center;
          animation: blink 4s infinite;
        }
        .robot-talking {
          animation: pulse-talk 0.2s infinite ease-in-out;
        }
        .ripple-effect {
          animation: ripple 2s infinite linear;
        }
      `}</style>
      
      {/* Listening Ripples */}
      {isListening && (
        <>
            <div className="absolute inset-0 bg-blue-400/30 rounded-full ripple-effect z-0"></div>
            <div className="absolute inset-0 bg-blue-400/30 rounded-full ripple-effect z-0" style={{ animationDelay: '0.6s' }}></div>
        </>
      )}

      {/* SVG Robot */}
      <div className={`
        relative z-10 w-full h-full drop-shadow-2xl
        transition-all duration-300 robot-container 
        ${isSpeaking ? 'robot-talking' : ''} 
      `}>
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {/* Antennas */}
          <path d="M50 20 L50 10" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="10" r="3" fill="#60A5FA" className={isListening ? 'animate-pulse' : ''} />

          {/* Head Main */}
          <rect x="20" y="20" width="60" height="45" rx="22" fill="#F8FAFC" />
          
          {/* Head Shadow/Detail */}
          <path d="M25 25 Q50 35 75 25" fill="none" stroke="#E2E8F0" strokeWidth="1" opacity="0.5" />

          {/* Visor Area (Face) */}
          <rect x="28" y="32" width="44" height="22" rx="10" fill="#1E293B" />

          {/* Glowing Eyes */}
          <g className="robot-eyes">
            <rect x="35" y="38" width="8" height="10" rx="3" fill="#3B82F6" className={isListening ? 'animate-pulse' : ''} />
            <rect x="57" y="38" width="8" height="10" rx="3" fill="#3B82F6" className={isListening ? 'animate-pulse' : ''} />
          </g>

          {/* Body */}
          <path d="M35 70 Q50 95 65 70 L65 70 Q50 65 35 70 Z" fill="#F8FAFC" />
          
          {/* Arms (Simple floating nubs) */}
          <ellipse cx="20" cy="55" rx="5" ry="8" fill="#F8FAFC" />
          <ellipse cx="80" cy="55" rx="5" ry="8" fill="#F8FAFC" />
        </svg>
      </div>
    </div>
  );
};

export default RobotAvatar;
