import ScrollWrapper from "@/components/ScrollWrapper";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import useFiltersHandler from "@/hooks/useFiltersHandler";
import useGetTodosInfiniteScroll from "@/services/modules/todos/hooks/useGetTodosInfiniteScroll";

const TodosInfiniteScroll = () => {
  //! State
  const { filters, handleChangePage } = useFiltersHandler({
    page: 1,
    rowsPerPage: 40,
  });
  const {
    data: todos,
    loading,
    refetch,
    hasMore,
    loadingMore,
  } = useGetTodosInfiniteScroll(filters);

  //! Function

  //! Render
  const renderTodos = () => {
    if (loading) {
      return <Loading />;
    }

    return (
      <div className="todos mt-2 flex flex-col rounded-sm border p-2">
        <h3 className="text-2xl">Infinite scroll</h3>
        <b>Page: {filters?.page}</b>

        <ScrollWrapper
          onScrollEnd={() => {
            if (!loadingMore && hasMore) {
              handleChangePage(event, filters.page + 1);
            }
          }}
        >
          {todos.map((el) => {
            return (
              <div className="todo" key={el.id}>
                {el.id} - {el.title}
              </div>
            );
          })}
          {loadingMore && <Loading />}
        </ScrollWrapper>

        <div className="mt-2 flex gap-2">
          <Button onClick={refetch}>Refetch</Button>

          <Button
            onClick={() => handleChangePage(event, filters.page + 1)}
            variant="secondary"
          >
            Loadmore
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="component:TodosInfiniteScroll p-2">{renderTodos()}</div>
  );
};

export default TodosInfiniteScroll;
