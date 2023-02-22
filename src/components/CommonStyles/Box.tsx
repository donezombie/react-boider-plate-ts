import MuiBox, { BoxProps } from '@mui/material/Box';

const Box = (props: BoxProps) => {
  return <MuiBox {...props}>{props.children}</MuiBox>;
};

export default Box;
