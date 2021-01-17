import { ActionsObservable, combineEpics } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { filter, ignoreElements, map, mergeMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';

import {
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
import {
  setDecisionsForGroups,
  setDecisionsForItems,
  setDecisionsForProperties,
  setItemsGroup,
  setItemsItems,
  setItemsProperties,
  setLocations,
  setRulesForCategories,
  setRulesForGroups,
  setRulesForItems,
} from './actions';
import { ActionType } from './actionType';
import {
  getLocations,
  getLocation,
  getItemsItems,
  getItemsGroups,
  getItemsProperties,
  getRulesForItems,
  getRulesForGroups,
  getRulesForCategories,
  getDecisionsForItems,
  getDecisionsForGroups,
  getDecisionsForProperties,
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

const getItemsItemsEpic = (action$: ActionsObservable<{ type: string }>) =>
  action$.pipe(
    filter(isOfType(ActionType.GETITEMSITEMSASYNC)),
    mergeMap(() =>
      from(getItemsItems()).pipe(
        map((response: ItemsItem[]) => setItemsItems(response))
      )
    )
  );

const getItemsGroupEpic = (action$: ActionsObservable<{ type: string }>) =>
  action$.pipe(
    filter(isOfType(ActionType.GETITEMSGROUPASYNC)),
    mergeMap(() =>
      from(getItemsGroups()).pipe(
        map((response: ItemsGroup[]) => setItemsGroup(response))
      )
    )
  );

const getItemsPropertiesEpic = (action$: ActionsObservable<{ type: string }>) =>
  action$.pipe(
    filter(isOfType(ActionType.GETITEMSPROPERTIESASYNC)),
    mergeMap(() =>
      from(getItemsProperties()).pipe(
        map((response: ItemsProperty[]) => setItemsProperties(response))
      )
    )
  );

const getRulesForItemsEpic = (action$: ActionsObservable<{ type: string }>) =>
  action$.pipe(
    filter(isOfType(ActionType.GETRULESFORITEMSASYNC)),
    mergeMap(() =>
      from(getRulesForItems()).pipe(
        map((response: RuleForItem[]) => setRulesForItems(response))
      )
    )
  );

const getRulesForGroupsEpic = (action$: ActionsObservable<{ type: string }>) =>
  action$.pipe(
    filter(isOfType(ActionType.GETRULESFORITEMSASYNC)),
    mergeMap(() =>
      from(getRulesForGroups()).pipe(
        map((response: RuleForGroup[]) => setRulesForGroups(response))
      )
    )
  );

const getRulesForCategoriesEpic = (
  action$: ActionsObservable<{ type: string }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETRULESFORCATEGORIESASYNC)),
    mergeMap(() =>
      from(getRulesForCategories()).pipe(
        map((response: RuleForCategory[]) => setRulesForCategories(response))
      )
    )
  );

const getDecisionsForItemsEpic = (
  action$: ActionsObservable<{ type: string }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETDECISIONSFORITEMSASYNC)),
    mergeMap(() =>
      from(getDecisionsForItems()).pipe(
        map((response: DecisionForItem[]) => setDecisionsForItems(response))
      )
    )
  );

const getDecisionsForGroupsEpic = (
  action$: ActionsObservable<{ type: string }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETDECISIONSFORGROUPSASYNC)),
    mergeMap(() =>
      from(getDecisionsForGroups()).pipe(
        map((response: DecisionForGroup[]) => setDecisionsForGroups(response))
      )
    )
  );

const getDecisionsForPropertiesEpic = (
  action$: ActionsObservable<{ type: string }>
) =>
  action$.pipe(
    filter(isOfType(ActionType.GETDECISIONSFORPROPERTIESASYNC)),
    mergeMap(() =>
      from(getDecisionsForProperties()).pipe(
        map((response: DecisionForProperties[]) =>
          setDecisionsForProperties(response)
        )
      )
    )
  );

export const epic = combineEpics(
  getLocationsEpic,
  getLocationEpic,
  getItemsItemsEpic,
  getItemsGroupEpic,
  getItemsPropertiesEpic,
  getRulesForItemsEpic,
  getRulesForGroupsEpic,
  getRulesForCategoriesEpic,
  getDecisionsForItemsEpic,
  getDecisionsForGroupsEpic,
  getDecisionsForPropertiesEpic
);
