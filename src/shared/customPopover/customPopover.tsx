import React from 'react';
import { Popover } from '@material-ui/core';
import { Onboarding } from 'app/onboarding/onboarding';

interface Props {
  open: boolean;
  anchorEl?: Element | ((element: Element) => Element);
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
}

export const CustomPopover: React.FC<Props> = ({ open, anchorEl, onClose }) => {
  return (
    <Popover
      onClose={onClose}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Onboarding />
    </Popover>
  );
};
