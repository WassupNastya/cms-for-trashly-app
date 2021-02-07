import React from 'react';
import { Button, Grid } from '@material-ui/core';

import { Table } from './table';

export const Content: React.FC = () => {
  return (
    <Grid className="decisions">
      <div className="AddButton">
        <Button variant="contained">Create new</Button>
      </div>
      <Table />
    </Grid>
  );
};
