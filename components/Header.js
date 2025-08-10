import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Settings, User, ChevronDown, Menu, X } from 'lucide-react';

const Header = ({ onMenuToggle, isMenuOpen, user = { name: 'John Doe', email: 'john@example.com' } }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowNotifications(false);
        setShowProfile(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'New report generated', time: '2 min ago', unread: true },
    { id: 2, title: 'Data sync completed', time: '15 min ago', unread: true },
    { id: 3, title: 'Weekly summary ready', time: '1 hour ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20"
    >
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </button>
          
          <div className="hidden lg:block">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome back, {user.name.split(' ')[0]}</p>
          </div>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex items-center max-w-md w-full mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search reports, analytics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              aria-label="Search dashboard"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search Icon for Mobile */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            aria-label="Toggle mobile search"
          >
            <Search size={20} />
          </button>

          {/* Notifications */}
          <div className="relative dropdown-container">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                >
                  {unreadCount}
                </motion.span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 backdrop-blur-xl bg-white/90 rounded-2xl border border-white/20 shadow-xl p-4"
                  role="menu"
                  aria-label="Notifications menu"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <span className="text-sm text-gray-600">{unreadCount} new</span>
                  </div>
                  <div className="space-y-2">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        whileHover={{ x: 4 }}
                        className={`p-3 rounded-lg transition-colors cursor-pointer ${
                          notification.unread ? 'bg-blue-50/50' : 'hover:bg-gray-50/50'
                        }`}
                        role="menuitem"
                        tabIndex={0}
                      >
                        <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{notification.time}</p>
                      </motion.div>
                    ))}
                  </div>
                  <button className="w-full mt-3 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Settings */}
          <button 
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>

          {/* Profile */}
          <div className="relative dropdown-container">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="User profile menu"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <ChevronDown size={16} className="hidden sm:block" />
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 backdrop-blur-xl bg-white/90 rounded-2xl border border-white/20 shadow-xl p-4"
                  role="menu"
                  aria-label="Profile menu"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <button 
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50/50 text-sm transition-colors"
                      role="menuitem"
                    >
                      Profile Settings
                    </button>
                    <button 
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50/50 text-sm transition-colors"
                      role="menuitem"
                    >
                      Preferences
                    </button>
                    <button 
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50/50 text-sm transition-colors"
                      role="menuitem"
                    >
                      Help & Support
                    </button>
                    <hr className="my-2 border-gray-200" />
                    <button 
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50/50 text-sm text-red-600 transition-colors"
                      role="menuitem"
                    >
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {showMobileSearch && isMobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-white/20"
          >
            <div className="px-4 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search reports, analytics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                  aria-label="Mobile search"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;