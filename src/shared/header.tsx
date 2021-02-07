import React from 'react';
import classnames from 'classnames';
import { Button, Grid } from '@material-ui/core';
import { Tab } from 'data/enums';

import './header.scss';

const allTabs: { key: number; title: string }[] = [
  { key: Tab.Items, title: 'items' },
  { key: Tab.Groups, title: 'groups' },
  { key: Tab.Categories, title: 'categories' },
  { key: Tab.Properties, title: 'properties' },
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
      <div className="TitlePanel">
        <div className="Title">{title}</div>
        {needPanel && (
          <div className="Links">
            {allTabs.flatMap((x) =>
              tabsToExclude?.includes(x.key)
                ? []
                : [
                    <LinkLayout
                      key={x.key}
                      title={x.title}
                      onClick={() => onClick(x.key)}
                    />,
                  ]
            )}
          </div>
        )}
      </div>
    </Grid>
  );
};
