import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { getItemsItemsAsync } from 'data/actions';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ItemsItem } from 'data/model';
import { MenuButton } from 'shared/menuButton';
import { Table as TableTemplate } from 'shared/table';

const columns = (
  <>
    <TableCell className="header">Name</TableCell>
    <TableCell className="header">Group</TableCell>
    <TableCell className="header">Properties</TableCell>
    <TableCell className="header"></TableCell>
  </>
);

export const Table: React.FC = () => {
  const dispatch = useDispatch();

  const getItems = useCallback(() => {
    dispatch(getItemsItemsAsync());
  }, [dispatch]);

  useEffect(() => getItems(), [getItems]);

  const items = useSelector((state: StoreType) => state.data.itemsItems);

  const rows = useMemo(() => {
    return items.map((item: ItemsItem, i: number) => {
      return (
        <TableRow key={i} hover>
          <TableCell>
            <Link to={`/`}>{item.name}</Link>
          </TableCell>
          <TableCell>{item.group}</TableCell>
          <TableCell>{item.properties.join(',')}</TableCell>
          <TableCell  align="right">
            <MenuButton id={item.id} />
          </TableCell>
        </TableRow>
      );
    });
  }, [items]);

  return <TableTemplate columns={columns} rows={rows}></TableTemplate>;
};
