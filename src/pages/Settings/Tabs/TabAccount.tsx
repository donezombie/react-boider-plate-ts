import React from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import FormikField from "@/components/CustomFieldsFormik/FormikField";
import InputField from "@/components/CustomFieldsFormik/InputField";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import Divider from "@/components/Divider";
import { showError, showSuccess } from "@/helpers/toast";
import AuthService from "@/services/AuthService";

interface TabAccountProps {}

const TabAccount = (props: React.PropsWithChildren<TabAccountProps>) => {
  //! State
  const { t } = useTranslation();

  //! Function

  //! Render
  return (
    <div className={cn("component:TabAccount")}>
      <h2 className="text-2xl">{t("account.account")}</h2>

      <Divider />

      <Formik
        initialValues={{ currentPassword: "", newPassword: "" }}
        validationSchema={Yup.object().shape({
          currentPassword: Yup.string().required(
            "Current password is required field!"
          ),
          newPassword: Yup.string().required(
            "Next password is required field!"
          ),
        })}
        onSubmit={async (values, formikHelpers) => {
          try {
            formikHelpers.setSubmitting(true);
            const response = await AuthService.changePassword({
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            });
            showSuccess(response?.data.messages as string);
          } catch (error) {
            showError(error);
          } finally {
            formikHelpers.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="flex flex-col gap-4 md:max-w-lg">
              <FormikField
                component={InputField}
                name="currentPassword"
                type="password"
                label="Current password"
                required
                placeholder="New password"
              />

              <FormikField
                component={InputField}
                name="newPassword"
                type="password"
                label="Next password"
                required
                placeholder="Confirm your new password"
              />

              <div className="flex justify-end">
                <Button isLoading={isSubmitting} type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default TabAccount;
