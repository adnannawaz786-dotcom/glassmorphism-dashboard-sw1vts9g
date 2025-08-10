import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ 
  data, 
  title = 'Line Chart',
  height = 400,
  gradient = true,
  smooth = true,
  showGrid = true,
  animate = true
}) => {
  const chartRef = useRef(null);

  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
    gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.3)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.6)');
    return gradient;
  };

  const chartData = {
    labels: data?.labels || [],
    datasets: data?.datasets?.map((dataset, index) => ({
      ...dataset,
      borderColor: dataset.borderColor || `rgba(99, 102, 241, 1)`,
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return null;
        return gradient ? createGradient(ctx, chartArea) : dataset.backgroundColor;
      },
      borderWidth: 3,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBackgroundColor: '#ffffff',
      pointBorderWidth: 3,
      pointHoverBorderWidth: 4,
      fill: gradient,
      tension: smooth ? 0.4 : 0,
    })) || []
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: '#64748b',
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1e293b',
        bodyColor: '#475569',
        borderColor: 'rgba(99, 102, 241, 0.2)',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          title: (context) => {
            return `${context[0].label}`;
          },
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: showGrid,
          color: 'rgba(148, 163, 184, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 11,
            family: 'Inter, sans-serif'
          },
          maxTicksLimit: 8
        },
        border: {
          display: false
        }
      },
      y: {
        display: true,
        grid: {
          display: showGrid,
          color: 'rgba(148, 163, 184, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 11,
            family: 'Inter, sans-serif'
          },
          callback: function(value) {
            return value.toLocaleString();
          }
        },
        border: {
          display: false
        }
      }
    },
    animation: animate ? {
      duration: 2000,
      easing: 'easeInOutQuart',
      delay: (context) => {
        return context.type === 'data' && context.mode === 'default' 
          ? context.dataIndex * 50 
          : 0;
      }
    } : false,
    elements: {
      point: {
        hoverBorderColor: '#6366f1',
        hoverBackgroundColor: '#ffffff'
      }
    }
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (chart && animate) {
      chart.update('none');
      setTimeout(() => {
        chart.update();
      }, 100);
    }
  }, [data, animate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
        {title && (
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-semibold text-slate-700 mb-4"
          >
            {title}
          </motion.h3>
        )}
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{ height: `${height}px` }}
          className="relative"
        >
          <Line
            ref={chartRef}
            data={chartData}
            options={options}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LineChart;