import { ActionsObservable, combineEpics } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { filter, ignoreElements, map, mergeMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';

import {
  DecisionView,
  ItemsGroup,
  ItemsItem,
  ItemsProperty,
  Location,
  RuleView,
} from './model';
import {
  setDecisions,
  setItemsGroup,
  setItemsItems,
  setItemsProperties,
  setLocations,
  setRules,
} from './actions';
import { ActionType } from './actionType';
import {
  getLocations,
  getLocation,
  getItemsItems,
  getItemsGroups,
  getItemsProperties,
  getRules,
  getDecisions,
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

export const epic = combineEpics(
  getLocationsEpic,
  getLocationEpic,
  getItemsItemsEpic,
  getItemsGroupEpic,
  getItemsPropertiesEpic,
  getRulesEpic,
  getDecisionsEpic
);
