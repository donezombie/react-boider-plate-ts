import { List } from 'interfaces';
import { TodoModel } from 'interfaces/models';
import { useEffect, useState } from 'react';
import todosServices from 'services/todosServices';
import { isArray } from 'lodash';

export default () => {
  const [data, setData] = useState<List<TodoModel>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await todosServices.getTodos();
        if (isArray(response?.data)) {
          setData(response?.data);
        }
        resolve(response);
      } catch (error) {
        setError(error);
        reject(error);
      }
    });
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await todosServices.getTodos();

        const isError = response?.data?.error;
        if (isError) {
          setError(isError);
        } else {
          if (isArray(response?.data)) {
            setData(response?.data);
          }
        }

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
