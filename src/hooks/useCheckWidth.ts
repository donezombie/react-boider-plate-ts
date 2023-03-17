import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

const useCheckWidth = () => {
  const theme = useTheme();
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return {
    windowSize,
    isMobile: windowSize.width <= theme.breakpoints.values.sm,
  };
};

export default useCheckWidth;
