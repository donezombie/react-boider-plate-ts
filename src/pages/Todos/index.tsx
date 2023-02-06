import { useGetTodos } from 'hooks/todos';
import React from 'react';

interface TodosProps {}

const Todos = (props: TodosProps) => {
  //! State
  const { data, isLoading } = useGetTodos();
  const todos = data?.data || [];

  //! Function

  //! Render
  if (isLoading) {
    return <span>'Loading'</span>;
  }

  return (
    <div>
      {todos.map((el) => (
        <p>
          {el.id} - {el.title}
        </p>
      ))}
    </div>
  );
};

export default React.memo(Todos);
