import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'shared/table';
import { StoreType } from 'core/rootReducer';
import { TableCell, TableRow } from '@material-ui/core';
import { Location } from 'data/model';
import { MenuButton } from 'shared/menuButton';
import { Link } from 'react-router-dom';

const columns = (
  <>
    <TableCell className="header">Name</TableCell>
    <TableCell className="header">Location Code</TableCell>
    <TableCell className="header">County</TableCell>
    <TableCell className="header">State</TableCell>
    <TableCell className="header">Country</TableCell>
    <TableCell className="header"></TableCell>
  </>
);

export const LocationsTable: React.FC = () => {
  const locations = useSelector((state: StoreType) => state.data.locations);

  const rows = useMemo(() => {
    return locations.map((item: Location, i: number) => {
      return (
        <TableRow key={i} hover>
          <TableCell>
            <Link to={`/locations/edit/${item.id}`}>{item.displayName}</Link>
          </TableCell>
          <TableCell>{item.locationCode}</TableCell>
          <TableCell>{item.county}</TableCell>
          <TableCell>{item.state}</TableCell>
          <TableCell>{item.country}</TableCell>
          <TableCell align="right">
            <MenuButton id={item.id} />
          </TableCell>
        </TableRow>
      );
    });
  }, [locations]);

  return <Table columns={columns} rows={rows}></Table>;
};
