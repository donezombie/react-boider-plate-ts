import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'constants';
import todosService from 'services/todosService';

export const useGetTodos = () => {
  return useQuery({ queryKey: [queryKeys.getTodos], queryFn: todosService.getTodos });
};
