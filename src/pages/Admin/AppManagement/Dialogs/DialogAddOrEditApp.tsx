import React from 'react';
import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogI } from 'interfaces/common';
import { FastField, Form, Formik } from 'formik';
import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';
import { RequestCreateApp } from 'services/appManagementService';
import SwitchField from 'components/CustomFields/SwitchField';
import { App } from 'interfaces/apps';
import { useGetAppIntegrationDetail } from 'hooks/app/useAppHooks';

interface Props extends DialogI<RequestCreateApp> {
  item?: App;
}

const DialogAddOrEditApp = (props: Props) => {
  //! State
  const { isOpen, toggle, onSubmit, item } = props;
  const isEdit = !!item;

  const { data: resDetailApp, isInitialLoading } = useGetAppIntegrationDetail(item?.id || '');
  const itemFound = resDetailApp?.data;

  const initialValues = {
    appType: itemFound?.appType || 0,
    loginRedirectUri: itemFound?.loginRedirectUri || '',
    logoutRedirectUri: itemFound?.logoutRedirectUri || '',
    scopes: itemFound?.scopes || '',
    name: itemFound?.name || '',
    icon: itemFound?.icon || '',
    supportEmail: itemFound?.supportEmail || '',
    phone: itemFound?.phone || '',
    homepage: itemFound?.homepage || '',
    launchUri: itemFound?.launchUri || '',
    termsConditionsUri: itemFound?.termsConditionsUri || '',
    privacyPolicyUri: itemFound?.privacyPolicyUri || '',
    summary: itemFound?.summary || '',
    description: itemFound?.description || '',
    isLive: itemFound?.isLive || false,
  };

  //! Render
  return (
    <Formik
      enableReinitialize={isEdit}
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit ? onSubmit : () => {}}
    >
      {({ handleSubmit, isSubmitting }) => {
        return (
          <DialogMui scroll='paper' open={isOpen} onClose={toggle}>
            <DialogTitle>
              {isEdit ? `Edit application [${item?.name}]` : 'Add new application'}
            </DialogTitle>
            <DialogContent>
              <Form>
                {isInitialLoading && <CommonStyles.Loading />}
                <CommonStyles.Box sx={{ width: '100%', pt: 2, '& > div': { mb: 2 } }}>
                  <CommonStyles.Typography variant='h6' sx={{ mb: 1 }}>
                    Information
                  </CommonStyles.Typography>
                  <FastField component={TextField} name='name' label='Name' fullWidth />
                  <FastField component={TextField} name='phone' label='Phone' fullWidth />
                  <FastField component={TextField} name='homepage' label='Homepage' fullWidth />
                  <FastField
                    component={TextField}
                    name='supportEmail'
                    label='Support Email'
                    fullWidth
                  />
                  <FastField component={TextField} name='scopes' label='Scope' fullWidth />
                  <FastField component={TextField} name='summary' label='Summary' fullWidth />
                  <FastField
                    component={TextField}
                    multiline
                    name='description'
                    label='Description'
                    fullWidth
                  />

                  <FastField component={SwitchField} name='isLive' label='Live' />

                  <CommonStyles.Typography variant='h6' sx={{ mb: 1 }}>
                    Config URI
                  </CommonStyles.Typography>
                  <FastField component={TextField} name='icon' label='Icon URI' fullWidth />
                  <FastField component={TextField} name='launchUri' label='Launch URI' fullWidth />
                  <FastField
                    component={TextField}
                    name='termsConditionsUri'
                    label='Terms & Conditions URI'
                    fullWidth
                  />
                  <FastField
                    component={TextField}
                    name='privacyPolicyUri'
                    label='Privacy & Policy URI'
                    fullWidth
                  />
                  <FastField
                    component={TextField}
                    name='loginRedirectUri'
                    label='Login Redirect URI'
                    fullWidth
                  />
                  <FastField
                    component={TextField}
                    name='logoutRedirectUri'
                    label='Logout Redirect URI'
                    fullWidth
                  />
                </CommonStyles.Box>
              </Form>
            </DialogContent>
            <DialogActions>
              <CommonStyles.Button variant='text' onClick={toggle}>
                Cancel
              </CommonStyles.Button>
              <CommonStyles.Button
                loading={isSubmitting}
                type='submit'
                onClick={() => handleSubmit()}
              >
                Submit
              </CommonStyles.Button>
            </DialogActions>
          </DialogMui>
        );
      }}
    </Formik>
  );
};

export default DialogAddOrEditApp;
