import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { useCreateAppIntegration } from 'hooks/app/useAppHooks';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogAddOrEditApp from './Dialogs/DialogAddOrEditApp';
import { showError, showSuccess } from 'helpers/toast';
import { queryKeys } from 'consts';
import { useQueryClient } from '@tanstack/react-query';
import TableListApp from './Components/TableListApp';
import TableInstalledApp from './Components/TableInstalledApp';

const AppManagement = () => {
  //! State
  const queryClient = useQueryClient();
  const { mutateAsync: createAppIntegration } = useCreateAppIntegration();

  const {
    open: openAddApp,
    toggle: toggleAddApp,
    shouldRender: shouldRenderAddApp,
  } = useToggleDialog();

  //! Function

  //! Render
  return (
    <CommonStyles.Box>
      {shouldRenderAddApp && (
        <DialogAddOrEditApp
          isOpen={openAddApp}
          toggle={toggleAddApp}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                setSubmitting(true);
                await createAppIntegration(values);
                showSuccess('Add new Application successfully!');
                await queryClient.refetchQueries([queryKeys.getAppList]);
                setSubmitting(false);
                toggleAddApp();
              } catch (error) {
                setSubmitting(false);
                showError(error);
              }
            })();
          }}
        />
      )}

      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CommonStyles.Button onClick={toggleAddApp}>
          <CommonIcons.InboxIcon sx={{ mr: 1 }} /> Add new Application
        </CommonStyles.Button>
      </CommonStyles.Box>

      <TableListApp />

      <CommonStyles.Box sx={{ mt: 4 }}>
        <TableInstalledApp />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(AppManagement);
