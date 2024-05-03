import React, { useMemo, useState } from "react";
import { InputProps } from "../ui/input";
import { AdditionalFormikProps, TimeValue } from "@/interfaces/common";
import { Label } from "../ui/label";
import { twMerge } from "tailwind-merge";
import { get, isString } from "lodash";
import { Calendar } from "../ui/calendar";
import { SelectSingleEventHandler } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import CommonIcons from "../commonIcons";
import { momentInstance } from "@/helpers/common";
import { cn } from "@/lib/utils";
import { TimeValue as TimeValueAria } from "react-aria";
import { TimePicker } from "../ui/date-time-picker/time-picker";
import { Button } from "../ui/button";

interface DateTimePickerFieldProps extends InputProps {
  label?: string | React.ReactNode;
  required?: boolean;
  classNameLabel?: string;
  classNameContainer?: string;
  afterOnChange?: (date: Date | undefined) => void;
  hideDatePicker?: boolean;
  hideTimePicker?: boolean;
}

const DateTimePickerField = (
  props: DateTimePickerFieldProps & AdditionalFormikProps
) => {
  //! State
  const {
    label,
    classNameLabel,
    classNameContainer,
    form,
    field,
    className,
    required,
    afterOnChange,
  } = props;
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { name, value } = field;
  const { errors, touched, setFieldTouched, setFieldValue } = form;

  const msgError = get(touched, name) && (get(errors, name) as string);

  //! Function
  const onHandleChange: SelectSingleEventHandler = (date) => {
    const nextDate = date;
    if (value) {
      const prevDate = momentInstance(value).toDate();
      nextDate?.setHours(prevDate.getHours());
      nextDate?.setMinutes(prevDate.getMinutes());
      nextDate?.setSeconds(prevDate.getSeconds());
      nextDate?.setMilliseconds(prevDate.getMilliseconds());
    } else {
      nextDate?.setHours(new Date().getHours());
      nextDate?.setMinutes(new Date().getMinutes());
      nextDate?.setSeconds(new Date().getSeconds());
      nextDate?.setMilliseconds(new Date().getMilliseconds());
    }

    afterOnChange && afterOnChange(nextDate);
    setFieldValue(name, nextDate);
  };

  const onHandleChangeTime = (timeValue: TimeValue) => {
    const nextDate = momentInstance(value).toDate();
    nextDate.setHours(timeValue.hour);
    nextDate.setMinutes(timeValue.minute);
    nextDate.setSeconds(timeValue.second);
    nextDate.setMilliseconds(timeValue.millisecond);

    setFieldValue(name, nextDate);
    afterOnChange && afterOnChange(nextDate);
  };

  const timeValue: TimeValue | undefined = useMemo(() => {
    if (!value) {
      return undefined;
    }

    const date = new Date(value);
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      millisecond: date.getMilliseconds(),
    };
  }, [value]);

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
          htmlFor={name}
          className={twMerge("mb-1", required && "required", classNameLabel)}
        >
          {label}
        </Label>
      )}

      <div className={twMerge("flex gap-2", className)}>
        {!props.hideDatePicker && (
          <Popover
            open={calendarOpen}
            onOpenChange={(open) => {
              if (!open) {
                setFieldTouched(name, true);
              }
              setCalendarOpen(open);
            }}
          >
            <PopoverTrigger className="flex-1">
              <Button
                variant="outline"
                className={cn(
                  "w-full min-w-[200px] flex-1 pl-3 text-left font-normal",
                  !value && "text-muted-foreground",
                  msgError && "border-red-500"
                )}
              >
                {value ? (
                  <span>{momentInstance(value).format("ll")}</span>
                ) : (
                  <span>Pick a date</span>
                )}
                <CommonIcons.CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={value}
                onSelect={onHandleChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}

        {!props?.hideTimePicker && (
          <TimePicker
            value={timeValue as TimeValueAria}
            onChange={onHandleChangeTime}
            className={twMerge(msgError && "border-red-500")}
          />
        )}

        <Button
          variant="outline"
          onClick={() => setFieldValue(name, undefined)}
        >
          <CommonIcons.X className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </div>

      {isString(msgError) && <span className="invalid-text">{msgError}</span>}
    </div>
  );
};

export default DateTimePickerField;
