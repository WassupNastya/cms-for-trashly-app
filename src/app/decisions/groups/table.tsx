import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { getDecisionsForGroupsAsync } from 'data/actions';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { DecisionForGroup, ItemsGroup } from 'data/model';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';

const columns = (
  <>
    <TableCell className="header">Group</TableCell>
    <TableCell className="header">Name</TableCell>
    <TableCell className="header">Description</TableCell>
    <TableCell className="header">Location</TableCell>
    <TableCell className="header"></TableCell>
  </>
);

export const Table: React.FC = () => {
  const dispatch = useDispatch();

  const getDecisions = useCallback(() => {
    dispatch(getDecisionsForGroupsAsync());
  }, [dispatch]);

  useEffect(() => getDecisions(), [getDecisions]);

  const decisions = useSelector(
    (state: StoreType) => state.data.decisionsForGroups
  );

  const rows = useMemo(() => {
    return (
      <>
        {decisions.map((item: DecisionForGroup, i: number) => {
          return (
            <TableRow key={i} hover>
              <TableCell>
                <Link to={`/`}>{item.group}</Link>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell align="right">
                <MenuButton id={item.id} />
              </TableCell>
            </TableRow>
          );
        })}
      </>
    );
  }, [decisions]);

  return (
    <TableTemplate
      columns={columns}
      rows={rows}
      className="groups-table"
    ></TableTemplate>
  );
};
