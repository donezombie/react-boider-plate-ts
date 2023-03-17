import MuiCircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';

const Loading = (props: CircularProgressProps) => {
  return <MuiCircularProgress size={24} {...props} />;
};

export default Loading;
