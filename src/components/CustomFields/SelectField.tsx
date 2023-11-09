import { twMerge } from "tailwind-merge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdditionalFormikProps, SelectOption } from "@/interfaces/common";
import { Label } from "../ui/label";
import { get, isString } from "lodash";

interface SelectFieldProps {
  label?: string | React.ReactNode;
  required?: boolean;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
  options: SelectOption[];
  afterOnChange?: (e: any) => void;
}

const SelectField = (props: SelectFieldProps & AdditionalFormikProps) => {
  //! State
  const {
    options,
    classNameContainer,
    field,
    form,
    label,
    classNameLabel,
    placeholder,
    required,
  } = props;
  const { value, name, onBlur } = field;
  const { setFieldValue, setFieldTouched, errors, touched } = form;

  const msgError = get(touched, name) && (get(errors, name) as string);
  //! Function

  //! Render
  return (
    <div
      className={twMerge(
        "grid w-full items-center gap-1.5",
        classNameContainer
      )}
    >
      {label && (
        <Label
          className={twMerge("mb-1", required && "required", classNameLabel)}
        >
          {label}
        </Label>
      )}
      <Select
        value={options.find((el) => `${el.value}` === `${value}`)?.value}
        onValueChange={(value) => {
          setFieldValue(name, value);
          setFieldTouched(name, true);
        }}
        onOpenChange={(open) => {
          if (!open) {
            setFieldTouched(name, true);
          }
        }}
      >
        <SelectTrigger
          className={twMerge(msgError && "border-red-500")}
          onBlur={onBlur}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            return (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {isString(msgError) && <span className="invalid-text">{msgError}</span>}
    </div>
  );
};

export default SelectField;
