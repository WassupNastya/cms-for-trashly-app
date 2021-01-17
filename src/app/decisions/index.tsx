import React, { useState } from 'react';
import { Page } from 'shared/page';
import { Tab } from 'data/enums';
import { Block } from 'shared/block';
import { Grid } from '@material-ui/core';

import { Items } from './items';
import { Groups } from './groups';
import { Properties } from './properties';

import './decisions.scss';

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
    Tab.Properties,
    <Block key="properties" title="Properties">
      <Properties />
    </Block>,
  ],
]);

const tabsToExclude = [Tab.Categories];

export const Decisions: React.FC = () => {
  const [state, setState] = useState(Tab.Items);

  return (
    <Page
      title="Decisions"
      onClick={(value) => setState(value)}
      tabsToExclude={tabsToExclude}
    >
      <Grid className="decisions">{tabMap.get(state)}</Grid>
    </Page>
  );
};
