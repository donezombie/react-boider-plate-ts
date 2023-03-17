import React from 'react';
import { useParams } from 'react-router-dom';

interface TodoProps {}

const Todo = (props: TodoProps) => {
  //! State
  const { id } = useParams();

  //! Function

  //! Render

  return <div>ID: {id}</div>;
};

export default React.memo(Todo);
