// components/MetricCard.js
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon,
  subtitle,
  loading = false,
  className = ''
}) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-green-600';
    if (changeType === 'negative') return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return <TrendingUp className="w-4 h-4" />;
    if (changeType === 'negative') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getChangeBgColor = () => {
    if (changeType === 'positive') return 'bg-green-100/70 text-green-700';
    if (changeType === 'negative') return 'bg-red-100/70 text-red-700';
    return 'bg-gray-100/70 text-gray-700';
  };

  if (loading) {
    return (
      <motion.div 
        className={`bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6 ${className}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-200/70 rounded-lg"></div>
            <div className="h-4 bg-gray-200/70 rounded w-24"></div>
          </div>
          <div className="h-8 bg-gray-200/70 rounded w-20 mb-2"></div>
          <div className="h-4 bg-gray-200/70 rounded w-16"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            {icon && (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-blue-600">
                {typeof icon === 'string' ? <span className="text-lg">{icon}</span> : icon}
              </div>
            )}
            <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {title}
            </h3>
          </div>
          
          <div className="mb-3">
            <motion.span 
              className="text-3xl font-bold text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {value}
            </motion.span>
          </div>
          
          {subtitle && (
            <p className="text-sm text-gray-500 mb-3">{subtitle}</p>
          )}
          
          {change && (
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getChangeBgColor()}`}>
                {getChangeIcon()}
                <span>{change}</span>
              </div>
              <span className="text-xs text-gray-500">vs last period</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
