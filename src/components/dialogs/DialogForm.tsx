import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogI } from "@/interfaces/common";
import ExampleComponents from "../Examples/ExampleComponents";

interface DialogProps extends DialogI<any> {}

const DialogForm = (props: DialogProps) => {
  const { isOpen, toggle } = props;

  return (
    <Dialog open={isOpen} onOpenChange={toggle} modal>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="max-w-full md:max-w-[1366px]">
          <DialogHeader>
            <DialogTitle>Dialog With Form Scrollable</DialogTitle>
            <DialogDescription>Long long forms</DialogDescription>
          </DialogHeader>

          <div className="no-scrollbar -mx-4 max-h-[80vh] overflow-y-auto px-4">
            <ExampleComponents />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DialogForm;
