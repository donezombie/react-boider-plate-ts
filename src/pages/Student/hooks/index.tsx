import { useMutation, useQuery } from '@tanstack/react-query';
import { PromiseResponseBase } from 'interfaces/common';
import { showError } from 'helpers/toast';
import httpService from 'services/httpService';

export const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const queryKeysStudent = {
  list: 'student-list',
  create: 'student-create',
  delete: 'student-delete',
  edit: 'student-edit',
  detail: 'student-detail',
};

interface Student {}

interface RequestList {}

interface RequestCreate {}

interface RequestEdit {}

interface RequestDelete {}

interface RequestDetail {}

export const StudentHooks = {
  useGetList: (filters?: RequestList) =>
    useQuery({
      queryKey: [queryKeysStudent.list, filters],
      queryFn: (): PromiseResponseBase<Student[]> =>
        httpService.get(`${API_URL}`),
      onError: (error) => showError(error),
    }),
  useGetDetail: (body?: RequestDetail) =>
    useQuery({
      queryKey: [queryKeysStudent.detail, body],
      queryFn: () => httpService.get(`${API_URL}/${body}`),
      onError: (error) => showError(error),
    }),
  useCreate: (body?: RequestCreate) =>
    useMutation({
      mutationKey: [queryKeysStudent.create, body],
      mutationFn: (body: RequestCreate) => httpService.post(`${API_URL}`, body),
    }),
  useEdit: (body?: RequestEdit) =>
    useMutation({
      mutationKey: [queryKeysStudent.edit, body],
      mutationFn: (body: RequestEdit) => httpService.post(`${API_URL}`, body),
    }),
  useDelete: (body?: RequestDelete) =>
    useMutation({
      mutationKey: [queryKeysStudent.delete, body],
      mutationFn: (body: RequestDelete) => httpService.delete(`${API_URL}/${body}`),
    }),
};

