import React from 'react';
import { Page } from 'shared/page';
import { Grid } from '@material-ui/core';
import { Block } from 'shared/block';

import { Content } from './content';

import './rules.scss';

export const Rules: React.FC = () => {
  return (
    <Page title="Rules" needPanel={false}>
      <Grid className="rules">
        <Block title="">
        <Content />
        </Block>
      </Grid>
    </Page>
  );
};
