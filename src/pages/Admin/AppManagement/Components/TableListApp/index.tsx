import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useGetListApp } from 'hooks/app/useAppHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import CellActions from './Cells/CellActions';

const TableListApp = () => {
  //! State
  const {
    filters,
    order,
    orderBy,
    selected,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
  } = useFiltersHandler({ search: '' });

  const { data: resListApp, isLoading } = useGetListApp({
    skip: page,
    take: rowsPerPage,
    filter: filters?.search,
  });
  const data = resListApp?.data?.items || [];
  const totalCount = resListApp?.data?.totalCount || 0;

  //! Function

  //! Render
  if (isLoading) {
    return <CommonStyles.Loading />;
  }

  return (
    <CommonStyles.Box>
      <CommonStyles.Typography variant='h4' sx={{ mb: 2 }}>
        Application Listing
      </CommonStyles.Typography>
      <CommonStyles.Typography sx={{ mb: 2 }} variant='h6'>
        Total: {totalCount}
      </CommonStyles.Typography>

      <CommonStyles.Table
        order={order}
        orderBy={orderBy}
        selected={selected}
        page={page}
        rowsPerPage={rowsPerPage}
        headCells={[
          {
            label: 'Icon',
            id: 'icon',
            Cell: (row) => {
              const { icon } = row;
              return <CommonStyles.Avatar src={icon} sx={{ width: 56, height: 56 }} />;
            },
          },
          {
            label: 'Name',
            id: 'name',
          },
          {
            label: 'Developer name',
            id: 'developerName',
          },
          {
            label: 'Summary',
            id: 'summary',
          },
          {
            label: '',
            id: 'actions',
            disableSort: true,
            Cell: (row) => {
              return <CellActions item={row} />;
            },
          },
        ]}
        totalCount={totalCount}
        rows={data}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleRequestSort={handleRequestSort}
        handleSelectAllClick={handleSelectAllClick}
      />
    </CommonStyles.Box>
  );
};

export default React.memo(TableListApp);
