import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';

import './loading.scss';

interface Props {
  fullScreen?: boolean;
}

export const Loading: React.FC<Props> = ({ fullScreen }) => {
  return (
    <div className={`loading ${fullScreen ? 'fullScreen' : ''}`}>
      <div className="data">
        <CircularProgress color="secondary" />
        <Typography variant="body1">
          {fullScreen ? 'Loading application...' : 'Loading data...'}
        </Typography>
      </div>
    </div>
  );
};
