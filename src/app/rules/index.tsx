import React, { useState } from 'react';
import { Page } from 'shared/page';
import { Tab } from 'data/enums';
import { Block } from 'shared/block';
import { Grid } from '@material-ui/core';

import { Items } from './items';
import { Groups } from './groups';
import { Categories } from './categories';

import './rules.scss';

const tabMap = new Map([
  [
    Tab.Items,
    <Block key="items" title="Items">
      <Items />
    </Block>,
  ],
  [
    Tab.Groups,
    <Block key="groups" title="Groups">
      <Groups />
    </Block>,
  ],
  [
    Tab.Categories,
    <Block key="categories" title="Categories">
      <Categories />
    </Block>,
  ],
  [Tab.Properties, <Block key="properties" title="Properties" />],
]);

const tabsToExclude = [Tab.Properties];

export const Rules: React.FC = () => {
  const [state, setState] = useState(Tab.Items);

  return (
    <Page
      title="Rules"
      onClick={(value) => setState(value)}
      tabsToExclude={tabsToExclude}
    >
      <Grid className="rules">{tabMap.get(state)}</Grid>
    </Page>
  );
};
