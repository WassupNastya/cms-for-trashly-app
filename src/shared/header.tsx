import React from 'react';
import classnames from 'classnames';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import './header.scss';

interface Props {
  title: string;
  url: string;
  needPanel?: boolean;
}

interface LinkProps {
  title: string;
  url: string;
}

const LinkLayout: React.FC<LinkProps> = ({ url, title }) => {
  return (
    <Link to={url}>
      <Button className={classnames('LinkButton', title)}>{title}</Button>
    </Link>
  );
};

export const Header: React.FC<Props> = ({ title, url, needPanel = true }) => {
  return (
    <Grid className="Header">
      <div className="TitlePanel">
        <div className="Title">{title}</div>
        {needPanel && (
          <div className="Links">
            <LinkLayout title="items" url={url + `/items`} />
            <LinkLayout title="groups" url={url + `/groups`} />
            <LinkLayout title="categories" url={url + `/categories`} />
            <LinkLayout title="properties" url={url + `/properties`} />
          </div>
        )}
      </div>
    </Grid>
  );
};
