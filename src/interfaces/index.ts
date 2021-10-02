//* Common interface
export interface List<T> extends Array<T> {
  [index: number]: T;
}

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
