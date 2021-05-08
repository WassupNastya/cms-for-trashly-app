import React, { useMemo, useState } from 'react';
import { Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { Bar } from 'app/bar/bar';
import { Tools } from 'shared/tools/tools';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Root, Tab } from 'data/enums';
import { Table as Items } from 'app/items/table';
import { Table as Groups } from 'app/groups/table';
import { Table as Categories } from 'app/categories/table';
import { Table as Properties } from 'app/properties/table';
import { Table as Rules } from 'app/rules/table';
import { Table as Decisions } from 'app/decisions/table';
import { LocationsTable as Locations } from 'app/locations/table';
import { useSearch } from 'app/common/searchProvider';
import { Login } from 'app/login/login';
import { ProtectedRoute } from 'shared/protectedRoute';
import { useAuth } from 'app/common/authProvider';

import './app.scss';

const tablesMap = new Map([
  [Tab.Items, <Items key="items" />],
  [Tab.Groups, <Groups key="groups" />],
  [Tab.Categories, <Categories key="categories" />],
  [Tab.Properties, <Properties key="properties" />],
]);

export const App = () => {
  const location = useLocation();

  const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#00bcca',
      },
    },
  });

  const [currentTab, setCurrentTab] = useState(Tab.Items);

  const component = useMemo(() => tablesMap.get(currentTab), [currentTab]);

  const { setSearchValue } = useSearch();
  const { user } = useAuth();

  const onChange = (tab: Tab) => {
    setSearchValue('');
    setCurrentTab(tab);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Switch location={location}>
        <Route
          path="/login/new"
          component={() => (!user ? <Login /> : <Redirect to="/" />)}
        />
        <Route
          path="/login"
          component={() => (!user ? <Login /> : <Redirect to="/" />)}
        />
        <div className="app">
          <Bar />
          <div className="page">
            <Tools currentTab={currentTab} setCurrentTab={onChange} />
            <ProtectedRoute path={Root.Rules} component={<Rules />} />
            <ProtectedRoute path={Root.Decisions} component={<Decisions />} />
            <ProtectedRoute path={Root.Locations} component={<Locations />} />
            <ProtectedRoute path={Root.Items} component={component} />
            <ProtectedRoute path="/" component={component} />
          </div>
        </div>
      </Switch>
    </MuiThemeProvider>
  );
};
