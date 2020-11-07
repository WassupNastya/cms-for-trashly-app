import React from 'react';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import './sidebar.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Drawer
      open={isOpen}
      variant="persistent"
      anchor="left"
      className="sidebar"
    >
      <List>
        <ListItem className="hideSidebar">
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Item 1" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Item 3" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button className="logout">
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};
