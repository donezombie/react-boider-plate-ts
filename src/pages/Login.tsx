import CommonIcons from "@/components/commonIcons";
import CheckBoxField from "@/components/customFieldsFormik/CheckBoxField";
import DateTimePickerField from "@/components/customFieldsFormik/DateTimePickerField";
import FormikField from "@/components/customFieldsFormik/FormikField";
import InputField from "@/components/customFieldsFormik/InputField";
import RadioField from "@/components/customFieldsFormik/RadioField";
import SelectField from "@/components/customFieldsFormik/SelectField";
import SwitchBoxField from "@/components/customFieldsFormik/SwitchBoxField";
import DialogConfirm from "@/components/dialogs/DialogConfirm";
import DialogExample from "@/components/dialogs/DialogExample";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import BaseUrl from "@/consts/baseUrl";
import { sleepTime } from "@/helpers/common";
import useToggleDialog from "@/hooks/useToggleDialog";
import { useAuth } from "@/providers/AuthenticationProvider";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";

const Login = () => {
  //! State
  const { t } = useTranslation("shared");
  const { toast } = useToast();
  const { login, isLogged } = useAuth();

  const [openConfirm, toggleConfirm, shouldRenderConfirm] = useToggleDialog();
  const [openExample, toggleExample, shouldRenderExample] = useToggleDialog();

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
          gender: Yup.string().required("Gender is required field!"),
          date: Yup.date().required("Date is required field!"),
          level: Yup.string().required("Level is required field!"),
        })}
        initialValues={{
          username: "",
          password: "",
          gender: "",
          date: undefined,
          agree: false,
          level: "1",
          toggle: false,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const { username, password } = values;
            await sleepTime(2000);
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
            <Form className="min-w-[400px]">
              {shouldRenderConfirm && (
                <DialogConfirm
                  isOpen={openConfirm}
                  toggle={toggleConfirm}
                  title="Confirmation"
                  content="Are you sure you want do something?"
                  onSubmit={(_, { setSubmitting }) => {
                    setSubmitting(true);
                    setTimeout(() => {
                      toggleConfirm();
                    }, 2000);
                  }}
                />
              )}

              {shouldRenderExample && (
                <DialogExample isOpen={openExample} toggle={toggleExample} />
              )}

              <Card className="shadow-md">
                <CardHeader>Login form (don / don)</CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <Button onClick={toggleConfirm}>Open confirm dialog</Button>
                  <Button onClick={toggleExample}>Open example dialog</Button>

                  <FormikField
                    component={InputField}
                    name="username"
                    label="Username"
                    placeholder="Enter your email"
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

                  <FormikField
                    component={SelectField}
                    name="gender"
                    label="Gender"
                    placeholder="Select gender"
                    placeholderSearch="Search gender"
                    messageItemNotFound="No gender found"
                    required
                    options={[
                      { label: "Male", value: 0 },
                      { label: "Female", value: 1 },
                    ]}
                  />

                  <FormikField
                    component={RadioField}
                    name="level"
                    label="Your Level"
                    options={[
                      { label: "Junior", value: "1" },
                      { label: "Middle", value: "2" },
                      { label: "Senior", value: "3" },
                    ]}
                    required
                  />

                  <FormikField
                    component={DateTimePickerField}
                    name="date"
                    label="Date time picker"
                    required
                  />

                  <FormikField
                    component={SwitchBoxField}
                    name="toggle"
                    label="Is Pro?"
                  />

                  <FormikField
                    component={CheckBoxField}
                    name="agree"
                    label="Agree with the terms"
                  />

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
