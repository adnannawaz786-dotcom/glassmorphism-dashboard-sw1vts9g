// Chart.js configuration and theme settings for glassmorphism dashboard
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Glassmorphism color palette
export const colors = {
  primary: {
    main: 'rgba(99, 102, 241, 0.8)',
    light: 'rgba(99, 102, 241, 0.4)',
    gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)'
  },
  secondary: {
    main: 'rgba(168, 85, 247, 0.8)',
    light: 'rgba(168, 85, 247, 0.4)',
    gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.8) 100%)'
  },
  success: {
    main: 'rgba(34, 197, 94, 0.8)',
    light: 'rgba(34, 197, 94, 0.4)',
    gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%)'
  },
  warning: {
    main: 'rgba(251, 146, 60, 0.8)',
    light: 'rgba(251, 146, 60, 0.4)',
    gradient: 'linear-gradient(135deg, rgba(251, 146, 60, 0.8) 0%, rgba(239, 68, 68, 0.8) 100%)'
  },
  info: {
    main: 'rgba(59, 130, 246, 0.8)',
    light: 'rgba(59, 130, 246, 0.4)',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(14, 165, 233, 0.8) 100%)'
  },
  text: {
    primary: 'rgba(255, 255, 255, 0.9)',
    secondary: 'rgba(255, 255, 255, 0.7)',
    muted: 'rgba(255, 255, 255, 0.5)'
  },
  background: {
    glass: 'rgba(255, 255, 255, 0.1)',
    glassDark: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.3)'
  }
};

// Default chart options with glassmorphism styling
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: colors.text.primary,
        font: {
          family: 'Inter, system-ui, sans-serif',
          size: 12,
          weight: '500'
        },
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: colors.background.glass,
      backdropFilter: 'blur(10px)',
      titleColor: colors.text.primary,
      bodyColor: colors.text.secondary,
      borderColor: colors.background.glassDark,
      borderWidth: 1,
      cornerRadius: 12,
      padding: 12,
      displayColors: true,
      titleFont: {
        family: 'Inter, system-ui, sans-serif',
        size: 13,
        weight: '600'
      },
      bodyFont: {
        family: 'Inter, system-ui, sans-serif',
        size: 12,
        weight: '400'
      }
    }
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: true,
        color: colors.background.glassDark,
        lineWidth: 1
      },
      ticks: {
        color: colors.text.secondary,
        font: {
          family: 'Inter, system-ui, sans-serif',
          size: 11,
          weight: '400'
        }
      },
      border: {
        color: colors.background.glassDark
      }
    },
    y: {
      display: true,
      grid: {
        display: true,
        color: colors.background.glassDark,
        lineWidth: 1
      },
      ticks: {
        color: colors.text.secondary,
        font: {
          family: 'Inter, system-ui, sans-serif',
          size: 11,
          weight: '400'
        }
      },
      border: {
        color: colors.background.glassDark
      }
    }
  },
  elements: {
    point: {
      radius: 4,
      hoverRadius: 6,
      borderWidth: 2,
      hoverBorderWidth: 3
    },
    line: {
      borderWidth: 3,
      tension: 0.4
    },
    bar: {
      borderRadius: 6,
      borderSkipped: false
    }
  },
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart'
  }
};

// Line chart specific configuration
export const lineChartOptions = {
  ...defaultChartOptions,
  plugins: {
    ...defaultChartOptions.plugins,
    filler: {
      propagate: false
    }
  },
  elements: {
    ...defaultChartOptions.elements,
    point: {
      ...defaultChartOptions.elements.point,
      backgroundColor: colors.primary.main,
      borderColor: colors.text.primary
    }
  }
};

// Bar chart specific configuration
export const barChartOptions = {
  ...defaultChartOptions,
  plugins: {
    ...defaultChartOptions.plugins
  },
  elements: {
    ...defaultChartOptions.elements,
    bar: {
      ...defaultChartOptions.elements.bar,
      borderWidth: 0
    }
  }
};

// Doughnut chart specific configuration
export const doughnutChartOptions = {
  ...defaultChartOptions,
  cutout: '70%',
  plugins: {
    ...defaultChartOptions.plugins,
    legend: {
      ...defaultChartOptions.plugins.legend,
      position: 'bottom'
    }
  },
  elements: {
    arc: {
      borderWidth: 2,
      borderColor: colors.background.glass,
      hoverBorderWidth: 3
    }
  }
};

// Utility function to create gradient backgrounds
export const createGradient = (ctx, chartArea, colorStart, colorEnd) => {
  if (!chartArea) return null;
  
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);
  return gradient;
};

// Utility function to generate chart color palette
export const generateColorPalette = (count = 5) => {
  const baseColors = [
    colors.primary.main,
    colors.secondary.main,
    colors.success.main,
    colors.warning.main,
    colors.info.main
  ];
  
  const palette = [];
  for (let i = 0; i < count; i++) {
    palette.push(baseColors[i % baseColors.length]);
  }
  
  return palette;
};

// Animation configurations
export const animations = {
  fadeIn: {
    duration: 800,
    easing: 'easeOutQuart'
  },
  slideUp: {
    duration: 1000,
    easing: 'easeOutCubic'
  },
  bounce: {
    duration: 1200,
    easing: 'easeOutBounce'
  }
};