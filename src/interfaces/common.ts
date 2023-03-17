import { AxiosResponse } from 'axios';
import { FormikHelpers } from 'formik';

//* Common interface
export interface List<T> extends Array<T> {
  [index: number]: T;
}

export type Timestamp = string;

export interface ResponseGenerator<T = any> {
  config?: any;
  data?: T;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export type TypeAlign = 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;

export interface SelectOption {
  label: string | number;
  value: string | number | undefined;
}

export interface ResponseCommon<T> {
  data: T;
  message: string;
  status?: number;
}

export type PromiseResponseBase<T> = Promise<AxiosResponse<T>>;

export type OrderType = 'desc' | 'asc';

export interface CommonFilters {
  page?: number;
  limit?: number;
  order?: OrderType;
}

export interface DialogI<T> {
  isOpen: boolean;
  toggle: () => void;
  onSubmit?: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>;
}

export interface RequestPagingCommon {
  skip: number;
  take: number;
  filter?: string;
}

export interface User {
  sub: string;
  name: string;
  email: string;
  role: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  amr: string[];
}
