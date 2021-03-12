import React from 'react';
import classnames from 'classnames';
import { Button, Grid } from '@material-ui/core';

import './header.scss';

const allTabs: { key: number; title: string }[] = [
  { key: 0, title: 'items' },
  { key: 1, title: 'groups' },
  { key: 2, title: 'categories' },
  { key: 3, title: 'properties' },
];
interface Props {
  title: string;
  needPanel?: boolean;
  onClick?: (value: number) => void;
  tabsToExclude?: number[];
}

interface LinkProps {
  title: string;
  onClick?: () => void;
}

const LinkLayout: React.FC<LinkProps> = ({ title, onClick }) => {
  return (
    <Button onClick={onClick} className={classnames('LinkButton', title)}>
      {title}
    </Button>
  );
};

export const Header: React.FC<Props> = ({
  title,
  onClick,
  needPanel = true,
  tabsToExclude,
}) => {
  return (
    <Grid className="Header" style={{ height: needPanel ? '12em' : '6em' }}>
      
    </Grid>
  );
};
