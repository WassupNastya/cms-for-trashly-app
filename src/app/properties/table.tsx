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
import { useDialog } from 'app/common/useDialog';
import { useSearch } from 'app/common/searchProvider';
import { useCheck } from 'app/common/useCheck';
import { Collection } from 'data/enums';
import { useRoles } from 'app/common/rolesProvider';

import { PropertyModal } from './propertyModal';

export const Table: React.FC = () => {
  const properties = useSelector((state: StoreType) => state.data.properties);

  const [loading, setLoading] = useState(false);

  const { rowsToDisplay, onDelete } = useDeleteUndo<Property>(properties);
  const { dialog, show, hide } = useDialog();
  const checkBeforeDelete = useCheck(Collection.Properties);
  const { isViewer } = useRoles();

  useProperties({ needEffect: true, setLoading });

  const actionCell = useCallback(
    (params: CellParams) => {
      const id = params.value.toString();
      return (
        <MenuButton
          editLabel="Rename"
          id={id}
          onEdit={() => show(id)}
          onDelete={() =>
            checkBeforeDelete(id, () =>
              onDelete(id, deletePropertyAsync, (el) => el.name)
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
      <TableTemplate
        columns={columns}
        rows={filteredRows}
        loading={loading}
      ></TableTemplate>
      {dialog((id) => (
        <PropertyModal hide={hide} id={id} />
      ))}
    </>
  );
};
