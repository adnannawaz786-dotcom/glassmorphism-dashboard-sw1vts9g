import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary',
  className = '',
  text = '' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'border-blue-500/30 border-t-blue-500',
    secondary: 'border-purple-500/30 border-t-purple-500',
    white: 'border-white/30 border-t-white',
    dark: 'border-gray-600/30 border-t-gray-600'
  };

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
    xl: 'text-lg'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`} role="status" aria-label="Loading">
      {/* Glassmorphism container */}
      <div className="relative p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
        {/* Outer spinning ring */}
        <div className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]}
          border-2 rounded-full animate-spin
        `}>
          {/* Inner pulsing dot */}
          <div className="absolute inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse opacity-60"></div>
        </div>
        
        {/* Decorative particles */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-40" style={{animationDelay: '0ms'}}></div>
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-40" style={{animationDelay: '300ms'}}></div>
        <div className="absolute top-1/2 -left-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-40" style={{animationDelay: '600ms'}}></div>
      </div>

      {/* Loading text */}
      {text && (
        <div className="text-center">
          <p className={`
            ${textSizeClasses[size]} 
            font-medium text-white/80 animate-pulse
          `}>
            {text}
          </p>
        </div>
      )}

      {/* Progress dots */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
        <div className="w-2 h-2 bg-purple-400/60 rounded-full animate-bounce" style={{animationDelay: '100ms'}}></div>
        <div className="w-2 h-2 bg-cyan-400/60 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></div>
      </div>
    </div>
  );
};

// Inline spinner variant for buttons and small spaces
export const InlineSpinner = ({ size = 'small', color = 'primary', className = '' }) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    small: 'w-4 h-4',
    medium: 'w-5 h-5'
  };

  const colorClasses = {
    primary: 'border-blue-500/30 border-t-blue-500',
    secondary: 'border-purple-500/30 border-t-purple-500',
    white: 'border-white/30 border-t-white',
    dark: 'border-gray-600/30 border-t-gray-600'
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${colorClasses[color]}
        border-2 rounded-full animate-spin
        ${className}
      `}
      role="status"
      aria-label="Loading"
    ></div>
  );
};

// Overlay spinner for full-page loading
export const OverlaySpinner = ({ text = 'Loading...', isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Loading overlay">
      <div className="relative">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl"></div>
        
        {/* Content */}
        <div className="relative p-8">
          <LoadingSpinner size="large" text={text} />
        </div>
      </div>
    </div>
  );
};

// Card loading skeleton with glassmorphism
export const LoadingSkeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`} role="status" aria-label="Loading content">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
            <div className="h-3 bg-white/20 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-3 bg-white/20 rounded"></div>
          <div className="h-3 bg-white/20 rounded w-5/6"></div>
          <div className="h-3 bg-white/20 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;