import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import MetricCard from '../components/MetricCard';
import ChartContainer from '../components/ChartContainer';
import { formatCurrency, formatPercentage } from '../lib/utils';
import { dashboardMetrics, chartData } from '../data/mockData';

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [charts, setCharts] = useState({});
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMetrics(dashboardMetrics);
      setCharts(chartData);
      setIsLoading(false);
    };

    loadDashboardData();
  }, [selectedTimeframe]);

  const timeframeOptions = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
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

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  Analytics Dashboard
                </h1>
                <p className="text-white/70 text-lg">
                  Monitor your business performance in real-time
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm">Timeframe:</span>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="glass-morphism px-4 py-2 rounded-lg text-white bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  {timeframeOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-gray-800">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-96"
              >
                <div className="glass-morphism p-8 rounded-2xl">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-white text-center">Loading dashboard...</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {/* Metrics Grid */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-white mb-4">Key Metrics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                      <MetricCard
                        key={metric.id}
                        title={metric.title}
                        value={metric.value}
                        change={metric.change}
                        trend={metric.trend}
                        icon={metric.icon}
                        delay={index * 0.1}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Charts Grid */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-white mb-4">Analytics Overview</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Revenue Chart */}
                    <ChartContainer
                      title="Revenue Trend"
                      subtitle="Monthly revenue over time"
                      type="line"
                      data={charts.revenue}
                      height={300}
                    />

                    {/* Users Chart */}
                    <ChartContainer
                      title="User Growth"
                      subtitle="Active users by category"
                      type="doughnut"
                      data={charts.users}
                      height={300}
                    />

                    {/* Sales Chart */}
                    <ChartContainer
                      title="Sales Performance"
                      subtitle="Sales by product category"
                      type="bar"
                      data={charts.sales}
                      height={300}
                    />

                    {/* Traffic Chart */}
                    <ChartContainer
                      title="Website Traffic"
                      subtitle="Daily visitors and page views"
                      type="area"
                      data={charts.traffic}
                      height={300}
                    />
                  </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div variants={itemVariants}>
                  <div className="glass-morphism p-6 rounded-2xl">
                    <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
                    <div className="space-y-3">
                      {[
                        { action: 'New user registration', time: '2 minutes ago', type: 'user' },
                        { action: 'Payment received', time: '5 minutes ago', type: 'payment' },
                        { action: 'Report generated', time: '10 minutes ago', type: 'report' },
                        { action: 'System backup completed', time: '1 hour ago', type: 'system' }
                      ].map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <span className="text-white">{activity.action}</span>
                          <span className="text-white/60 text-sm">{activity.time}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}