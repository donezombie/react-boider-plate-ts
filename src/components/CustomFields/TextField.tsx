import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { FieldInputProps, FormikProps } from 'formik';
import { get, isString } from 'lodash';

interface Props {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
}

const TextField = ({ field, form, ...props }: Props & TextFieldProps) => {
  const { name, value, onBlur, onChange } = field || {};
  const { errors, touched } = form || {};

  const msgError = get(touched, name) && get(errors, name) ? get(errors, name) : '';

  return (
    <MuiTextField
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      error={!!msgError}
      helperText={isString(msgError) && msgError}
      variant='standard'
      sx={{
        '& label': {},
        '& input': {},
      }}
      {...props}
    />
  );
};

export default TextField;
