import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AreaChart = ({ 
  data, 
  title = "Area Chart",
  height = 300,
  gradient = true,
  animate = true,
  responsive = true 
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!data || !chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    
    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create gradient if enabled
    let backgroundGradient = null;
    let borderGradient = null;
    
    if (gradient) {
      backgroundGradient = ctx.createLinearGradient(0, 0, 0, height);
      backgroundGradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
      backgroundGradient.addColorStop(1, 'rgba(99, 102, 241, 0.05)');
      
      borderGradient = ctx.createLinearGradient(0, 0, 0, height);
      borderGradient.addColorStop(0, 'rgba(99, 102, 241, 1)');
      borderGradient.addColorStop(1, 'rgba(99, 102, 241, 0.8)');
    }

    const chartConfig = {
      type: 'line',
      data: {
        labels: data.labels || [],
        datasets: data.datasets?.map(dataset => ({
          ...dataset,
          fill: true,
          backgroundColor: gradient ? backgroundGradient : dataset.backgroundColor || 'rgba(99, 102, 241, 0.1)',
          borderColor: gradient ? borderGradient : dataset.borderColor || 'rgb(99, 102, 241)',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: dataset.borderColor || 'rgb(99, 102, 241)',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: dataset.borderColor || 'rgb(99, 102, 241)',
          pointHoverBorderWidth: 3,
        })) || []
      },
      options: {
        responsive: responsive,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20,
              color: '#64748b',
              font: {
                size: 12,
                weight: '500'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#1e293b',
            bodyColor: '#475569',
            borderColor: 'rgba(226, 232, 240, 0.8)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            padding: 12,
            titleFont: {
              size: 14,
              weight: '600'
            },
            bodyFont: {
              size: 13,
              weight: '500'
            },
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false
            },
            ticks: {
              color: '#94a3b8',
              font: {
                size: 11,
                weight: '500'
              }
            }
          },
          y: {
            display: true,
            grid: {
              color: 'rgba(148, 163, 184, 0.1)',
              drawBorder: false
            },
            ticks: {
              color: '#94a3b8',
              font: {
                size: 11,
                weight: '500'
              },
              callback: function(value) {
                return value.toLocaleString();
              }
            }
          }
        },
        elements: {
          point: {
            hoverRadius: 8
          }
        },
        animation: animate ? {
          duration: 1000,
          easing: 'easeInOutQuart'
        } : false
      }
    };

    chartInstance.current = new Chart(ctx, chartConfig);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, height, gradient, animate, responsive]);

  return (
    <div className="w-full">
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {title}
          </h3>
        </div>
      )}
      <div 
        className="relative w-full bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg"
        style={{ height: `${height}px` }}
      >
        <canvas
          ref={chartRef}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default AreaChart;