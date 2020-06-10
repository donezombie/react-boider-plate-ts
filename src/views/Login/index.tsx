import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, FastField } from 'formik';
import ErrorFocus from 'components/ErrorFocus';
import InputField from "components/CustomField/InputField";
import { login } from "redux-module/actions/authActions";
import { authReducerSelector } from "redux-module/selectors/auth";
import { Redirect } from "react-router-dom";

const LoginPage = (props: any) => {
  const dispatch = useDispatch();
  const authReducer = useSelector(authReducerSelector);
  const { isLogin } = authReducer;

  if (isLogin) {
    return <Redirect to="/" />
  }

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={(values) => {
        const { username, password } = values;
        dispatch(login(username, password));
      }}
    >
      {(propsFormik) => (
        <Form>
          <ErrorFocus />
          <div>
            <label htmlFor="username">UserName</label>
            <FastField
              component={InputField}
              name="username"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <FastField
              component={InputField}
              name="password"
              type="password"
            />
          </div>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )
}
export default LoginPage;