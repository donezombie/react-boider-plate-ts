import { twMerge } from "tailwind-merge";
import { AdditionalFormikProps, SelectOption } from "@/interfaces/common";
import { Label } from "../ui/label";
import { get, isString } from "lodash";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import CommonIcons from "../commonIcons";
import { cn } from "@/lib/utils";
import { isDefine } from "@/helpers/common";
import { Button } from "../ui/button";

interface SelectFieldProps {
  label?: string | React.ReactNode;
  required?: boolean;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
  placeholderSearch?: string;
  messageItemNotFound?: string;
  options: SelectOption[];
  afterOnChange?: (e: string | number) => void;
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
    placeholderSearch,
    messageItemNotFound,
    required,
    afterOnChange,
  } = props;
  const [open, setOpen] = useState(false);
  const { value, name } = field;
  const { setFieldValue, setFieldTouched, errors, touched } = form;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const msgError = get(touched, name) && (get(errors, name) as string);

  //! Function

  //! Render
  const widthPopover = buttonRef.current?.getBoundingClientRect().width || 0;

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
      <Popover
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) {
            setFieldTouched(name, true);
          }
        }}
      >
        <PopoverTrigger>
          <Button
            ref={buttonRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={twMerge(
              "w-full justify-between text-sm font-normal",
              msgError && "border-red-500"
            )}
          >
            {isDefine(value)
              ? options.find((option) => `${option.value}` === `${value}`)
                  ?.label
              : placeholder}
            <CommonIcons.ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          style={{
            width: widthPopover,
          }}
        >
          <Command>
            <CommandInput placeholder={placeholderSearch || "Search item"} />
            <CommandEmpty>
              {messageItemNotFound || "No item found."}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    const result =
                      `${value}` === `${option.value}` ? "" : option.value;
                    setFieldValue(name, result);
                    afterOnChange && afterOnChange(result);
                    setOpen(false);
                  }}
                >
                  <CommonIcons.Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {isString(msgError) && <span className="invalid-text">{msgError}</span>}
    </div>
  );
};

export default SelectField;
