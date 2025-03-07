import FormikField from "@/components/CustomFieldsFormik/FormikField";
import InputField from "@/components/CustomFieldsFormik/InputField";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BaseUrl from "@/consts/baseUrl";
import { showError } from "@/helpers/toast";
import { useAuth } from "@/providers/AuthenticationProvider";
import AuthService from "@/services/AuthService";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";

const ForgotPassword = () => {
  //! State
  const { t } = useTranslation();
  const { isLogged } = useAuth();
  const [emailSuccess, setEmailSuccess] = useState("");

  //! Render
  if (isLogged) {
    return <Navigate to={BaseUrl.Homepage} />;
  }

  return (
    <div className="component:ForgotPassword flex h-[100vh] w-[100vw] items-center justify-center p-2">
      <Formik
        validationSchema={Yup.object().shape({
          username: Yup.string().required(
            t("validationMessage.usernameIsRequired")
          ),
        })}
        initialValues={{
          username: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const response = await AuthService.resetPassword(values.username);
            setEmailSuccess(response?.data?.data?.email);
          } catch (error) {
            showError(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="min-w-[500px]">
              <Card className="shadow-md">
                <CardHeader className="pb-5">
                  <h1 className="text-xl font-semibold tracking-tight">
                    Forgot password
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Enter your registered username and
                    <br />
                    we will send you a link to your email to reset your
                    password.
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <FormikField
                    component={InputField}
                    name="username"
                    label={t("username")}
                    placeholder={t("placeholder.inputUsername")}
                    required
                  />

                  <Button type="submit" isLoading={isSubmitting}>
                    {t("submit")}
                  </Button>

                  {emailSuccess && (
                    <Alert
                      variant={"default"}
                      className="border-green-200 bg-green-100 p-2 text-sm text-green-700"
                    >
                      We have sent the link to {emailSuccess}. Please check in
                      your email!
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
