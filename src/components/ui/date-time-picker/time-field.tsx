import { DateSegment } from "./date-segment";
import { useRef } from "react";
import {
  AriaTimeFieldProps,
  TimeValue,
  useLocale,
  useTimeField,
} from "react-aria";
import { useTimeFieldState } from "react-stately";
import { cn } from "@/lib/utils";
import CommonIcons from "@/components/CommonIcons";

function TimeField(
  props: { className?: string } & AriaTimeFieldProps<TimeValue>
) {
  const { className, ...restProps } = props;
  const ref = useRef<HTMLDivElement | null>(null);

  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...restProps,
    locale,
  });
  const {
    fieldProps: { ...fieldProps },
  } = useTimeField(restProps, state, ref);

  return (
    <div
      {...fieldProps}
      ref={ref}
      className={cn(
        "inline-flex h-10 w-full flex-1 items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        restProps.isDisabled ? "cursor-not-allowed opacity-50" : "",
        className
      )}
    >
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
      <CommonIcons.Clock className="ml-2 h-4 w-4 opacity-50" />
    </div>
  );
}

export { TimeField };
