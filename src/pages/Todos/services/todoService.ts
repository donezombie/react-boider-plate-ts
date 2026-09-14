import { AxiosRequestConfig } from "axios";
import httpService from "../../../services/httpService";
import { PromiseResponseBase } from "@/interfaces/common";
import { RequestAddNewTodo, RequestGetTodos, Todo } from "@/pages/Todos/types";

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
