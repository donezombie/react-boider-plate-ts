import React, { useCallback } from 'react';
import { FastField, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useAuthentication } from 'providers/AuthenticationProvider';
import BaseUrl from 'constants/baseUrl';
import { Navigate } from 'react-router-dom';
import TextField from 'components/CustomFields/TextField';
import { Box, Stack } from '@mui/material';
import CommonStyles from 'components/CommonStyles';

interface LoginProps {}

interface LoginFormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required!'),
  password: Yup.string().required('Password is required!'),
});

const Login = (props: LoginProps) => {
  //! State
  const { isLogged, login } = useAuthentication();
  const initialValues: LoginFormValues = { username: '', password: '' };

  //! Function
  const onSubmit = useCallback(
    async (values: LoginFormValues, formikHelpers: FormikHelpers<LoginFormValues>) => {
      const { username, password } = values;
      login({ username, password });
    },
    [login]
  );

  if (isLogged) {
    return <Navigate to={BaseUrl.Homepage} replace />;
  }

  //! Render
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {() => {
        return (
          <Form>
            <Box
              sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  minWidth: '300px',
                  '& > div': {
                    marginBottom: '12px',
                  },
                }}
              >
                <CommonStyles.Typography variant='h4' sx={{ mb: 2 }}>
                  Login
                </CommonStyles.Typography>
                <Box>
                  <FastField
                    component={TextField}
                    name='username'
                    placeholder='Username'
                    label='Username'
                    fullWidth
                  />
                </Box>

                <Box>
                  <FastField
                    component={TextField}
                    name='password'
                    placeholder='Password'
                    label='Password'
                    type='password'
                    fullWidth
                  />
                </Box>

                <Box>
                  <CommonStyles.Button type='submit' fullWidth>
                    Login
                  </CommonStyles.Button>
                </Box>
              </Box>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(Login);
