import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';
import { CellParams, ColDef } from '@material-ui/data-grid';
import { StoreType } from 'core/rootReducer';
import { useProperties } from 'app/common/useData';

export const Table: React.FC = () => {
  const [loading, setLoading] = useState(false);

  useProperties({ setLoading, needEffect: true });

  const properties = useSelector((state: StoreType) => state.data.properties);

  const actionCell = useCallback((params: CellParams) => {
    return <MenuButton id={params.value.toString()} />;
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
      rows={properties}
      loading={loading}
    ></TableTemplate>
  );
};
