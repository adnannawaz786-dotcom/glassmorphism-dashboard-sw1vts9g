import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/globals.css';

export default function App({ Component, pageProps, router }) {
  useEffect(() => {
    // Add any global initialization logic here
    const handleRouteChangeStart = () => {
      // Add loading state if needed
    };

    const handleRouteChangeComplete = () => {
      // Remove loading state if needed
    };

    const handleRouteChangeError = () => {
      // Handle route errors
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl transform translate-x-1/2" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl transform translate-y-1/2" />
      </div>

      {/* Page transitions with Framer Motion */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.asPath}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1]
          }}
          className="relative z-10"
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>

      {/* Global loading overlay (can be controlled by global state) */}
      <AnimatePresence>
        {/* Add loading state condition here if needed */}
      </AnimatePresence>
    </div>
  );
}