import { AxiosRequestConfig } from "axios";
import httpService from "./httpService";
import { PromiseResponseBase } from "@/interfaces/common";
import { Todo } from "@/interfaces/todo";

export interface RequestGetTodos {
  page: number;
  rowsPerPage: number;
}

export interface RequestAddNewTodo {
  title: string;
}

class TodoService {
  getTodos(
    filters: RequestGetTodos,
    configs?: AxiosRequestConfig
  ): PromiseResponseBase<Todo[]> {
    return httpService.get(
      `https://jsonplaceholder.typicode.com/todos?_page=${filters.page}&_limit=${filters.rowsPerPage}`,
      configs
    );
  }

  createNewTodo(body: RequestAddNewTodo): PromiseResponseBase<string> {
    return httpService.post(`https://jsonplaceholder.typicode.com/todos`, body);
  }
}

export default new TodoService();
