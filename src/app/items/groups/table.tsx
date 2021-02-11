import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { Table as TableTemplate } from 'shared/table';
import { useGroups } from 'app/common/useData';
import { CellParams, ColDef } from '@material-ui/data-grid';
import { MenuButton } from 'shared/menuButton';

export const Table: React.FC = () => {
  const [loading, setLoading] = useState(false);

  useGroups({ setLoading, needEffect: true });

  const groups = useSelector((state: StoreType) => state.data.groups);

  const actionCell = useCallback((params: CellParams) => {
    const id = params.value.toString();
    return <MenuButton id={id} />;
  }, []);

  const columns: ColDef[] = useMemo(
    () => [
      { field: 'name', headerName: 'Name', flex: 5 },
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
      rows={groups}
      loading={loading}
    ></TableTemplate>
  );
};
