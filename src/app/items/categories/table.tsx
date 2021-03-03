import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';
import { CellParams, ColDef } from '@material-ui/data-grid';
import { useCategories } from 'app/common/useData';
import { useDeleteUndo } from 'app/common/useDeleteUndo';
import { Category } from 'data/model';
import { deleteCategoryAsync } from 'data/actions';

interface Props {
  showDrawer: (id: string) => void;
}

export const Table: React.FC<Props> = ({ showDrawer }) => {
  const [loading, setLoading] = useState(false);

  const categories = useSelector((state: StoreType) => state.data.categories);

  useCategories({ setLoading, needEffect: true });
  const { rowsToDisplay, onDelete } = useDeleteUndo<Category>(categories);

  const actionCell = useCallback(
    (params: CellParams) => {
      const id = params.value.toString();
      return (
        <MenuButton
          id={id}
          onEdit={() => showDrawer(id)}
          onDelete={() => onDelete(id, deleteCategoryAsync, (el) => el.name)}
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
