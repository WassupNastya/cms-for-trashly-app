import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { Table as TableTemplate } from 'shared/table';
import { useGroups } from 'app/common/useData';
import { CellParams, ColDef } from '@material-ui/data-grid';
import { MenuButton } from 'shared/menuButton';
import { deleteGroupAsync } from 'data/actions';
import { useDeleteUndo } from 'app/common/useDeleteUndo';
import { Group } from 'data/model';
import { useDialog } from 'app/common/useDialog';
import { useSearch } from 'app/common/searchProvider';

import { GroupModal } from './groupModal';

export const Table: React.FC = () => {
  const groups = useSelector((state: StoreType) => state.data.groups);

  useGroups({ needEffect: true });
  const { rowsToDisplay, onDelete } = useDeleteUndo<Group>(groups);
  const { dialog, show, hide } = useDialog();

  const actionCell = useCallback(
    (params: CellParams) => {
      const id = params.value.toString();
      return (
        <MenuButton
          isRename
          id={id}
          onEdit={() => show(id)}
          onDelete={() => onDelete(id, deleteGroupAsync, (el) => el.name)}
        />
      );
    },
    [show, onDelete]
  );

  const columns: ColDef[] = useMemo(
    () => [
      { field: 'name', headerName: 'Name', flex: 5 },
      {
        field: 'id',
        headerName: ' ',
        flex: 1,
        renderCell: actionCell,
        sortable: false,
      },
    ],
    [actionCell]
  );

  const { filterItem } = useSearch();
  const filteredRows = useMemo(
    () => rowsToDisplay.filter((x) => filterItem(x.name)),
    [filterItem, rowsToDisplay]
  );

  return (
    <>
      <TableTemplate columns={columns} rows={filteredRows}></TableTemplate>
      {dialog((id) => (
        <GroupModal hide={hide} id={id} />
      ))}
    </>
  );
};
