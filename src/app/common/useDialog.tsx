import React, { useState } from 'react';
import { Modal } from 'shared/modal/modal';

export const useDialog = () => {
  const [showDialog, setShowDialog] = useState<{
    show: boolean;
    id?: string;
    type?: string;
    onChange?: (name: string) => void;
  }>({
    show: false,
  });

  const dialog = (content: (id?: string, type?: string, onChange?: (name: string) => void) => JSX.Element) => {
    return (
      <Modal
        open={showDialog.show}
        handleClose={() => {
          setShowDialog({ show: false });
        }}
      >
        {content(showDialog.id, showDialog.type, showDialog.onChange)}
      </Modal>
    );
  };

  return {
    dialog,
    show: (id?: string, type?: string, onChange?: (name: string) => void) =>
      setShowDialog({ show: true, id, type, onChange }),
    hide: () => setShowDialog({ show: false }),
  };
};
