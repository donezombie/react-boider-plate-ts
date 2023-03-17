import { OrderType } from 'interfaces/common';
import React, { useCallback } from 'react';

function useFiltersHandler<T>(initialFilters?: T) {
  //! State
  const [filters, setFilters] = React.useState(initialFilters);
  const [order, setOrder] = React.useState<OrderType>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof any>('');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleSelectAllClick = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      return;
    }
    setSelected([]);
  }, []);

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: keyof any) => {
      setOrder((prevOrder) => {
        const isAsc = orderBy === property && prevOrder === 'asc';
        return isAsc ? 'desc' : 'asc';
      });
      setOrderBy(property);
    },
    [orderBy]
  );

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  return {
    filters,
    rowsPerPage,
    page,
    selected,
    orderBy,
    order,
    setFilters,
    handleChangePage,
    handleSelectAllClick,
    handleRequestSort,
    handleChangeRowsPerPage,
  };
}

export default useFiltersHandler;
