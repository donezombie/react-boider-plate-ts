import TypographyMui, { TypographyProps } from '@mui/material/Typography';

interface Props extends TypographyProps {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
}

const Typography = (props: Props) => {
  return <TypographyMui {...props}>{props.children}</TypographyMui>;
};

export default Typography;
