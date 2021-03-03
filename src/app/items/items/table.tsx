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

interface Props {
  showDrawer: (id: string) => void;
}

export const Table: React.FC<Props> = ({ showDrawer }) => {
  const [loading, setLoading] = useState(false);

  const items = useSelector((state: StoreType) => state.data.items);

  useItems({ setLoading, needEffect: true });
  const { rowsToDisplay, onDelete } = useDeleteUndo<Item>(items);

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
          onEdit={() => showDrawer(id)}
          onDelete={() => onDelete(id, deleteItemAsync, (el) => el.name)}
        />
      );
    },
    [onDelete, showDrawer]
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
      rows={rowsToDisplay}
      loading={loading}
    ></TableTemplate>
  );
};
