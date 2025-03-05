import useCheckWidth from "./useCheckWidth";

//* Must be equal to $breakpoint-width-mobile in scss/mixins/mixins.scss
const breakpoints = {
  mobile: 640,
  tablet: 768,
};

const useResponsive = () => {
  const size = useCheckWidth();
  const width = size.windowSize.width;

  const isMobile = width <= breakpoints.mobile;
  const isTablet = width > breakpoints.mobile && width <= breakpoints.tablet;
  const isDesktop = width > breakpoints.tablet;

  return {
    isMobile,
    isDesktop,
    isTablet,
    width,
  };
};

export default useResponsive;
