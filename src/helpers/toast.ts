import { isString } from 'lodash';
import { toast, ToastOptions } from 'react-toastify';

export const showSuccess = (msg: any, options?: ToastOptions) => {
  if (isString(msg)) {
    toast.success(msg, options);
    return;
  }

  toast.success('Error default');
};

export const showError = (error: any, options?: ToastOptions) => {
  if (isString(error) || isString(error.toString())) {
    toast.error(error, options);
    return;
  }

  toast.error('Error default');
};
