import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  size = 'md',
  variant = 'primary',
  showLabel = true,
  label = '',
  className = '',
  animated = true,
  striped = false
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600',
    success: 'bg-gradient-to-r from-green-500 to-green-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    danger: 'bg-gradient-to-r from-red-500 to-red-600',
    info: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600'
  };

  const backgroundClasses = {
    primary: 'bg-blue-100/20',
    success: 'bg-green-100/20',
    warning: 'bg-yellow-100/20',
    danger: 'bg-red-100/20',
    info: 'bg-cyan-100/20',
    purple: 'bg-purple-100/20'
  };

  const textClasses = {
    primary: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
    info: 'text-cyan-600',
    purple: 'text-purple-600'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (label || percentage > 0) && (
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-medium ${textClasses[variant]}`}>
            {label}
          </span>
          <span className={`text-sm font-semibold ${textClasses[variant]}`}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div 
        className={`
          relative w-full rounded-full overflow-hidden
          ${sizeClasses[size]} 
          ${backgroundClasses[variant]}
          backdrop-blur-sm border border-white/10
          shadow-inner
        `}
      >
        <motion.div
          className={`
            h-full rounded-full relative overflow-hidden
            ${variantClasses[variant]}
            ${striped ? 'bg-striped' : ''}
          `}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${percentage}%` : `${percentage}%` }}
          transition={{
            duration: animated ? 1.2 : 0,
            ease: "easeOut",
            delay: 0.2
          }}
        >
          {striped && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-repeat-x animate-pulse" />
          )}
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: animated ? '100%' : '0%' }}
            transition={{
              duration: 2,
              repeat: animated ? Infinity : 0,
              repeatType: 'loop',
              ease: 'linear',
              delay: 1
            }}
          />
        </motion.div>
        
        {size === 'xl' && percentage > 15 && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {Math.round(percentage)}%
          </motion.span>
        )}
      </div>
    </div>
  );
};

const CircularProgress = ({ 
  value = 0, 
  max = 100, 
  size = 80,
  strokeWidth = 8,
  variant = 'primary',
  showLabel = true,
  className = ''
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    primary: 'stroke-blue-500',
    success: 'stroke-green-500',
    warning: 'stroke-yellow-500',
    danger: 'stroke-red-500',
    info: 'stroke-cyan-500',
    purple: 'stroke-purple-500'
  };

  const textClasses = {
    primary: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
    info: 'text-cyan-600',
    purple: 'text-purple-600'
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200/30"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className={colorClasses[variant]}
          style={{
            strokeDasharray: circumference,
          }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            delay: 0.2
          }}
        />
      </svg>
      
      {showLabel && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className={`text-sm font-bold ${textClasses[variant]}`}>
            {Math.round(percentage)}%
          </span>
        </motion.div>
      )}
    </div>
  );
};

ProgressBar.Circular = CircularProgress;

export default ProgressBar;