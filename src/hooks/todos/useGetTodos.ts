import { useEffect, useState, useCallback } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { flatten, isArray, isEmpty } from 'lodash';
import { useSave } from 'stores/useStore';
import { showError } from 'helpers/toast';

import { Todo } from 'interfaces/todo';
import todoService, { RequestGetToDoList, ResponseToDoList } from 'services/todoService';

/**
 * GUIDE
 * Snippet for infinite scroll with page + rowsPerPage
 * Maybe you should check function:
 * - interface Request / Response
 * - parseRequest
 * - checkConditionPass
 * - fetch
 * - refetch
 */

//* Check parse body request
const parseRequest = (filters: RequestGetToDoList) => {
  return cloneDeep({
    page: filters.page,
    rowsPerPage: filters.rowsPerPage,
  });
};

const useGetTodos = (
  filters: RequestGetToDoList,
  options: { isTrigger?: boolean; refetchKey?: string } = { isTrigger: true, refetchKey: '' }
) => {
  //! State
  const { isTrigger = true, refetchKey = '' } = options;

  const save = useSave();
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasMore, setHasMore] = useState(false);

  //! Function
  const fetch: () => Promise<ResponseToDoList> | undefined = useCallback(() => {
    if (!isTrigger) {
      return;
    }

    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const nextFilters = parseRequest(filters);
          const response = await todoService.getTodoList(nextFilters);
          resolve(response);
        } catch (error) {
          setError(error);
          reject(error);
        }
      })();
    });
  }, [filters, isTrigger]);

  const checkConditionPass = useCallback(
    (response: ResponseToDoList, options: { isLoadmore?: boolean } = {}) => {
      const { isLoadmore } = options;

      //* Check condition of response here to set data
      if (isArray(response?.data)) {
        if (isLoadmore) {
          setData((prev) => {
            let nextPages = cloneDeep(prev);
            nextPages = [...(nextPages || []), ...(response?.data || [])];
            return nextPages;
          });
        } else {
          setData(response?.data);
        }

        setHasMore(!isEmpty(response?.data));
      }
    },
    [filters.rowsPerPage]
  );

  const fetchMore = useCallback(
    async (shouldSetData: boolean) => {
      setLoadingMore(true);
      const response = await fetch();
      if (shouldSetData && response) {
        checkConditionPass(response, { isLoadmore: true });
      }

      setLoadingMore(false);
    },
    [fetch, checkConditionPass]
  );

  //* Refetch implicity (without changing loading state)
  const refetch = useCallback(async () => {
    try {
      setRefetching(true);
      const page = filters?.page || 1;

      let listRequest: Promise<ResponseToDoList>[] = [];
      for (let eachPage = 0; eachPage < page; eachPage++) {
        const nextFilters = parseRequest(filters);
        nextFilters.page = eachPage;

        const request = todoService.getTodoList(nextFilters);

        listRequest = [...listRequest, request];
      }

      const responses = await Promise.allSettled(listRequest);
      const allData = responses.map((el) => {
        if (el.status === 'fulfilled') {
          return isArray(el?.value?.data) ? el?.value?.data : [];
        }

        return [];
      });
      setData(flatten(allData));
      setRefetching(false);
    } catch (error: any) {
      if (!error.isCanceled) {
        showError(error);
      }
    }
  }, [filters]);

  useEffect(() => {
    save(refetchKey, refetch);
  }, [save, refetchKey, refetch]);

  //* Refetch with changing loading state
  const refetchWithLoading = useCallback(
    async (shouldSetData: boolean) => {
      try {
        setLoading(true);
        const response = await fetch();
        if (shouldSetData && response) {
          checkConditionPass(response);
        }
        setLoading(false);
      } catch (error) {
        showError(error);
        setLoading(false);
      }
    },
    [fetch, checkConditionPass]
  );

  useEffect(() => {
    let shouldSetData = true;
    if (filters.page !== undefined && filters.page <= 0) {
      refetchWithLoading(shouldSetData);
      return;
    }

    //* If offset > 0 -> fetch more
    fetchMore(shouldSetData);

    return () => {
      shouldSetData = false;
    };
  }, [filters.page, fetchMore, refetchWithLoading]);

  return {
    data,
    loading,
    error,
    refetch,
    refetchWithLoading,
    refetching,
    loadingMore,
    hasMore,
    setData,
  };
};

export default useGetTodos;
