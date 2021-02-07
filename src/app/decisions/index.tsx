import React from 'react';
import { Grid } from '@material-ui/core';
import { Page } from 'shared/page';
import { Block } from 'shared/block';

import { Content } from './content';

import './decisions.scss';

export const Decisions: React.FC = () => {
  return (
    <Page title="Decisions" needPanel={false}>
      <Grid className="decisions">
        <Block>
          <Content />
        </Block>
      </Grid>
    </Page>
  );
};
