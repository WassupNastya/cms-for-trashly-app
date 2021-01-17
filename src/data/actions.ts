import { ActionType } from './actionType';
import {
  Action,
  DecisionForGroup,
  DecisionForItem,
  DecisionForProperties,
  ItemsGroup,
  ItemsItem,
  ItemsProperty,
  Location,
  RuleForCategory,
  RuleForGroup,
  RuleForItem,
} from './model';

export const getLocationsAsync: () => Action = () => {
  return { type: ActionType.GETLOCATIONSASYNC };
};

export const setLocations: (data: Location[]) => Action = (data) => {
  return { type: ActionType.SETLOCATIONS, data };
};

export const getLocationAsync: (
  id: string,
  onResponseCallback: (response: Location) => void
) => Action = (id, onResponseCallback) => {
  return { type: ActionType.GETLOCATIONASYNC, id, onResponseCallback };
};

export const getItemsItemsAsync: () => Action = () => {
  return { type: ActionType.GETITEMSITEMSASYNC };
};

export const setItemsItems: (data: ItemsItem[]) => Action = (data) => {
  return { type: ActionType.SETITEMSITEMS, data };
};

export const getItemsGroupsAsync: () => Action = () => {
  return { type: ActionType.GETITEMSGROUPASYNC };
};

export const setItemsGroup: (data: ItemsGroup[]) => Action = (data) => {
  return { type: ActionType.SETITEMSGROUP, data };
};

export const getItemsPropertiesAsync: () => Action = () => {
  return { type: ActionType.GETITEMSPROPERTIESASYNC };
};

export const setItemsProperties: (data: ItemsProperty[]) => Action = (data) => {
  return { type: ActionType.SETITEMSPROPERTIES, data };
};

export const getRulesForItemsAsync: () => Action = () => {
  return { type: ActionType.GETRULESFORITEMSASYNC };
};

export const setRulesForItems: (data: RuleForItem[]) => Action = (data) => {
  return { type: ActionType.SETRULESFORITEMS, data };
};

export const getRulesForGroupsAsync: () => Action = () => {
  return { type: ActionType.GERTRULESFORGROUPSASYNC };
};

export const setRulesForGroups: (data: RuleForGroup[]) => Action = (data) => {
  return { type: ActionType.SETRULESFORGROUPS, data };
};

export const getRulesForCatergoriesAsync: () => Action = () => {
  return { type: ActionType.GETRULESFORCATEGORIESASYNC };
};

export const setRulesForCategories: (data: RuleForCategory[]) => Action = (
  data
) => {
  return { type: ActionType.SETRULESFORCATEGORIES, data };
};

export const getDecisionsForItemsAsync: () => Action = () => {
  return { type: ActionType.GETDECISIONSFORITEMSASYNC };
};

export const setDecisionsForItems: (data: DecisionForItem[]) => Action = (
  data
) => {
  return { type: ActionType.SETDECISIONSFORITEMS, data };
};

export const getDecisionsForGroupsAsync: () => Action = () => {
  return { type: ActionType.GETDECISIONSFORGROUPSASYNC };
};

export const setDecisionsForGroups: (data: DecisionForGroup[]) => Action = (
  data
) => {
  return { type: ActionType.SETDECISIONSFORGROUPS, data };
};

export const getDecisionsForPropertiesAsync: () => Action = () => {
  return { type: ActionType.GETDECISIONSFORPROPERTIESASYNC };
};

export const setDecisionsForProperties: (
  data: DecisionForProperties[]
) => Action = (data) => {
  return { type: ActionType.SETDECISIONSFORPROPERTIES, data };
};
