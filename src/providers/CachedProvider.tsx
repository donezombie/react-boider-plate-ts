import { isObject } from 'lodash';
import { createContext, useCallback, useContext, useMemo, useRef } from 'react';
import lodash from 'lodash';

interface CachedContextI {
  get: (key: string) => any;
  set: (key: string, value: any) => void;
}

const CachedContext = createContext<CachedContextI>({
  get: () => {},
  set: () => {},
});

export const useCached = () => useContext(CachedContext);

const ToggleThemeProvider = ({ children }: { children: any }) => {
  //! State
  const cachedValues = useRef({});

  const set = useCallback((key: string, value: any) => {
    cachedValues.current = {
      ...cachedValues.current,
      [key]: value,
    };
  }, []);

  const get = useCallback((key: string) => {
    return isObject(cachedValues?.current) ? lodash.get(cachedValues.current, key) : {};
  }, []);

  //! Render
  const value = useMemo(() => {
    return {
      set,
      get,
    };
  }, [set, get]);

  return <CachedContext.Provider value={value}>{children}</CachedContext.Provider>;
};

export default ToggleThemeProvider;
