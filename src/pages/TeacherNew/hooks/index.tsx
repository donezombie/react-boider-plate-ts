import { useMutation, useQuery } from '@tanstack/react-query';
import { PromiseResponseBase } from 'interfaces/common';
import { showError } from 'helpers/toast';
import httpService from 'services/httpService';

export const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const queryKeysTeacherNew = {
  list: 'teachernew-list',
  create: 'teachernew-create',
  delete: 'teachernew-delete',
  edit: 'teachernew-edit',
  detail: 'teachernew-detail',
};

interface TeacherNew {}

interface RequestList {}

interface RequestCreate {}

interface RequestEdit {}

interface RequestDelete {}

interface RequestDetail {}

export const TeacherNewHooks = {
  useGetList: (filters?: RequestList) =>
    useQuery({
      queryKey: [queryKeysTeacherNew.list, filters],
      queryFn: (): PromiseResponseBase<TeacherNew[]> =>
        httpService.get(`${API_URL}`),
      onError: (error) => showError(error),
    }),
  useGetDetail: (body?: RequestDetail) =>
    useQuery({
      queryKey: [queryKeysTeacherNew.detail, body],
      queryFn: () => httpService.get(`${API_URL}/${body}`),
      onError: (error) => showError(error),
    }),
  useCreate: (body?: RequestCreate) =>
    useMutation({
      mutationKey: [queryKeysTeacherNew.create, body],
      mutationFn: (body: RequestCreate) => httpService.post(`${API_URL}`, body),
    }),
  useEdit: (body?: RequestEdit) =>
    useMutation({
      mutationKey: [queryKeysTeacherNew.edit, body],
      mutationFn: (body: RequestEdit) => httpService.post(`${API_URL}`, body),
    }),
  useDelete: (body?: RequestDelete) =>
    useMutation({
      mutationKey: [queryKeysTeacherNew.delete, body],
      mutationFn: (body: RequestDelete) => httpService.delete(`${API_URL}/${body}`),
    }),
};

