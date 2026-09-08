import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import useModalStore from "@/hooks/useModalStore";

const Popover = ({
  children,
  ...restProps
}: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>) => {
  const modalOpenCount = useModalStore((s) => s.openCount);
  const isModalOpen = modalOpenCount >= 1;

  return (
    <PopoverPrimitive.Root {...restProps} modal={isModalOpen}>
      {children}
    </PopoverPrimitive.Root>
  );
};

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
  const modalOpenCount = useModalStore((s) => s.openCount);
  const isModalOpen = modalOpenCount >= 1;
  const Wrapper = isModalOpen ? React.Fragment : PopoverPrimitive.Portal;

  return (
    <Wrapper>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </Wrapper>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
