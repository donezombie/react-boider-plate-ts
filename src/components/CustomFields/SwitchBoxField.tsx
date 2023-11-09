import React from "react";
import { AdditionalFormikProps } from "@/interfaces/common";
import { Label } from "../ui/label";
import { twMerge } from "tailwind-merge";
import { get, isString } from "lodash";
import { Switch } from "../ui/switch";
import { SwitchProps } from "@radix-ui/react-switch";

interface SwitchBoxFieldProps extends SwitchProps {
  label?: string | React.ReactNode;
  required?: boolean;
  classNameLabel?: string;
  classNameContainer?: string;
  afterOnChange?: (checked: boolean) => void;
}

const SwitchBoxField = (props: SwitchBoxFieldProps & AdditionalFormikProps) => {
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
      <Switch
        id={name}
        checked={value}
        onCheckedChange={onHandleChange}
        aria-readonly
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

export default SwitchBoxField;
