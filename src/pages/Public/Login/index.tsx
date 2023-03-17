import React from 'react';
import { Navigate } from 'react-router-dom';
import CommonStyles from 'components/CommonStyles';
import { FastField, Form, Formik } from 'formik';
import TextField from 'components/CustomFields/TextField';
import { useTheme } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { authFirebase } from 'helpers/firebase';
import { useAuth as useAuthOIDC } from 'oidc-react';

interface LoginProps {}

const googleProvider = new GoogleAuthProvider();

const Login = (props: LoginProps) => {
  //! State
  const theme = useTheme();
  const auth = useAuth();
  const authOkta = useAuthOIDC();

  //! Function
  const googleLogin = async () => {
    try {
      await signInWithPopup(authFirebase, googleProvider);
    } catch (error) {}
  };

  console.log(auth);

  //! Render

  if (auth.isLogged) {
    return <Navigate to='/' replace />;
  }

  if (auth.loading) {
    return (
      <CommonStyles.Box sx={{ p: 2 }}>
        <CommonStyles.Loading />
      </CommonStyles.Box>
    );
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={(values, helpersFormik) => {
        (async () => {
          try {
            const { username, password } = values;
          } catch (error: any) {
            alert(`Error Login ${error.toString()}`);
          }
        })();
      }}
    >
      {() => {
        return (
          <Form>
            <CommonStyles.Box
              sx={{
                display: 'flex',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                background: theme.colors?.purple,
              }}
            >
              <CommonStyles.Box
                sx={{
                  boxShadow: 4,
                  p: 3,
                  borderRadius: 2,
                  minWidth: 400,
                  backgroundColor: theme.colors?.white,
                }}
              >
                <CommonStyles.Typography variant='h4' sx={{ textAlign: 'center', mb: 2 }}>
                  Sign in
                </CommonStyles.Typography>
                <CommonStyles.Box
                  sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <CommonStyles.Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '60%' }}
                  >
                    <FastField component={TextField} name='username' label='Username' fullWidth />
                    <FastField
                      component={TextField}
                      name='password'
                      label='Password'
                      type='password'
                      fullWidth
                    />

                    <CommonStyles.Button type='submit'>Login</CommonStyles.Button>
                  </CommonStyles.Box>

                  <CommonStyles.Box>
                    <CommonStyles.Typography sx={{ color: theme.colors?.gray }}>
                      OR
                    </CommonStyles.Typography>
                  </CommonStyles.Box>

                  <CommonStyles.Box>
                    <CommonStyles.Button
                      sx={{ mb: 2 }}
                      variant='outlined'
                      fullWidth
                      onClick={() => {
                        authOkta.signInPopup();
                      }}
                    >
                      Sign in by Okta
                    </CommonStyles.Button>

                    <CommonStyles.Button variant='outlined' fullWidth onClick={googleLogin}>
                      Sign in by Google
                    </CommonStyles.Button>
                  </CommonStyles.Box>
                </CommonStyles.Box>
              </CommonStyles.Box>
            </CommonStyles.Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(Login);
