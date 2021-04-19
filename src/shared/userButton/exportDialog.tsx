import { DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useExport } from 'app/common/useExport';
import React from 'react';
import { Modal } from 'shared/modal/modal';

interface Props {
  isOpen: boolean;
  hide: () => void;
}

export const ExportDialog: React.FC<Props> = ({ isOpen, hide }) => {
  const getDownloadButton = useExport();

  return (
    <Modal open={isOpen} handleClose={hide}>
      <div style={{ width: '20rem' }}>
        <DialogTitle>
          <div>Export</div>
          <Close onClick={hide} />
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="button"
            style={{ color: '#b0b0b0', fontWeight: 'lighter' }}
          >
            Manual
          </Typography>
          {getDownloadButton()}
        </DialogContent>
      </div>
    </Modal>
  );
};
