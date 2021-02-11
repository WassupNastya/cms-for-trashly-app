import { ActionType } from './actionType';
import {
  Action,
  Category,
  Group,
  Item,
  Property,
  Location,
  Rule,
  Decision,
} from './model';

export const getLocationsAsync: (setLoading?: (value: boolean) => void) => Action = (setLoading) => {
  return { type: ActionType.GETLOCATIONSASYNC, setLoading };
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

export const getItemsAsync: (
  setLoading?: (value: boolean) => void
) => Action = (setLoading) => {
  return { type: ActionType.GETITEMSASYNC, setLoading };
};

export const setItems: (data: Item[]) => Action = (data) => {
  return { type: ActionType.SETITEMS, data };
};

export const getGroupsAsync: (
  setLoading?: (value: boolean) => void
) => Action = (setLoading) => {
  return { type: ActionType.GETGROUPSASYNC, setLoading };
};

export const setGroups: (data: Group[]) => Action = (data) => {
  return { type: ActionType.SETGROUPS, data };
};

export const getPropertiesAsync: (
  setLoading?: (value: boolean) => void
) => Action = (setLoading) => {
  return { type: ActionType.GETPROPERTIESASYNC, setLoading };
};

export const setProperties: (data: Property[]) => Action = (data) => {
  return { type: ActionType.SETPROPERTIES, data };
};

export const getRulesAsync: (
  setLoading?: (value: boolean) => void
) => Action = (setLoading) => {
  return { type: ActionType.GETRULESASYNC, setLoading };
};

export const setRules: (data: Rule[]) => Action = (data) => {
  return { type: ActionType.SETRULES, data };
};

export const getDecisionsAsync: (
  setLoading?: (value: boolean) => void
) => Action = (setLoading) => {
  return { type: ActionType.GETDECISIONSASYNC, setLoading };
};

export const setDecisions: (data: Decision[]) => Action = (data) => {
  return { type: ActionType.SETDECISIONS, data };
};

export const getCategoriesAsync: (
  setLoading?: (value: boolean) => void
) => Action = (setLoading) => {
  return { type: ActionType.GETCATEGORIESASYNC, setLoading };
};

export const setCategories: (data: Category[]) => Action = (data) => {
  return { type: ActionType.SETCATEGORIES, data };
};

export const createGroupAsync: (
  data: Group,
  onResponseCallback: () => void
) => Action = (data, onResponseCallback) => {
  return { type: ActionType.CREATEGROUPASYNC, data, onResponseCallback };
};

export const getGroupAsync: (
  id: string,
  onResponseCallback: (response: Group) => void
) => Action = (id, onResponseCallback) => {
  return { type: ActionType.GETGROUPASYNC, id, onResponseCallback };
};

export const createItemAsync: (
  data: Item,
  onResponseCallback: () => void
) => Action = (data, onResponseCallback) => {
  return { type: ActionType.CREATEITEMASYNC, data, onResponseCallback };
};

export const createRuleAsync: (
  data: Rule,
  onResponseCallback: () => void
) => Action = (data, onResponseCallback) => {
  return { type: ActionType.CREATERULEASYNC, data, onResponseCallback };
};

export const createDecisionAsync: (
  data: Decision,
  onResponseCallback: () => void
) => Action = (data, onResponseCallback) => {
  return { type: ActionType.CREATEDECISIONSASYNC, data, onResponseCallback };
};

export const createCategoryAsync: (
  data: Category,
  onResponseCallback: () => void
) => Action = (data, onResponseCallback) => {
  return { type: ActionType.CREATECATEGORYASYNC, data, onResponseCallback };
};

export const createPropertyAsync: (
  data: Property,
  onResponseCallback: () => void
) => Action = (data, onResponseCallback) => {
  return { type: ActionType.CREATEPROPERTYASYNC, data, onResponseCallback };
};

export const createLocationAsync: (
  data: Location,
  onResponseCallback: () => void
) => Action = (data, onResponseCallback) => {
  return { type: ActionType.CREATELOCATIONASYNC, data, onResponseCallback };
};
