import { useEffect, useState, useCallback, useRef } from "react";
import { useSave } from "@/stores/useStores";
import { showError } from "@/helpers/toast";
import AuthService, { ResponseGetUserInfo } from "@/services/AuthService";
import { Profile } from "@/interfaces/user";

/********************************************************
 * SNIPPET GENERATED
 * GUIDE
 * Snippet for infinite scroll with page + rowsPerPage
 * Maybe you should check function:
 * - interface Request / Response
 * - parseRequest
 * - checkConditionPass
 * - fetch
 * - refetch
 * - requestAPI
 ********************************************************/

//* Check parse body request
const requestAPI = AuthService.getUserInfo;

const useGetUserInfo = (
  options: { isTrigger?: boolean; refetchKey?: string } = {
    isTrigger: true,
    refetchKey: "",
  }
) => {
  //! State
  const { isTrigger = true, refetchKey = "" } = options;
  const signal = useRef(new AbortController());
  const save = useSave();
  const [data, setData] = useState<Profile | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const [error, setError] = useState<unknown>(null);

  //! Function
  const fetch: () => Promise<ResponseGetUserInfo> | undefined =
    useCallback(() => {
      if (!isTrigger) {
        return;
      }

      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const response = await requestAPI({
              signal: signal.current.signal,
            });
            resolve(response as ResponseGetUserInfo);
          } catch (error) {
            setError(error);
            reject(error);
          }
        })();
      });
    }, [isTrigger]);

  const checkConditionPass = useCallback((response: ResponseGetUserInfo) => {
    //* Check condition of response here to set data

    setData(response?.data.data);
  }, []);

  //* Refetch implicity (without changing loading state)
  const refetch = useCallback(async () => {
    try {
      if (signal.current) {
        signal.current.abort();
        signal.current = new AbortController();
      }

      setRefetching(true);
      const response = await fetch();
      if (response) {
        checkConditionPass(response);
      }

      setRefetching(false);
    } catch (error: any) {
      if (!error.isCanceled) {
        showError(error);
      }
    }
  }, [fetch, checkConditionPass]);

  useEffect(() => {
    save(refetchKey, refetch);
  }, [save, refetchKey, refetch]);

  //* Refetch with changing loading state
  const refetchWithLoading = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch();
      if (response) {
        checkConditionPass(response);
      }
      setLoading(false);
    } catch (error) {
      showError(error);
      setLoading(false);
    }
  }, [fetch, checkConditionPass]);

  //* Main handler
  useEffect(() => {
    //* Fetch initial API
    const fetchAPI = async () => {
      try {
        signal.current = new AbortController();
        setLoading(true);
        const response = await fetch();
        if (response) {
          checkConditionPass(response);
        }
      } catch (error) {
        showError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();

    return () => {
      if (signal.current) {
        signal.current.abort();
      }
    };
  }, [fetch, checkConditionPass]);

  return {
    data,
    loading,
    error,
    refetch,
    refetchWithLoading,
    refetching,
    setData,
  };
};

export default useGetUserInfo;
