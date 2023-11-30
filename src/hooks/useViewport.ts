import { useState, useEffect } from 'react';

interface ViewportType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useViewport = (): ViewportType => {
  const [viewport, setViewport] = useState<ViewportType>(() => ({
    isMobile: window.innerWidth <= 500,
    isTablet: window.innerWidth > 500 && window.innerWidth < 1240,
    isDesktop: window.innerWidth >= 1240,
  }));

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        isMobile: window.innerWidth <= 600,
        isTablet: window.innerWidth > 600 && window.innerWidth < 1240,
        isDesktop: window.innerWidth >= 1240,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewport;
};

export default useViewport;
