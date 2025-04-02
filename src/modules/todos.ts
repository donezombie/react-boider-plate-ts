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
    queryFn: ({ signal }) => todoService.getTodos(filters, { signal }),
  });

export const useAddNewTodo = () =>
  useMutation({ mutationFn: todoService.createNewTodo });
