// components/ChartContainer.js
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const ChartContainer = ({ 
  title, 
  children, 
  className = '',
  height = '400px',
  loading = false,
  error = null,
  subtitle = null,
  actions = null
}) => {
  if (loading) {
    return (
      <motion.div 
        className={`bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <div 
          className="flex items-center justify-center bg-gradient-to-br from-gray-50/50 to-gray-100/50 rounded-lg backdrop-blur-sm"
          style={{ height }}
        >
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <span className="text-sm text-gray-500">Loading chart...</span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className={`bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <div 
          className="flex items-center justify-center bg-red-50/50 backdrop-blur-sm rounded-lg border border-red-200/50"
          style={{ height }}
        >
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-2">⚠</div>
            <p className="text-red-600 font-medium">Error loading chart</p>
            <p className="text-red-500 text-sm mt-1">{error}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      
      <div 
        className="relative"
        style={{ height }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default ChartContainer;
