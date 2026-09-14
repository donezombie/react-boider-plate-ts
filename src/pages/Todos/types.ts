export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface RequestGetTodos {
  page: number;
  rowsPerPage: number;
}

export interface RequestAddNewTodo {
  title: string;
}
