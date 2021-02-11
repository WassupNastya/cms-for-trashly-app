import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';
import { CellParams, ColDef } from '@material-ui/data-grid';
import { useItems } from 'app/common/useData';
import { Chip } from '@material-ui/core';

export const Table: React.FC = () => {
  const [loading, setLoading] = useState(false);

  useItems({ setLoading, needEffect: true });

  const items = useSelector((state: StoreType) => state.data.items);

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
      { field: 'name', headerName: 'Name', flex: 2 },
      { field: 'aliases', headerName: 'Aliases', flex: 2 },
      { field: 'group', headerName: 'Group', flex: 2 },
      {
        field: 'properties',
        headerName: 'Properties',
        flex: 3,
        renderCell: propertiesCell,
        align: 'left',
      },
      {
        field: 'id',
        headerName: 'Actions',
        flex: 1,
        renderCell: actionCell,
      },
    ],
    [actionCell, propertiesCell]
  );

  return (
    <TableTemplate
      columns={columns}
      rows={items}
      loading={loading}
    ></TableTemplate>
  );
};
