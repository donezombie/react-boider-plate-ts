import { FieldInputProps, FormikProps } from "formik";
import { AxiosResponse } from "axios";
import { FormikHelpers } from "formik";

export interface AdditionalFormikProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
}

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

export type TypeAlign =
  | "left"
  | "right"
  | "inherit"
  | "center"
  | "justify"
  | undefined;

export interface SelectOption {
  label: string;
  value: any;
}

export interface ResponseCommon<T> {
  data: T;
  message: string;
  status?: number;
}

export type PromiseResponseBase<T> = Promise<AxiosResponse<T>>;

export enum Order {
  desc = "desc",
  asc = "asc",
}
export type OrderType = Order.desc | Order.asc;

export interface CommonFilters {
  order?: OrderType;
  page?: number;
  rowsPerPage?: number;
  orderBy?: string | number | symbol;
}

export interface DialogI<T> {
  isOpen: boolean;
  toggle: () => void;
  onSubmit?: (
    values: T,
    formikHelpers: FormikHelpers<T>
  ) => void | Promise<any>;
}

export interface RequestPagingCommon {
  skip: number;
  take: number;
  filter?: string;
}

export interface ResponsePagingCommon<T> {
  totalCount: number;
  items: T;
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

export type SetOptionsValue = React.Dispatch<
  React.SetStateAction<SelectOption[]>
>;
export type SetBooleanState = React.Dispatch<React.SetStateAction<boolean>>;

export interface TimeValue {
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}
