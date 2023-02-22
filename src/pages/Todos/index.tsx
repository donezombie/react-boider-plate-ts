import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useGetTodos } from 'hooks/todos';

interface TodosProps {}

const Todos = (props: TodosProps) => {
  //! State
  const { data, isLoading } = useGetTodos();
  const todos = data?.data || [];

  //! Function

  //! Render
  if (isLoading) {
    return <CommonStyles.Loading />;
  }

  return (
    <CommonStyles.Box>
      {todos.map((el) => (
        <CommonStyles.Typography key={el.id} variant='subtitle1'>
          {el.id} - {el.title}
        </CommonStyles.Typography>
      ))}
    </CommonStyles.Box>
  );
};

export default React.memo(Todos);
