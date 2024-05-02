import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogI } from "@/interfaces/common";
import { Button } from "../ui/button";
import { Form, Formik } from "formik";
import { Fragment } from "react";
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
          <Formik initialValues={{}} onSubmit={onSubmit || (() => {})}>
            {({ isSubmitting }) => {
              return (
                <Fragment>
                  {title && <DialogTitle>{title}</DialogTitle>}
                  {content && <DialogDescription>{content}</DialogDescription>}

                  <Form className="mt-[25px] flex justify-end gap-2">
                    <Button type="submit" isLoading={isSubmitting}>{t("yes")}</Button>
                    <Button variant="ghost" type="button" onClick={toggle}>
                      {t("close")}
                    </Button>
                  </Form>
                </Fragment>
              );
            }}
          </Formik>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DialogConfirm;
