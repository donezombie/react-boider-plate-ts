import FormikField from "@/components/customFields/FormikField";
import InputField from "@/components/customFields/InputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import BaseUrl from "@/consts/baseUrl";
import { useAuth } from "@/providers/AuthenticationProvider";
import { Form, Formik } from "formik";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";

const Login = () => {
  const { toast } = useToast();
  const { login, isLogged } = useAuth();

  if (isLogged) {
    return <Navigate to={BaseUrl.Homepage} />;
  }

  return (
    <div className="component:Login flex p-2 w-[100vw] h-[100vh] justify-center items-center">
      <Formik
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Username is required field!"),
          password: Yup.string().required("Password is required field!"),
        })}
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const { username, password } = values;
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
        {() => {
          return (
            <Form className="min-w-[400px]">
              <Card className="shadow-md">
                <CardHeader>Login form (don / don)</CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <FormikField
                    name="username"
                    component={InputField}
                    label="Username"
                    placeholder="Enter your email"
                  />

                  <FormikField
                    name="password"
                    type="password"
                    component={InputField}
                    label="Password"
                    placeholder="Enter your password"
                  />

                  <Button type="submit">Sign in</Button>
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
