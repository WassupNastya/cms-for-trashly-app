import React from 'react';

import './page.scss';

interface Props {
  title: string;
}

export const Page: React.FC<Props> = ({ title }) => {
  return (
    <div className="page">
      <div className="title">{title}</div>
    </div>
  );
};
