import TypographyMui, { TypographyProps } from '@mui/material/Typography';

const Typography = (props: TypographyProps) => {
  return <TypographyMui {...props}>{props.children}</TypographyMui>;
};

export default Typography;
