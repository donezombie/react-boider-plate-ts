import React, { useCallback } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

interface LoginProps {}

interface LoginFormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object().shape({});

const Login = (props: LoginProps) => {
  //! State
  const initialValues: LoginFormValues = { username: "", password: "" };

  //! Function
  const onSubmit = useCallback(
    (
      values: LoginFormValues,
      formikHelpers: FormikHelpers<LoginFormValues>
    ) => {
      alert(JSON.stringify(values));
    },
    []
  );

  //! Render
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleBlur, handleChange }) => {
        return (
          <Form>
            <div>
              <label>Username</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>

            <div>
              <button type="submit">Login</button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(Login);
