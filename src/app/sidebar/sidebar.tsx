import React from 'react';
import classnames from 'classnames';
import { IconButton, List, ListItem } from '@material-ui/core';
import {
  AnnouncementOutlined,
  Reorder,
  PlaylistAdd,
  AddCircleOutline,
  RoomOutlined,
  PowerSettingsNewOutlined,
} from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { Root } from 'data/enums';

import './sidebar.scss';

type LinkType = {
  icon: JSX.Element;
  pathname: string;
};

const links: LinkType[] = [
  { icon: <AddCircleOutline />, pathname: Root.Items },
  { icon: <AnnouncementOutlined />, pathname: Root.Rules },
  { icon: <PlaylistAdd />, pathname: Root.Decisions },
  { icon: <RoomOutlined />, pathname: Root.Locations },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="Sidebar">
      <ListItem>
        <IconButton className="Description">
          <Reorder />
        </IconButton>
      </ListItem>
      <List>
        {links.map((link, key) => (
          <Link key={key} to={link.pathname}>
            <ListItem>
              <IconButton
                className={classnames({
                  IsActive: location.pathname === link.pathname,
                })}
              >
                {link.icon}
              </IconButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <ListItem>
        <IconButton>
          <PowerSettingsNewOutlined />
        </IconButton>
      </ListItem>
    </div>
  );
};
