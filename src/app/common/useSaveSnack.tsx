import React from 'react';
import { useSnackbar } from 'notistack';
import saveLogo from 'assets/save.svg';

export const useSaveSnack = () => {
  const { enqueueSnackbar } = useSnackbar();

  return () => enqueueSnackbar(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img
        src={saveLogo}
        alt="Save."
        width="24"
        style={{ paddingBottom: '0.2rem' }}
      ></img>
      <span style={{ paddingLeft: '0.6rem', paddingRight: '1rem' }}>
        Saved successfully!
      </span>
    </div>,
    {
      variant: 'info',
      autoHideDuration: 2000,
    }
  );
};
