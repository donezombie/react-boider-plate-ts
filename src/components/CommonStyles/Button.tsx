import MuiButton, { ButtonProps } from '@mui/material/Button';

const Button = (props: ButtonProps) => {
  return (
    <MuiButton variant='contained' {...props}>
      {props.children}
    </MuiButton>
  );
};

export default Button;
