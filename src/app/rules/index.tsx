import React, { useState } from 'react';
import { Page } from 'shared/page';
import { Button, Drawer, Grid } from '@material-ui/core';

import { Table } from './table';
import { CreateRule } from './createRule';

import './rules.scss';

export const Rules: React.FC = () => {
  const [drawer, setDrawer] = useState<{ show: boolean; id?: string }>({
    show: false,
  });

  return (
    <Page title="Rules" needPanel={false}>
      <Grid className="rules">
        <div className="AddButton" onClick={() => setDrawer({ show: true })}>
          <Button variant="contained">Create new</Button>
        </div>
        <Table />
        <Drawer
          anchor="right"
          open={drawer.show}
          onClose={() => setDrawer({ show: false })}
        >
          <CreateRule id={drawer.id} />
        </Drawer>
      </Grid>
    </Page>
  );
};
