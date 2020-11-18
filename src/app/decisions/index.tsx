import React from 'react';
import { Page } from 'shared/page';
import { Root } from 'data/enums';
import { useGetState } from 'app/common/useGetState';
import { Block } from 'shared/block';

export const Decisions: React.FC = () => {
  const state = useGetState(
    <Block title="Items" />,
    <Block title="Groups" />,
    <Block title="Categories" />,
    <Block title="Properties" />,
    '/decisions'
  );

  return (
    <Page title="Decisions" url={Root.Decisions}>
      {state}
    </Page>
  );
};
