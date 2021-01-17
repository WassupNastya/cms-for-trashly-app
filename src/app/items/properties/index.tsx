import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';

import { Table } from './table';

import './properties.scss';

export const Properties: React.FC = () => {
  return (
    <Grid className="properties">
      <div className="AddButton">
        <Link to="/">
          <Button variant="contained">Create new</Button>
        </Link>
      </div>
      <Table />
    </Grid>
  );
};