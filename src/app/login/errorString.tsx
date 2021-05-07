import React from 'react';
import loginError from 'assets/loginError.svg';
import { Typography } from '@material-ui/core';

import './ErrorString.scss';

interface Props {
  message: string;
}

export const ErrorString: React.FC<Props> = ({ message }) => {
  return (
    <div className="login-error-string">
      <img src={loginError} alt="Error." />
      <Typography variant="body2">{message}</Typography>
    </div>
  );
};
