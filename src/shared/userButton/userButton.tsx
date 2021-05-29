import React, { useCallback, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircleOutlined } from '@material-ui/icons';
import { useAuth } from 'app/common/authProvider';
import { useHistory } from 'react-router';
import { MainTab } from 'data/enums';
import { useRoles } from 'app/common/rolesProvider';

import { ExportDialog } from './exportDialog';

import 'shared/menuButton.scss';

interface Props {
  setCurrentTab: (value: number) => void;
}

export const UserButton: React.FC<Props> = (props: Props) => {
  const [anchor, setAnchor] = useState<Element>(null);
  const [showExport, setShowExport] = useState(false);

  const { signOut } = useAuth();
  const history = useHistory();
  const { isAdmin } = useRoles();

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

  const openUserManagement = () => {
    props.setCurrentTab(MainTab.Users);
    history.push('/users');
    onClose();
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
          {isAdmin && (
            <MenuItem
              onClick={() => {
                onExportClick();
                onClose();
              }}
            >
              Export data
            </MenuItem>
          )}
          {isAdmin && (
            <MenuItem onClick={openUserManagement}>Manage users</MenuItem>
          )}
          <MenuItem onClick={signOut}>Log out</MenuItem>
        </Menu>
      </div>
      <ExportDialog isOpen={showExport} hide={hideExport} />
    </>
  );
};
