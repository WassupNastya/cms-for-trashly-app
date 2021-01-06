import React, { useState } from 'react';
import { Page } from 'shared/page';
import { Tab } from 'data/enums';
import { Block } from 'shared/block';

const tabMap = new Map([
  [Tab.Items, <Block key="items" title="Items" />],
  [Tab.Groups, <Block key="groups" title="Groups" />],
  [Tab.Categories, <Block key="categories" title="Categories" />],
  [Tab.Properties, <Block key="properties" title="Properties" />],
]);

export const Items: React.FC = () => {
  const [state, setState] = useState(Tab.Items);

  return <Page title="Recyclable items" onClick={(value) => setState(value)}>
    {tabMap.get(state)}
  </Page>;
};
