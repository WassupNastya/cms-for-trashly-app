import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { Table as TableTemplate } from 'shared/table';
import { useGroups } from 'app/common/useData';
import { CellParams, ColDef } from '@material-ui/data-grid';
import { MenuButton } from 'shared/menuButton';
import { deleteGroupAsync } from 'data/actions';
import { useDeleteUndo } from 'app/common/useDeleteUndo';
import { Group } from 'data/model';

interface Props {
  showDrawer: (id: string) => void;
}

export const Table: React.FC<Props> = ({ showDrawer }) => {
  const [loading, setLoading] = useState(false);

  const groups = useSelector((state: StoreType) => state.data.groups);

  useGroups({ setLoading, needEffect: true });
  const { rowsToDisplay, onDelete } = useDeleteUndo<Group>(groups);

  const actionCell = useCallback(
    (params: CellParams) => {
      const id = params.value.toString();
      return (
        <MenuButton
          id={id}
          onEdit={() => showDrawer(id)}
          onDelete={() => onDelete(id, deleteGroupAsync, el => el.name)}
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
