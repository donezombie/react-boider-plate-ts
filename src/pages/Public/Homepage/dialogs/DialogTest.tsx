import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogI } from 'interfaces/common';
import { FastField, Form, Formik } from 'formik';
import CommonStyles from 'components/CommonStyles';
import TextField from 'components/CustomFields/TextField';

interface Props extends DialogI<{ username: string }> {}

const DialogTest = (props: Props) => {
  const { isOpen, toggle, onSubmit } = props;

  return (
    <Formik
      initialValues={{ username: '' }}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit ? onSubmit : () => {}}
    >
      {() => {
        return (
          <DialogMui open={isOpen} onClose={toggle}>
            <Form>
              <DialogTitle>Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ mb: 2 }}>
                  To subscribe to this website, please enter your email address here. We will send
                  updates occasionally.
                </DialogContentText>
                <CommonStyles.Box sx={{ width: '100%' }}>
                  <FastField component={TextField} name='username' label='Username' fullWidth />
                </CommonStyles.Box>
              </DialogContent>
              <DialogActions>
                <CommonStyles.Button variant='text' onClick={toggle}>
                  Cancel
                </CommonStyles.Button>
                <CommonStyles.Button type='submit'>Subscribe</CommonStyles.Button>
              </DialogActions>
            </Form>
          </DialogMui>
        );
      }}
    </Formik>
  );
};

export default DialogTest;
