import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AuthService from "@/services/AuthService";
import { showError, showSuccess } from "@/helpers/toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FormikField from "@/components/CustomFieldsFormik/FormikField";
import InputField from "@/components/CustomFieldsFormik/InputField";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthenticationProvider";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import BaseUrl from "@/consts/baseUrl";

const ResetPassword = () => {
  //! State
  const { t } = useTranslation();
  const { isLogged } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");

  //! Function

  //! Render
  if (isLogged || !code) {
    return <Navigate to={BaseUrl.Homepage} />;
  }

  return (
    <div
      className={cn(
        "component:ResetPassword flex h-[100vh] w-[100vw] items-center justify-center p-2"
      )}
    >
      <Formik
        validationSchema={Yup.object().shape({
          newPassword: Yup.string().required(
            t("validationMessage.passwordIsRequired")
          ),
        })}
        initialValues={{
          code: code,
          newPassword: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            await AuthService.verifyResetPassword({
              code: values.code,
              newPassword: values.newPassword,
            });

            showSuccess(t("success.changePasswordSuccessfully"));
            setTimeout(() => {
              navigate(BaseUrl.Login);
            }, 300);
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
                    Reset password
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Just one final step
                    <br />
                    Create a new password for your account
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <FormikField
                    component={InputField}
                    type="password"
                    name="newPassword"
                    label={t("newPassword")}
                    placeholder={t("placeholder.inputNewPassword")}
                    required
                  />

                  <Button type="submit" isLoading={isSubmitting}>
                    {t("submit")}
                  </Button>
                </CardContent>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ResetPassword;
