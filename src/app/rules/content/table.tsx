import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { RuleView } from 'data/model';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';
import { getRulesAsync } from 'data/actions';
import { convertType } from 'data/helper';

const columns = (
  <>
    <TableCell className="header">Rule for</TableCell>
    <TableCell className="header">Type</TableCell>
    <TableCell className="header">Description</TableCell>
    <TableCell className="header">Location</TableCell>
    <TableCell className="header"></TableCell>
  </>
);

export const Table: React.FC = () => {
  const dispatch = useDispatch();

  const getRules = useCallback(() => {
    dispatch(getRulesAsync());
  }, [dispatch]);

  useEffect(() => getRules(), [getRules]);

  const rules = useSelector((state: StoreType) => state.data.rules);

  const rows = useMemo(() => {
    return rules.map((item: RuleView, i: number) => {
      return (
        <TableRow key={i} hover>
          <TableCell>
            <Link to={`/`}>{item.ruleFor}</Link>
          </TableCell>
          <TableCell>{convertType(item.type)}</TableCell>
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
