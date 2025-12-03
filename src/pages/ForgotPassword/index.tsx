import FormikField from "@/components/customFieldsFormik/FormikField";
import InputField from "@/components/customFieldsFormik/InputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import BaseUrl from "@/consts/baseUrl";
import { sleepTime } from "@/helpers/common";
import { useAuth } from "@/providers/AuthenticationProvider";
import { Form, Formik } from "formik";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";

const ForgotPassword = () => {
  //! State
  const { toast } = useToast();
  const { login, isLogged } = useAuth();

  //! Render
  if (isLogged) {
    return <Navigate to={BaseUrl.Homepage} />;
  }

  return (
    <div className="component:ForgotPassword flex h-[100vh] w-[100vw] items-center justify-center p-2">
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
              <Card className="shadow-md">
                <CardHeader className="pb-5">
                  <h1 className="text-xl font-semibold tracking-tight">
                    Forgot password
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Enter your registered email and
                    <br />
                    we will send you a link to reset your password.
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <FormikField
                    component={InputField}
                    name="email"
                    label="Email"
                    placeholder="your-email@gmail.com"
                    required
                  />

                  <Button type="submit" isLoading={isSubmitting}>
                    Continue
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    You have an account?{" "}
                    <Link to={BaseUrl.Login} className="is-link">
                      Log in
                    </Link>
                  </p>
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
