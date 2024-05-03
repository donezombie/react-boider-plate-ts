import { isString } from "lodash";
import { toast, ToastOptions } from "react-toastify";

export const showSuccess = (msg: any, options?: ToastOptions) => {
  if (isString(msg)) {
    toast.success(msg, options);
    return;
  }

  toast.success("Error default");
};

export const showError = (error: any, options?: ToastOptions) => {
  if (error?.response) {
    if (error?.response?.data?.errors) {
      toast.error(JSON.stringify(error?.response?.data?.errors));
      return;
    }

    if (error?.response?.data?.title) {
      toast.error(JSON.stringify(error?.response?.data?.title));
      return;
    }
  }

  if (isString(error) || isString(error.toString())) {
    toast.error(error, options);
    return;
  }

  toast.error("Error default");
};
