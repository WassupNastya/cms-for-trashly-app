import React from 'react';

import { Header } from './header';

import './page.scss';

interface Props {
  title: string;
  url: string;
  needPanel?: boolean;
}

export const Page: React.FC<Props> = ({ title, url, needPanel, children }) => {
  return (
    <div className="Page">
      <Header title={title} url={url} needPanel={needPanel} />
      {children}
    </div>
  );
};
