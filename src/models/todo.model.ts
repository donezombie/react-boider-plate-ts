import { AxiosResponse } from 'axios';
import { isArray } from 'lodash';

class TodoModel {
  userId?: number;
  id?: number;
  title: string;
  completed: boolean;

  constructor() {
    this.userId = 0 || undefined;
    this.id = 0 || undefined;
    this.title = '';
    this.completed = false;
  }

  static parseTodoListFromResponse(response: AxiosResponse) {
    const { data } = response;
    if (isArray(data)) {
      return data.map((el: TodoModel) => el);
    }

    return [];
  }
}

export default TodoModel;
