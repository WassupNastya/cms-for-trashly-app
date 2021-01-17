import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { getDecisionsForItemsAsync } from 'data/actions';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { DecisionForItem } from 'data/model';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';

const columns = (
  <>
    <TableCell className="header">Item</TableCell>
    <TableCell className="header">Name</TableCell>
    <TableCell className="header">Type</TableCell>
    <TableCell className="header">Priority</TableCell>
    <TableCell className="header">Location</TableCell>
    <TableCell className="header"></TableCell>
  </>
);

export const Table: React.FC = () => {
  const dispatch = useDispatch();

  const getDecisions = useCallback(() => {
    dispatch(getDecisionsForItemsAsync());
  }, [dispatch]);

  useEffect(() => getDecisions(), [getDecisions]);

  const decisions = useSelector(
    (state: StoreType) => state.data.decisionsForItems
  );

  const rows = useMemo(() => {
    return decisions.map((item: DecisionForItem, i: number) => {
      return (
        <TableRow key={i} hover>
          <TableCell>
            <Link to={`/`}>{item.item}</Link>
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.decisionNameType}</TableCell>
          <TableCell>{item.priority}</TableCell>
          <TableCell>{item.location}</TableCell>
          <TableCell align="right">
            <MenuButton id={item.id} />
          </TableCell>
        </TableRow>
      );
    });
  }, [decisions]);

  return <TableTemplate columns={columns} rows={rows}></TableTemplate>;
};
