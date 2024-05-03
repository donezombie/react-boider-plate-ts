import React from "react";
import { AdditionalFormikProps } from "@/interfaces/common";
import { Label } from "../ui/label";
import { twMerge } from "tailwind-merge";
import { get, isString } from "lodash";
import { Checkbox } from "../ui/checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";

interface CheckBoxFieldProps extends CheckboxProps {
  label?: string | React.ReactNode;
  required?: boolean;
  classNameLabel?: string;
  classNameContainer?: string;
  afterOnChange?: (checked: boolean) => void;
}

const CheckBoxField = (props: CheckBoxFieldProps & AdditionalFormikProps) => {
  const {
    label,
    classNameLabel,
    classNameContainer,
    form,
    field,
    required,
    ...restProps
  } = props;
  const { name, value } = field;
  const { errors, touched, setFieldValue, setFieldTouched } = form;

  const msgError = get(touched, name) && (get(errors, name) as string);

  const onHandleChange = (checked: boolean) => {
    setFieldValue(name, checked);
    props?.afterOnChange && props?.afterOnChange(checked);
    setFieldTouched(name, true);
  };

  return (
    <div className={twMerge("flex items-center gap-3", classNameContainer)}>
      <Checkbox
        id={name}
        checked={value}
        onCheckedChange={onHandleChange}
        {...restProps}
      />
      {label && (
        <Label
          htmlFor={name}
          className={twMerge(required && "required", classNameLabel)}
        >
          {label}
        </Label>
      )}
      {isString(msgError) && <span className="invalid-text">{msgError}</span>}
    </div>
  );
};

export default CheckBoxField;
