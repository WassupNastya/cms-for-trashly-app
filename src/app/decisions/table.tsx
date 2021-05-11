import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';
import { CellParams, ColDef } from '@material-ui/data-grid';
import { Chip } from '@material-ui/core';
import { useDecisions } from 'app/common/useData';
import { useDeleteUndo } from 'app/common/useDeleteUndo';
import { deleteDecisionAsync } from 'data/actions';
import { Decision } from 'data/model';
import { useDialog } from 'app/common/useDialog';
import { useSearch } from 'app/common/searchProvider';

import { DecisionModal } from './decisionModal';

export const Table: React.FC = () => {
  const decisions = useSelector((state: StoreType) => state.data.decisions);

  const [loading, setLoading] = useState(false);

  useDecisions({ needEffect: true, setLoading });
  const { rowsToDisplay, onDelete } = useDeleteUndo<Decision>(decisions);
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
          onDelete={() => onDelete(id, deleteDecisionAsync, (el) => el.name)}
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
      { field: 'priority', headerName: 'Priority', flex: 1 },
      { field: 'decisionNameType', headerName: 'Type', flex: 1 },
      { field: 'location', headerName: 'Location', flex: 1 },
      {
        field: 'properties',
        headerName: 'Properties',
        flex: 3,
        renderCell: propertiesCell,
      },
      {
        field: 'id',
        headerName: ' ',
        renderCell: actionCell,
        flex: 1,
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
      <TableTemplate columns={columns} rows={filteredRows} loading={loading}></TableTemplate>
      {dialog((id) => (
        <DecisionModal hide={hide} id={id} />
      ))}
    </>
  );
};
