import FormikField from "@/components/customFieldsFormik/FormikField";
import InputField from "@/components/customFieldsFormik/InputField";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const ChangePassword = () => {
  return (
    <PageWrapper>
      <div className="component:ChangePassword">
        <h1 className="mb-10 text-2xl font-bold md:text-3xl">
          Change Password
        </h1>
        <Formik
          initialValues={{ nextPassword: "", confirmPassword: "" }}
          validationSchema={Yup.object().shape({
            nextPassword: Yup.string().required(
              "New password is required field!"
            ),
            confirmPassword: Yup.string().required(
              "Confirm password is required field!"
            ),
          })}
          onSubmit={() => {}}
        >
          {() => {
            return (
              <Form className="flex max-w-lg flex-col gap-4">
                <FormikField
                  component={InputField}
                  name="nextPassword"
                  type="password"
                  label="New password"
                  required
                  placeholder="New password"
                />

                <FormikField
                  component={InputField}
                  name="confirmPassword"
                  type="password"
                  label="Confirm password"
                  required
                  placeholder="Confirm your new password"
                />

                <Button type="submit">Submit</Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </PageWrapper>
  );
};

export default ChangePassword;
