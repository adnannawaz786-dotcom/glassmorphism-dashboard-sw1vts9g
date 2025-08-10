import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = ({ 
  data = [], 
  title = "Distribution", 
  className = "",
  height = 300,
  showLegend = true,
  colors = [
    'rgba(147, 197, 253, 0.8)',
    'rgba(196, 181, 253, 0.8)',
    'rgba(252, 165, 165, 0.8)',
    'rgba(134, 239, 172, 0.8)',
    'rgba(251, 191, 36, 0.8)',
    'rgba(248, 113, 113, 0.8)'
  ]
}) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: colors.slice(0, data.length),
        borderColor: colors.slice(0, data.length).map(color => 
          color.replace('0.8', '1')
        ),
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBackgroundColor: colors.slice(0, data.length).map(color => 
          color.replace('0.8', '0.9')
        ),
        cutout: '60%'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: !!title,
        text: title,
        color: 'rgba(255, 255, 255, 0.9)',
        font: {
          size: 16,
          weight: '600'
        },
        padding: {
          bottom: 20
        }
      },
      legend: {
        display: showLegend,
        position: 'bottom',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'nearest'
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeOutQuart'
    },
    elements: {
      arc: {
        borderJoinStyle: 'round'
      }
    }
  };

  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: function(chart) {
      if (data.length === 0) return;
      
      const { width } = chart;
      const { height } = chart;
      const ctx = chart.ctx;
      
      ctx.restore();
      
      const total = data.reduce((sum, item) => sum + item.value, 0);
      const fontSize = Math.min(width / 12, height / 12);
      
      ctx.font = `bold ${fontSize}px Inter, sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      
      const text = total.toString();
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2 - 5;
      
      ctx.fillText(text, textX, textY);
      
      ctx.font = `${fontSize * 0.6}px Inter, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      
      const labelText = 'Total';
      const labelX = Math.round((width - ctx.measureText(labelText).width) / 2);
      const labelY = height / 2 + fontSize * 0.7;
      
      ctx.fillText(labelText, labelX, labelY);
      ctx.save();
    }
  };

  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 ${className}`}
        style={{ height }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-white/70 text-sm">No data available</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 ${className}`}
    >
      <div style={{ height, position: 'relative' }}>
        <Doughnut 
          data={chartData} 
          options={options} 
          plugins={[centerTextPlugin]}
        />
      </div>
    </motion.div>
  );
};

export default DoughnutChart;