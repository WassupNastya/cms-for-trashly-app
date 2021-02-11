import React, { useState } from 'react';
import { Button, Drawer, Grid } from '@material-ui/core';

import { CreateCategory } from './createGroup';
import { Table } from './table';

import './categories.scss';

export const Categories: React.FC = () => {
  const [drawer, setDrawer] = useState<{ show: boolean; id?: string }>({
    show: false,
  });

  return (
    <Grid className="categories">
      <div className="AddButton">
        <Button variant="contained" onClick={() => setDrawer({ show: true })}>
          Create new
        </Button>
      </div>
      <Table />
      <Drawer
        anchor="right"
        open={drawer.show}
        onClose={() => setDrawer({ show: false })}
      >
        <CreateCategory id={drawer.id} />
      </Drawer>
    </Grid>
  );
};
