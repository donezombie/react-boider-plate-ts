import React from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import FormikField from "@/components/CustomFieldsFormik/FormikField";
import InputField from "@/components/CustomFieldsFormik/InputField";
import { Button } from "@/components/ui/button";
import Divider from "@/components/Divider";
import { useAuth } from "@/providers/AuthenticationProvider";

interface TabProfileProps {}

const TabProfile = (props: React.PropsWithChildren<TabProfileProps>) => {
  //! State
  const { t } = useTranslation();
  const { user } = useAuth();
  console.log({ user });

  //! Function

  //! Render
  return (
    <div className={cn("component:TabProfile")}>
      <h2 className="text-2xl">{t("account.profile")}</h2>

      <Divider />

      <Formik initialValues={user || {}} onSubmit={() => {}}>
        {({ isSubmitting }) => {
          return (
            <Form className="flex flex-col gap-5 md:max-w-[560px]">
              <FormikField
                component={InputField}
                name="username"
                label="Username"
                placeholder="Your Name"
                readOnly
              />

              <FormikField
                component={InputField}
                name="email"
                label="Email"
                placeholder="Email"
                readOnly
              />

              <div className="flex flex-col gap-2 md:flex-row">
                <FormikField
                  component={InputField}
                  name="firstName"
                  label="First name"
                  placeholder="First Name"
                  readOnly
                />

                <FormikField
                  component={InputField}
                  name="lastName"
                  label="Last name"
                  placeholder="Last Name"
                  readOnly
                />
              </div>

              <FormikField
                component={InputField}
                name="address1"
                label="Address"
                placeholder="Address"
                readOnly
              />

              <div className="flex justify-end">
                {/* <Button isLoading={isSubmitting}>{t("update")}</Button> */}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default TabProfile;
