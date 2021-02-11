import React, { useState } from 'react';
import { Page } from 'shared/page';
import { Button, Drawer, Grid } from '@material-ui/core';

import { LocationsTable } from './table';
import { CreateLocation } from './createLocation';

import './locations.scss';

export const Locations: React.FC = () => {
  const [drawer, setDrawer] = useState<{ show: boolean; id?: string }>({
    show: false,
  });

  return (
    <Page title="Locations" needPanel={false}>
      <Grid className="locations">
        <div className="AddButton">
          <Button variant="contained" onClick={() => setDrawer({ show: true })}>
            Create new
          </Button>
        </div>
        <LocationsTable />
        <Drawer
          anchor="right"
          open={drawer.show}
          onClose={() => setDrawer({ show: false })}
        >
          <CreateLocation />
        </Drawer>
      </Grid>
    </Page>
  );
};
