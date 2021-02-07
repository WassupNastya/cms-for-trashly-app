import { ActionType } from './actionType';
import {
  Action,
  Category,
  DecisionView,
  Group,
  Item,
  Property,
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

export const getItemsAsync: (setLoading?: (value: boolean) => void) => Action = (setLoading) => {
  return { type: ActionType.GETITEMSASYNC, setLoading };
};

export const setItems: (data: Item[]) => Action = (data) => {
  return { type: ActionType.SETITEMS, data };
};

export const getGroupsAsync: (setLoading?: (value: boolean) => void) => Action = (setLoading) => {
  return { type: ActionType.GETGROUPSASYNC, setLoading };
};

export const setGroups: (data: Group[]) => Action = (data) => {
  return { type: ActionType.SETGROUPS, data };
};

export const getPropertiesAsync: (setLoading?: (value: boolean) => void) => Action = (setLoading) => {
  return { type: ActionType.GETPROPERTIESASYNC, setLoading };
};

export const setProperties: (data: Property[]) => Action = (data) => {
  return { type: ActionType.SETPROPERTIES, data };
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

export const getCategoriesAsync: (setLoading?: (value: boolean) => void) => Action = (setLoading) => {
  return { type: ActionType.GETCATEGORIESASYNC, setLoading };
};

export const setCategories: (data: Category[]) => Action = (data) => {
  return { type: ActionType.SETCATEGORIES, data };
};

export const createGroupAsync: (data: Group, onResponseCallback: () => void) => Action = (data, onResponseCallback) => {
  return { type: ActionType.CREATEGROUPASYNC, data, onResponseCallback };
};

export const getGroupAsync: (
  id: string,
  onResponseCallback: (response: Group) => void
) => Action = (id, onResponseCallback) => {
  return { type: ActionType.GETGROUPASYNC, id, onResponseCallback };
};

export const createItemAsync: (data: Item, onResponseCallback: () => void) => Action = (data, onResponseCallback) => {
  return { type: ActionType.CREATEITEMASYNC, data, onResponseCallback };
};
