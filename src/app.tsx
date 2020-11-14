import React from 'react';
import { Sidebar } from 'app/sidebar/sidebar';
import { Route } from 'react-router';
import { Root } from 'data/enums';
import { Rules } from 'app/rules';
import { Decisions } from 'app/decisions';
import { Items } from 'app/items';
import { Locations } from 'app/locations';

import './app.scss';

export const App = () => {
  return (
    <div className="App">
      <Sidebar></Sidebar>
      <div className="Content">
        <Route path={Root.Rules} component={Rules} />
        <Route path={Root.Decisions} component={Decisions} />
        <Route path={Root.Locations} component={Locations} />
        <Route exact path={Root.Items} component={Items} />
      </div>
    </div>
  );
};
