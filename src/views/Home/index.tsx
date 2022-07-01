import React from "react";
import useGetTodoList from "hooks/todos/useGetTodoList";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { data: todoList, loading } = useGetTodoList();

  //! Render
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <span>{t("message:hello")}</span>
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
