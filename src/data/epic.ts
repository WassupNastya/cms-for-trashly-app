import { combineEpics } from 'redux-observable';

import {
  Category,
  Group,
  Item,
  Property,
  Location,
  Rule,
  Decision,
} from './model';
import {
  setCategories,
  setDecisions,
  setGroups,
  setItems,
  setProperties,
  setLocations,
  setRules,
} from './actions';
import { ActionType } from './actionType';
import {
  getLocations,
  getLocation,
  getItems,
  getGroups,
  getProperties,
  getRules,
  getDecisions,
  getCategories,
  createGroup,
  getGroup,
  createItem,
  createRule,
  createDecision,
  createCategory,
  createProperty,
  createLocation,
  getCategory,
  getItem,
  getProperty,
  getRule,
  getDecision,
  deleteGroup,
  deleteItem,
  deleteCategory,
  deleteProperty,
  deleteRule,
  deleteDecision,
} from './api';
import {
  convertDecisionFromFirebase,
  convertItemFromFirebase,
  convertRuleFromFirebase,
} from './converters';
import { get, create, getAll, deleteEpic } from './templatesEpic';

const getItemsEpic = getAll<Item>(
  ActionType.GETITEMSASYNC,
  getItems,
  setItems,
  convertItemFromFirebase
);
const getGroupsEpic = getAll<Group>(
  ActionType.GETGROUPSASYNC,
  getGroups,
  setGroups
);
const getCategoriesEpic = getAll<Category>(
  ActionType.GETCATEGORIESASYNC,
  getCategories,
  setCategories
);
const getPropertiesEpic = getAll<Property>(
  ActionType.GETPROPERTIESASYNC,
  getProperties,
  setProperties
);
const getRulesEpic = getAll<Rule>(
  ActionType.GETRULESASYNC,
  getRules,
  setRules,
  convertRuleFromFirebase
);
const getDecisionsEpic = getAll<Decision>(
  ActionType.GETDECISIONSASYNC,
  getDecisions,
  setDecisions,
  convertDecisionFromFirebase
);
const getLocationsEpic = getAll<Location>(
  ActionType.GETLOCATIONSASYNC,
  getLocations,
  setLocations
);

const createItemEpic = create<Item>(ActionType.CREATEITEMASYNC, createItem);
const createGroupEpic = create<Group>(ActionType.CREATEGROUPASYNC, createGroup);
const createCategoryEpic = create<Category>(
  ActionType.CREATECATEGORYASYNC,
  createCategory
);
const createPropertyEpic = create<Property>(
  ActionType.CREATEPROPERTYASYNC,
  createProperty
);
const createRuleEpic = create<Rule>(ActionType.CREATERULEASYNC, createRule);
const createDecisionEpic = create<Decision>(
  ActionType.CREATEDECISIONSASYNC,
  createDecision
);
const createLocationEpic = create<Location>(
  ActionType.CREATELOCATIONASYNC,
  createLocation
);

const getItemEpic = get<Item>(
  ActionType.GETITEMASYNC,
  getItem,
  convertItemFromFirebase
);
const getGroupEpic = get<Group>(ActionType.GETGROUPASYNC, getGroup);
const getCategoryEpic = get<Category>(ActionType.GETCATEGORYASYNC, getCategory);
const getPropertyEpic = get<Property>(ActionType.GETPROPERTYASYNC, getProperty);
const getRuleEpic = get<Rule>(
  ActionType.GETRULEASYNC,
  getRule,
  convertRuleFromFirebase
);
const getDecisionEpic = get<Decision>(
  ActionType.GETDECISIONASYNC,
  getDecision,
  convertDecisionFromFirebase
);
const getLocationEpic = get<Location>(ActionType.GETLOCATIONASYNC, getLocation);

const deleteItemEpic = deleteEpic(ActionType.DELETEITEMASYNC, deleteItem);
const deleteGroupEpic = deleteEpic(ActionType.DELETEGROUPASYNC, deleteGroup);
const deleteCategoryEpic = deleteEpic(
  ActionType.DELETECATEGORYASYNC,
  deleteCategory
);
const deletePropertyEpic = deleteEpic(
  ActionType.DELETEPROPERTYASYNC,
  deleteProperty
);
const deleteRuleEpic = deleteEpic(ActionType.DELETERULEASYNC, deleteRule);
const deleteDecisionEpic = deleteEpic(
  ActionType.DELETEDECISIONASYNC,
  deleteDecision
);

export const epic = combineEpics(
  getLocationsEpic,
  getLocationEpic,
  getItemsEpic,
  getGroupsEpic,
  getPropertiesEpic,
  getRulesEpic,
  getDecisionsEpic,
  getCategoriesEpic,
  createGroupEpic,
  getGroupEpic,
  createItemEpic,
  createRuleEpic,
  createDecisionEpic,
  createCategoryEpic,
  createPropertyEpic,
  createLocationEpic,
  getCategoryEpic,
  getItemEpic,
  getPropertyEpic,
  getRuleEpic,
  getDecisionEpic,
  deleteGroupEpic,
  deleteItemEpic,
  deleteCategoryEpic,
  deletePropertyEpic,
  deleteRuleEpic,
  deleteDecisionEpic
);
