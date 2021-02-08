import React, { useState } from 'react';
import { Button, Drawer, Grid } from '@material-ui/core';
import { Page } from 'shared/page';

import { Table } from './table';
import { CreateDecision } from './createDecision';

import './decisions.scss';

export const Decisions: React.FC = () => {
  const [drawer, setDrawer] = useState<{ show: boolean; id?: string }>({
    show: false,
  });

  return (
    <Page title="Decisions" needPanel={false}>
      <Grid className="decisions">
        <div className="AddButton" onClick={() => setDrawer({ show: true })}>
          <Button variant="contained">Create new</Button>
        </div>
        <Table />
        <Drawer
          anchor="right"
          open={drawer.show}
          onClose={() => setDrawer({ show: false })}
        >
          <CreateDecision id={drawer.id} />
        </Drawer>
      </Grid>
    </Page>
  );
};
