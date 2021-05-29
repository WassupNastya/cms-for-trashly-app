import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table as TableTemplate } from 'shared/table';
import { StoreType } from 'core/rootReducer';
import { MenuButton } from 'shared/menuButton';
import { CellParams, ColDef } from '@material-ui/data-grid';
import { useLocations } from 'app/common/useData';
import { useDeleteUndo } from 'app/common/useDeleteUndo';
import { deleteLocationAsync } from 'data/actions';
import { Location } from 'data/model';
import { useDialog } from 'app/common/useDialog';
import { useSearch } from 'app/common/searchProvider';
import { useRoles } from 'app/common/rolesProvider';

import { LocationModal } from './locationModal';

export const Table: React.FC = () => {
  const locations = useSelector((state: StoreType) => state.data.locations);

  const [loading, setLoading] = useState(false);

  useLocations({ needEffect: true, setLoading });
  const { rowsToDisplay, onDelete } = useDeleteUndo<Location>(locations);
  const { dialog, show, hide } = useDialog();
  const { isViewer } = useRoles();

  const actionCell = useCallback(
    (params: CellParams) => {
      const id = params.value.toString();
      return (
        <MenuButton
          id={id}
          onEdit={() => show(id)}
          onDelete={() =>
            onDelete(id, deleteLocationAsync, (el) => el.name)
          }
        />
      );
    },
    [onDelete, show]
  );

  const columns: ColDef[] = useMemo(
    () => [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'locationCode', headerName: 'Location Code', flex: 1 },
      { field: 'county', headerName: 'County', flex: 1 },
      { field: 'state', headerName: 'State', flex: 1 },
      { field: 'country', headerName: 'Country', flex: 1 },
      {
        field: 'id',
        headerName: ' ',
        renderCell: actionCell,
        flex: 1,
        sortable: false,
        hide: isViewer
      },
    ],
    [actionCell, isViewer]
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
        <LocationModal hide={hide} id={id} />
      ))}
    </>
  );
};
