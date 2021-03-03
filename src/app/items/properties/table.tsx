import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';
import { CellParams, ColDef } from '@material-ui/data-grid';
import { StoreType } from 'core/rootReducer';
import { useProperties } from 'app/common/useData';
import { useDeleteUndo } from 'app/common/useDeleteUndo';
import { Property } from 'data/model';
import { deletePropertyAsync } from 'data/actions';

interface Props {
  showDrawer: (id: string) => void;
}

export const Table: React.FC<Props> = ({ showDrawer }) => {
  const [loading, setLoading] = useState(false);

  const properties = useSelector((state: StoreType) => state.data.properties);

  const { rowsToDisplay, onDelete } = useDeleteUndo<Property>(properties);

  useProperties({ setLoading, needEffect: true });

  const actionCell = useCallback(
    (params: CellParams) => {
      const id = params.value.toString();
      return (
        <MenuButton
          id={id}
          onEdit={() => showDrawer(id)}
          onDelete={() => onDelete(id, deletePropertyAsync, (el) => el.name)}
        />
      );
    },
    [showDrawer, onDelete]
  );

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
      rows={rowsToDisplay}
      loading={loading}
    ></TableTemplate>
  );
};
