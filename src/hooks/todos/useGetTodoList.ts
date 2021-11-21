import { List } from 'interfaces';
import { useCallback, useEffect, useState } from 'react';
import todosServices from 'services/todosServices';
import TodoModel from 'models/todo.model';

export default () => {
  const [data, setData] = useState<List<TodoModel>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const refetch = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await todosServices.getTodos();
        setData(TodoModel.parseTodoListFromResponse(response));
        resolve(response);
      } catch (error) {
        setError(error);
        reject(error);
      }
    });
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await todosServices.getTodos();
        setData(TodoModel.parseTodoListFromResponse(response));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { data, loading, error, refetch };
};
