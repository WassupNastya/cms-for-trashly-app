import React, { useState } from 'react';
import { Button, Drawer, Grid } from '@material-ui/core';

import { Table } from './table';
import { CreateGroup } from './createGroup';

import './groups.scss';

export const Groups: React.FC = () => {
  const [drawer, setDrawer] = useState<{ show: boolean; id?: string }>({
    show: false,
  });

  return (
    <Grid className="groups">
      <div className="AddButton">
        <Button variant="contained" onClick={() => setDrawer({ show: true })}>
          Create new
        </Button>
      </div>
      <Table showDrawer={(id: string) => setDrawer({ show: true, id })} />
      <Drawer
        anchor="right"
        open={drawer.show}
        onClose={() => setDrawer({ show: false })}
      >
        <CreateGroup id={drawer.id} />
      </Drawer>
    </Grid>
  );
};
