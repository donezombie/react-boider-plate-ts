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

interface DialogConfirmProps extends DialogI<any> {
  title: React.ReactNode;
  content: React.ReactNode;
}

const DialogConfirm = (props: DialogConfirmProps) => {
  const { isOpen, toggle, onSubmit, title, content } = props;
  const { t } = useTranslation("shared");

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          {(title || content) && (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {content && <DialogDescription>{content}</DialogDescription>}
            </DialogHeader>
          )}

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

export default DialogConfirm;
