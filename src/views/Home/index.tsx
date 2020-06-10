import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "redux-module/actions/testActions";
import { todosReducerSelector } from "redux-module/selectors/todos";

const HomePage = (props: any) => {
  const dispatch = useDispatch();
  const todosReducer = useSelector(todosReducerSelector);
  const { todos, isFetching, errorTodos } = todosReducer;
  
  useLayoutEffect(() => {
    dispatch(fetchData());
  }, []);

  // RENDER
  if (isFetching) {
    return 'Loading...'
  }

  if (errorTodos) {
    return errorTodos.toString();
  }

  if (todos.length <= 0) {
    return 'Todos is empty!'
  }

  return todos.map((el:any) => (
    <div key={el.id}>
      {el.id} - {el.title}
    </div>
  ));
}
export default HomePage;