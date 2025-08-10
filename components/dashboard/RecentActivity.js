import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, TrendingDown, Users, DollarSign, FileText, AlertCircle } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'revenue',
      title: 'New sale completed',
      description: 'Order #1234 - Premium Package',
      amount: '+$2,499',
      time: '2 minutes ago',
      icon: DollarSign,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 2,
      type: 'user',
      title: 'New user registered',
      description: 'Sarah Johnson joined the platform',
      time: '15 minutes ago',
      icon: Users,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 3,
      type: 'trend',
      title: 'Traffic spike detected',
      description: 'Website visitors increased by 45%',
      time: '32 minutes ago',
      icon: TrendingUp,
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      id: 4,
      type: 'report',
      title: 'Monthly report generated',
      description: 'Analytics report for November 2024',
      time: '1 hour ago',
      icon: FileText,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 5,
      type: 'alert',
      title: 'Server response time alert',
      description: 'Response time exceeded threshold',
      time: '2 hours ago',
      icon: AlertCircle,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      id: 6,
      type: 'revenue',
      title: 'Refund processed',
      description: 'Order #1230 - Basic Package',
      amount: '-$599',
      time: '3 hours ago',
      icon: DollarSign,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-500/10'
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
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
        <Clock className="w-5 h-5 text-white/60" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar"
      >
        {activities.map((activity) => {
          const IconComponent = activity.icon;
          
          return (
            <motion.div
              key={activity.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${activity.bgColor} flex items-center justify-center`}>
                <IconComponent className={`w-5 h-5 ${activity.iconColor}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white truncate">
                      {activity.title}
                    </h4>
                    <p className="text-xs text-white/60 mt-1 line-clamp-2">
                      {activity.description}
                    </p>
                  </div>
                  
                  {activity.amount && (
                    <div className={`text-sm font-semibold ml-2 ${
                      activity.amount.startsWith('+') 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {activity.amount}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center mt-2">
                  <span className="text-xs text-white/40">
                    {activity.time}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 pt-4 border-t border-white/10"
      >
        <button className="w-full text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium">
          View All Activity
        </button>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default RecentActivity;