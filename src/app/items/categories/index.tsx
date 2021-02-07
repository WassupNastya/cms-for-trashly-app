import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';

import { Table } from './table';

import './categories.scss';

export const Categories: React.FC = () => {
  return (
    <Grid className="categories">
      <div className="AddButton">
        <Link to="/">
          <Button variant="contained">Create new</Button>
        </Link>
      </div>
      <Table />
    </Grid>
  );
};
