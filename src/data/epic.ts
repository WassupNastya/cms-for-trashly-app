import { ActionsObservable, combineEpics } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { filter, ignoreElements, map, mergeMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';

import {
  Category,
  DecisionView,
  Group,
  Item,
  Property,
  Location,
  RuleView,
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
} from './api';

const getLocationsEpic = (action$: ActionsObservable<{ type: string }>) =>
  action$.pipe(
    filter(isOfType(ActionType.GETLOCATIONSASYNC)),
    mergeMap(() =>
      from(getLocations()).pipe(
        map((response: Location[]) => setLocations(response))
      )
    )
  );

const getLocationEpic = (
  action$: ActionsObservable<{
    type: string;
    id: string;
    onResponseCallback: (response: Location) => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETLOCATIONASYNC)),
    mergeMap(({ id, onResponseCallback }) =>
      from(getLocation(id)).pipe(
        tap((response) => onResponseCallback(response)),
        ignoreElements()
      )
    )
  );

const getItemsEpic = (
  action$: ActionsObservable<{
    type: string;
    setLoading?: (value: boolean) => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETITEMSASYNC)),
    mergeMap(({ setLoading }) =>
      from(getItems()).pipe(
        map((response: Item[]) => setItems(response)),
        tap(() => setLoading?.(false))
      )
    )
  );

const getGroupsEpic = (
  action$: ActionsObservable<{
    type: string;
    setLoading?: (value: boolean) => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETGROUPSASYNC)),
    mergeMap(({ setLoading }) =>
      from(getGroups()).pipe(
        map((response: Group[]) => setGroups(response)),
        tap(() => setLoading?.(false))
      )
    )
  );

const getPropertiesEpic = (
  action$: ActionsObservable<{
    type: string;
    setLoading?: (value: boolean) => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETPROPERTIESASYNC)),
    mergeMap(({ setLoading }) =>
      from(getProperties()).pipe(
        map((response: Property[]) => setProperties(response)),
        tap(() => setLoading?.(false))
      )
    )
  );

const getRulesEpic = (action$: ActionsObservable<{ type: string }>) =>
  action$.pipe(
    filter(isOfType(ActionType.GETRULESASYNC)),
    mergeMap(() =>
      from(getRules()).pipe(map((response: RuleView[]) => setRules(response)))
    )
  );

const getDecisionsEpic = (action$: ActionsObservable<{ type: string }>) =>
  action$.pipe(
    filter(isOfType(ActionType.GETDECISIONSASYNC)),
    mergeMap(() =>
      from(getDecisions()).pipe(
        map((response: DecisionView[]) => setDecisions(response))
      )
    )
  );

const getCategoriesEpic = (
  action$: ActionsObservable<{
    type: string;
    setLoading?: (value: boolean) => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETCATEGORIESASYNC)),
    mergeMap(({ setLoading }) =>
      from(getCategories()).pipe(
        map((response: Category[]) => setCategories(response)),
        tap(() => setLoading?.(false))
      )
    )
  );

const createGroupEpic = (
  action$: ActionsObservable<{
    type: string;
    data: Group;
    onResponseCallback: () => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.CREATEGROUPASYNC)),
    mergeMap(({ data, onResponseCallback }) =>
      from(createGroup(data)).pipe(
        tap(() => onResponseCallback()),
        ignoreElements()
      )
    )
  );

const getGroupEpic = (
  action$: ActionsObservable<{
    type: string;
    id: string;
    onResponseCallback: (response: Group) => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETGROUPASYNC)),
    mergeMap(({ id, onResponseCallback }) =>
      from(getGroup(id)).pipe(
        tap((response) => onResponseCallback(response)),
        ignoreElements()
      )
    )
  );

const createItemEpic = (
  action$: ActionsObservable<{
    type: string;
    data: Item;
    onResponseCallback: () => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.CREATEITEMASYNC)),
    mergeMap(({ data, onResponseCallback }) =>
      from(createItem(data)).pipe(
        tap(() => onResponseCallback()),
        ignoreElements()
      )
    )
  );

const createRuleEpic = (
  action$: ActionsObservable<{
    type: string;
    data: Rule;
    onResponseCallback: () => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.CREATERULEASYNC)),
    mergeMap(({ data, onResponseCallback }) =>
      from(createRule(data)).pipe(
        tap(() => onResponseCallback()),
        ignoreElements()
      )
    )
  );

const createDecisionEpic = (
  action$: ActionsObservable<{
    type: string;
    data: Decision;
    onResponseCallback: () => void;
  }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.CREATEDECISIONSASYNC)),
    mergeMap(({ data, onResponseCallback }) =>
      from(createDecision(data)).pipe(
        tap(() => onResponseCallback()),
        ignoreElements()
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
  createDecisionEpic
);
