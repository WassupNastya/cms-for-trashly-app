import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import items from 'assets/items.svg';
import rules from 'assets/rules.svg';
import decisions from 'assets/decisions.svg';
import locations from 'assets/locations.svg';

import './onboarding.scss';

interface IInfo {
  label: string;
  image: string;
}

export const Onboarding: React.FC = () => {
  const location = useLocation();

  const title: IInfo = useMemo(() => {
    if (location.pathname.includes('/items'))
      return { label: 'Recyclable items', image: items };
    if (location.pathname.includes('/rules'))
      return { label: 'Rules', image: rules };
    if (location.pathname.includes('/decisions'))
      return { label: 'Decisions', image: decisions };
    if (location.pathname.includes('/locations'))
      return { label: 'Locations', image: locations };
    else return { label: 'Recyclable items', image: items };
  }, [location.pathname]);

  return (
    <div className="Onboarding">
      <div className="Title">
        <img src={title.image} alt={title.label}></img>
        <div className="Label">{title.label}</div>
      </div>
      <div className="Subtitle">What is it?</div>
      <div className="Description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud.
      </div>
      <div className="Subtitle">How it works?</div>
      <div className="Description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud.
      </div>
    </div>
  );
};
