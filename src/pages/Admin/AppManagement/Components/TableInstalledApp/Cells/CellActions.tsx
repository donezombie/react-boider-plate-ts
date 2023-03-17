import React, { Fragment } from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import DialogAddOrEditApp from '../../../Dialogs/DialogAddOrEditApp';
import { App } from 'interfaces/apps';
import { useUninstallApp, useUpdateAppIntegration } from 'hooks/app/useAppHooks';
import { showError, showSuccess } from 'helpers/toast';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'consts/index';

interface CellActionsProps {
  item: App;
}

const CellActions = ({ item }: CellActionsProps) => {
  //! State
  const {
    open: openEditApp,
    toggle: toggleEditApp,
    shouldRender: shouldRenderEditApp,
  } = useToggleDialog();
  const { mutateAsync: updateApp } = useUpdateAppIntegration();
  const { mutateAsync: uninstallApp } = useUninstallApp();
  const queryClient = useQueryClient();

  //! Function
  const onClickUninstall = async () => {
    try {
      await uninstallApp({ id: item?.id || '' });
      await queryClient.refetchQueries({ queryKey: [queryKeys.getAppInstalledList] });
      showSuccess('Uninstall app successfully!');
    } catch (error) {
      showError(error);
    }
  };

  //! Render
  return (
    <Fragment>
      {shouldRenderEditApp && (
        <DialogAddOrEditApp
          isOpen={openEditApp}
          toggle={toggleEditApp}
          item={item}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                setSubmitting(true);
                await updateApp({ id: item?.id || '', body: values });
                await queryClient.refetchQueries({
                  queryKey: [queryKeys.getAppList],
                });
                await queryClient.refetchQueries({
                  queryKey: [queryKeys.getAppDetail, item?.id],
                });
                showSuccess(`Update app ${item?.name} successfully!`);
                setSubmitting(false);
              } catch (error) {
                showError(error);
              }
            })();
          }}
        />
      )}

      <CommonStyles.Tooltip title='Edit'>
        <CommonStyles.Button isIconButton onClick={toggleEditApp}>
          <CommonIcons.EditIcon />
        </CommonStyles.Button>
      </CommonStyles.Tooltip>

      <CommonStyles.Tooltip title='Uninstall'>
        <CommonStyles.Button isIconButton onClick={onClickUninstall}>
          <CommonIcons.UninstallIcon />
        </CommonStyles.Button>
      </CommonStyles.Tooltip>
    </Fragment>
  );
};

export default React.memo(CellActions);
