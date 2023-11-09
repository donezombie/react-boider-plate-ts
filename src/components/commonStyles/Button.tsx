import { Loader2 } from "lucide-react";
import { Button as ButtonUI, ButtonProps } from "../ui/button";
import { twMerge } from "tailwind-merge";

const Button = (props: { isLoading?: boolean } & ButtonProps) => {
  const { isLoading, children, ...restProps } = props;
  return (
    <ButtonUI type="button" disabled={isLoading} {...restProps}>
      {isLoading ? (
        <Loader2 className={twMerge("icon animate-spin", "mr-0")} />
      ) : (
        children
      )}
    </ButtonUI>
  );
};

export default Button;
