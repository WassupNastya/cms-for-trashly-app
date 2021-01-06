import React from 'react';
import { Grid } from '@material-ui/core';

import { Header } from './header';

import './page.scss';

interface Props {
  title: string;
  onClick?: (value: number) => void;
  needPanel?: boolean;
}

export const Page: React.FC<Props> = ({ title, onClick, needPanel, children }) => {
  return (
    <Grid className="Page">
      <Header title={title} onClick={onClick} needPanel={needPanel} />
      <div className="children">{children}</div>
    </Grid>
  );
};
