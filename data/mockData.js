// Mock data for dashboard analytics and charts
export const analyticsOverview = {
  totalRevenue: 45780,
  totalUsers: 2340,
  totalOrders: 1890,
  conversionRate: 3.24,
  revenueGrowth: 12.5,
  userGrowth: 8.3,
  orderGrowth: -2.1,
  conversionGrowth: 5.7
};

// Revenue chart data (last 12 months)
export const revenueData = {
  labels: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  datasets: [
    {
      label: 'Revenue',
      data: [3200, 3800, 3600, 4200, 3900, 4500, 4800, 4300, 4900, 5200, 4800, 5400],
      borderColor: 'rgba(99, 102, 241, 0.8)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: 'rgba(99, 102, 241, 1)',
      pointBorderColor: 'rgba(255, 255, 255, 1)',
      pointBorderWidth: 2
    }
  ]
};

// User analytics data
export const userAnalytics = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'New Users',
      data: [180, 220, 190, 250, 210, 280],
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderColor: 'rgba(16, 185, 129, 1)',
      borderWidth: 1
    },
    {
      label: 'Returning Users',
      data: [320, 380, 340, 420, 390, 450],
      backgroundColor: 'rgba(245, 101, 101, 0.8)',
      borderColor: 'rgba(245, 101, 101, 1)',
      borderWidth: 1
    }
  ]
};

// Sales by category (doughnut chart)
export const salesByCategory = {
  labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'],
  datasets: [
    {
      data: [35, 25, 15, 15, 10],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 101, 101, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(139, 92, 246, 0.8)'
      ],
      borderColor: [
        'rgba(99, 102, 241, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(245, 101, 101, 1)',
        'rgba(251, 191, 36, 1)',
        'rgba(139, 92, 246, 1)'
      ],
      borderWidth: 2
    }
  ]
};

// Traffic sources
export const trafficSources = [
  { source: 'Organic Search', visitors: 12840, percentage: 42.3, color: 'bg-blue-500' },
  { source: 'Direct', visitors: 8920, percentage: 29.4, color: 'bg-green-500' },
  { source: 'Social Media', visitors: 4560, percentage: 15.0, color: 'bg-purple-500' },
  { source: 'Email', visitors: 2890, percentage: 9.5, color: 'bg-yellow-500' },
  { source: 'Referral', visitors: 1150, percentage: 3.8, color: 'bg-red-500' }
];

// Recent transactions
export const recentTransactions = [
  {
    id: 'TXN001',
    customer: 'John Doe',
    amount: 249.99,
    status: 'completed',
    date: '2024-01-15',
    product: 'Wireless Headphones'
  },
  {
    id: 'TXN002',
    customer: 'Sarah Johnson',
    amount: 89.50,
    status: 'pending',
    date: '2024-01-15',
    product: 'Running Shoes'
  },
  {
    id: 'TXN003',
    customer: 'Mike Chen',
    amount: 156.75,
    status: 'completed',
    date: '2024-01-14',
    product: 'Smart Watch'
  },
  {
    id: 'TXN004',
    customer: 'Emily Davis',
    amount: 34.99,
    status: 'failed',
    date: '2024-01-14',
    product: 'Book Collection'
  },
  {
    id: 'TXN005',
    customer: 'Alex Rodriguez',
    amount: 299.00,
    status: 'completed',
    date: '2024-01-13',
    product: 'Gaming Mouse'
  }
];

// Top performing products
export const topProducts = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    sales: 1240,
    revenue: 309800,
    growth: 15.3,
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Premium Running Shoes',
    sales: 980,
    revenue: 147000,
    growth: 8.7,
    category: 'Sports'
  },
  {
    id: 3,
    name: 'Smart Fitness Tracker',
    sales: 756,
    revenue: 113400,
    growth: -2.1,
    category: 'Electronics'
  },
  {
    id: 4,
    name: 'Organic Cotton T-Shirt',
    sales: 2100,
    revenue: 63000,
    growth: 22.4,
    category: 'Clothing'
  },
  {
    id: 5,
    name: 'Bestseller Novel Set',
    sales: 445,
    revenue: 13350,
    growth: 5.8,
    category: 'Books'
  }
];

// Geographic data for sales by region
export const salesByRegion = [
  { region: 'North America', sales: 18500, percentage: 45.2, growth: 12.3 },
  { region: 'Europe', sales: 12800, percentage: 31.3, growth: 8.7 },
  { region: 'Asia Pacific', sales: 7200, percentage: 17.6, growth: 25.1 },
  { region: 'Latin America', sales: 1800, percentage: 4.4, growth: 15.8 },
  { region: 'Others', sales: 600, percentage: 1.5, growth: -3.2 }
];

// Performance metrics over time
export const performanceMetrics = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Conversion Rate (%)',
      data: [3.2, 3.8, 3.1, 4.2],
      borderColor: 'rgba(99, 102, 241, 0.8)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      yAxisID: 'y'
    },
    {
      label: 'Average Order Value ($)',
      data: [85, 92, 78, 96],
      borderColor: 'rgba(16, 185, 129, 0.8)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      yAxisID: 'y1'
    }
  ]
};

// Customer satisfaction data
export const customerSatisfaction = {
  labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
  datasets: [
    {
      data: [45, 35, 12, 6, 2],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(245, 101, 101, 0.8)'
      ],
      borderWidth: 0
    }
  ]
};

// Helper function to format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Helper function to format percentage
export const formatPercentage = (value) => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
};

// Helper function to get status color
export const getStatusColor = (status) => {
  const colors = {
    completed: 'text-green-600 bg-green-100',
    pending: 'text-yellow-600 bg-yellow-100',
    failed: 'text-red-600 bg-red-100'
  };
  return colors[status] || 'text-gray-600 bg-gray-100';
};