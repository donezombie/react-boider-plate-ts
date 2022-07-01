import React, { Fragment } from "react";

const InputField = (props: any) => {
  const {
    form,
    field,
    maxLength,
    placeholder,
    type,
    label,
    disabled,
    onChangeCustomize,
    onKeyDown,
    style,
    invalid,
    className,
  } = props;
  const { name, value } = field;
  const { errors, touched } = form;

  return (
    <Fragment>
      {label && <label htmlFor={name} dangerouslySetInnerHTML={{ __html: label }} />}
      <input
        {...field}
        style={style}
        className={`${className} border p-2`}
        onChange={onChangeCustomize || field.onChange}
        type={type}
        id={name}
        maxLength={maxLength}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        invalid={invalid || (!!errors[name] && touched[name])}
        onKeyDown={onKeyDown}
      />
      {errors[name] && <div>{errors[name]}</div>}
    </Fragment>
  );
};

InputField.defaultProps = {
  type: "text",
  tabIndex: "0",
  invalid: "false",
};

export default InputField;
