import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Page } from 'shared/page';
import { Root } from 'data/enums';
import { getLocationsAsync } from 'data/actions';

import { LocationsTable } from './table';

import './locations.scss';

export const Locations: React.FC = () => {
  const dispatch = useDispatch();

  const getLocations = useCallback(() => {
    dispatch(getLocationsAsync());
  }, [dispatch]);

  useEffect(() => getLocations(), [getLocations]);

  return (
    <Page title="Locations" url={Root.Locations} needPanel={false}>
      <div className="locations">
        <LocationsTable />
      </div>
    </Page>
  );
};
