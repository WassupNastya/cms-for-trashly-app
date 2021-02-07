import React, { useState } from 'react';
import { Page } from 'shared/page';
import { Tab } from 'data/enums';
import { Block } from 'shared/block';
import { Grid } from '@material-ui/core';

import { Items as SubItems } from './items';
import { Groups } from './groups';
import { Categories } from './categories';
import { Properties } from './properties';

import './items.scss';

const tabMap = new Map([
  [
    Tab.Items,
    <Block key="items" title="Items">
      <SubItems />
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
  [
    Tab.Properties,
    <Block key="properties" title="Properties">
      <Properties />
    </Block>,
  ],
]);

export const Items: React.FC = () => {
  const [state, setState] = useState(Tab.Items);

  return (
    <Page title="Recyclable items" onClick={(value) => setState(value)}>
      <Grid className="items">{tabMap.get(state)}</Grid>
    </Page>
  );
};
