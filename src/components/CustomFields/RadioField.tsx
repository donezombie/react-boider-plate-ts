import Radio from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FieldInputProps, FormikProps } from 'formik';
import { SelectOption } from 'interfaces/common';
import { ChangeEvent } from 'react';

interface RadioFieldI extends RadioGroupProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  values: SelectOption[];
  label?: string;
  afterOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function RadioField(props: RadioFieldI) {
  const { field, values, label, afterOnChange, ...restProps } = props;
  const { name, value, onBlur, onChange } = field;

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    afterOnChange && afterOnChange(e);
  };

  return (
    <FormControl>
      {label && <FormLabel id={name}>{label}</FormLabel>}
      <RadioGroup
        aria-labelledby={name}
        name={name}
        value={value}
        onChange={onHandleChange}
        onBlur={onBlur}
        row
        {...restProps}
      >
        {values.map((el) => {
          return (
            <FormControlLabel
              key={el.value}
              value={el.value}
              control={<Radio />}
              label={el.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioField;
