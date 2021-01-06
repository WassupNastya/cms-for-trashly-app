import React from 'react';
import classnames from 'classnames';
import { Button, Grid } from '@material-ui/core';
import { Tab } from 'data/enums';

import './header.scss';

interface Props {
  title: string;
  needPanel?: boolean;
  onClick?: (value: number) => void;
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
}) => {
  return (
    <Grid className="Header">
      <div className="TitlePanel">
        <div className="Title">{title}</div>
        {needPanel && (
          <div className="Links">
            <LinkLayout title="items" onClick={() => onClick(Tab.Items)} />
            <LinkLayout title="groups" onClick={() => onClick(Tab.Groups)} />
            <LinkLayout title="categories" onClick={() => onClick(Tab.Categories)} />
            <LinkLayout title="properties" onClick={() => onClick(Tab.Properties)} />
          </div>
        )}
      </div>
    </Grid>
  );
};
