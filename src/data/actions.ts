import { ActionType } from './actionType';
import {
  Category,
  Group,
  Item,
  Property,
  Location,
  Rule,
  Decision,
  Action,
  DataForDownload,
} from './model';
import { checkAction, create, deleteAction, get, getAll, setAll } from './templateAction';

export const getItemsAsync = getAll(ActionType.GETITEMSASYNC);
export const setItems = setAll(ActionType.SETITEMS);

export const getGroupsAsync = getAll(ActionType.GETGROUPSASYNC);
export const setGroups = setAll(ActionType.SETGROUPS);

export const getPropertiesAsync = getAll(ActionType.GETPROPERTIESASYNC);
export const setProperties = setAll(ActionType.SETPROPERTIES);

export const getRulesAsync = getAll(ActionType.GETRULESASYNC);
export const setRules = setAll(ActionType.SETRULES);

export const getDecisionsAsync = getAll(ActionType.GETDECISIONSASYNC);
export const setDecisions = setAll(ActionType.SETDECISIONS);

export const getCategoriesAsync = getAll(ActionType.GETCATEGORIESASYNC);
export const setCategories = setAll(ActionType.SETCATEGORIES);

export const getLocationsAsync = getAll(ActionType.GETLOCATIONSASYNC);
export const setLocations = setAll(ActionType.SETLOCATIONS);

export const getItemAsync = get<Item>(ActionType.GETITEMASYNC);
export const getGroupAsync = get<Group>(ActionType.GETGROUPASYNC);
export const getCategoryAsync = get<Category>(ActionType.GETCATEGORYASYNC);
export const getPropertyAsync = get<Property>(ActionType.GETPROPERTYASYNC);
export const getRuleAsync = get<Rule>(ActionType.GETRULEASYNC);
export const getDecisionAsync = get<Decision>(ActionType.GETDECISIONASYNC);
export const getLocationAsync = get<Location>(ActionType.GETLOCATIONASYNC);

export const createItemAsync = create<Item>(ActionType.CREATEITEMASYNC);
export const createGroupAsync = create<Group>(ActionType.CREATEGROUPASYNC);
export const createCategoryAsync = create<Category>(
  ActionType.CREATECATEGORYASYNC
);
export const createPropertyAsync = create<Property>(
  ActionType.CREATEPROPERTYASYNC
);
export const createRuleAsync = create<Rule>(ActionType.CREATERULEASYNC);
export const createDecisionAsync = create<Decision>(
  ActionType.CREATEDECISIONSASYNC
);
export const createLocationAsync = create<Location>(
  ActionType.CREATELOCATIONASYNC
);

export const deleteItemAsync = deleteAction(ActionType.DELETEITEMASYNC);
export const deleteGroupAsync = deleteAction(ActionType.DELETEGROUPASYNC);
export const deleteCategoryAsync = deleteAction(ActionType.DELETECATEGORYASYNC);
export const deletePropertyAsync = deleteAction(ActionType.DELETEPROPERTYASYNC);
export const deleteRuleAsync = deleteAction(ActionType.DELETERULEASYNC);
export const deleteDecisionAsync = deleteAction(ActionType.DELETEDECISIONASYNC);
export const deleteLocationAsync = deleteAction(ActionType.DELETELOCATIONASYNC);

export const downloadAsync: (
  onResponseCallback: (data: DataForDownload) => void
) => Action = (onResponseCallback) => {
  return { type: ActionType.DOWNLOADASYNC, onResponseCallback };
};

export const uploadAsync: (onResponseCallback: () => void) => Action = (
  onResponseCallback
) => {
  return { type: ActionType.UPLOADFILESASYNC, onResponseCallback };
};

export const checkGroupAsync = checkAction(ActionType.CHECKGROUPASYNC);
export const checkCategoryAsync = checkAction(ActionType.CHECKCATEGORYASYNC);
export const checkPropertyAsync = checkAction(ActionType.CHECKPROPERTYASYNC);
export const checkItemAsync = checkAction(ActionType.CHECKITEMASYNC);