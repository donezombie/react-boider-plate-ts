//* Common interface
export interface List<T> extends Array<T> {
  [index: number]: T;
}

export interface ResponseGenerator<T = any> {
  config?: any;
  data?: T;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
