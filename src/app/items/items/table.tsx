import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';
import { CellParams, ColDef } from '@material-ui/data-grid';
import { useItems } from 'app/common/useData';

export const Table: React.FC = () => {
  const [loading, setLoading] = useState(false);

  useItems({ setLoading, needEffect: true });

  const items = useSelector((state: StoreType) => state.data.items);

  const actionCell = useCallback((params: CellParams) => {
    return <MenuButton id={params.value.toString()} />;
  }, []);

  const columns: ColDef[] = useMemo(
    () => [
      { field: 'name', headerName: 'Name', flex: 3 },
      { field: 'group', headerName: 'Group', flex: 3 },
      { field: 'properties', headerName: 'Properties', flex: 3 },
      {
        field: 'id',
        headerName: 'Actions',
        flex: 1,
        renderCell: actionCell,
      },
    ],
    [actionCell]
  );

  return (
    <TableTemplate
      columns={columns}
      rows={items}
      loading={loading}
    ></TableTemplate>
  );
};
