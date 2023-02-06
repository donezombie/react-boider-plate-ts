import { AxiosResponse } from 'axios';

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

export enum OrderType {
  DESC = 'DESC',
  ASC = 'ASC',
}

export interface CommonFilters {
  page?: number;
  limit?: number;
  order?: OrderType;
}