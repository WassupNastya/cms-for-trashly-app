import React, { useCallback, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import './menuButton.scss';

interface Props {
  id: string;
}

export const MenuButton: React.FC<Props> = ({ id }) => {
  const location = useLocation();

  const [anchor, setAnchor] = useState<Element>(null);
  const [showMenu, setShowMenu] = useState(false);

  const onOpen = useCallback((event) => {
    setAnchor(event.currentTarget);
    setShowMenu(true);
  }, []);

  const onClose = useCallback(() => {
    setAnchor(null);
    setShowMenu(false);
  }, []);

  return (
    <div>
      <IconButton onClick={onOpen}>
        <MoreVert />
      </IconButton>
      <Menu
        className="MenuButton"
        open={showMenu}
        onClose={onClose}
        anchorEl={anchor}
      >
        <MenuItem onClick={onClose}>
          <Link to={location.pathname + `/edit/${id}`}>Edit</Link>
        </MenuItem>
        <MenuItem onClick={onClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
};