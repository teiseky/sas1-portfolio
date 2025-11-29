import React, { useState, useEffect } from 'react';

const MobileWarning = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // Check if screen width is less than 1024px (tablet/desktop breakpoint)
      setIsMobile(window.innerWidth < 1024);
    };

    // Check on mount
    checkDevice();

    // Listen for resize events
    window.addEventListener('resize', checkDevice);

    // Check if user has already dismissed the warning
    const dismissed = localStorage.getItem('mobileWarningDismissed');
    if (dismissed) {
      setIsDismissed(true);
    }

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('mobileWarningDismissed', 'true');
  };

  // Don't show if not mobile or already dismissed
  if (!isMobile || isDismissed) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md text-center shadow-2xl">
        {/* Icon */}
        <div className="text-6xl mb-6">💻</div>

        {/* Title */}
        <h2 className="text-2xl font-display font-bold text-white mb-4">
          Best Viewed on Desktop
        </h2>

        {/* Message */}
        <p className="text-gray-300 mb-6 leading-relaxed">
          This artistic reflection experience is designed for laptop and desktop viewing to fully appreciate the cinematic animations, smooth scrolling, and intricate details.
        </p>

        {/* Features */}
        <div className="text-left mb-6 space-y-2">
          <div className="flex items-center text-sm text-gray-400">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
            Optimized animations & transitions
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
            Smooth parallax scrolling effects
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
            Detailed typography & layout
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleDismiss}
            className="w-full bg-white text-black font-display font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Continue Anyway
          </button>

          <button
            onClick={() => window.location.reload()}
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            Check Again
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-4">
          This message will not appear again on this device
        </p>
      </div>
    </div>
  );
};

export default MobileWarning;
