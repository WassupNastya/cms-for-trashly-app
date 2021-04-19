import { ActionsObservable, combineEpics } from 'redux-observable';
import { filter, ignoreElements, mergeMap, tap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { forkJoin } from 'rxjs';

import {
  Category,
  Group,
  Item,
  Property,
  Location,
  Rule,
  Decision,
  DataForDownload,
} from './model';
import {
  setCategories,
  setGroups,
  setProperties,
  setLocations,
} from './actions';
import { ActionType } from './actionType';
import {
  getLocations,
  getLocation,
  getItems,
  getGroups,
  getProperties,
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
  getProperty,
  deleteGroup,
  deleteItem,
  deleteCategory,
  deleteProperty,
  deleteRule,
  deleteDecision,
  deleteLocation,
  getRules,
  getDecisions,
} from './api';
import { get, create, getAll, deleteEpic } from './templatesEpic';
import { prepareItemForDownload } from './item/download';
import { getItemEpic, getItemsEpic } from './item/request';
import { prepareLocationForDownload } from './location/download';
import { getRuleEpic, getRulesEpic } from './rule/request';
import { prepareRuleForDownload } from './rule/download';
import { getDecisionEpic, getDecisionsEpic } from './decision/request';
import { prepareDecisionForDownload } from './decision/download';

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

const getGroupEpic = get<Group>(ActionType.GETGROUPASYNC, getGroup);
const getCategoryEpic = get<Category>(ActionType.GETCATEGORYASYNC, getCategory);
const getPropertyEpic = get<Property>(ActionType.GETPROPERTYASYNC, getProperty);
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
const deleteLocationEpic = deleteEpic(
  ActionType.DELETELOCATIONASYNC,
  deleteLocation
);

const parseDownloadResponse = (response: any) => {
  const locations = response[0] as Location[];
  const handledLocations = locations.map((x, i) =>
    prepareLocationForDownload(x, i)
  );

  const groups = response[2] as Group[];
  const categories = response[3] as Category[];
  const properties = response[4] as Property[];

  const items = response[1] as Item[];
  let handledItems = [];
  items.forEach(
    (item) =>
      (handledItems = [
        ...handledItems,
        ...prepareItemForDownload(item, groups, categories, properties),
      ])
  );

  const rules = response[5] as Rule[];
  let handledRules = [];
  rules.forEach(
    (rule) =>
      (handledRules = [
        ...handledRules,
        ...prepareRuleForDownload(rule, items, groups, categories, properties),
      ])
  );

  const decisions = response[6] as Decision[];
  let handledDecisions = [];
  decisions.forEach(
    (decision) =>
      (handledDecisions = [
        ...handledDecisions,
        ...prepareDecisionForDownload(
          decision,
          items,
          groups,
          categories,
          properties
        ),
      ])
  );

  return {
    locations: handledLocations,
    items: handledItems.map((x, id) => ({ ...x, id })),
    rules: handledRules.map((x, id) => ({ ...x, id })),
    decisions: handledDecisions.map((x, id) => ({ ...x, id })),
  };
};

export const downloadEpic = (
  action$: ActionsObservable<{
    type: string;
    onResponseCallback: (response: DataForDownload) => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.DOWNLOADASYNC)),
    mergeMap(({ onResponseCallback }) => {
      return forkJoin([
        getLocations(),
        getItems(),
        getGroups(),
        getCategories(),
        getProperties(),
        getRules(),
        getDecisions(),
      ]).pipe(
        tap((response) => {
          const { locations, items, rules, decisions } = parseDownloadResponse(
            response
          );
          onResponseCallback({ locations, items, rules, decisions });
        }),
        ignoreElements()
      );
    })
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
  deleteDecisionEpic,
  deleteLocationEpic,
  downloadEpic
);
