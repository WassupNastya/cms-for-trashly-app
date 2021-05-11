import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';
import { CellParams, ColDef } from '@material-ui/data-grid';
import { useItems } from 'app/common/useData';
import { Chip } from '@material-ui/core';
import { useDeleteUndo } from 'app/common/useDeleteUndo';
import { Item } from 'data/model';
import { deleteItemAsync } from 'data/actions';
import { useDialog } from 'app/common/useDialog';
import { useSearch } from 'app/common/searchProvider';
import { useCheck } from 'app/common/useCheck';
import { Collection } from 'data/enums';

import { ItemModal } from './itemModal';

export const Table: React.FC = () => {
  const items = useSelector((state: StoreType) => state.data.items);

  const [loading, setLoading] = useState(false);

  useItems({ needEffect: true, setLoading });
  const { rowsToDisplay, onDelete } = useDeleteUndo<Item>(items);
  const { dialog, show, hide } = useDialog();
  const checkBeforeDelete = useCheck(Collection.Items);

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

  const actionCell = useCallback(
    (params: CellParams) => {
      const id = params.value.toString();
      return (
        <MenuButton
          id={id}
          onEdit={() => show(id)}
          onDelete={() =>
            checkBeforeDelete(id, () =>
              onDelete(id, deleteItemAsync, (el) => el.name)
            )
          }
        />
      );
    },
    [onDelete, show, checkBeforeDelete]
  );

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
        headerName: ' ',
        flex: 1,
        renderCell: actionCell,
        sortable: false,
      },
    ],
    [actionCell, propertiesCell]
  );

  const { filterItem } = useSearch();
  const filteredRows = useMemo(
    () => rowsToDisplay.filter((x) => filterItem(x.name)),
    [filterItem, rowsToDisplay]
  );

  return (
    <>
      <TableTemplate
        columns={columns}
        rows={filteredRows}
        loading={loading}
      ></TableTemplate>
      {dialog((id) => (
        <ItemModal hide={hide} id={id} />
      ))}
    </>
  );
};
