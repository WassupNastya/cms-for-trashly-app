import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Page } from 'shared/page';
import { getLocationsAsync } from 'data/actions';
import { Button, Grid } from '@material-ui/core';
import { Block } from 'shared/block';

import { LocationsTable } from './table';

import './locations.scss';

export const Locations: React.FC = () => {
  const dispatch = useDispatch();

  const getLocations = useCallback(() => {
    dispatch(getLocationsAsync());
  }, [dispatch]);

  useEffect(() => getLocations(), [getLocations]);

  return (
    <Page title="Locations" needPanel={false}>
      <Grid className="locations">
        <Block>
          <div className="AddButton">
            <Button variant="contained">Create new</Button>
          </div>
          <LocationsTable />
        </Block>
      </Grid>
    </Page>
  );
};
