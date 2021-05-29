import React, { SyntheticEvent, useMemo, useState } from 'react';
import { AppBar, IconButton, Tabs, Toolbar, Tab } from '@material-ui/core';
import { HelpOutline } from '@material-ui/icons';
import { CustomPopover } from 'shared/customPopover/customPopover';
import { MainTab, Root } from 'data/enums';
import { Link, useLocation } from 'react-router-dom';
import { UserButton } from 'shared/userButton/userButton';

import './bar.scss';

export const Bar: React.FC= () => {
  const location = useLocation();

  const initialState = useMemo(() => {
    switch(location.pathname) {
      case Root.Rules: return MainTab.RecyclableItems;
      case Root.Decisions: return MainTab.Decisions;
      case Root.Locations: return MainTab.Locations;
      case Root.Users: return MainTab.Users;
      default: return MainTab.RecyclableItems;
    }
  }, [location.pathname]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTab, setCurrentTab] = useState(initialState);

  const handleClick = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="bar">
      <AppBar position="static">
        <Toolbar>
          <Tabs
            value={currentTab}
            onChange={(e) => e.preventDefault()}
          >
            <Tab
              label={<Link onClick={() => setCurrentTab(0)} to={Root.Items}>Recyclable items</Link>}
              value={MainTab.RecyclableItems}
            />
            <Tab label={<Link onClick={() => setCurrentTab(1)} to={Root.Rules}>Rules</Link>} value={MainTab.Rules} />
            <Tab label={<Link onClick={() => setCurrentTab(2)} to={Root.Decisions}>Decisions</Link>} value={MainTab.Decisions} />
            <Tab label={<Link onClick={() => setCurrentTab(3)} to={Root.Locations}>Locations</Link>} value={MainTab.Locations} />
            <Tab label={<Link onClick={() => setCurrentTab(4)} to={Root.Users}>Users</Link>} value={MainTab.Users} style={{ display: 'none' }} />
          </Tabs>
          <div className="info">
            <IconButton color="secondary" onClick={handleClick}>
              <HelpOutline />
            </IconButton>
            <CustomPopover
              open={open}
              onClose={handleClose}
              anchorEl={anchorEl}
            />
          </div>
          <UserButton setCurrentTab={setCurrentTab} />
        </Toolbar>
      </AppBar>
    </div>
  );
};
