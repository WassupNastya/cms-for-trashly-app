import { ActionsObservable, combineEpics } from 'redux-observable';
import {
  concatMap,
  concatMapTo,
  filter,
  ignoreElements,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { forkJoin, of } from 'rxjs';

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
  deleteLocation,
} from './api';
import {
  convertDecisionFromFirebase,
  convertItemFromFirebase,
  convertRuleFromFirebase,
  convertDecisionFromFirebaseForEdit,
  convertRuleFromFirebaseForEdit,
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
const deleteLocationEpic = deleteEpic(ActionType.DELETELOCATIONASYNC, deleteLocation);

const parseComplexResponse = (response) => {
  const model = response[0];
  const items = response[1] as Item[];
  const groups = response[2] as Group[];
  const categories = response[3] as Category[];
  const properties = response[4] as Property[];

  return { model, items, groups, categories, properties };
};
export const getDecisionEpic = (
  action$: ActionsObservable<{
    type: string;
    id: string;
    onResponseCallback: (response: Decision) => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETDECISIONASYNC)),
    mergeMap(({ id, onResponseCallback }) =>
      forkJoin([
        getDecision(id),
        getItems(),
        getGroups(),
        getCategories(),
        getProperties(),
      ]).pipe(
        tap((response) => {
          const { model, items, groups, categories, properties } = parseComplexResponse(response);
          onResponseCallback(
            convertDecisionFromFirebaseForEdit(
              model,
              items,
              groups,
              categories,
              properties
            )
          );
        }),
        concatMap((response) => {
          const { items, groups, categories, properties } = parseComplexResponse(response);
          return of(
            ...[
              setItems(items),
              setGroups(groups),
              setCategories(categories),
              setProperties(properties),
            ]
          );
        })
      )
    )
  );


  export const getRuleEpic = (
    action$: ActionsObservable<{
      type: string;
      id: string;
      onResponseCallback: (response: Rule) => void;
    }>
  ) =>
    action$.pipe(
      filter(isOfType(ActionType.GETRULEASYNC)),
      mergeMap(({ id, onResponseCallback }) =>
        forkJoin([
          getRule(id),
          getItems(),
          getGroups(),
          getCategories(),
          getProperties(),
        ]).pipe(
          tap((response) => {
            const { model, items, groups, categories, properties } = parseComplexResponse(response);
            onResponseCallback(
              convertRuleFromFirebaseForEdit(
                model,
                items,
                groups,
                categories,
                properties
              )
            );
          }),
          concatMap((response) => {
            const { items, groups, categories, properties } = parseComplexResponse(response);
            return of(
              ...[
                setItems(items),
                setGroups(groups),
                setCategories(categories),
                setProperties(properties),
              ]
            );
          })
        )
      )
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
  deleteGroupEpic,
  deleteItemEpic,
  deleteCategoryEpic,
  deletePropertyEpic,
  deleteRuleEpic,
  deleteDecisionEpic,
  deleteLocationEpic
);
