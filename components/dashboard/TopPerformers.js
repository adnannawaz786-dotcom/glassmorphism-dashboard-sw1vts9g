import React from 'react';
import { motion } from 'framer-motion';

const TopPerformers = () => {
  const performersData = [
    {
      id: 1,
      name: 'Sarah Johnson',
      department: 'Sales',
      score: 95,
      avatar: 'SJ',
      trend: '+12%',
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      id: 2,
      name: 'Michael Chen',
      department: 'Marketing',
      score: 92,
      avatar: 'MC',
      trend: '+8%',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      department: 'Development',
      score: 88,
      avatar: 'ER',
      trend: '+15%',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 4,
      name: 'David Kim',
      department: 'Design',
      score: 86,
      avatar: 'DK',
      trend: '+5%',
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      department: 'Operations',
      score: 84,
      avatar: 'LW',
      trend: '+10%',
      color: 'from-pink-400 to-pink-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (score) => ({
      width: `${score}%`,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.3
      }
    })
  };

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            Top Performers
          </h3>
          <p className="text-sm text-gray-600">
            This month's leading contributors
          </p>
        </div>
        <div className="glass-button p-2 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {performersData.map((performer, index) => (
          <motion.div
            key={performer.id}
            variants={itemVariants}
            className="group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${performer.color} flex items-center justify-center text-white text-sm font-medium shadow-lg`}>
                    {performer.avatar}
                  </div>
                  {index < 3 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                    {performer.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {performer.department}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  {performer.trend}
                </span>
                <span className="text-sm font-semibold text-gray-700">
                  {performer.score}%
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${performer.color} rounded-full relative`}
                  variants={progressVariants}
                  custom={performer.score}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                </motion.div>
              </div>
              
              <motion.div
                className="absolute right-0 top-0 transform -translate-y-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
              >
                <div className="w-1 h-4 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-sm"></div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 pt-4 border-t border-gray-100"
      >
        <button className="w-full glass-button text-sm text-gray-600 hover:text-gray-800 py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-md">
          View All Performers
          <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
};

export default TopPerformers;