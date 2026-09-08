import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogI } from "@/interfaces/common";
import { Button } from "../ui/button";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

interface DialogProps extends DialogI<any> {}

const DialogExample = (props: DialogProps) => {
  const { isOpen, toggle, onSubmit } = props;
  const { t } = useTranslation("shared");

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Example</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit,
              earum enim doloribus rerum repudiandae voluptatem, nihil ad dicta
              necessitatibus, aliquam eius numquam id dolorum quas nulla facilis
              a cumque! Architecto?
            </DialogDescription>
          </DialogHeader>

          <Formik initialValues={{}} onSubmit={onSubmit || (() => {})}>
            {({ isSubmitting }) => {
              return (
                <Form>
                  <DialogFooter className="self-end">
                    <Button type="submit" isLoading={isSubmitting}>
                      {t("yes")}
                    </Button>
                    <Button variant="ghost" type="button" onClick={toggle}>
                      {t("close")}
                    </Button>
                  </DialogFooter>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DialogExample;
