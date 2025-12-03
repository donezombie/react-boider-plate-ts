import queriesKeys from "@/consts/queriesKeys";
import todoService, { RequestGetTodos } from "@/services/todoService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetTodos = ({
  key,
  filters,
}: {
  key?: string;
  filters: RequestGetTodos;
}) =>
  useQuery({
    queryKey: [queriesKeys.getTodos, key, filters.page],
    queryFn: async ({ signal }) => {
      const response = await todoService.getTodos(filters, { signal });
      return response.data;
    },
  });

export const useAddNewTodo = () =>
  useMutation({ mutationFn: todoService.createNewTodo });
