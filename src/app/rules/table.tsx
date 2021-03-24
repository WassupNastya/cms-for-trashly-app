import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';
import { CellParams, ColDef } from '@material-ui/data-grid';
import { useProperties, useRules } from 'app/common/useData';
import { Chip } from '@material-ui/core';
import { useDeleteUndo } from 'app/common/useDeleteUndo';
import { deleteRuleAsync } from 'data/actions';
import { Rule } from 'data/model';
import { useDialog } from 'app/common/useDialog';
import { useSearch } from 'app/common/searchProvider';

import { RuleModal } from './ruleModal';

export const Table: React.FC = () => {
  const rules = useSelector((state: StoreType) => state.data.rules);

  useRules({ needEffect: true });
  useProperties({ needEffect: true });
  const { rowsToDisplay, onDelete } = useDeleteUndo<Rule>(rules);
  const { dialog, show, hide } = useDialog();

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
      },
    ],
    [actionCell, propertiesCell]
  );

  const { filterItem } = useSearch();
  const filteredRows = useMemo(
    () => rowsToDisplay.filter((x) => filterItem(x.description ?? '')),
    [filterItem, rowsToDisplay]
  );

  return (
    <>
      <TableTemplate columns={columns} rows={filteredRows}></TableTemplate>
      {dialog((id) => (
        <RuleModal hide={hide} id={id} />
      ))}
    </>
  );
};
