import React from 'react';
import classnames from 'classnames';
import { IconButton, List, ListItem } from '@material-ui/core';
import {
  AnnouncementOutlined,
  PlaylistAdd,
  AddCircleOutline,
  RoomOutlined,
  PowerSettingsNewOutlined,
  HelpOutline
} from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { Root } from 'data/enums';

import './sidebar.scss';

interface IProps {
  isMobile?: boolean;
  showOnboarding?: boolean;
  setShowOnboarding?: (value: boolean) => void;
}

type LinkType = {
  icon: JSX.Element;
  pathname: string;
  label: string;
};

const links: LinkType[] = [
  { icon: <AddCircleOutline />, pathname: Root.Items, label: 'Items' },
  { icon: <AnnouncementOutlined />, pathname: Root.Rules, label: 'Rules' },
  { icon: <PlaylistAdd />, pathname: Root.Decisions, label: 'Decision' },
  { icon: <RoomOutlined />, pathname: Root.Locations, label: 'Locations' },
];

export const Sidebar: React.FC<IProps> = ({
  isMobile,
  showOnboarding,
  setShowOnboarding,
}) => {
  const location = useLocation();

  return (
    <div className={classnames('Sidebar', { Mobile: isMobile })}>
      {!isMobile && (
        <ListItem>
          <IconButton
            className="Description"
            onClick={() => setShowOnboarding?.(!showOnboarding)}
          >
            <HelpOutline />
          </IconButton>
        </ListItem>
      )}
      <List>
        {links.map((link, key) => (
          <Link key={key} to={link.pathname}>
            <ListItem>
              <IconButton
                className={classnames({
                  IsActive: location.pathname.startsWith(link.pathname),
                })}
              >
                {link.icon}
              </IconButton>
              {isMobile && <div className="Label">{link.label}</div>}
            </ListItem>
          </Link>
        ))}
      </List>
      <ListItem>
        <IconButton>
          <PowerSettingsNewOutlined />
        </IconButton>
        {isMobile && <div className="Label">Log out</div>}
      </ListItem>
    </div>
  );
};
