import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'shared/table';
import { StoreType } from 'core/rootReducer';
import { MenuButton } from 'shared/menuButton';
import { CellParams, ColDef } from '@material-ui/data-grid';
import { useLocations } from 'app/common/useData';
import { useDeleteUndo } from 'app/common/useDeleteUndo';
import { deleteLocationAsync } from 'data/actions';
import { Location } from 'data/model';

interface Props {
  showDrawer: (id: string) => void;
}

export const LocationsTable: React.FC<Props> = ({ showDrawer }) => {
  const locations = useSelector((state: StoreType) => state.data.locations);

  useLocations({ needEffect: true });
  const { rowsToDisplay, onDelete } = useDeleteUndo<Location>(locations);

  const actionCell = useCallback(
    (params: CellParams) => {
      const id = params.value.toString();
      return (
        <MenuButton
          id={id}
          onEdit={() => showDrawer(id)}
          onDelete={() =>
            onDelete(id, deleteLocationAsync, (el) => el.displayName)
          }
        />
      );
    },
    [onDelete, showDrawer]
  );

  const columns: ColDef[] = useMemo(
    () => [
      { field: 'displayName', headerName: 'Name', flex: 1 },
      { field: 'locationCode', headerName: 'Location Code', flex: 1 },
      { field: 'county', headerName: 'County', flex: 1 },
      { field: 'state', headerName: 'State', flex: 1 },
      { field: 'country', headerName: 'Country', flex: 1 },
      {
        field: 'id',
        headerName: 'Actions',
        renderCell: actionCell,
        flex: 1,
      },
    ],
    [actionCell]
  );

  return <Table columns={columns} rows={rowsToDisplay}></Table>;
};
