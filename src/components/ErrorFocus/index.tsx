import { useEffect } from "react";
import { useFormikContext } from "formik";

const ErrorFocus = () => {
  const { errors, isSubmitting, isValidating } = useFormikContext();

  useEffect(() => {
    if (!isSubmitting && !isValidating) {
      let keys = Object.keys(errors);
      if (keys.length > 0) {
        const selector = `[name=${keys[0]}]`;
        const errorElement = document.querySelector(selector);

        if (errorElement) {
          const name = errorElement.getAttribute('name');
          // For element hidden / select
          const idError = document.getElementById(name || '');

          const errorElementRect = errorElement.getBoundingClientRect();

          // Always get the final modal in case nest modal.
          const modalElement = document.querySelectorAll(".modal")[
            document.querySelectorAll(".modal").length - 1
          ];

          // In case modal / dialog
          if (modalElement) {
            const modalElementRect = modalElement.getBoundingClientRect();
            const offset = errorElementRect.top - modalElementRect.top;
            modalElement.scrollTo({
              top: offset - 100,
              behavior: "smooth"
            });
            // @ts-ignore-start
            errorElement.focus({
              preventScroll: true
            });
            // @ts-ignore-end
          } else {
            if (idError) {
              idError.scrollIntoView({
                behavior: 'smooth',
                block: "end",
                inline: "nearest"
              })
            } else {
              errorElement.scrollIntoView();
            }
          }
        }
      }
    }
  }, [errors, isSubmitting, isValidating]);
  return null;
};

export default ErrorFocus;
