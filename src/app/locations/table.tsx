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
import { useDialog } from 'app/common/useDialog';
import { useSearch } from 'app/common/searchProvider';

import { LocationModal } from './locationModal';

export const LocationsTable: React.FC = () => {
  const locations = useSelector((state: StoreType) => state.data.locations);

  useLocations({ needEffect: true });
  const { rowsToDisplay, onDelete } = useDeleteUndo<Location>(locations);
  const { dialog, show, hide } = useDialog();

  const actionCell = useCallback(
    (params: CellParams) => {
      const id = params.value.toString();
      return (
        <MenuButton
          id={id}
          onEdit={() => show(id)}
          onDelete={() =>
            onDelete(id, deleteLocationAsync, (el) => el.displayName)
          }
        />
      );
    },
    [onDelete, show]
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
        headerName: ' ',
        renderCell: actionCell,
        flex: 1,
      },
    ],
    [actionCell]
  );

  const { filterItem } = useSearch();
  const filteredRows = useMemo(
    () => rowsToDisplay.filter((x) => filterItem(x.displayName)),
    [filterItem, rowsToDisplay]
  );

  return (
    <>
      <Table columns={columns} rows={filteredRows}></Table>
      {dialog((id) => (
        <LocationModal hide={hide} id={id} />
      ))}
    </>
  );
};
