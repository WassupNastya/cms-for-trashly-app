import React from 'react';
import { Grid } from '@material-ui/core';

import { Header } from './header';

import './page.scss';

interface Props {
  title: string;
  onClick?: (value: number) => void;
  needPanel?: boolean;
  tabsToExclude?: number[];
}

export const Page: React.FC<Props> = ({ title, onClick, needPanel, children, tabsToExclude }) => {
  return (
    <Grid className="Page">
      <Header title={title} onClick={onClick} needPanel={needPanel} tabsToExclude={tabsToExclude} />
      <div className="children">{children}</div>
    </Grid>
  );
};
