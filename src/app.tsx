import React, { useState } from 'react';
import classnames from 'classnames';
import { Home } from 'app/home';
import { Sidebar } from 'app/sidebar/sidebar';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import './app.scss';

export const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="app">
      <AppBar
        position="fixed"
        className={classnames('bar', { 'bar-shift': showSidebar })}
      >
        <Toolbar>
          {!showSidebar && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setShowSidebar(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
      ></Sidebar>
      <div className={classnames('content', { 'content-shift': showSidebar })}>
        <Home></Home>
      </div>
    </div>
  );
};
