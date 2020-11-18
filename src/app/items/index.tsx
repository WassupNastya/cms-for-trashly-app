import React, { useMemo } from 'react';
import { Page } from 'shared/page';
import { Root } from 'data/enums';
import { useGetState } from 'app/common/useGetState';
import { Block } from 'shared/block';

export const Items: React.FC = () => {
  const state = useGetState(
    <Block title="Items" />,
    <Block title="Groups" />,
    <Block title="Categories" />,
    <Block title="Properties" />,
    '/'
  );

  return (
    <Page title="Recyclable items" url={Root.Items}>
      {state}
    </Page>
  );
};
