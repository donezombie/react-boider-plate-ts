import React from 'react';
import TooltipMui, { TooltipProps } from '@mui/material/Tooltip';

function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <TooltipMui enterDelay={50} placement='top' {...props}>
      {children}
    </TooltipMui>
  );
}

export default React.memo(Tooltip);
