import React from 'react';
import { TextField } from '@material-ui/core';

export const Home: React.FC = () => {
  return (
    <div>
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          size="small"
        />
      </form>
    </div>
  );
};
