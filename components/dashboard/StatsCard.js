import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon: Icon,
  prefix = '',
  suffix = '',
  className = ''
}) => {
  const isPositive = changeType === 'positive';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return (val / 1000000).toFixed(1) + 'M';
      } else if (val >= 1000) {
        return (val / 1000).toFixed(1) + 'K';
      }
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl p-6
        bg-white/10 backdrop-blur-lg border border-white/20
        shadow-lg hover:shadow-xl transition-all duration-300
        hover:bg-white/15 hover:border-white/30
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {Icon && (
              <motion.div 
                className="p-2 rounded-lg bg-white/10 backdrop-blur-sm"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-5 h-5 text-white/80" />
              </motion.div>
            )}
            <h3 className="text-sm font-medium text-white/70 uppercase tracking-wide">
              {title}
            </h3>
          </div>
          
          {change && (
            <motion.div 
              className={`
                flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
                ${isPositive 
                  ? 'bg-green-500/20 text-green-300' 
                  : 'bg-red-500/20 text-red-300'
                }
              `}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <TrendIcon className="w-3 h-3" />
              <span>{Math.abs(change)}%</span>
            </motion.div>
          )}
        </div>

        {/* Value */}
        <motion.div 
          className="mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="text-3xl font-bold text-white">
            {prefix}{formatValue(value)}{suffix}
          </div>
        </motion.div>

        {/* Change description */}
        {change && (
          <motion.p 
            className="text-xs text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {isPositive ? 'Increase' : 'Decrease'} from last period
          </motion.p>
        )}
      </div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-white/30 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ translateX: ['0%', '200%'] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 5,
          ease: 'linear'
        }}
      />
    </motion.div>
  );
};

export default StatsCard;