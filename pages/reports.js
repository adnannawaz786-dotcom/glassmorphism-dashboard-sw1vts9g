import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { 
  Download, 
  Search, 
  Filter, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Eye,
  FileText,
  Users,
  DollarSign
} from 'lucide-react';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock report data
  useEffect(() => {
    const mockReports = [
      {
        id: 1,
        title: 'Q4 Revenue Analysis',
        category: 'financial',
        status: 'completed',
        date: '2024-01-15',
        size: '2.4 MB',
        downloads: 156,
        trend: 'up',
        change: '+12.5%',
        description: 'Comprehensive revenue breakdown and growth analysis'
      },
      {
        id: 2,
        title: 'User Engagement Metrics',
        category: 'analytics',
        status: 'processing',
        date: '2024-01-14',
        size: '1.8 MB',
        downloads: 89,
        trend: 'up',
        change: '+8.2%',
        description: 'Monthly user engagement and retention statistics'
      },
      {
        id: 3,
        title: 'Marketing Campaign ROI',
        category: 'marketing',
        status: 'completed',
        date: '2024-01-13',
        size: '3.1 MB',
        downloads: 234,
        trend: 'down',
        change: '-3.1%',
        description: 'Return on investment analysis for recent campaigns'
      },
      {
        id: 4,
        title: 'Customer Satisfaction Survey',
        category: 'customer',
        status: 'completed',
        date: '2024-01-12',
        size: '1.2 MB',
        downloads: 67,
        trend: 'up',
        change: '+15.7%',
        description: 'Customer feedback and satisfaction metrics'
      },
      {
        id: 5,
        title: 'Sales Performance Dashboard',
        category: 'sales',
        status: 'draft',
        date: '2024-01-11',
        size: '2.9 MB',
        downloads: 45,
        trend: 'up',
        change: '+6.4%',
        description: 'Sales team performance and target achievements'
      }
    ];

    setTimeout(() => {
      setReports(mockReports);
      setFilteredReports(mockReports);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter reports based on search and category
  useEffect(() => {
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(report => report.category === selectedCategory);
    }

    setFilteredReports(filtered);
  }, [searchTerm, selectedCategory, reports]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'draft': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'financial': return <DollarSign className="w-4 h-4" />;
      case 'analytics': return <TrendingUp className="w-4 h-4" />;
      case 'marketing': return <Eye className="w-4 h-4" />;
      case 'customer': return <Users className="w-4 h-4" />;
      case 'sales': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleExport = (reportId, format) => {
    console.log(`Exporting report ${reportId} as ${format}`);
    // Export functionality would be implemented here
  };

  const categories = [
    { value: 'all', label: 'All Reports' },
    { value: 'financial', label: 'Financial' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'customer', label: 'Customer' },
    { value: 'sales', label: 'Sales' }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Reports & Analytics
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Access detailed reports, export data, and analyze performance metrics
            </p>
          </div>

          {/* Filters and Search */}
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400 min-w-[250px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.value}
                        variant={selectedCategory === category.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.value)}
                        className={`${
                          selectedCategory === category.value
                            ? 'bg-purple-600 hover:bg-purple-700 text-white'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10">
                    <Calendar className="w-4 h-4 mr-2" />
                    Date Range
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Available Reports ({filteredReports.length})
              </CardTitle>
              <CardDescription className="text-gray-400">
                Download and manage your reports
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                  <p className="text-gray-400 mt-2">Loading reports...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-white/10">
                      <tr className="text-left">
                        <th className="p-4 text-gray-300 font-medium">Report</th>
                        <th className="p-4 text-gray-300 font-medium">Category</th>
                        <th className="p-4 text-gray-300 font-medium">Status</th>
                        <th className="p-4 text-gray-300 font-medium">Performance</th>
                        <th className="p-4 text-gray-300 font-medium">Downloads</th>
                        <th className="p-4 text-gray-300 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {filteredReports.map((report, index) => (
                          <motion.tr
                            key={report.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          >
                            <td className="p-4">
                              <div>
                                <h3 className="text-white font-medium">{report.title}</h3>
                                <p className="text-gray-400 text-sm">{report.description}</p>
                                <p className="text-gray-500 text-xs mt-1">{report.date} • {report.size}</p>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2 text-gray-300">
                                {getCategoryIcon(report.category)}
                                <span className="capitalize">{report.category}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge className={`${getStatusColor(report.status)} capitalize`}>
                                {report.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                {report.trend === 'up' ? (
                                  <TrendingUp className="w-4 h-4 text-green-400" />
                                ) : (
                                  <TrendingDown className="w-4 h-4 text-red-400" />
                                )}
                                <span className={`text-sm ${
                                  report.trend === 'up' ? 'text-green-400' : 'text-red-400'
                                }`}>
                                  {report.change}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 text-gray-300">{report.downloads}</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleExport(report.id, 'pdf')}
                                  className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                                  disabled={report.status !== 'completed'}
                                >
                                  <Download className="w-4 h-4 mr-1" />
                                  PDF
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleExport(report.id, 'excel')}
                                  className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                                  disabled={report.status !== 'completed'}
                                >
                                  <Download className="w-4 h-4 mr-1" />
                                  Excel
                                </Button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                  {filteredReports.length === 0 && !isLoading && (
                    <div className="p-8 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">No reports found matching your criteria</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Reports;