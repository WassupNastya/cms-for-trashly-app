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
import { useDialog } from 'app/common/useDialog';
import { useSearch } from 'app/common/searchProvider';
import { useCheck } from 'app/common/useCheck';
import { Collection } from 'data/enums';

import { CategoryModal } from './categoryModal';

export const Table: React.FC = () => {
  const categories = useSelector((state: StoreType) => state.data.categories);

  const [loading, setLoading] = useState(false);

  useCategories({ needEffect: true, setLoading });
  const { rowsToDisplay, onDelete } = useDeleteUndo<Category>(categories);
  const { dialog, show, hide } = useDialog();
  const checkBeforeDelete = useCheck(Collection.Categories);

  const actionCell = useCallback(
    (params: CellParams) => {
      const id = params.value.toString();
      return (
        <MenuButton
          isRename
          id={id}
          onEdit={() => show(id)}
          onDelete={() =>
            checkBeforeDelete(id, () =>
              onDelete(id, deleteCategoryAsync, (el) => el.name)
            )
          }
        />
      );
    },
    [show, onDelete, checkBeforeDelete]
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
      <TableTemplate columns={columns} rows={filteredRows} loading={loading}></TableTemplate>
      {dialog((id) => (
        <CategoryModal hide={hide} id={id} />
      ))}
    </>
  );
};
