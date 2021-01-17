import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'core/rootReducer';
import { getItemsPropertiesAsync } from 'data/actions';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ItemsProperty } from 'data/model';
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

  const getProperties = useCallback(() => {
    dispatch(getItemsPropertiesAsync());
  }, [dispatch]);

  useEffect(() => getProperties(), [getProperties]);

  const properties = useSelector(
    (state: StoreType) => state.data.itemsProperties
  );

  const rows = useMemo(() => {
    return properties.map((item: ItemsProperty, i: number) => {
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
    });
  }, [properties]);

  return <TableTemplate columns={columns} rows={rows}></TableTemplate>;
};
