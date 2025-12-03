import { twMerge } from "tailwind-merge";
import { AdditionalFormikProps, SelectOption } from "@/interfaces/common";
import { Label } from "../ui/label";
import { get, isString } from "lodash";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import CommonIcons from "../CommonIcons";
import { cn } from "@/lib/utils";
import { isDefine } from "@/helpers/common";
import { Button } from "../ui/button";
import Loading from "../ui/loading";
import { Badge } from "../ui/badge";

interface AsyncSelectFieldProps {
  label?: string | React.ReactNode;
  required?: boolean;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
  placeholderSearch?: string;
  messageItemNotFound?: string;
  loadOptions: (inputValue?: string) => Promise<SelectOption[]>;
  defaultOptions?: SelectOption[];
  cacheOptions?: boolean;
  debounceMs?: number;
  isClearable?: boolean;
  isMulti?: boolean;
  afterOnChange?: (e: SelectOption | SelectOption[] | null) => void;
}

const AsyncSelectField = (
  props: AsyncSelectFieldProps & AdditionalFormikProps
) => {
  //! State
  const {
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
    loadOptions,
    defaultOptions = [],
    cacheOptions = false,
    debounceMs = 300,
    isClearable = false,
    isMulti = false,
  } = props;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<SelectOption[]>(defaultOptions);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cachedOptionsRef = useRef<Map<string, SelectOption[]>>(new Map());

  const { value, name } = field;
  const { setFieldValue, setFieldTouched, errors, touched } = form;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const msgError = get(touched, name) && (get(errors, name) as string);

  // Check if value is an array (multi-select)
  const isValueArray = Array.isArray(value);

  // Check if value is a SelectOption object (single select)
  const isValueObject =
    !isValueArray &&
    value &&
    typeof value === "object" &&
    "label" in value &&
    "value" in value;
  const valueOption = isValueObject ? (value as SelectOption) : null;
  const actualValue = isValueObject ? valueOption?.value : value;

  // Get selected values for multi-select
  const getSelectedValues = (): (string | number)[] => {
    if (!isMulti || !isValueArray) return [];
    return value.map((item: any) => {
      if (item && typeof item === "object" && "value" in item) {
        return item.value;
      }
      return item;
    });
  };

  const getSelectedOptions = (): SelectOption[] => {
    if (!isMulti || !isValueArray) return [];
    return value
      .map((item: any) => {
        if (
          item &&
          typeof item === "object" &&
          "label" in item &&
          "value" in item
        ) {
          return item as SelectOption;
        }
        // Find option by value
        const option = options.find((opt) => `${opt.value}` === `${item}`);
        return option || null;
      })
      .filter(
        (item: SelectOption | null): item is SelectOption => item !== null
      );
  };

  const selectedValues = getSelectedValues();
  const selectedOptions = getSelectedOptions();

  //! Function
  const fetchOptions = useCallback(
    async (inputValue: string = "") => {
      try {
        setLoading(true);
        setError(null);

        // Check cache if enabled
        if (cacheOptions && cachedOptionsRef.current.has(inputValue)) {
          const cached = cachedOptionsRef.current.get(inputValue);
          if (cached) {
            setOptions(cached);
            setLoading(false);
            return;
          }
        }

        const result = await loadOptions(inputValue);
        setOptions(result);

        // Cache the result if enabled
        if (cacheOptions) {
          cachedOptionsRef.current.set(inputValue, result);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load options");
        setOptions([]);
      } finally {
        setLoading(false);
      }
    },
    [loadOptions, cacheOptions]
  );

  const debouncedFetchOptions = useCallback(
    (inputValue: string = "") => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        fetchOptions(inputValue);
      }, debounceMs);
    },
    [fetchOptions, debounceMs]
  );

  // Load options when popover opens
  useEffect(() => {
    if (open) {
      fetchOptions("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  //! Render
  const widthPopover = buttonRef.current?.getBoundingClientRect().width || 0;

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    debouncedFetchOptions(value);
  };

  const handleSelect = (optionValue: string | number) => {
    const selectedOption = options.find(
      (option) => `${option.value}` === `${optionValue}`
    );

    if (!selectedOption) return;

    if (isMulti) {
      // Multi-select mode - always store SelectOption objects
      const currentValues = isValueArray ? [...value] : [];

      // Convert current values to SelectOption objects if they're primitives
      const currentOptions: SelectOption[] = currentValues.map((item: any) => {
        if (
          item &&
          typeof item === "object" &&
          "label" in item &&
          "value" in item
        ) {
          return item as SelectOption;
        }
        // Find the option object for primitive values
        const option = options.find((opt) => `${opt.value}` === `${item}`);
        return option || { label: String(item), value: item };
      });

      // Check if already selected
      const isSelected = currentOptions.some(
        (opt) => `${opt.value}` === `${optionValue}`
      );

      let newValue: SelectOption[];
      if (isSelected) {
        // Remove from selection
        newValue = currentOptions.filter(
          (opt) => `${opt.value}` !== `${optionValue}`
        );
      } else {
        // Add to selection
        newValue = [...currentOptions, selectedOption];
      }

      setFieldValue(name, newValue);
      afterOnChange && afterOnChange(newValue);
      // Don't close popover in multi-select mode
    } else {
      // Single select mode - always store SelectOption object
      const isSameValue = `${actualValue}` === `${optionValue}`;
      const result = isSameValue ? null : selectedOption;
      setFieldValue(name, result);
      afterOnChange && afterOnChange(isSameValue ? null : selectedOption);
      setOpen(false);
    }
  };

  const handleRemoveItem = (
    optionValue: string | number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (!isMulti || !isValueArray) return;

    // Convert current values to SelectOption objects if they're primitives
    const currentOptions: SelectOption[] = value.map((item: any) => {
      if (
        item &&
        typeof item === "object" &&
        "label" in item &&
        "value" in item
      ) {
        return item as SelectOption;
      }
      // Find the option object for primitive values
      const option = options.find((opt) => `${opt.value}` === `${item}`);
      return option || { label: String(item), value: item };
    });

    // Remove the selected option
    const newValue = currentOptions.filter(
      (opt) => `${opt.value}` !== `${optionValue}`
    );

    setFieldValue(name, newValue);
    afterOnChange && afterOnChange(newValue);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMulti) {
      setFieldValue(name, []);
      afterOnChange && afterOnChange([]);
    } else {
      // Always clear to null (not empty string)
      setFieldValue(name, null);
      afterOnChange && afterOnChange(null);
    }
  };

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
            setSearchValue("");
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
              "h-auto min-h-10 w-full justify-between text-sm font-normal",
              msgError && "border-red-500"
            )}
          >
            <div className="flex flex-1 flex-wrap items-center gap-1">
              {isMulti && isValueArray && selectedOptions.length > 0 ? (
                selectedOptions.map((option) => (
                  <Badge
                    key={option.value}
                    variant="secondary"
                    className="mr-1"
                  >
                    {option.label}
                    <CommonIcons.X
                      className="ml-1 h-3 w-3 cursor-pointer"
                      onClick={(e) => handleRemoveItem(option.value, e)}
                    />
                  </Badge>
                ))
              ) : isMulti ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : isDefine(value) ? (
                valueOption?.label ||
                options.find((option) => `${option.value}` === `${actualValue}`)
                  ?.label ||
                placeholder
              ) : (
                placeholder
              )}
            </div>
            <div className="ml-2 flex shrink-0 items-center gap-1">
              {isClearable &&
                isDefine(value) &&
                (isMulti ? isValueArray && value.length > 0 : true) && (
                  <CommonIcons.X
                    className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                    onClick={handleClear}
                  />
                )}
              <CommonIcons.ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          style={{
            width: widthPopover,
          }}
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={placeholderSearch || "Search item"}
              value={searchValue}
              onValueChange={handleSearchChange}
            />
            {loading && (
              <div className="flex items-center justify-center py-4">
                <Loading className="h-4 w-4" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Loading...
                </span>
              </div>
            )}
            {error && (
              <div className="py-4 text-center text-sm text-red-500">
                {error}
              </div>
            )}
            {!loading && !error && options.length === 0 && (
              <CommandEmpty>
                {messageItemNotFound || "No item found."}
              </CommandEmpty>
            )}
            {!loading && !error && options.length > 0 && (
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={`${option.value}`}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <CommonIcons.Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isMulti
                          ? selectedValues.some(
                              (val) => `${val}` === `${option.value}`
                            )
                            ? "opacity-100"
                            : "opacity-0"
                          : `${actualValue}` === `${option.value}`
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </Command>
        </PopoverContent>
      </Popover>

      {isString(msgError) && <span className="invalid-text">{msgError}</span>}
    </div>
  );
};

export default AsyncSelectField;
