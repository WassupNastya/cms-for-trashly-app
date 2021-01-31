import React from 'react';
import { Page } from 'shared/page';
import { Grid } from '@material-ui/core';

import { Content } from './content';

import './rules.scss';

export const Rules: React.FC = () => {
  return (
    <Page title="Rules" needPanel={false}>
      <Grid className="rules">
        <Content />
      </Grid>
    </Page>
  );
};
