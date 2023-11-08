import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { FieldInputProps, FormikProps } from 'formik';
import { SelectOption, SetBooleanState, SetOptionsValue } from 'interfaces/common';
import Timer from 'helpers/timer';

interface Props {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  label?: string;
  key: string;
  loadOptions: (text: string, setOptions: SetOptionsValue, setLoading: SetBooleanState) => void;
  afterOnChange?: (value: string | null) => void;
}

function AutoCompleteField(props: Props) {
  //! State
  const timer = React.useRef(new Timer());
  const { field, form, loadOptions, label, key = 'value' } = props;

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<SelectOption[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [text, setText] = React.useState<string>('');
  const { name, value, onBlur } = field || {};
  //   const { errors, touched } = form || {};

  //! Function
  React.useEffect(() => {
    let active = true;
    (async () => {
      if (active) {
        timer.current.debounce(() => {
          loadOptions(text, setOptions, setLoading);
        }, 500);
      }
    })();

    return () => {
      active = false;
    };
  }, [setOptions, text]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleChange = (event: any, value: string | null) => {
    form?.setFieldValue(name, value);
    props.afterOnChange && props.afterOnChange(value);
  };

  //! Render
  return (
    <Autocomplete
      id={name}
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={value}
      onChange={handleChange}
      onInputChange={(event, newInputValue) => {
        setText(newInputValue);
      }}
      onBlur={onBlur}
      inputValue={text}
      isOptionEqualToValue={(option, value) => {
        return option[key] === value[key];
      }}
      getOptionLabel={(option) => option.label}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label || 'Asynchronous'}
          name={name}
          onBlur={onBlur}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default AutoCompleteField;
