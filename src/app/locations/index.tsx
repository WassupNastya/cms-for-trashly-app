import React from 'react';
import { Page } from 'shared/page';
import { Root } from 'data/enums';

export const Locations: React.FC = () => {
  return <Page title="Locations" url={Root.Locations} needPanel={false}></Page>;
};
