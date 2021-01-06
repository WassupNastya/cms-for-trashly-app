import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Page } from 'shared/page';
import { getLocationsAsync } from 'data/actions';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
        <div className="AddButton">
          <Link to="locations/add">
            <Button variant="contained">Create new</Button>
          </Link>
        </div>
        <LocationsTable />
      </Grid>
    </Page>
  );
};
