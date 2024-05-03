import clsx from "clsx";
import CommonIcons from "../commonIcons";

const Loading = ({ className }: { className?: string }) => {
  return (
    <CommonIcons.Loader2
      className={clsx("icon mr-0 animate-spin", className)}
    />
  );
};

export default Loading;
