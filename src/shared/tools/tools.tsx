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
import { GroupModal } from 'app/groups/groupModal';
import { CategoryModal } from 'app/categories/categoryModal';
import { PropertyModal } from 'app/properties/propertyModal';
import { useRoles } from 'app/common/rolesProvider';

import './tools.scss';

interface Props {
  currentTab: Value;
  setCurrentTab: Dispatch<SetStateAction<Value>>;
}

export const Tools: React.FC<Props> = ({ currentTab, setCurrentTab }) => {
  const location = useLocation();
  const { dialog, show, hide } = useDialog();
  const { searchValue, setSearchValue } = useSearch();
  const { isViewer } = useRoles();

  const whereI = useMemo(() => {
    if (location.pathname === '/' || location.pathname === Root.Items)
      return Root.Items;
    else if (location.pathname === Root.Rules) return Root.Rules;
    else if (location.pathname === Root.Decisions) return Root.Decisions;
    else if (location.pathname === Root.Users) return Root.Users;
    return Root.Locations;
  }, [location.pathname]);

  const isItems = useMemo(() => whereI === Root.Items, [whereI]);

  const buttonTitle = useMemo(() => {
    if (isItems) return currentTab;
    else if (location.pathname === '/rules') return 'Rule';
    else if (location.pathname === '/decisions') return 'Decision';
    return 'Location';
  }, [currentTab, isItems, location]);

  const modal = useMemo(() => {
    switch (whereI) {
      case Root.Items: {
        if (currentTab === Tab.Items) return <ItemModal hide={hide} />;
        if (currentTab === Tab.Groups) return <GroupModal hide={hide} />;
        if (currentTab === Tab.Categories) return <CategoryModal hide={hide} />;
        if (currentTab === Tab.Properties) return <PropertyModal hide={hide} />;
      }
      case Root.Rules:
        return <RuleModal hide={hide} />;
      case Root.Decisions:
        return <DecisionModal hide={hide} />;
      default:
        return <LocationModal hide={hide} />;
    }
  }, [hide, whereI, currentTab]);

  const hideButton = useMemo(() => {
    return whereI === Root.Users || isViewer;
  }, [whereI, isViewer]);

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
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
        {!hideButton && (
          <Button style={{ backgroundColor: '#00BCCA' }} onClick={() => show()}>
            <Add />
            <div className="buttonTitle">{buttonTitle}</div>
          </Button>
        )}
        {dialog(() => modal)}
      </div>
    </div>
  );
};
