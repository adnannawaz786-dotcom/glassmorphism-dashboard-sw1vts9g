import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [breakpoint, setBreakpoint] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      
      // Set initial size
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const { width } = screenSize;
    
    if (width < 640) {
      setBreakpoint('mobile');
    } else if (width >= 640 && width < 768) {
      setBreakpoint('sm');
    } else if (width >= 768 && width < 1024) {
      setBreakpoint('tablet');
    } else if (width >= 1024 && width < 1280) {
      setBreakpoint('lg');
    } else if (width >= 1280 && width < 1536) {
      setBreakpoint('xl');
    } else {
      setBreakpoint('desktop');
    }
  }, [screenSize]);

  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet' || breakpoint === 'sm';
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'xl' || breakpoint === 'lg';
  const isSmallScreen = isMobile || isTablet;

  const getColumnsForBreakpoint = (mobileColumns = 1, tabletColumns = 2, desktopColumns = 3) => {
    if (isMobile) return mobileColumns;
    if (isTablet) return tabletColumns;
    return desktopColumns;
  };

  const getGridCols = (mobile = 'grid-cols-1', tablet = 'grid-cols-2', desktop = 'grid-cols-3') => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  const getSpacing = (mobile = 'p-4', tablet = 'p-6', desktop = 'p-8') => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  const getTextSize = (mobile = 'text-sm', tablet = 'text-base', desktop = 'text-lg') => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  const getChartHeight = () => {
    if (isMobile) return 250;
    if (isTablet) return 300;
    return 400;
  };

  const getSidebarWidth = () => {
    if (isMobile) return '100%';
    if (isTablet) return '280px';
    return '320px';
  };

  const getCardSpacing = () => {
    if (isMobile) return 'gap-4';
    if (isTablet) return 'gap-6';
    return 'gap-8';
  };

  return {
    screenSize,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    getColumnsForBreakpoint,
    getGridCols,
    getSpacing,
    getTextSize,
    getChartHeight,
    getSidebarWidth,
    getCardSpacing,
  };
};

export default useResponsive;