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

interface Props {
  showDrawer: (id: string) => void;
}

export const Table: React.FC<Props> = ({ showDrawer }) => {
  const rules = useSelector((state: StoreType) => state.data.rules);

  useRules({ needEffect: true });
  useProperties({ needEffect: true });

  const { rowsToDisplay, onDelete } = useDeleteUndo<Rule>(rules);

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

  const convertName = (rule: Rule) => {
    let name = 'properties';
    if (rule.item) name = rule.item;
    if (rule.group) name = rule.group;
    if (rule.category) name = rule.category;
    // TODO if rule for properties
    return `Rule for ${name}`;
  };

  const actionCell = useCallback(
    (params: CellParams) => {
      const id = params.value.toString();
      return (
        <MenuButton
          id={id}
          onEdit={() => showDrawer(id)}
          onDelete={() =>
            onDelete(id, deleteRuleAsync, (el) => convertName(el))
          }
        />
      );
    },
    [onDelete, showDrawer]
  );

  const columns: ColDef[] = useMemo(
    () => [
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
        headerName: 'Actions',
        renderCell: actionCell,
        flex: 1,
      },
    ],
    [actionCell, propertiesCell]
  );

  return <TableTemplate columns={columns} rows={rowsToDisplay}></TableTemplate>;
};
