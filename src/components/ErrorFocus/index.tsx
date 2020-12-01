import { useEffect } from 'react';
import { useFormikContext } from 'formik';

const FocusError = () => {
  const { errors, isSubmitting, isValidating, isValid } = useFormikContext<any>();

  useEffect(() => {
    const checkErrorAndScroll = () => {
      if (!isSubmitting && !isValidating && !isValid) {
        let idError: any;
        const keys = Object.keys(errors);
        if (keys.length > 0) {
          // For Array Field
          if (typeof errors[keys[0]] === 'object') {
            setTimeout(() => {
              const selectorFieldArray = `[name*="${keys[0]}"]`;
              const errorElementFieldArray: any = document.querySelector(selectorFieldArray);
              if (errorElementFieldArray) {
                errorElementFieldArray.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                  inline: 'start',
                });
                errorElementFieldArray.focus({
                  preventScroll: true,
                });
              }
            }, 0);

            return;
          }

          const selector = `[name*="${keys[0]}"]`;
          const errorElement: any = document.querySelector(selector);

          if (errorElement) {
            const name = errorElement.getAttribute('name');
            idError = document.querySelector(`[id='${name}']`);

            // For element hidden / select
            const errorElementRect = errorElement.getBoundingClientRect();

            // Always get the final modal in case nest modal.
            const modalElement = document.querySelectorAll('.modal')[document.querySelectorAll('.modal').length - 1];

            // In case modal / dialog
            if (modalElement) {
              const modalElementRect = modalElement.getBoundingClientRect();
              const offset = errorElementRect.top - modalElementRect.top;
              modalElement.scrollTo({
                top: offset - 100,
                behavior: 'smooth',
              });
              errorElement.focus({
                preventScroll: true,
              });
            } else {
              if (idError) {
                idError.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                  inline: 'start',
                });
                idError.focus({
                  preventScroll: true,
                });
              } else {
                errorElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                  inline: 'start',
                });
                errorElement.focus({
                  preventScroll: true,
                });
              }
            }
          }
        }
      }
    };

    checkErrorAndScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting, isValidating, isValid]);

  return null;
};

export default FocusError;
