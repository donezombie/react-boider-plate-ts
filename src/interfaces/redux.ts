import { ResponseGenerator } from "./index";
import { Saga } from "@redux-saga/types";

export interface ReduxCallbacks<T = any> {
  onSuccess?: (response?: ResponseGenerator<T>) => void;
  onFailed?: (error?: any, data?: T) => void;
  onCancelled?: (data?: T) => void;
}

export interface Action<T = any> {
  type: string;
  payload?: T;
}

export interface Payload {
  [key: string | number]: any;
  payload: { [key: string | number]: any; callbacks: ReduxCallbacks };
}
export interface SagaCreator {
  [key: string]: {
    isTakeEvery?: boolean;
    saga: Saga<Payload[]>;
  };
}
