import { ActionType } from './actionType';
import {
  Action,
  DecisionView,
  ItemsGroup,
  ItemsItem,
  ItemsProperty,
  Location,
  RuleView,
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

export const getRulesAsync: () => Action = () => {
  return { type: ActionType.GETRULESASYNC };
};

export const setRules: (data: RuleView[]) => Action = (data) => {
  return { type: ActionType.SETRULES, data };
};

export const getDecisionsAsync: () => Action = () => {
  return { type: ActionType.GETDECISIONSASYNC };
};

export const setDecisions: (data: DecisionView[]) => Action = (data) => {
  return { type: ActionType.SETDECISIONS, data };
};
