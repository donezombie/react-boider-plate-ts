import CommonIcons from "@/components/CommonIcons";
import FormikField from "@/components/customFieldsFormik/FormikField";
import InputField from "@/components/customFieldsFormik/InputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import BaseUrl from "@/consts/baseUrl";
import { sleepTime } from "@/helpers/common";
import { useAuth } from "@/providers/AuthenticationProvider";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";

const Login = () => {
  //! State
  const { t } = useTranslation("shared");
  const { toast } = useToast();
  const { login, isLogged } = useAuth();

  //! Render
  if (isLogged) {
    return <Navigate to={BaseUrl.Homepage} />;
  }

  return (
    <div className="component:Login flex h-[100vh] w-[100vw] items-center justify-center p-2">
      <Formik
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Username is required field!"),
          password: Yup.string().required("Password is required field!"),
        })}
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const { username, password } = values;
            await sleepTime(1000);
            login({ username, password });
          } catch (error) {
            toast({
              variant: "destructive",
              description: error as string,
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="min-w-[500px]">
              <div className="mb-8 flex justify-center text-3xl font-bold">
                Logo here
              </div>
              <Card className="shadow-md">
                <CardHeader className="pb-5">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Login (don / don)
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Enter your username and password below
                    <br />
                    to log into your account
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <FormikField
                    component={InputField}
                    name="username"
                    label="Username"
                    placeholder="Enter your username"
                    required
                  />

                  <FormikField
                    component={InputField}
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    required
                  />

                  <Link
                    to={BaseUrl.ForgotPassword}
                    className="is-link text-right text-sm text-muted-foreground"
                  >
                    Forgot password?
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
