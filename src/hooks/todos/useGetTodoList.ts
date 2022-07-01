import { ResponseGenerator } from "interfaces";
import { useEffect, useState, useCallback } from "react";
import TodoModel from "models/todo.model";
import useSagaCreators from "hooks/useSagaCreators";
import { todoActions } from "redux/creators/modules/todos";

const useGetTodoList = () => {
  const { dispatch } = useSagaCreators();
  const [data, setData] = useState<TodoModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetch = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      dispatch(todoActions.getTodos, {
        callbacks: {
          onSuccess: (response: ResponseGenerator<TodoModel[]>) => {
            setData(TodoModel.parseTodoListFromResponse(response?.data || []));
            resolve(response?.data);
          },
          onFailed: (error: any) => {
            setError(error);
            reject(error);
          },
        },
      });
    });
  }, [dispatch]);

  const refetch = useCallback(async () => {
    await fetch();
  }, [fetch]);

  const refetchWithLoading = useCallback(async () => {
    try {
      setLoading(true);
      await fetch();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [fetch]);

  useEffect(() => {
    refetchWithLoading();
  }, [refetchWithLoading]);

  return { data, loading, error, refetch, refetchWithLoading };
};

export default useGetTodoList;
