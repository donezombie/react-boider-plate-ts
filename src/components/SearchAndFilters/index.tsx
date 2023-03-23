import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import { SxProps } from '@mui/material';

interface SearchAndFiltersProps {
  renderFilterFields?: () => React.ReactNode;
  onReset?: () => void;
  sxContainer?: SxProps;
}

function SearchAndFilters<T extends FormikValues = FormikValues>({
  initialValues,
  renderFilterFields,
  onSubmit,
  onReset,
  sxContainer,
}: SearchAndFiltersProps & FormikConfig<T>) {
  //! State

  //! Function

  //! Render
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ resetForm }) => {
        return (
          <Form>
            <CommonStyles.Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, ...sxContainer }}>
              {renderFilterFields && renderFilterFields()}

              <CommonStyles.Box sx={{ display: 'flex', gap: 1 }}>
                <CommonStyles.Button type='submit' startIcon={<CommonIcons.Search />}>
                  Search
                </CommonStyles.Button>
                <CommonStyles.Button
                  type='button'
                  variant='text'
                  onClick={() => {
                    resetForm();
                    onReset && onReset();
                  }}
                  startIcon={<CommonIcons.Reset />}
                >
                  Reset
                </CommonStyles.Button>
              </CommonStyles.Box>
            </CommonStyles.Box>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SearchAndFilters;
