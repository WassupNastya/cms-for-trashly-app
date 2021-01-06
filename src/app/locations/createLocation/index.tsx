import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Page } from 'shared/page';
import { Button, Grid } from '@material-ui/core';

import './createLocation.scss';

export const CreateLocation: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const title = useMemo(() => {
    return location.pathname.includes('/add')
      ? 'Add location'
      : 'Edit location';
  }, [location.pathname]);

  return (
    <Page title={title} needPanel={false}>
      <Grid className="CreateLocation">
        <div className="Buttons">
          <Button variant="contained" onClick={() => history.goBack()}>
            Cancel
          </Button>
          <Button variant="contained" className="Save">
            Save
          </Button>
        </div>
      </Grid>
    </Page>
  );
};
