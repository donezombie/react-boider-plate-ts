import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from 'consts/index';
import { RequestPagingCommon } from 'interfaces/common';
import appManagementService, { RequestCreateApp } from 'services/appManagementService';

export const useGetListApp = (filters: RequestPagingCommon) => {
  return useQuery({
    queryKey: [queryKeys.getAppList, filters],
    queryFn: () => appManagementService.getListApp(filters),
  });
};

export const useGetListInstalledApp = (filters: RequestPagingCommon) => {
  return useQuery({
    queryKey: [queryKeys.getAppInstalledList, filters],
    queryFn: () => appManagementService.getInstalledListApp(filters),
  });
};

export const useGetAppIntegrationDetail = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.getAppDetail, id],
    queryFn: () => appManagementService.getAppIntegration({ id }),
    enabled: !!id,
  });
};

export const useCreateAppIntegration = () => {
  return useMutation({
    mutationFn: (body: RequestCreateApp) => appManagementService.createApp(body),
  });
};

export const useUpdateAppIntegration = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: RequestCreateApp }) =>
      appManagementService.updateApp(id, body),
  });
};

export const useInstallApp = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => appManagementService.installApp({ id }),
  });
};

export const useUninstallApp = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => appManagementService.uninstallApp({ id }),
  });
};
