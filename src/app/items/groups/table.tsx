import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { getItemsGroupsAsync } from 'data/actions';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ItemsGroup } from 'data/model';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';

const columns = (
  <>
    <TableCell className="header">Name</TableCell>
    <TableCell className="header"></TableCell>
  </>
);

export const Table: React.FC = () => {
  const dispatch = useDispatch();

  const getGroups = useCallback(() => {
    dispatch(getItemsGroupsAsync());
  }, [dispatch]);

  useEffect(() => getGroups(), [getGroups]);

  const groups = useSelector((state: StoreType) => state.data.itemsGroups);

  const rows = useMemo(() => {
    return (
      <>
        {groups.map((item: ItemsGroup, i: number) => {
          return (
            <TableRow key={i} hover>
              <TableCell>
                <Link to={`/`}>{item.name}</Link>
              </TableCell>
              <TableCell align="right">
                <MenuButton id={item.id} />
              </TableCell>
            </TableRow>
          );
        })}
      </>
    );
  }, [groups]);

  return (
    <TableTemplate
      columns={columns}
      rows={rows}
      className="groups-table"
    ></TableTemplate>
  );
};
