import React, { useMemo, useState } from 'react';
import { Route } from 'react-router';
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

import './app.scss';

const tablesMap = new Map([
  [Tab.Items, <Items key="items" />],
  [Tab.Groups, <Groups key="groups" />],
  [Tab.Categories, <Categories key="categories" />],
  [Tab.Properties, <Properties key="properties" />],
]);

export const App = () => {
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

  const onChange = (tab: Tab) => {
    setSearchValue('');
    setCurrentTab(tab);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className="app">
        <Bar />
        <div className="page">
          <Tools currentTab={currentTab} setCurrentTab={onChange} />
          <Route exact path={Root.Rules} component={Rules} />
          <Route exact path={Root.Decisions} component={Decisions} />
          <Route exact path={Root.Locations} component={Locations} />
          <Route exact path={Root.Items} component={() => component} />
          <Route exact path="/" component={() => component} />
        </div>
      </div>
    </MuiThemeProvider>
  );
};
