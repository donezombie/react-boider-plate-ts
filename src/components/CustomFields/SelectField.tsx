import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { FieldInputProps, FormikProps } from 'formik';
import { get } from 'lodash';
import { SelectOption } from 'interfaces/common';
import CommonStyles from 'components/CommonStyles';

interface SelectFieldProps extends SelectProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  options: SelectOption[];
  afterOnChange?: (e: SelectChangeEvent) => void;
}

const SelectField = ({
  field,
  form,
  options,
  label,
  afterOnChange,
  ...props
}: SelectFieldProps) => {
  const { name, value, onBlur, onChange } = field || {};
  const { errors, touched } = form || {};

  const msgError = get(touched, name) && get(errors, name) ? (get(errors, name) as string) : '';

  const onHandleChange = (e: SelectChangeEvent) => {
    onChange(e);
    afterOnChange && afterOnChange(e);
  };

  return (
    <CommonStyles.Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth={props.fullWidth} error={!!msgError}>
        <InputLabel id={`${name}`}>{label}</InputLabel>
        <Select
          id={`${name}`}
          label={label}
          labelId={`${name}`}
          value={value}
          name={name}
          onChange={onHandleChange}
          onBlur={onBlur}
          {...props}
        >
          {options.map((el) => {
            return (
              <MenuItem key={el.value} value={el.value}>
                {el.label}
              </MenuItem>
            );
          })}
        </Select>
        {!!msgError && <FormHelperText>{msgError}</FormHelperText>}
      </FormControl>
    </CommonStyles.Box>
  );
};

export default SelectField;
