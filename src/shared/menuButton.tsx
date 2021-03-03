import React, { useCallback, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';

import './menuButton.scss';

interface Props {
  id: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const MenuButton: React.FC<Props> = ({ id, onEdit, onDelete }) => {
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
        <MenuItem
          onClick={() => {
            onEdit?.();
            onClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete?.();
            onClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};
