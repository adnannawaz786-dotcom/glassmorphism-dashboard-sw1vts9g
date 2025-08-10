import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ 
  data, 
  title = 'Bar Chart',
  height = 300,
  showLegend = true,
  animate = true,
  className = ''
}) => {
  const chartRef = useRef(null);

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
            weight: '500'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: !!title,
        text: title,
        color: 'rgba(255, 255, 255, 0.9)',
        font: {
          size: 16,
          weight: '600'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: true,
        intersect: false,
        mode: 'index'
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 11
          }
        },
        beginAtZero: true
      }
    },
    animation: animate ? {
      duration: 1000,
      easing: 'easeInOutQuart'
    } : false,
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  const processedData = {
    ...data,
    datasets: data.datasets?.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || [
        'rgba(99, 102, 241, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(14, 165, 233, 0.8)'
      ],
      borderColor: dataset.borderColor || [
        'rgba(99, 102, 241, 1)',
        'rgba(168, 85, 247, 1)',
        'rgba(236, 72, 153, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(251, 146, 60, 1)',
        'rgba(14, 165, 233, 1)'
      ],
      borderWidth: dataset.borderWidth || 2,
      borderRadius: dataset.borderRadius || 6,
      borderSkipped: false,
      hoverBackgroundColor: dataset.hoverBackgroundColor || dataset.backgroundColor?.map(color => 
        color.replace('0.8', '1')
      ),
      hoverBorderColor: dataset.hoverBorderColor || dataset.borderColor,
      hoverBorderWidth: 3
    }))
  };

  useEffect(() => {
    if (animate && chartRef.current) {
      const chart = chartRef.current;
      chart.update('active');
    }
  }, [data, animate]);

  const chartVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      className={`relative w-full ${className}`}
      variants={chartVariants}
      initial="hidden"
      animate="visible"
      style={{ height: `${height}px` }}
    >
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
        <div className="p-4 h-full">
          <Bar
            ref={chartRef}
            data={processedData}
            options={defaultOptions}
          />
        </div>
      </div>
      
      {/* Glassmorphism overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl pointer-events-none" />
    </motion.div>
  );
};

export default BarChart;