import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTodosList } from "redux/modules/todos";
import { GetListTodoSelector } from "redux/selectors";

const HomePage = (props: any) => {
  const dispatch = useDispatch();
  const todoList = GetListTodoSelector();
  const { data: listTodo, loading } = todoList;

  useEffect(() => {
    dispatch(getTodosList());
  }, [dispatch]);

  // Render
  if (loading) {
    return (
      <div>Loaing...</div>
    )
  }

  return (
    <div>
      List Todo
      <hr />
      {listTodo.map((el:any) => (
        <div key={el.id}>
          {el.id} - {el.title}
        </div>
      ))}
    </div>
  )
}
export default HomePage;