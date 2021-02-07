import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';
import { getDecisionsAsync } from 'data/actions';
import { convertType } from 'data/helper';
import { CellParams, ColDef } from '@material-ui/data-grid';

export const Table: React.FC = () => {
  const dispatch = useDispatch();

  const getDecisions = useCallback(() => {
    dispatch(getDecisionsAsync());
  }, [dispatch]);

  useEffect(() => getDecisions(), [getDecisions]);

  const decisions = useSelector((state: StoreType) => state.data.decisions);

  const getType = useCallback((params: CellParams) => {
    return convertType(Number(params.value));
  }, []);


  const actionCell = useCallback((params: CellParams) => {
    return <MenuButton id={params.value.toString()} />;
  }, []);

  const columns: ColDef[] = useMemo(
    () => [
      { field: 'decisionFor', headerName: 'Decision for', flex: 1 },
      { field: 'type', headerName: 'Type', valueGetter: getType, flex: 1 },
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'decisionNameType', headerName: 'Decision type', flex: 1 },
      { field: 'priority', headerName: 'Priority', flex: 1 },
      { field: 'location', headerName: 'Location', flex: 1 },
      {
        field: 'id',
        headerName: 'Actions',
        renderCell: actionCell,
        flex: 1,
      },
    ],
    [actionCell, getType]
  );

  return <TableTemplate columns={columns} rows={decisions}></TableTemplate>;
};
