import MuiButton, { ButtonProps } from '@mui/material/Button';
import MuiIconButton, { IconButtonProps } from '@mui/material/IconButton';

type TypeButton = IconButtonProps & ButtonProps;
interface Props extends TypeButton {
  isIconButton?: boolean;
}

const Button = ({ isIconButton, ...props }: Props) => {
  if (isIconButton) {
    return <MuiIconButton {...props}>{props.children}</MuiIconButton>;
  }

  return (
    <MuiButton variant='contained' {...props}>
      {props.children}
    </MuiButton>
  );
};

export default Button;
