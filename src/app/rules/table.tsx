import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';
import { getRulesAsync } from 'data/actions';
import { convertType } from 'data/helper';
import { CellParams, ColDef } from '@material-ui/data-grid';

export const Table: React.FC = () => {
  const dispatch = useDispatch();

  const getRules = useCallback(() => {
    dispatch(getRulesAsync());
  }, [dispatch]);

  useEffect(() => getRules(), [getRules]);

  const rules = useSelector((state: StoreType) => state.data.rules);

  const getType = useCallback((params: CellParams) => {
    return convertType(Number(params.value));
  }, []);

  const actionCell = useCallback((params: CellParams) => {
    return <MenuButton id={params.value.toString()} />;
  }, []);

  const columns: ColDef[] = useMemo(
    () => [
      { field: 'ruleFor', headerName: 'Rule for', flex: 2 },
      { field: 'type', headerName: 'Type', valueGetter: getType, flex: 2 },
      { field: 'description', headerName: 'Description', flex: 2 },
      { field: 'location', headerName: 'Location', flex: 2 },
      {
        field: 'id',
        headerName: 'Actions',
        renderCell: actionCell,
        flex: 1,
      },
    ],
    [actionCell, getType]
  );

  return <TableTemplate columns={columns} rows={rules}></TableTemplate>;
};
