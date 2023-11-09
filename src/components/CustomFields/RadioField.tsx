import React from "react";
import { AdditionalFormikProps, SelectOption } from "@/interfaces/common";
import { Label } from "../ui/label";
import { twMerge } from "tailwind-merge";
import { get, isString } from "lodash";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { RadioGroupProps } from "@radix-ui/react-radio-group";

interface RadioFieldProps extends RadioGroupProps {
  label?: string | React.ReactNode;
  required?: boolean;
  classNameLabel?: string;
  classNameContainer?: string;
  afterOnChange?: (value: string) => void;
  options?: SelectOption[];
}

const RadioField = (props: RadioFieldProps & AdditionalFormikProps) => {
  const {
    classNameLabel,
    classNameContainer,
    form,
    field,
    options,
    label,
    required,
    className,
    ...restProps
  } = props;
  const { name, value } = field;
  const { errors, touched, setFieldValue } = form;

  const msgError = get(touched, name) && (get(errors, name) as string);

  const onHandleChange = (value: string) => {
    setFieldValue(name, value);
    props?.afterOnChange && props?.afterOnChange(value);
  };

  return (
    <div className={twMerge("flex flex-col gap-3", classNameContainer)}>
      {label && (
        <Label className={twMerge(required && "required", classNameLabel)}>
          {label}
        </Label>
      )}
      <RadioGroup
        className={twMerge("gap-3", className)}
        onValueChange={onHandleChange}
        {...restProps}
      >
        {options?.map((el, index) => {
          const id = `${el.label}-${index}`;
          return (
            <div key={el.label} className={twMerge("flex gap-3")}>
              <RadioGroupItem
                id={id}
                checked={value === el.value}
                value={el.value}
              />
              <Label htmlFor={id}>{el.label}</Label>
            </div>
          );
        })}
      </RadioGroup>

      {isString(msgError) && <span className="invalid-text">{msgError}</span>}
    </div>
  );
};

export default RadioField;
