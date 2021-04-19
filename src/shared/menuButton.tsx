import React, { useCallback, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

import './menuButton.scss';

interface Props {
  id: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isRename?: boolean;
}

export const MenuButton: React.FC<Props> = ({ id, onEdit, onDelete, isRename }) => {
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
          {isRename ? 'Rename' : 'Edit'}
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
