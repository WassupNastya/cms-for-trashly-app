import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';
import { CellParams, ColDef } from '@material-ui/data-grid';
import { useProperties, useRules } from 'app/common/useData';
import { useDeleteUndo } from 'app/common/useDeleteUndo';
import { deleteRuleAsync } from 'data/actions';
import { Rule } from 'data/model';
import { useDialog } from 'app/common/useDialog';
import { useSearch } from 'app/common/searchProvider';
import { PropertiesCell } from 'shared/propertiesCell';
import { useRoles } from 'app/common/rolesProvider';

import { RuleModal } from './ruleModal';

export const Table: React.FC = () => {
  const rules = useSelector((state: StoreType) => state.data.rules);

  const [loading, setLoading] = useState(false);

  useRules({ needEffect: true, setLoading });
  useProperties({ needEffect: true });
  const { rowsToDisplay, onDelete } = useDeleteUndo<Rule>(rules);
  const { dialog, show, hide } = useDialog();
  const { isViewer } = useRoles();

  const propertiesCell = useCallback((params: CellParams) => {
    const properties = params.value as string[];
    return <PropertiesCell list={properties} />;
  }, []);

  const actionCell = useCallback(
    (params: CellParams) => {
      const id = params.value.toString();
      return (
        <MenuButton
          id={id}
          onEdit={() => show(id)}
          onDelete={() => onDelete(id, deleteRuleAsync, (el) => el.name)}
        />
      );
    },
    [onDelete, show]
  );

  const columns: ColDef[] = useMemo(
    () => [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'item', headerName: 'Item', flex: 1 },
      { field: 'group', headerName: 'Group', flex: 1 },
      { field: 'category', headerName: 'Category', flex: 1 },
      {
        field: 'properties',
        headerName: 'Properties',
        flex: 2,
        renderCell: propertiesCell,
      },
      {
        field: 'id',
        headerName: ' ',
        renderCell: actionCell,
        flex: 1,
        sortable: false,
        hide: isViewer
      },
    ],
    [actionCell, propertiesCell, isViewer]
  );

  const { filterItem } = useSearch();
  const filteredRows = useMemo(
    () => rowsToDisplay.filter((x) => filterItem(x.description ?? '')),
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
        <RuleModal hide={hide} id={id} />
      ))}
    </>
  );
};
