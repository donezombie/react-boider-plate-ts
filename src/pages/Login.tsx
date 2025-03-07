import CommonIcons from "@/components/CommonIcons";
import FormikField from "@/components/CustomFieldsFormik/FormikField";
import InputField from "@/components/CustomFieldsFormik/InputField";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BaseUrl from "@/consts/baseUrl";
import { useAuth } from "@/providers/AuthenticationProvider";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";

const Login = () => {
  //! State
  const { t } = useTranslation("shared");
  const { login, isLogged } = useAuth();

  //! Render
  if (isLogged) {
    return <Navigate to={BaseUrl.Homepage} />;
  }

  return (
    <div className="component:Login flex h-[100vh] w-[100vw] items-center justify-center p-2">
      <Formik
        validationSchema={Yup.object().shape({
          username: Yup.string().required(
            t("validationMessage.usernameIsRequired")
          ),
          password: Yup.string().required(
            t("validationMessage.passwordIsRequired")
          ),
        })}
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const { username, password } = values;
            await login({ username: username, password });
          } catch (error) {
            console.log("error", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="md:min-w-[500px]">
              <div className="mb-8 flex justify-center text-3xl font-bold">
                <Logo />
              </div>
              <Card className="shadow-md">
                <CardHeader className="pb-5">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    {t("login")}
                  </h1>
                  <p className="max-w-[290px] text-sm text-muted-foreground">
                    {t("loginPage.subHeader")}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <FormikField
                    component={InputField}
                    name="username"
                    label={t("username")}
                    placeholder={t("placeholder.inputUsername")}
                    required
                  />

                  <FormikField
                    component={InputField}
                    name="password"
                    type="password"
                    label={t("password")}
                    placeholder={t("placeholder.inputPassword")}
                    required
                  />

                  <Link
                    to={BaseUrl.ForgotPassword}
                    className="is-link text-right text-sm text-muted-foreground"
                  >
                    {t("forgotPassword")}
                  </Link>

                  <Button type="submit" isLoading={isSubmitting}>
                    <CommonIcons.LogIn className="icon" /> {t("login")}
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

export default Login;
