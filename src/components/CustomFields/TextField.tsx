import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { FieldInputProps, FormikProps } from 'formik';
import { get, isString } from 'lodash';
import { ChangeEvent } from 'react';

interface Props {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  afterOnChange?: (e: ChangeEvent) => void;
}

const TextField = ({ field, form, afterOnChange, ...props }: Props & TextFieldProps) => {
  const { name, value, onBlur, onChange } = field || {};
  const { errors, touched } = form || {};

  const msgError = get(touched, name) && get(errors, name) ? get(errors, name) : '';

  const onHandleChange = (e: ChangeEvent) => {
    onChange(e);
    afterOnChange && afterOnChange(e);
  };

  return (
    <MuiTextField
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onHandleChange}
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
