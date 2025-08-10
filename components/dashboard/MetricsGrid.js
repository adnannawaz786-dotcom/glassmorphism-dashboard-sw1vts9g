import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, BarChart3 } from 'lucide-react';

const MetricsGrid = ({ metrics = [] }) => {
  const defaultMetrics = [
    {
      id: 1,
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-emerald-400'
    },
    {
      id: 2,
      title: 'Active Users',
      value: '2,543',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      id: 3,
      title: 'Total Orders',
      value: '1,234',
      change: '-2.4%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'text-purple-400'
    },
    {
      id: 4,
      title: 'Conversion Rate',
      value: '3.24%',
      change: '+5.2%',
      trend: 'up',
      icon: BarChart3,
      color: 'text-orange-400'
    }
  ];

  const displayMetrics = metrics.length > 0 ? metrics : defaultMetrics;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  const MetricCard = ({ metric, index }) => {
    const Icon = metric.icon;
    
    return (
      <motion.div
        variants={cardVariants}
        whileHover={{ 
          y: -5,
          transition: { duration: 0.2 }
        }}
        className="group relative p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-white/10 ${metric.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {metric.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {metric.change}
            </div>
          </div>
          
          {/* Value */}
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-white mb-1">
              {metric.value}
            </h3>
            <p className="text-white/60 text-sm font-medium">
              {metric.title}
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.abs(parseFloat(metric.change))}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`h-full rounded-full ${
                metric.trend === 'up' 
                  ? 'bg-gradient-to-r from-emerald-400 to-emerald-300'
                  : 'bg-gradient-to-r from-red-400 to-red-300'
              }`}
            />
          </div>
        </div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-pulse" />
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayMetrics.map((metric, index) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            index={index}
          />
        ))}
      </div>
      
      {/* Mobile scroll indicator */}
      <div className="flex justify-center mt-6 sm:hidden">
        <div className="flex gap-2">
          {displayMetrics.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-white/20"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MetricsGrid;