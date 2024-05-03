import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import useFiltersHandler from "@/hooks/useFiltersHandler";
import useGetTodos from "@/services/modules/todos/hooks/useGetTodos";

const Todos = () => {
  //! State
  const { filters, handleChangePage } = useFiltersHandler({
    page: 1,
    rowsPerPage: 10,
  });
  const { data: todos, loading, refetch } = useGetTodos(filters);

  //! Function

  //! Render
  const renderTodos = () => {
    if (loading) {
      return <Loading />;
    }

    return (
      <div className="todos mt-2 flex flex-col rounded-sm border p-2">
        <h3 className="text-2xl">Get API By Page</h3>
        <b>Page: {filters?.page}</b>

        {todos.map((el) => {
          return (
            <div className="todo" key={el.id}>
              {el.id} - {el.title}
            </div>
          );
        })}

        <div className="mt-2 flex gap-2">
          <Button onClick={refetch}>Refetch</Button>

          <Button
            onClick={() => handleChangePage(event, filters.page + 1)}
            variant="secondary"
          >
            Next page
          </Button>
        </div>
      </div>
    );
  };

  return <div className="component:Todos p-2">{renderTodos()}</div>;
};

export default Todos;
