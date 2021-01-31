import React from 'react';
import { Grid } from '@material-ui/core';
import { Page } from 'shared/page';

import { Content } from './content';

import './decisions.scss';

export const Decisions: React.FC = () => {
  return (
    <Page title="Decisions" needPanel={false}>
      <Grid className="decisions">
        <Content />
      </Grid>
    </Page>
  );
};
