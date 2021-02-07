import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'shared/table';
import { StoreType } from 'core/rootReducer';
import { TableCell } from '@material-ui/core';
import { MenuButton } from 'shared/menuButton';
import { CellParams, ColDef } from '@material-ui/data-grid';

export const LocationsTable: React.FC = () => {
  const locations = useSelector((state: StoreType) => state.data.locations);

  const actionCell = useCallback((params: CellParams) => {
    return <MenuButton id={params.value.toString()} />;
  }, []);

  const columns: ColDef[] = useMemo(
    () => [
      { field: 'displayName', headerName: 'Name', flex: 1 },
      { field: 'locationCode', headerName: 'Location Code', flex: 1 },
      { field: 'county', headerName: 'County', flex: 1 },
      { field: 'state', headerName: 'State', flex: 1 },
      { field: 'country', headerName: 'Country', flex: 1 },
      {
        field: 'id',
        headerName: 'Actions',
        renderCell: actionCell,
        flex: 1,
      },
    ],
    [actionCell]
  );

  return <Table columns={columns} rows={locations}></Table>;
};
