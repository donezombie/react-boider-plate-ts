import clsx from "clsx";
import CommonIcons from "../CommonIcons";

const Loading = ({ className }: { className?: string }) => {
  return (
    <CommonIcons.Loader2
      className={clsx("icon mr-0 h-5 w-5 animate-spin text-primary", className)}
    />
  );
};

export default Loading;
