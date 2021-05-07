import React, { useCallback, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircleOutlined } from '@material-ui/icons';
import { useAuth } from 'app/common/authProvider';

import { ExportDialog } from './exportDialog';

import 'shared/menuButton.scss';

export const UserButton: React.FC = () => {
  const [anchor, setAnchor] = useState<Element>(null);
  const [showExport, setShowExport] = useState(false);

  const { signOut } = useAuth();

  const onOpen = useCallback((event) => {
    setAnchor(event.currentTarget);
  }, []);

  const onClose = useCallback(() => {
    setAnchor(null);
  }, []);

  const onExportClick = () => {
    setShowExport(true);
  };

  const hideExport = () => {
    setShowExport(false);
  };

  return (
    <>
      <div>
        <IconButton color="secondary" onClick={onOpen}>
          <AccountCircleOutlined />
        </IconButton>
        <Menu
          className="MenuButton"
          open={Boolean(anchor)}
          onClose={onClose}
          anchorEl={anchor}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          getContentAnchorEl={null}
        >
          <MenuItem
            onClick={() => {
              onExportClick();
              onClose();
            }}
          >
            Export
          </MenuItem>
          <MenuItem onClick={signOut}>Log out</MenuItem>
        </Menu>
      </div>
      <ExportDialog isOpen={showExport} hide={hideExport} />
    </>
  );
};
