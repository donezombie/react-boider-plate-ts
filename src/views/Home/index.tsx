import React from 'react';
import useGetTodoList from 'hooks/todos/useGetTodoList';

const HomePage: React.FC = () => {
  const { data: todoList, loading } = useGetTodoList();

  // Render
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      List Todo Example
      <hr />
      {todoList.map((todo) => (
        <div key={todo.id}>
          {todo.id} - {todo.title}
        </div>
      ))}
    </div>
  );
};
export default HomePage;
