import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import items from 'assets/items.svg';
import rules from 'assets/rules.svg';
import decisions from 'assets/decisions.svg';
import locations from 'assets/locations.svg';

import { itemsHowItWorks, itemsWhatIsIt, rulesWhatIsIt, rulesHowItWorks, decisionsWhatIsIt, decisionsHowItWorks, locationsWhatIsIt, locationsHowItWorks } from './text';

import './onboarding.scss';

interface IInfo {
  label: string;
  image: string;
  whatIsIt: string;
  howItWorks: string;
}

export const Onboarding: React.FC = () => {
  const location = useLocation();

  const title: IInfo = useMemo(() => {
    if (location.pathname.includes('/items'))
      return {
        label: 'Recyclable items',
        image: items,
        whatIsIt: itemsWhatIsIt,
        howItWorks: itemsHowItWorks,
      };
    if (location.pathname.includes('/rules'))
      return {
        label: 'Rules',
        image: rules,
        whatIsIt: rulesWhatIsIt,
        howItWorks: rulesHowItWorks,
      };
    if (location.pathname.includes('/decisions'))
      return {
        label: 'Decisions',
        image: decisions,
        whatIsIt: decisionsWhatIsIt,
        howItWorks: decisionsHowItWorks,
      };
    if (location.pathname.includes('/locations'))
      return {
        label: 'Locations',
        image: locations,
        whatIsIt: locationsWhatIsIt,
        howItWorks: locationsHowItWorks,
      };
    else
      return {
        label: 'Recyclable items',
        image: items,
        whatIsIt: itemsWhatIsIt,
        howItWorks: itemsHowItWorks,
      };
  }, [location.pathname]);

  return (
    <div className="Onboarding">
      <div className="Title">
        <img src={title.image} alt={title.label}></img>
        <div className="Label">{title.label}</div>
      </div>
      <div className="Subtitle">What is it?</div>
      <div className="Description">{title.whatIsIt}</div>
      <div className="Subtitle">How it works?</div>
      <div className="Description">{title.howItWorks}</div>
    </div>
  );
};
