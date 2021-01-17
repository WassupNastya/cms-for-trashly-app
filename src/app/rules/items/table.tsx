import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { getRulesForItemsAsync } from 'data/actions';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { RuleForItem } from 'data/model';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';

const columns = (
  <>
    <TableCell className="header">Item</TableCell>
    <TableCell className="header">Description</TableCell>
    <TableCell className="header">Location</TableCell>
    <TableCell className="header"></TableCell>
  </>
);

export const Table: React.FC = () => {
  const dispatch = useDispatch();

  const getRules = useCallback(() => {
    dispatch(getRulesForItemsAsync());
  }, [dispatch]);

  useEffect(() => getRules(), [getRules]);

  const rules = useSelector((state: StoreType) => state.data.rulesForItems);

  const rows = useMemo(() => {
    return rules.map((item: RuleForItem, i: number) => {
      return (
        <TableRow key={i} hover>
          <TableCell>
            <Link to={`/`}>{item.item}</Link>
          </TableCell>
          <TableCell>{item.description}</TableCell>
          <TableCell>{item.location}</TableCell>
          <TableCell align="right">
            <MenuButton id={item.id} />
          </TableCell>
        </TableRow>
      );
    });
  }, [rules]);

  return <TableTemplate columns={columns} rows={rows}></TableTemplate>;
};
