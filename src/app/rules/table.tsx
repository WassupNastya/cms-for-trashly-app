import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';
import { getRulesAsync } from 'data/actions';
import { CellParams, ColDef } from '@material-ui/data-grid';
import { useProperties } from 'app/common/useData';
import { Chip } from '@material-ui/core';

export const Table: React.FC = () => {
  const dispatch = useDispatch();

  useProperties({ needEffect: true });

  const getRules = useCallback(() => {
    dispatch(getRulesAsync());
  }, [dispatch]);

  useEffect(() => getRules(), [getRules]);

  const rules = useSelector((state: StoreType) => state.data.rules);

  const propertiesCell = useCallback((params: CellParams) => {
    const properties = params.value as string[];
    return (
      <div style={{ width: '100%' }}>
        {properties.map((label, key) => (
          <Chip key={key} label={label} style={{ marginRight: '0.4rem' }} />
        ))}
      </div>
    );
  }, []);

  const actionCell = useCallback((params: CellParams) => {
    return <MenuButton id={params.value.toString()} />;
  }, []);

  const columns: ColDef[] = useMemo(
    () => [
      { field: 'item', headerName: 'Item', flex: 1 },
      { field: 'group', headerName: 'Group', flex: 1 },
      { field: 'category', headerName: 'Category', flex: 1 },
      {
        field: 'properties',
        headerName: 'Properties',
        flex: 2,
        renderCell: propertiesCell,
      },
      {
        field: 'id',
        headerName: 'Actions',
        renderCell: actionCell,
        flex: 1,
      },
    ],
    [actionCell, propertiesCell]
  );

  return <TableTemplate columns={columns} rows={rules}></TableTemplate>;
};
