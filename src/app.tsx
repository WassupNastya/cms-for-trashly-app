import React, { useCallback, useState } from 'react';
import { Sidebar } from 'app/sidebar/sidebar';
import { Route } from 'react-router';
import { Root } from 'data/enums';
import { Rules } from 'app/rules';
import { Decisions } from 'app/decisions';
import { Items } from 'app/items';
import { Locations } from 'app/locations';
import { Hidden, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { AppBar } from 'app/common';
import classnames from 'classnames';
import { Onboarding } from 'app/onboarding/onboarding';

import './app.scss';

export const App = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const [openSidebar, setOpenSidebar] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const onClick = useCallback(() => {
    setOpenSidebar(!openSidebar);
  }, [openSidebar]);

  return (
    <Grid container className="App">
      <Hidden smDown>
        <Sidebar
          showOnboarding={showOnboarding}
          setShowOnboarding={setShowOnboarding}
        />
      </Hidden>
      {showOnboarding && (
        <Hidden smDown>
          <Onboarding />
        </Hidden>
      )}
      <Grid
        className={classnames('Content', {
          Mobile: matches,
          Fixed: openSidebar,
          ShowInfo: !matches && showOnboarding,
        })}
      >
        <Hidden mdUp>
          <AppBar isOpen={openSidebar} onClick={onClick} />
        </Hidden>
        <Route path={Root.Rules} component={Rules} />
        <Route path={Root.Decisions} component={Decisions} />
        <Route path={Root.Locations} component={Locations} />
        <Route path={Root.Items} component={Items} />
        <Route exact path="/" component={Items} />
      </Grid>
    </Grid>
  );
};
