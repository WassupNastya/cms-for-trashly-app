import React, { useCallback, useState } from 'react';
import { Grid, IconButton, ListItem } from '@material-ui/core';
import { Reorder } from '@material-ui/icons';
import { Sidebar } from 'app/sidebar/sidebar';

import './appBar.scss';

interface IProps {
  isOpen: boolean;
  onClick: () => void;
}

export const AppBar: React.FC<IProps> = ({ isOpen, onClick }) => {
  return (
    <>
      <Grid xs={12} item className="AppBar">
        <ListItem>
          <IconButton className="Description" onClick={onClick}>
            <Reorder />
          </IconButton>
        </ListItem>
      </Grid>
      {isOpen && <Grid className="MobileSidebar"><Sidebar isMobile /></Grid>}
    </>
  );
};
