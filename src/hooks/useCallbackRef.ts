import { isFunction } from 'lodash';
import { useLayoutEffect, useRef } from 'react';

const useCallbackRef = (callback: Function) => {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    if (isFunction(callback)) {
      callbackRef.current = callback;
    }
  }, [callback]);

  return callbackRef;
};

export default useCallbackRef;
