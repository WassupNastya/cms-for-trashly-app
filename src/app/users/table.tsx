import { CellParams, ColDef } from '@material-ui/data-grid';
import { StoreType } from 'core/rootReducer';
import React, { useCallback, useMemo, useState } from 'react';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';
import { useSelector } from 'react-redux';
import { useUsers } from 'app/common/useData';
import { useSearch } from 'app/common/searchProvider';
import { User } from 'data/model';
import { Role } from 'data/enums';
import { useDialog } from 'app/common/useDialog';

import { UserModal } from './userModal';

export const Table: React.FC = () => {
  const users = useSelector((state: StoreType) => state.data.users);

  const [loading, setLoading] = useState(false);

  useUsers({ needEffect: true, setLoading });

  const { dialog, show, hide } = useDialog();

  const actionCell = useCallback(
    (params: CellParams) => {
      const id = params.value.toString();
      return (
        <MenuButton id={id} onEdit={() => show(id)} editLabel="Change role" />
      );
    },
    [show]
  );

  const getRole = (role: string) => {
    switch (role) {
      case Role.Viewer:
        return 'Viewer';
      case Role.Editor:
        return 'Editor';
      case Role.Admin:
        return 'Administrator';
    }
  };

  const roleCell = useCallback((params: CellParams) => {
    const role = params.value.toString();
    return <div style={{ width: '100%' }}>{getRole(role)}</div>;
  }, []);

  const columns: ColDef[] = useMemo(
    () => [
      { field: 'name', headerName: 'Email', flex: 1 },
      { field: 'role', headerName: 'Role', flex: 1, renderCell: roleCell },
      {
        field: 'id',
        headerName: ' ',
        renderCell: actionCell,
        flex: 1,
        sortable: false,
      },
    ],
    [actionCell, roleCell]
  );

  const { filterItem } = useSearch();
  const filteredRows = useMemo(
    () => users.filter((x: User) => filterItem(x.name ?? '')),
    [filterItem, users]
  );

  return (
    <>
      <TableTemplate
        columns={columns}
        rows={filteredRows}
        loading={loading}
      ></TableTemplate>
      {dialog((id) => (
        <UserModal hide={hide} id={id} />
      ))}
    </>
  );
};
