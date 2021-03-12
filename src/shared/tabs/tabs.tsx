import React, { Dispatch, SetStateAction } from 'react';
import { Tab as Value } from 'data/enums';
import classnames from 'classnames';
import { Tabs as TabsTemplate, Tab as TabTemplate } from '@material-ui/core';

import './tabs.scss';

interface Props {
  onClick: () => void;
  style?: React.CSSProperties;
  isActive?: boolean;
}

const Tab: React.FC<Props> = ({ style, children, isActive, onClick }) => {
  return (
    <div style={isActive ? style : undefined} className="tab" onClick={onClick}>
      {children}
    </div>
  );
};

interface TabsProps {
  currentTab: Value;
  setCurrentTab: Dispatch<SetStateAction<Value>>;
  hide: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  currentTab,
  setCurrentTab,
  hide,
}) => {
  return (
    <div className={classnames('tabs', `${currentTab}`, { hide })}>
      <TabsTemplate
        value={currentTab}
        onChange={(_, value) => setCurrentTab(value)}
      >
        <TabTemplate disableRipple label="Items" value={Value.Items} />
        <TabTemplate disableRipple label="Groups" value={Value.Groups} />
        <TabTemplate disableRipple label="Categories" value={Value.Categories} />
        <TabTemplate disableRipple label="Properties" value={Value.Properties} />
      </TabsTemplate>
    </div>
  );
};
