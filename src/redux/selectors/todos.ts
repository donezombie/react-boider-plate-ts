import { useSelector } from 'react-redux';

export const GetListTodoSelector = () => {
  const todos = useSelector((state: any) => state.todosReducer.todos);
  return todos;
};
