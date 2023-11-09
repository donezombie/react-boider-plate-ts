import { isPromise } from "@/helpers/common";

const makeCancelablePromise = <T>(promise: T) => {
  let cancel: (reason?: any) => void;
  const wrappedPromise = new Promise((resolve, reject) => {
    cancel = reject;
    if (isPromise(promise)) {
      const promiseTemp = promise as Promise<any>;
      promiseTemp
        .then((val: any) => resolve(val))
        .catch((error: any) => reject(error));
    }
  });

  return {
    promise: wrappedPromise,
    cancel: () => {
      cancel({ isCanceled: true });
    },
  };
};

class PromiseHandler {
  executor?: {
    promise: Promise<any>;
    cancel: () => void;
  };

  constructor() {
    this.executor = undefined;
  }

  takeLatest<T>(promise: T) {
    if (this.executor) {
      this.executor.cancel();
    }

    this.executor = makeCancelablePromise(promise);

    return this.executor.promise;
  }
}

export default PromiseHandler;
