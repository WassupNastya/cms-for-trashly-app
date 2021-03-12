import { Dialog } from '@material-ui/core';
import React from 'react';

import './modal.scss';

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const Modal: React.FC<Props> = ({
  open,
  handleClose,
  children
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      {children}
    </Dialog>
  );
};
