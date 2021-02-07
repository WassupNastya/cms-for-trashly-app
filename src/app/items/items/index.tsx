import React, { useState } from 'react';
import { Button, Drawer, Grid } from '@material-ui/core';

import { Table } from './table';
import { CreateItem } from './createItem';

import './items.scss';

export const Items: React.FC = () => {
  const [drawer, setDrawer] = useState<{ show: boolean; id?: string }>({
    show: false,
  });

  return (
    <Grid className="sub-items">
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
        <CreateItem id={drawer.id} />
      </Drawer>
    </Grid>
  );
};
