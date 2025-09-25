import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'purple' | 'green';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = '',
  showLabel = true,
  size = 'md',
  color = 'purple'
}) => {
  const sizeClasses = {
    sm: 'h-1.5 sm:h-2',
    md: 'h-2 sm:h-3',
    lg: 'h-3 sm:h-4'
  };

  const colorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-gradient-to-r from-purple-500 to-blue-500',
    green: 'bg-green-500'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1 sm:mb-2">
          <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
            Progresso do Curso
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">
            {progress}%
          </span>
        </div>
      )}
      
      <div className={`w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        />
      </div>
    </div>
  );
};