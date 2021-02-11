import React, { useState } from 'react';
import { Button, Drawer, Grid } from '@material-ui/core';

import { CreateProperty } from './createProperty';
import { Table } from './table';

import './properties.scss';

export const Properties: React.FC = () => {
  const [drawer, setDrawer] = useState<{ show: boolean; id?: string }>({
    show: false,
  });

  return (
    <Grid className="properties">
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
        <CreateProperty id={drawer.id} />
      </Drawer>
    </Grid>
  );
};
