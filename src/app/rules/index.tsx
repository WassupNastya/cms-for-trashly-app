import React from 'react';
import { Page } from 'shared/page';
import { Root } from 'data/enums';
import { useGetState } from 'app/common/useGetState';
import { Block } from 'shared/block';

export const Rules: React.FC = () => {
  const state = useGetState(
    <Block title="Items" />,
    <Block title="Groups" />,
    <Block title="Categories" />,
    <Block title="Properties" />,
    '/rules'
  );

  return (
    <Page title="Rules" url={Root.Rules}>
      {state}
    </Page>
  );
};
