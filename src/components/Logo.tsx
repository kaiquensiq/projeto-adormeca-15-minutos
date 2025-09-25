import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background square */}
        <rect x="2" y="2" width="96" height="96" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        
        {/* Moon */}
        <path
          d="M35 25 C25 25, 20 35, 25 45 C30 55, 40 50, 45 40 C50 30, 45 25, 35 25 Z"
          fill="#f8fafc"
        />
        
        {/* Stars */}
        <g fill="#60a5fa">
          <circle cx="25" cy="20" r="1.5" />
          <circle cx="65" cy="15" r="1" />
          <circle cx="70" cy="25" r="1.5" />
          <circle cx="20" cy="35" r="1" />
          <circle cx="75" cy="40" r="1" />
        </g>
        
        {/* Clock face */}
        <circle cx="65" cy="35" r="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        
        {/* Clock hands */}
        <g stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round">
          <line x1="65" y1="35" x2="65" y2="28" /> {/* Hour hand */}
          <line x1="65" y1="35" x2="70" y2="35" /> {/* Minute hand */}
        </g>
        
        {/* Clock center dot */}
        <circle cx="65" cy="35" r="1" fill="#f8fafc" />
        
        {/* Bed */}
        <g fill="#1e40af">
          <rect x="25" y="65" width="50" height="8" rx="2" /> {/* Mattress */}
          <rect x="20" y="70" width="60" height="4" rx="1" /> {/* Bed frame */}
          <rect x="22" y="60" width="6" height="10" rx="1" /> {/* Headboard left */}
          <rect x="72" y="60" width="6" height="10" rx="1" /> {/* Headboard right */}
        </g>
        
        {/* Pillow */}
        <ellipse cx="40" cy="62" rx="8" ry="3" fill="#3b82f6" />
        
        {/* Sparkles around elements */}
        <g fill="#60a5fa">
          <polygon points="15,50 16,52 18,52 16.5,53.5 17,56 15,54.5 13,56 13.5,53.5 12,52 14,52" />
          <polygon points="80,60 81,62 83,62 81.5,63.5 82,66 80,64.5 78,66 78.5,63.5 77,62 79,62" />
          <polygon points="55,20 56,22 58,22 56.5,23.5 57,26 55,24.5 53,26 53.5,23.5 52,22 54,22" />
        </g>
      </svg>
    </div>
  );
};