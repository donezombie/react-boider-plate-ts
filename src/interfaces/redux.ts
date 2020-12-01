export interface ReduxCallbacks {
  onSuccess?: (data?: any) => void;
  onFailed?: (data?: any) => void;
  onCancelled?: (data?: any) => void;
}

export interface Action<T = any> {
  type: string;
  payload?: T;
}
