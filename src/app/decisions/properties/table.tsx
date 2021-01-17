import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { getDecisionsForPropertiesAsync } from 'data/actions';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { DecisionForProperties, ItemsProperty } from 'data/model';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';

const columns = (
  <>
    <TableCell className="header">Name</TableCell>
    <TableCell className="header">Type</TableCell>
    <TableCell className="header">Location</TableCell>
    <TableCell className="header"></TableCell>
  </>
);

export const Table: React.FC = () => {
  const dispatch = useDispatch();

  const getDecisions = useCallback(() => {
    dispatch(getDecisionsForPropertiesAsync());
  }, [dispatch]);

  useEffect(() => getDecisions(), [getDecisions]);

  const decisions = useSelector(
    (state: StoreType) => state.data.decisionsForProperties
  );

  const rows = useMemo(() => {
    return decisions.map((item: DecisionForProperties, i: number) => {
      return (
        <TableRow key={i} hover>
          <TableCell>
            <Link to={`/`}>{item.name}</Link>
          </TableCell>
          <TableCell>{item.decisionNameType}</TableCell>
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
