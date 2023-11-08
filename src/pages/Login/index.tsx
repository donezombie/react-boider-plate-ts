import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { FastField, Form, Formik } from 'formik';
import { useTheme } from '@mui/material';
import TextField from 'components/CustomFields/TextField';
import * as Yup from 'yup';
import { showError } from 'helpers/toast';
import { useAuth } from 'providers/AuthenticationProvider';
import { Navigate } from 'react-router-dom';
import BaseUrl from 'consts/baseUrl';

const validationLoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required field!'),
  password: Yup.string().required('Password is required field!'),
});

const Login = () => {
  //! State
  const auth = useAuth();
  const theme = useTheme();
  const { login } = useAuth();

  //! Function

  //! Render
  if (auth.isLogged) {
    return <Navigate to={BaseUrl.Homepage} />;
  }

  return (
    <CommonStyles.Box
      className='component:Login'
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors?.purple,
        p: 2,
      }}
    >
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationLoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          try {
            const { username, password } = values;
            setSubmitting(true);
            login({ username, password });
            setSubmitting(false);
          } catch (error) {
            showError(error);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <CommonStyles.Box
              sx={{
                boxShadow: 2,
                p: 2,
                borderRadius: 1,
                backgroundColor: theme.colors?.white,
                width: 450,
              }}
            >
              <Form>
                <CommonStyles.Typography variant='h6' sx={{ mb: 2 }}>
                  Sign in with your username and password (don/don)
                </CommonStyles.Typography>

                <CommonStyles.Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    '& > div': {
                      mb: 2,
                    },
                  }}
                >
                  <FastField component={TextField} name='username' label='Username' fullWidth />
                  <FastField
                    component={TextField}
                    name='password'
                    label='Password'
                    type='password'
                    fullWidth
                  />
                </CommonStyles.Box>

                <CommonStyles.Button
                  type='submit'
                  loading={isSubmitting}
                  fullWidth
                  startIcon={<CommonIcons.SendIcon />}
                >
                  Sign in
                </CommonStyles.Button>
              </Form>
            </CommonStyles.Box>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default React.memo(Login);
