import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from 'consts/index';
import { RequestPagingCommon } from 'interfaces/common';
import userService, { RequestAssignUser, RequestUpdateUserInfo } from 'services/userService';

export const useGetUserInfo = (isTrigger?: boolean) => {
  return useQuery({
    queryKey: [queryKeys.getUserInfo],
    queryFn: () => userService.getUserInfo(),
    enabled: isTrigger,
  });
};

export const useUpdateUserInfo = () => {
  return useMutation({
    mutationFn: (body: RequestUpdateUserInfo) => userService.updateUserInfo(body),
  });
};

export const useAssignUser = () => {
  return useMutation({
    mutationFn: (body: RequestAssignUser) => userService.assignUser(body),
  });
};

export const useGetUserList = (filters: RequestPagingCommon) => {
  return useQuery({
    queryKey: [queryKeys.getListUser, filters],
    queryFn: () => userService.getListUser(filters),
  });
};

export const useGetUserDetail = (username: string) => {
  return useQuery({
    queryKey: [queryKeys.getListUser, username],
    queryFn: () => userService.getUserDetail({ username }),
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ username, body }: { username: string; body: RequestUpdateUserInfo }) =>
      userService.updateUser(username, body),
  });
};
