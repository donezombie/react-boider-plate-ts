import * as React from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { FieldInputProps, FormikProps } from 'formik';
import FormControlLabel from '@mui/material/FormControlLabel';

interface SwitchFieldI {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  label?: string;
}

function SwitchField(props: SwitchFieldI & SwitchProps) {
  const { field, form, label, ...restProps } = props;
  const { name, value } = field;
  const { setFieldValue } = form;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, event.target.checked);
  };

  return (
    <FormControlLabel
      labelPlacement='start'
      sx={{ ml: 0 }}
      control={
        <Switch
          name={name}
          checked={value}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
          {...restProps}
        />
      }
      label={label}
    />
  );
}

export default SwitchField;
