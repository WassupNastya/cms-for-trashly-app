import { Chip } from '@material-ui/core';
import React from 'react';

interface Props {
  list?: string[];
}

export const PropertiesCell: React.FC<Props> = ({ list }) => {
  const overTheLimit = list.length > 3;
  const visibleItems: string[] = overTheLimit ? list.slice(0, 3) : list;

  const getMoreString = () => {
    const difference = list.length - 3;
    return overTheLimit ? `+ ${difference} more` : '';
  };

  return (
    <div style={{ width: '100%' }}>
      {visibleItems.map((label, key) => (
        <Chip key={key} label={label} style={{ marginRight: '0.4rem' }} />
      ))}
      {getMoreString()}
    </div>
  );
};
