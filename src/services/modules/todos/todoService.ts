import { CommonFilters } from "@/interfaces/common";
import httpService from "@/services/httpService";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Todo } from "./interfaces/todo";

export interface FiltersGetTodos extends CommonFilters {}
export interface RequestGetTodos extends CommonFilters {}
export type ResponseToDoList = AxiosResponse<Todo[]>;

class TodoService {
  getTodos(filters: RequestGetTodos, configs?: AxiosRequestConfig) {
    return httpService.get(
      `https://jsonplaceholder.typicode.com/todos?_page=${filters.page}&_limit=${filters.rowsPerPage}`,
      configs
    );
  }
}

export default new TodoService();
