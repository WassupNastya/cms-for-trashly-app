import React from 'react';
import { Slider, Typography } from '@material-ui/core';

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const map = {
  0: 'Low',
  1: 'Normal',
  2: 'Critical',
};

export const CustomSlider: React.FC<Props> = ({
  value,
  onChange,
  disabled,
}) => {
  const valueInt = Number(Object.keys(map).find((key) => map[key] === value));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '48%',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '0.5rem',
        }}
      >
        <Typography variant="subtitle1">Priority</Typography>
        <Typography variant="subtitle1" style={{ color: '#B0B0B0' }}>
          {value}
        </Typography>
      </div>
      <Slider
        value={valueInt}
        step={1}
        marks
        min={0}
        max={2}
        color="secondary"
        aria-labelledby="continuous-slider"
        valueLabelFormat={(x) => map[x]}
        disabled={disabled}
        onChange={(_, newValue) => onChange(map[newValue as number])}
        style={{ padding: '10px 0' }}
      />
    </div>
  );
};
