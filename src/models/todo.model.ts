import { isArray } from "lodash";

class TodoModel {
  userId?: number;
  id?: number;
  title: string;
  completed: boolean;

  constructor(data: TodoModel) {
    this.userId = data?.userId;
    this.id = data?.id;
    this.title = data?.title;
    this.completed = data?.completed;
  }

  static parseTodoListFromResponse(data: any) {
    if (isArray(data)) {
      return data.map((el) => new TodoModel(el));
    }

    return [];
  }
}

export default TodoModel;
