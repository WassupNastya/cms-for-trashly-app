import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';

import { Table } from './table';

import './items.scss';

export const Items: React.FC = () => {
  return (
    <Grid className="sub-items">
      <div className="AddButton">
        <Link to="/">
          <Button variant="contained">Create new</Button>
        </Link>
      </div>
      <Table />
    </Grid>
  );
};
