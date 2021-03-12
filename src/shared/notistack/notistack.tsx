import { SnackbarContent } from '@material-ui/core';
import { SnackbarMessage } from 'notistack';
import React from 'react';

interface Props {
  message: SnackbarMessage;
}

// eslint-disable-next-line react/display-name
export const Notistack = React.forwardRef(({ message }: Props, ref) => {
  return (
    <SnackbarContent
      className="notistack"
      ref={ref}
      message={message}
    />
  );
});
