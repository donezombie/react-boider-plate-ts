import { ResponseGenerator } from 'interfaces/index';
import { todoActions } from 'redux/creators/modules/todos';
import { useEffect, useState, useCallback } from 'react';
import TodoModel from 'models/todo.model';
import useSagaCreators from 'hooks/useSagaCreators';

const useGetTodoList = () => {
  const { dispatch } = useSagaCreators();
  const [data, setData] = useState<TodoModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const refetch = useCallback(() => {
    dispatch(todoActions.getTodos, {
      callbacks: {
        onSuccess: (response: ResponseGenerator<TodoModel[]>) => {
          setData(response?.data || []);
        },
        onFailed: (error: any) => {
          setError(error);
        },
      },
    });
  }, [dispatch]);

  useEffect(() => {
    const fetch = () => {
      setLoading(true);
      dispatch(todoActions.getTodos, {
        callbacks: {
          onSuccess: (response: ResponseGenerator<TodoModel[]>) => {
            setData(response?.data || []);
            setLoading(false);
          },
          onFailed: (error: any) => {
            setError(error);
            setLoading(false);
          },
        },
      });
    };

    fetch();
  }, [dispatch]);

  return { data, loading, error, refetch };
};

export default useGetTodoList;
