import React from 'react';

import './errorString.scss';

interface ErrorStringProps {
  isError: boolean;
  errorMessage: string;
}

export const ErrorString = (props: ErrorStringProps) => {
  return props.isError ? (
    <div className="error-string">{props.errorMessage}</div>
  ) : null;
};
