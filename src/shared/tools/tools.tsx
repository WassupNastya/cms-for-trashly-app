import React, { Dispatch, SetStateAction, useMemo } from 'react';
import classnames from 'classnames';
import { Button, TextField } from '@material-ui/core';
import { Add, Search } from '@material-ui/icons';
import { Tabs } from 'shared/tabs/tabs';
import { Root, Tab, Tab as Value } from 'data/enums';
import { useLocation } from 'react-router';
import { useDialog } from 'app/common/useDialog';
import { ItemModal } from 'app/items/itemModal';
import { RuleModal } from 'app/rules/ruleModal';
import { DecisionModal } from 'app/decisions/decisionModal';
import { LocationModal } from 'app/locations/locationModal';
import { useSearch } from 'app/common/searchProvider';

import './tools.scss';

interface Props {
  currentTab: Value;
  setCurrentTab: Dispatch<SetStateAction<Value>>;
}

export const Tools: React.FC<Props> = ({ currentTab, setCurrentTab }) => {
  const location = useLocation();
  const { dialog, show, hide } = useDialog();
  const { searchValue, setSearchValue } = useSearch();

  const whereI = useMemo(() => {
    if (location.pathname === '/' || location.pathname === Root.Items) return Root.Items;
    else if (location.pathname === Root.Rules) return Root.Rules;
    else if (location.pathname === Root.Decisions) return Root.Decisions;
    return Root.Locations;
  }, [location.pathname]);

  const isItems = useMemo(() => whereI === Root.Items, [whereI]);

  const hideButton = useMemo(() => {
    return isItems && currentTab !== Tab.Items;
  }, [currentTab, isItems]);

  const buttonTitle = useMemo(() => {
    if (isItems) return currentTab;
    else if (location.pathname === '/rules') return 'Rule';
    else if (location.pathname === '/decisions') return 'Decision';
    return 'Location';
  }, [currentTab, isItems, location]);

  const modal = useMemo(() => {
    switch(whereI) {
      case Root.Items: return <ItemModal hide={hide} />;
      case Root.Rules: return <RuleModal hide={hide} />;
      case Root.Decisions: return <DecisionModal hide={hide} />;
      default: return <LocationModal hide={hide} />;
    }
  }, [hide, whereI]);

  return (
    <div className="tools">
      <Tabs
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        hide={!isItems}
      />
      <div className={classnames('search', { rightAlignment: !isItems })}>
        <form noValidate autoComplete="off">
          <TextField
            size="small"
            id="search"
            variant="outlined"
            color="secondary"
            placeholder="Search"
            InputProps={{
              startAdornment: <Search />,
            }}
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </form>
        {!hideButton && (
          <>
            <Button
              style={{ backgroundColor: '#00BCCA' }}
              onClick={() => show()}
            >
              <Add />
              <div className="buttonTitle">{buttonTitle}</div>
            </Button>
            {dialog(() => modal)}
          </>
        )}
      </div>
    </div>
  );
};
