import React, { ChangeEvent } from "react";
import { Input, InputProps } from "../ui/input";
import { AdditionalFormikProps } from "@/interfaces/common";
import { Label } from "../ui/label";
import { twMerge } from "tailwind-merge";
import { get, isString } from 'lodash';

interface InputFieldProps extends InputProps {
  label?: string | React.ReactNode;
  classNameLabel?: string;
  classNameContainer?: string;
  afterOnChange?: (e: ChangeEvent) => void;
}

const InputField = (props: InputFieldProps & AdditionalFormikProps) => {
  const { label, classNameLabel, classNameContainer, form, field, className, ...restPropsInput } = props;
  const { name, onBlur, onChange, value } = field;
  const { errors, touched } = form;

  const msgError = get(touched, name) && get(errors, name) as string;

  const onHandleChange = (e: ChangeEvent) => {
    onChange(e);
    props?.afterOnChange && props?.afterOnChange(e);
  };

  return (
    <div
      className={twMerge(
        "grid w-full items-center gap-1.5",
        classNameContainer
      )}
    >
      {label && (
        <Label htmlFor={name} className={twMerge('mb-1', classNameLabel)}>
          {label}
        </Label>
      )}
      <Input
        name={name}
        onBlur={onBlur}
        onChange={onHandleChange}
        value={value}
        id={name}
        className={twMerge(className, msgError && "border-red-400")}
        {...restPropsInput}
      />
      {isString(msgError) && <span className="text-red-400 text-xs">{msgError}</span>}
    </div>
  );
};

export default InputField;
