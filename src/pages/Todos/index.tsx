import { cloneDeep } from "lodash";
import PageWrapper from "@/components/PageWrapper";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFiltersHandler from "@/hooks/useFiltersHandler";
import { useGetTodos } from "@/pages/Todos/hooks/useTodos";

const Todos = () => {
  //! State
  const { filters, setFilters } = useFiltersHandler({
    page: 1,
    rowsPerPage: 10,
  });

  const { data, isPending } = useGetTodos({ filters });

  //! Function
  const handleChangePage = (step: number) => {
    setFilters((prev) => {
      const next = cloneDeep(prev);
      next.page = next.page + step;
      return next;
    });
  };

  //! Render
  const renderContent = () => {
    if (isPending) {
      return (
        <div className="flex justify-center py-8">
          <Loading />
        </div>
      );
    }

    if (!data?.length) {
      return (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No todos found.
        </p>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-28">Completed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.id}</TableCell>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.completed ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <PageWrapper>
      <div className="component:Todos">
        <h2 className="mb-4 text-lg font-semibold">Todos</h2>

        {renderContent()}

        <div className="mt-4 flex gap-3">
          <Button
            variant="secondary"
            disabled={filters.page <= 1}
            onClick={() => handleChangePage(-1)}
          >
            Back
          </Button>
          <Button onClick={() => handleChangePage(1)}>Next</Button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Todos;
