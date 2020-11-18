import React from 'react';

import './block.scss';

interface Props {
  title: string;
}

export const Block: React.FC<Props> = ({ title }) => {
  return (
    <div className="Block">
      <div className="Title">{title}</div>
    </div>
  );
};
