import React, { ChangeEvent, useState } from "react";
import { Input, InputProps } from "../ui/input";
import { AdditionalFormikProps } from "@/interfaces/common";
import { Label } from "../ui/label";
import { twMerge } from "tailwind-merge";
import { get, isString } from "lodash";
import CommonIcons from "../CommonIcons";

interface InputFieldProps extends InputProps {
  label?: string | React.ReactNode;
  required?: boolean;
  classNameLabel?: string;
  classNameContainer?: string;
  helperText?: string | React.ReactNode;
  afterOnChange?: (e: ChangeEvent) => void;
}

const InputField = (props: InputFieldProps & AdditionalFormikProps) => {
  const {
    label,
    classNameLabel,
    classNameContainer,
    form,
    field,
    className,
    required,
    type,
    helperText,
    ...restPropsInput
  } = props;
  const { name, onBlur, onChange, value } = field;
  const { errors, touched } = form;
  const [seeText, setSeeText] = useState(false);

  const msgError = get(touched, name) && (get(errors, name) as string);

  const isPasswordType = type === "password";

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
        <div className="label">
          <Label
            htmlFor={name}
            className={twMerge("mb-1", required && "required", classNameLabel)}
          >
            {label}
          </Label>
        </div>
      )}
      <div className="relative">
        <Input
          type={seeText ? "text" : type}
          name={name}
          onBlur={onBlur}
          onChange={onHandleChange}
          value={value}
          id={name}
          className={twMerge(className, msgError && "border-red-500")}
          {...restPropsInput}
        />

        {isPasswordType && (
          <button
            type="button"
            className="absolute right-1 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              setSeeText((prev) => !prev);
            }}
          >
            {seeText ? (
              <CommonIcons.EyeIcon size={18} />
            ) : (
              <CommonIcons.EyeOffIcon size={18} />
            )}
          </button>
        )}
      </div>
      {helperText && (
        <span className="text-[13px] text-muted-foreground">{helperText}</span>
      )}
      {isString(msgError) && <span className="invalid-text">{msgError}</span>}
    </div>
  );
};

export default InputField;
