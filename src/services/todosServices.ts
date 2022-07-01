import TodoModel from "models/todo.model";
import httpService from "./httpServices";
import { GET_TODOS_URL } from "constants/api";
import { ResponseGenerator } from "interfaces";

class TodosService {
  getTodos(): Promise<ResponseGenerator<TodoModel[]>> {
    return httpService.get(GET_TODOS_URL);
  }
}

export default new TodosService();
