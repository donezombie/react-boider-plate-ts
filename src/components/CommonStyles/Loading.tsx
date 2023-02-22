import MuiCircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';

const Loading = (props: CircularProgressProps) => {
  return <MuiCircularProgress {...props} />;
};

export default Loading;
