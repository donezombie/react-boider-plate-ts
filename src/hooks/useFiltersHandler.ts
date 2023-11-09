import { CommonFilters, Order } from "@/interfaces/common";
import { cloneDeep, get } from "lodash";
import React, { useCallback } from "react";

function useFiltersHandler<T>(initialFilters: T & CommonFilters) {
  //! State
  const [filters, setFilters] = React.useState(initialFilters);
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleCheckBox = useCallback((item: unknown, key: any) => {
    const itemChecked = get(item, key);
    setSelected((prev) => {
      if (prev.includes(itemChecked)) {
        return prev.filter((el) => itemChecked !== el);
      }
      return [...prev, itemChecked];
    });
  }, []);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setFilters((prev) => {
      return (
        prev && {
          ...prev,
          page: newPage,
        }
      );
    });
  }, []);

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, rows: any[], key?: string) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => get(n, key || "id"));
        setSelected(newSelected);
        return;
      }

      setSelected([]);
    },
    []
  );

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: keyof any) => {
      setFilters((prev) => {
        if (prev) {
          const isAsc = prev.orderBy === property && prev?.order === "asc";
          return {
            ...prev,
            order: isAsc ? Order.desc : Order.asc,
            orderBy: property,
          };
        }

        return prev;
      });
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => {
        if (prev) {
          return {
            ...prev,
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0,
          };
        }

        return prev;
      });
    },
    []
  );

  const handleResetToInitial = useCallback(() => {
    setFilters(cloneDeep(initialFilters));
    setSelected([]);
  }, [initialFilters]);

  return {
    filters,
    selected,
    setFilters,
    handleChangePage,
    handleSelectAllClick,
    handleRequestSort,
    handleChangeRowsPerPage,
    handleResetToInitial,
    handleCheckBox,
  };
}

export default useFiltersHandler;
