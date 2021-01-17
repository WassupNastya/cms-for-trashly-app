import React from 'react';

import './block.scss';

interface Props {
  title: string;
}

export const Block: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="Block">
      <div className="Title">{title}</div>
      {children}
    </div>
  );
};
